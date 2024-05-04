import React from 'react';
import Login from './login';
import Logout from './logout';
import { ApplicationPaths, LoginActions, LogoutActions } from './apiAuthorizationConstants';
var ApiAuthorizationRoutes = [
    {
        path: ApplicationPaths.Login,
        element: loginAction(LoginActions.Login)
    },
    {
        path: ApplicationPaths.LoginFailed,
        element: loginAction(LoginActions.LoginFailed)
    },
    {
        path: ApplicationPaths.LoginCallback,
        element: loginAction(LoginActions.LoginCallback)
    },
    {
        path: ApplicationPaths.Profile,
        element: loginAction(LoginActions.Profile)
    },
    {
        path: ApplicationPaths.Register,
        element: loginAction(LoginActions.Register)
    },
    {
        path: ApplicationPaths.LogOut,
        element: logoutAction(LogoutActions.Logout)
    },
    {
        path: ApplicationPaths.LogOutCallback,
        element: logoutAction(LogoutActions.LogoutCallback)
    },
    {
        path: ApplicationPaths.LoggedOut,
        element: logoutAction(LogoutActions.LoggedOut)
    }
];
function loginAction(name) {
    return React.createElement(Login, { action: name });
}
function logoutAction(name) {
    return React.createElement(Logout, { action: name });
}
export default ApiAuthorizationRoutes;
//# sourceMappingURL=apiAuthorizationRoutes.js.map