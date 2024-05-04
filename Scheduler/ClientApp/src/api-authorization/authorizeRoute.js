import { __awaiter, __generator } from "tslib";
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { ApplicationPaths, QueryParameterNames } from './apiAuthorizationConstants';
import authService from './authorizeService';
var AuthorizeRoute = function (props) {
    var _a = useState(false), ready = _a[0], setReady = _a[1];
    var _b = useState(false), authenticated = _b[0], setAuthenticated = _b[1];
    useEffect(function () {
        var populateAuthenticationState = function () { return __awaiter(void 0, void 0, void 0, function () {
            var isAuthenticated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, authService.isAuthenticated()];
                    case 1:
                        isAuthenticated = _a.sent();
                        setAuthenticated(isAuthenticated);
                        setReady(true);
                        return [2 /*return*/];
                }
            });
        }); };
        var authenticationChanged = function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setReady(false);
                        setAuthenticated(false);
                        return [4 /*yield*/, populateAuthenticationState()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        var subscription = authService.subscribe(function () { return authenticationChanged(); });
        populateAuthenticationState();
        return function () {
            authService.unsubscribe(subscription);
        };
    }, []);
    if (!ready) {
        return React.createElement("div", null);
    }
    var link = document.createElement("a");
    link.href = props.path;
    var returnUrl = "".concat(link.protocol, "//").concat(link.host).concat(link.pathname).concat(link.search).concat(link.hash);
    var redirectUrl = "".concat(ApplicationPaths.Login, "?").concat(QueryParameterNames.ReturnUrl, "=").concat(encodeURIComponent(returnUrl));
    return authenticated ? props.element : React.createElement(Navigate, { replace: true, to: redirectUrl });
};
export default AuthorizeRoute;
//# sourceMappingURL=authorizeRoute.js.map