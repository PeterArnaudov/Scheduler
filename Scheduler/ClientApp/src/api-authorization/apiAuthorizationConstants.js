export var ApplicationName = 'Scheduler';
export var QueryParameterNames = {
    ReturnUrl: 'returnUrl',
    Message: 'message'
};
export var LogoutActions = {
    LogoutCallback: 'logout-callback',
    Logout: 'logout',
    LoggedOut: 'logged-out'
};
export var LoginActions = {
    Login: 'login',
    LoginCallback: 'login-callback',
    LoginFailed: 'login-failed',
    Profile: 'profile',
    Register: 'register'
};
var prefix = '/authentication';
export var ApplicationPaths = {
    DefaultLoginRedirectPath: '/',
    ApiAuthorizationClientConfigurationUrl: "_configuration/".concat(ApplicationName),
    ApiAuthorizationPrefix: prefix,
    Login: "".concat(prefix, "/").concat(LoginActions.Login),
    LoginFailed: "".concat(prefix, "/").concat(LoginActions.LoginFailed),
    LoginCallback: "".concat(prefix, "/").concat(LoginActions.LoginCallback),
    Register: "".concat(prefix, "/").concat(LoginActions.Register),
    Profile: "".concat(prefix, "/").concat(LoginActions.Profile),
    LogOut: "".concat(prefix, "/").concat(LogoutActions.Logout),
    LoggedOut: "".concat(prefix, "/").concat(LogoutActions.LoggedOut),
    LogOutCallback: "".concat(prefix, "/").concat(LogoutActions.LogoutCallback),
    IdentityRegisterPath: 'Identity/Account/Register',
    IdentityManagePath: 'Identity/Account/Manage'
};
export var ClaimKeys = {
    Role: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
};
export var Roles = {
    Admin: 'Admin',
    ClinicAdmin: 'ClinicAdmin'
};
//# sourceMappingURL=apiAuthorizationConstants.js.map