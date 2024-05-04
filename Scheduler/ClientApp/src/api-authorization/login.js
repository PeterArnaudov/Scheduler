import { __awaiter, __generator } from "tslib";
import React, { useEffect, useState } from 'react';
import authService, { AuthenticationResultStatus } from './authorizeService';
import { LoginActions, QueryParameterNames, ApplicationPaths } from './apiAuthorizationConstants';
var Login = function (props) {
    var _a = useState(undefined), message = _a[0], setMessage = _a[1];
    useEffect(function () {
        var action = props.action;
        switch (action) {
            case LoginActions.Login:
                login(getReturnUrl());
                break;
            case LoginActions.LoginCallback:
                processLoginCallback();
                break;
            case LoginActions.LoginFailed:
                var params = new URLSearchParams(window.location.search);
                var error = params.get(QueryParameterNames.Message);
                setMessage(error);
                break;
            case LoginActions.Profile:
                redirectToProfile();
                break;
            case LoginActions.Register:
                redirectToRegister();
                break;
            default:
                throw new Error("Invalid action '".concat(action, "'"));
        }
    }, [props.action]);
    var login = function (returnUrl) { return __awaiter(void 0, void 0, void 0, function () {
        var state, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    state = { returnUrl: returnUrl };
                    return [4 /*yield*/, authService.signIn(state)];
                case 1:
                    result = _b.sent();
                    _a = result.status;
                    switch (_a) {
                        case AuthenticationResultStatus.Redirect: return [3 /*break*/, 2];
                        case AuthenticationResultStatus.Success: return [3 /*break*/, 3];
                        case AuthenticationResultStatus.Fail: return [3 /*break*/, 5];
                    }
                    return [3 /*break*/, 6];
                case 2: return [3 /*break*/, 7];
                case 3: return [4 /*yield*/, navigateToReturnUrl(returnUrl)];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 7];
                case 5:
                    setMessage(result.message);
                    return [3 /*break*/, 7];
                case 6: throw new Error("Invalid status result ".concat(result.status, "."));
                case 7: return [2 /*return*/];
            }
        });
    }); };
    var processLoginCallback = function () { return __awaiter(void 0, void 0, void 0, function () {
        var url, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    url = window.location.href;
                    return [4 /*yield*/, authService.completeSignIn(url)];
                case 1:
                    result = _b.sent();
                    _a = result.status;
                    switch (_a) {
                        case AuthenticationResultStatus.Redirect: return [3 /*break*/, 2];
                        case AuthenticationResultStatus.Success: return [3 /*break*/, 3];
                        case AuthenticationResultStatus.Fail: return [3 /*break*/, 5];
                    }
                    return [3 /*break*/, 6];
                case 2: throw new Error('Should not redirect.');
                case 3: return [4 /*yield*/, navigateToReturnUrl(getReturnUrl(result.state))];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 7];
                case 5:
                    setMessage(result.message);
                    return [3 /*break*/, 7];
                case 6: throw new Error("Invalid authentication result status '".concat(result.status, "'."));
                case 7: return [2 /*return*/];
            }
        });
    }); };
    var getReturnUrl = function (state) {
        var params = new URLSearchParams(window.location.search);
        var fromQuery = params.get(QueryParameterNames.ReturnUrl);
        if (fromQuery && !fromQuery.startsWith("".concat(window.location.origin, "/"))) {
            throw new Error("Invalid return url. The return url needs to have the same origin as the current page.");
        }
        return (state && state.returnUrl) || fromQuery || "".concat(window.location.origin);
    };
    var redirectToRegister = function () {
        redirectToApiAuthorizationPath("".concat(ApplicationPaths.IdentityRegisterPath, "?").concat(QueryParameterNames.ReturnUrl, "=").concat(encodeURI(ApplicationPaths.Login)));
    };
    var redirectToProfile = function () {
        redirectToApiAuthorizationPath(ApplicationPaths.IdentityManagePath);
    };
    var redirectToApiAuthorizationPath = function (apiAuthorizationPath) {
        var redirectUrl = "".concat(window.location.origin, "/").concat(apiAuthorizationPath);
        window.location.replace(redirectUrl);
    };
    var navigateToReturnUrl = function (returnUrl) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            window.location.replace(returnUrl);
            return [2 /*return*/];
        });
    }); };
    if (!!message) {
        return React.createElement("div", null, message);
    }
    else {
        var action = props.action;
        switch (action) {
            case LoginActions.Login:
                return (React.createElement("div", null, "Logging in..."));
            case LoginActions.LoginCallback:
                return (React.createElement("div", null, "Processing login callback..."));
            case LoginActions.Profile:
            case LoginActions.Register:
                return (React.createElement("div", null));
            default:
                throw new Error("Invalid action '".concat(action, "'"));
        }
    }
};
export default Login;
//# sourceMappingURL=login.js.map