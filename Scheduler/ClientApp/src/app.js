import { __assign, __rest } from "tslib";
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './appRoutes';
import AuthorizeRoute from './api-authorization/authorizeRoute';
import { AuthProvider } from './contexts/authContext';
import Layout from './components/layout';
import './custom.css';
import { ToastContainer } from 'react-toastify';
var App = function () {
    return (React.createElement(AuthProvider, null,
        React.createElement(Layout, null,
            React.createElement(ToastContainer, null),
            React.createElement(Routes, null, AppRoutes.map(function (route, index) {
                var _a;
                var element = route.element, requireAuth = route.requireAuth, rest = __rest(route, ["element", "requireAuth"]);
                return (React.createElement(Route, __assign({ key: index }, rest, { element: requireAuth ? React.createElement(AuthorizeRoute, { path: (_a = rest.path) !== null && _a !== void 0 ? _a : "", element: element }) : element })));
            })))));
};
export default App;
//# sourceMappingURL=app.js.map