import { __awaiter, __generator } from "tslib";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import authService, { AuthenticationResultStatus } from './authorizeService';
import { LogoutActions, QueryParameterNames, ApplicationPaths } from './apiAuthorizationConstants';
var Logout = function (props) {
    var _a = useState(undefined), message = _a[0], setMessage = _a[1];
    var _b = useState(false), isReady = _b[0], setIsReady = _b[1];
    var _c = useState(false), authenticated = _c[0], setAuthenticated = _c[1];
    var navigate = useNavigate();
    useEffect(function () {
        var action = props.action;
        var logout = function (returnUrl) { return __awaiter(void 0, void 0, void 0, function () {
            var state, isauthenticated, result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        state = { returnUrl: returnUrl };
                        return [4 /*yield*/, authService.isAuthenticated()];
                    case 1:
                        isauthenticated = _b.sent();
                        if (!isauthenticated) return [3 /*break*/, 9];
                        return [4 /*yield*/, authService.signOut(state)];
                    case 2:
                        result = _b.sent();
                        _a = result.status;
                        switch (_a) {
                            case AuthenticationResultStatus.Redirect: return [3 /*break*/, 3];
                            case AuthenticationResultStatus.Success: return [3 /*break*/, 4];
                            case AuthenticationResultStatus.Fail: return [3 /*break*/, 6];
                        }
                        return [3 /*break*/, 7];
                    case 3: return [3 /*break*/, 8];
                    case 4: return [4 /*yield*/, navigateToReturnUrl(returnUrl)];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 6:
                        setMessage(result.message);
                        return [3 /*break*/, 8];
                    case 7: throw new Error("Invalid authentication result status.");
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        setMessage("You successfully logged out!");
                        _b.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        var processLogoutCallback = function () { return __awaiter(void 0, void 0, void 0, function () {
            var url, result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = window.location.href;
                        return [4 /*yield*/, authService.completeSignOut(url)];
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
                    case 6: throw new Error("Invalid authentication result status.");
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        var populateAuthenticationState = function () { return __awaiter(void 0, void 0, void 0, function () {
            var authenticated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, authService.isAuthenticated()];
                    case 1:
                        authenticated = _a.sent();
                        setAuthenticated(authenticated);
                        setIsReady(true);
                        return [2 /*return*/];
                }
            });
        }); };
        switch (action) {
            case LogoutActions.Logout:
                if (!!window.history.state.usr.local) {
                    logout(getReturnUrl());
                }
                else {
                    setIsReady(true);
                    setMessage("The logout was not initiated from within the page.");
                }
                break;
            case LogoutActions.LogoutCallback:
                processLogoutCallback();
                break;
            case LogoutActions.LoggedOut:
                setIsReady(true);
                setMessage("Успешно се отписахте!");
                navigate('/');
                break;
            default:
                throw new Error("Invalid action '".concat(action, "'"));
        }
        populateAuthenticationState();
    }, [props.action, navigate]);
    var getReturnUrl = function (state) {
        var params = new URLSearchParams(window.location.search);
        var fromQuery = params.get(QueryParameterNames.ReturnUrl);
        if (fromQuery && !fromQuery.startsWith("".concat(window.location.origin, "/"))) {
            throw new Error("Invalid return url. The return url needs to have the same origin as the current page.");
        }
        return (state && state.returnUrl) || fromQuery || "".concat(window.location.origin).concat(ApplicationPaths.LoggedOut);
    };
    var navigateToReturnUrl = function (returnUrl) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, window.location.replace(returnUrl)];
        });
    }); };
    if (!isReady) {
        return React.createElement("div", null);
    }
    if (!!message) {
        return React.createElement("div", null, message);
    }
    else {
        var action = props.action;
        switch (action) {
            case LogoutActions.Logout:
                return (React.createElement("div", null, "\u041E\u0442\u043F\u0438\u0441\u0432\u0430\u043D\u0435..."));
            case LogoutActions.LogoutCallback:
                return (React.createElement("div", null, "\u041E\u0431\u0440\u0430\u0431\u043E\u0442\u0432\u0430 \u0441\u0435 \u043E\u0431\u0440\u0430\u0442\u043D\u043E \u0438\u0437\u0432\u0438\u043A\u0432\u0430\u043D\u0435 \u043F\u0440\u0438 \u043E\u0442\u043F\u0438\u0441\u0432\u0430\u043D\u0435..."));
            case LogoutActions.LoggedOut:
                return (React.createElement("div", null, message));
            default:
                throw new Error("Invalid action '".concat(action, "'"));
        }
    }
};
export default Logout;
//# sourceMappingURL=logout.js.map