import { __awaiter, __generator } from "tslib";
import React, { useState, useEffect, Fragment } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import authService from './authorizeService';
import { ApplicationPaths } from './apiAuthorizationConstants';
;
var LoginMenu = function () {
    var _a = useState(false), isAuthenticated = _a[0], setIsAuthenticated = _a[1];
    var _b = useState(null), userName = _b[0], setUserName = _b[1];
    useEffect(function () {
        var populateState = function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, authStatus, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([authService.isAuthenticated(), authService.getUser()])];
                    case 1:
                        _a = _b.sent(), authStatus = _a[0], user = _a[1];
                        setIsAuthenticated(authStatus);
                        setUserName(user && user.name);
                        return [2 /*return*/];
                }
            });
        }); };
        var subscription = authService.subscribe(function () { return populateState(); });
        populateState();
        return function () {
            authService.unsubscribe(subscription);
        };
    }, []);
    var authenticatedView = function (profilePath, logoutPath, logoutState) { return (React.createElement(Fragment, null,
        React.createElement(NavItem, null,
            React.createElement(NavLink, { tag: Link, className: "text-dark", to: profilePath }, "\u041F\u0440\u043E\u0444\u0438\u043B")),
        React.createElement(NavItem, null,
            React.createElement(NavLink, { replace: true, tag: Link, className: "text-dark", to: logoutPath, state: logoutState }, "\u0418\u0437\u043B\u0435\u0437")))); };
    var anonymousView = function (registerPath, loginPath) { return (React.createElement(Fragment, null)); };
    if (!isAuthenticated) {
        var registerPath = "".concat(ApplicationPaths.Register);
        var loginPath = "".concat(ApplicationPaths.Login);
        return anonymousView(registerPath, loginPath);
    }
    else {
        var profilePath = "".concat(ApplicationPaths.Profile);
        var logoutPath = "".concat(ApplicationPaths.LogOut);
        var logoutState = { local: true };
        return authenticatedView(profilePath, logoutPath, logoutState);
    }
};
export default LoginMenu;
//# sourceMappingURL=loginMenu.js.map