import { UserManager, WebStorageStateStore } from 'oidc-client';
import { ApplicationPaths, ApplicationName } from './apiAuthorizationConstants';

const AuthenticationResultStatus = {
    Redirect: 'redirect',
    Success: 'success',
    Fail: 'fail'
};

const authService = {
    _callbacks: [],
    _nextSubscriptionId: 0,
    _user: null,
    _isAuthenticated: false,
    _popUpDisabled: true,
    userManager: undefined,

    isAuthenticated: async () => {
        const user = await authService.getUser();
        return !!user;
    },

    getUser: async () => {
        if (authService._user && authService._user.profile) {
            return authService._user.profile;
        }

        await authService.ensureUserManagerInitialized();
        const user = await authService.userManager.getUser();
        return user && user.profile;
    },

    getAccessToken: async () => {
        await authService.ensureUserManagerInitialized();
        const user = await authService.userManager.getUser();

        // Check if the token is expired
        const tokenExpirationTime = user?.expires_at;
        const isTokenExpired = Date.now() > tokenExpirationTime * 1000;

        if (isTokenExpired) {
            await authService.signOut({ returnUrl: '/Authentication/Login' });

            return;
        }

        return user && user.access_token;
    },

    signIn: async (state) => {
        await authService.ensureUserManagerInitialized();
        try {
            const silentUser = await authService.userManager.signinSilent(authService.createArguments());
            authService.updateState(silentUser);

            return authService.success(state);
        } catch (silentError) {
            console.log("Silent authentication error: ", silentError);

            try {
                if (authService._popUpDisabled) {
                    throw new Error('Popup disabled. Change \'AuthorizeService.js:AuthorizeService._popupDisabled\' to false to enable it.')
                }

                const popUpUser = await authService.userManager.signinPopup(authService.createArguments());
                authService.updateState(popUpUser);
                return authService.success(state);
            } catch (popUpError) {
                if (popUpError.message === "Popup window closed") {
                    return authService.error("The user closed the window.");
                } else if (!authService._popUpDisabled) {
                    console.log("Popup authentication error: ", popUpError);
                }

                try {
                    await authService.userManager.signinRedirect(authService.createArguments(state));
                    return authService.redirect();
                } catch (redirectError) {
                    console.log("Redirect authentication error: ", redirectError);
                    return authService.error(redirectError);
                }
            }
        }
    },

    completeSignIn: async (url) => {
        try {
            await authService.ensureUserManagerInitialized();
            const user = await authService.userManager.signinCallback(url);
            authService.updateState(user);
            return authService.success(user && user.state);
        } catch (error) {
            console.log('There was an error signing in: ', error);
            return authService.error('There was an error signing in.');
        }
    },

    signOut: async (state) => {
        await authService.ensureUserManagerInitialized();
        try {
            if (authService._popUpDisabled) {
                throw new Error('Popup disabled. Change \'AuthorizeService.js:AuthorizeService._popupDisabled\' to false to enable it.')
            }

            await authService.userManager.signoutPopup(authService.createArguments());
            authService.updateState(undefined);
            return authService.success(state);
        } catch (popupSignOutError) {
            console.log("Popup signout error: ", popupSignOutError);
            try {
                await authService.userManager.signoutRedirect(authService.createArguments(state));
                return authService.redirect();
            } catch (redirectSignOutError) {
                console.log("Redirect signout error: ", redirectSignOutError);
                return authService.error(redirectSignOutError);
            }
        }
    },

    completeSignOut: async (url) => {
        await authService.ensureUserManagerInitialized();
        try {
            const response = await authService.userManager.signoutCallback(url);
            authService.updateState(null);
            return authService.success(response && response.data);
        } catch (error) {
            console.log(`There was an error trying to log out '${error}'.`);
            return authService.error(error);
        }
    },

    updateState: (user) => {
        authService._user = user;
        authService._isAuthenticated = !!authService._user;
        authService.notifySubscribers();
    },

    subscribe: (callback) => {
        authService._callbacks.push({ callback, subscription: authService._nextSubscriptionId++ });
        return authService._nextSubscriptionId - 1;
    },

    unsubscribe: (subscriptionId) => {
        const subscriptionIndex = authService._callbacks
            .map((element, index) => element.subscription === subscriptionId ? { found: true, index } : { found: false })
            .filter(element => element.found === true);
        if (subscriptionIndex.length !== 1) {
            throw new Error(`Found an invalid number of subscriptions ${subscriptionIndex.length}`);
        }

        authService._callbacks.splice(subscriptionIndex[0].index, 1);
    },

    notifySubscribers: () => {
        for (let i = 0; i < authService._callbacks.length; i++) {
            const callback = authService._callbacks[i].callback;
            callback();
        }
    },

    createArguments: (state) => {
        return { useReplaceToNavigate: true, data: state };
    },

    error: (message) => {
        return { status: AuthenticationResultStatus.Fail, message };
    },

    success: (state) => {
        return { status: AuthenticationResultStatus.Success, state };
    },

    redirect: () => {
        return { status: AuthenticationResultStatus.Redirect };
    },

    ensureUserManagerInitialized: async () => {
        if (authService.userManager !== undefined) {
            return;
        }

        let response = await fetch(ApplicationPaths.ApiAuthorizationClientConfigurationUrl);
        if (!response.ok) {
            throw new Error(`Could not load settings for '${ApplicationName}'`);
        }

        let settings = await response.json();
        settings.automaticSilentRenew = true;
        settings.includeIdTokenInSilentRenew = true;
        settings.userStore = new WebStorageStateStore({
            prefix: ApplicationName
        });

        authService.userManager = new UserManager(settings);

        authService.userManager.events.addUserSignedOut(async () => {
            await authService.userManager.removeUser();
            authService.updateState(undefined);
        });
    },

    get instance() { return authService }
};

export default authService;
export { AuthenticationResultStatus };
