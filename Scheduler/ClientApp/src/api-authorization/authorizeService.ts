import { UserManager, WebStorageStateStore, User } from 'oidc-client';
import { ApplicationPaths, ApplicationName } from './apiAuthorizationConstants';

interface AuthResult {
    status: string;
    message?: string;
    state?: any;
}

enum AuthenticationResultStatus {
    Redirect = 'redirect',
    Success = 'success',
    Fail = 'fail'
}

const authService = {
    _callbacks: [] as { callback: () => void; subscription: number }[],
    _nextSubscriptionId: 0,
    _user: null as User | null,
    _isAuthenticated: false,
    _popUpDisabled: true,
    userManager: undefined as UserManager | undefined,

    isAuthenticated: async (): Promise<boolean> => {
        const user = await authService.getUser();
        return !!user;
    },

    getUser: async (): Promise<any | null> => {
        if (authService._user && authService._user.profile) {
            return authService._user.profile;
        }

        await authService.ensureUserManagerInitialized();
        const user = await authService.userManager!.getUser();
        return user && user.profile;
    },

    getAccessToken: async (): Promise<string> => {
        await authService.ensureUserManagerInitialized();
        const user = await authService.userManager!.getUser();

        if (!user) {
            return '';
        }

        // Check if the token is expired
        const tokenExpirationTime = user?.expires_at;
        const isTokenExpired = Date.now() > (tokenExpirationTime || 0) * 1000;

        if (isTokenExpired) {
            await authService.signOut({ returnUrl: '/Authentication/Login' });
            return '';
        }

        return user.access_token;
    },

    signIn: async (state: any): Promise<AuthResult> => {
        await authService.ensureUserManagerInitialized();
        try {
            const silentUser = await authService.userManager!.signinSilent(authService.createArguments());
            authService.updateState(silentUser);

            return authService.success(state);
        } catch (silentError) {
            console.log("Silent authentication error: ", silentError);

            try {
                if (authService._popUpDisabled) {
                    throw new Error('Popup disabled. Change \'AuthorizeService.js:AuthorizeService._popupDisabled\' to false to enable it.')
                }

                const popUpUser = await authService.userManager!.signinPopup(authService.createArguments());
                authService.updateState(popUpUser);
                return authService.success(state);
            } catch (popUpError: any) {
                if (popUpError.message === "Popup window closed") {
                    return authService.error("The user closed the window.");
                } else if (!authService._popUpDisabled) {
                    console.log("Popup authentication error: ", popUpError);
                }

                try {
                    await authService.userManager!.signinRedirect(authService.createArguments(state));
                    return authService.redirect();
                } catch (redirectError: any) {
                    console.log("Redirect authentication error: ", redirectError);
                    return authService.error(redirectError);
                }
            }
        }
    },

    completeSignIn: async (url: string): Promise<AuthResult> => {
        try {
            await authService.ensureUserManagerInitialized();
            const user = await authService.userManager!.signinCallback(url);
            authService.updateState(user);
            return authService.success(user && user.state);
        } catch (error) {
            console.log('There was an error signing in: ', error);
            return authService.error('There was an error signing in.');
        }
    },

    signOut: async (state: any): Promise<AuthResult> => {
        await authService.ensureUserManagerInitialized();
        try {
            if (authService._popUpDisabled) {
                throw new Error('Popup disabled. Change \'AuthorizeService.js:AuthorizeService._popupDisabled\' to false to enable it.')
            }

            await authService.userManager!.signoutPopup(authService.createArguments());
            authService.updateState(null);
            return authService.success(state);
        } catch (popupSignOutError) {
            console.log("Popup signout error: ", popupSignOutError);
            try {
                await authService.userManager!.signoutRedirect(authService.createArguments(state));
                return authService.redirect();
            } catch (redirectSignOutError: any) {
                console.log("Redirect signout error: ", redirectSignOutError);
                return authService.error(redirectSignOutError.message);
            }
        }
    },

    completeSignOut: async (url: string): Promise<AuthResult> => {
        await authService.ensureUserManagerInitialized();
        try {
            const response = await authService.userManager!.signoutCallback(url);
            authService.updateState(null);
            return authService.success(response && response.state);
        } catch (error: any) {
            console.log(`There was an error trying to log out '${error}'.`);
            return authService.error(error.message);
        }
    },

    updateState: (user: User | null) => {
        authService._user = user;
        authService._isAuthenticated = !!authService._user;
        authService.notifySubscribers();
    },

    subscribe: (callback: () => void): number => {
        authService._callbacks.push({ callback, subscription: authService._nextSubscriptionId++ });
        return authService._nextSubscriptionId - 1;
    },

    unsubscribe: (subscriptionId: number) => {
        const subscriptionIndex: number[] = authService._callbacks
            .map((element, index) => element.subscription === subscriptionId ? index : -1)
            .filter(index => index !== -1);
    
        if (subscriptionIndex.length !== 1) {
            throw new Error(`Found an invalid number of subscriptions ${subscriptionIndex.length}`);
        }
    
        authService._callbacks.splice(subscriptionIndex[0], 1);
    },    

    notifySubscribers: () => {
        for (let i = 0; i < authService._callbacks.length; i++) {
            const callback = authService._callbacks[i].callback;
            callback();
        }
    },

    createArguments: (state?: any) => {
        return { useReplaceToNavigate: true, data: state };
    },

    error: (message: string): AuthResult => {
        return { status: AuthenticationResultStatus.Fail, message };
    },

    success: (state: any): AuthResult => {
        return { status: AuthenticationResultStatus.Success, state };
    },

    redirect: (): AuthResult => {
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
            await authService.userManager!.removeUser();
            authService.updateState(null);
        });
    },

    get instance() { return authService }
};

export default authService;
export { AuthenticationResultStatus };
