import { __awaiter, __generator } from "tslib";
import { UserManager, WebStorageStateStore } from 'oidc-client';
import { ApplicationPaths, ApplicationName } from './apiAuthorizationConstants';
var AuthenticationResultStatus;
(function (AuthenticationResultStatus) {
    AuthenticationResultStatus["Redirect"] = "redirect";
    AuthenticationResultStatus["Success"] = "success";
    AuthenticationResultStatus["Fail"] = "fail";
})(AuthenticationResultStatus || (AuthenticationResultStatus = {}));
var authService = {
    _callbacks: [],
    _nextSubscriptionId: 0,
    _user: null,
    _isAuthenticated: false,
    _popUpDisabled: true,
    userManager: undefined,
    isAuthenticated: function () { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, authService.getUser()];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, !!user];
            }
        });
    }); },
    getUser: function () { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (authService._user && authService._user.profile) {
                        return [2 /*return*/, authService._user.profile];
                    }
                    return [4 /*yield*/, authService.ensureUserManagerInitialized()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, authService.userManager.getUser()];
                case 2:
                    user = _a.sent();
                    return [2 /*return*/, user && user.profile];
            }
        });
    }); },
    getAccessToken: function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, tokenExpirationTime, isTokenExpired;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, authService.ensureUserManagerInitialized()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, authService.userManager.getUser()];
                case 2:
                    user = _a.sent();
                    if (!user) {
                        return [2 /*return*/, ''];
                    }
                    tokenExpirationTime = user === null || user === void 0 ? void 0 : user.expires_at;
                    isTokenExpired = Date.now() > (tokenExpirationTime || 0) * 1000;
                    if (!isTokenExpired) return [3 /*break*/, 4];
                    return [4 /*yield*/, authService.signOut({ returnUrl: '/Authentication/Login' })];
                case 3:
                    _a.sent();
                    return [2 /*return*/, ''];
                case 4: return [2 /*return*/, user.access_token];
            }
        });
    }); },
    signIn: function (state) { return __awaiter(void 0, void 0, void 0, function () {
        var silentUser, silentError_1, popUpUser, popUpError_1, redirectError_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, authService.ensureUserManagerInitialized()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 13]);
                    return [4 /*yield*/, authService.userManager.signinSilent(authService.createArguments())];
                case 3:
                    silentUser = _a.sent();
                    authService.updateState(silentUser);
                    return [2 /*return*/, authService.success(state)];
                case 4:
                    silentError_1 = _a.sent();
                    console.log("Silent authentication error: ", silentError_1);
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 12]);
                    if (authService._popUpDisabled) {
                        throw new Error('Popup disabled. Change \'AuthorizeService.js:AuthorizeService._popupDisabled\' to false to enable it.');
                    }
                    return [4 /*yield*/, authService.userManager.signinPopup(authService.createArguments())];
                case 6:
                    popUpUser = _a.sent();
                    authService.updateState(popUpUser);
                    return [2 /*return*/, authService.success(state)];
                case 7:
                    popUpError_1 = _a.sent();
                    if (popUpError_1.message === "Popup window closed") {
                        return [2 /*return*/, authService.error("The user closed the window.")];
                    }
                    else if (!authService._popUpDisabled) {
                        console.log("Popup authentication error: ", popUpError_1);
                    }
                    _a.label = 8;
                case 8:
                    _a.trys.push([8, 10, , 11]);
                    return [4 /*yield*/, authService.userManager.signinRedirect(authService.createArguments(state))];
                case 9:
                    _a.sent();
                    return [2 /*return*/, authService.redirect()];
                case 10:
                    redirectError_1 = _a.sent();
                    console.log("Redirect authentication error: ", redirectError_1);
                    return [2 /*return*/, authService.error(redirectError_1)];
                case 11: return [3 /*break*/, 12];
                case 12: return [3 /*break*/, 13];
                case 13: return [2 /*return*/];
            }
        });
    }); },
    completeSignIn: function (url) { return __awaiter(void 0, void 0, void 0, function () {
        var user, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, authService.ensureUserManagerInitialized()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, authService.userManager.signinCallback(url)];
                case 2:
                    user = _a.sent();
                    authService.updateState(user);
                    return [2 /*return*/, authService.success(user && user.state)];
                case 3:
                    error_1 = _a.sent();
                    console.log('There was an error signing in: ', error_1);
                    return [2 /*return*/, authService.error('There was an error signing in.')];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    signOut: function (state) { return __awaiter(void 0, void 0, void 0, function () {
        var popupSignOutError_1, redirectSignOutError_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, authService.ensureUserManagerInitialized()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 9]);
                    if (authService._popUpDisabled) {
                        throw new Error('Popup disabled. Change \'AuthorizeService.js:AuthorizeService._popupDisabled\' to false to enable it.');
                    }
                    return [4 /*yield*/, authService.userManager.signoutPopup(authService.createArguments())];
                case 3:
                    _a.sent();
                    authService.updateState(null);
                    return [2 /*return*/, authService.success(state)];
                case 4:
                    popupSignOutError_1 = _a.sent();
                    console.log("Popup signout error: ", popupSignOutError_1);
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, authService.userManager.signoutRedirect(authService.createArguments(state))];
                case 6:
                    _a.sent();
                    return [2 /*return*/, authService.redirect()];
                case 7:
                    redirectSignOutError_1 = _a.sent();
                    console.log("Redirect signout error: ", redirectSignOutError_1);
                    return [2 /*return*/, authService.error(redirectSignOutError_1.message)];
                case 8: return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    }); },
    completeSignOut: function (url) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, authService.ensureUserManagerInitialized()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, authService.userManager.signoutCallback(url)];
                case 3:
                    response = _a.sent();
                    authService.updateState(null);
                    return [2 /*return*/, authService.success(response && response.state)];
                case 4:
                    error_2 = _a.sent();
                    console.log("There was an error trying to log out '".concat(error_2, "'."));
                    return [2 /*return*/, authService.error(error_2.message)];
                case 5: return [2 /*return*/];
            }
        });
    }); },
    updateState: function (user) {
        authService._user = user;
        authService._isAuthenticated = !!authService._user;
        authService.notifySubscribers();
    },
    subscribe: function (callback) {
        authService._callbacks.push({ callback: callback, subscription: authService._nextSubscriptionId++ });
        return authService._nextSubscriptionId - 1;
    },
    unsubscribe: function (subscriptionId) {
        var subscriptionIndex = authService._callbacks
            .map(function (element, index) { return element.subscription === subscriptionId ? index : -1; })
            .filter(function (index) { return index !== -1; });
        if (subscriptionIndex.length !== 1) {
            throw new Error("Found an invalid number of subscriptions ".concat(subscriptionIndex.length));
        }
        authService._callbacks.splice(subscriptionIndex[0], 1);
    },
    notifySubscribers: function () {
        for (var i = 0; i < authService._callbacks.length; i++) {
            var callback = authService._callbacks[i].callback;
            callback();
        }
    },
    createArguments: function (state) {
        return { useReplaceToNavigate: true, data: state };
    },
    error: function (message) {
        return { status: AuthenticationResultStatus.Fail, message: message };
    },
    success: function (state) {
        return { status: AuthenticationResultStatus.Success, state: state };
    },
    redirect: function () {
        return { status: AuthenticationResultStatus.Redirect };
    },
    ensureUserManagerInitialized: function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, settings;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (authService.userManager !== undefined) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, fetch(ApplicationPaths.ApiAuthorizationClientConfigurationUrl)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Could not load settings for '".concat(ApplicationName, "'"));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    settings = _a.sent();
                    settings.automaticSilentRenew = true;
                    settings.includeIdTokenInSilentRenew = true;
                    settings.userStore = new WebStorageStateStore({
                        prefix: ApplicationName
                    });
                    authService.userManager = new UserManager(settings);
                    authService.userManager.events.addUserSignedOut(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, authService.userManager.removeUser()];
                                case 1:
                                    _a.sent();
                                    authService.updateState(null);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    }); },
    get instance() { return authService; }
};
export default authService;
export { AuthenticationResultStatus };
//# sourceMappingURL=authorizeService.js.map