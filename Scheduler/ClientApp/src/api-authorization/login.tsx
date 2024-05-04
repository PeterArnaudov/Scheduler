import React, { useEffect, useState } from 'react';
import authService, { AuthenticationResultStatus } from './authorizeService';
import { LoginActions, QueryParameterNames, ApplicationPaths } from './apiAuthorizationConstants';

interface LoginProps {
    action: string;
}

const Login: React.FC<LoginProps> = (props) => {
    const [message, setMessage] = useState<string | undefined | null>(undefined);

    useEffect(() => {
        const action = props.action;
        switch (action) {
            case LoginActions.Login:
                login(getReturnUrl());
                break;
            case LoginActions.LoginCallback:
                processLoginCallback();
                break;
            case LoginActions.LoginFailed:
                const params = new URLSearchParams(window.location.search);
                const error = params.get(QueryParameterNames.Message);
                setMessage(error);
                break;
            case LoginActions.Profile:
                redirectToProfile();
                break;
            case LoginActions.Register:
                redirectToRegister();
                break;
            default:
                throw new Error(`Invalid action '${action}'`);
        }
    }, [props.action]);

    const login = async (returnUrl: string) => {
        const state = { returnUrl };
        const result = await authService.signIn(state);
        switch (result.status) {
            case AuthenticationResultStatus.Redirect:
                break;
            case AuthenticationResultStatus.Success:
                await navigateToReturnUrl(returnUrl);
                break;
            case AuthenticationResultStatus.Fail:
                setMessage(result.message);
                break;
            default:
                throw new Error(`Invalid status result ${result.status}.`);
        }
    };

    const processLoginCallback = async () => {
        const url = window.location.href;
        const result = await authService.completeSignIn(url);
        switch (result.status) {
            case AuthenticationResultStatus.Redirect:
                throw new Error('Should not redirect.');
            case AuthenticationResultStatus.Success:
                await navigateToReturnUrl(getReturnUrl(result.state));
                break;
            case AuthenticationResultStatus.Fail:
                setMessage(result.message);
                break;
            default:
                throw new Error(`Invalid authentication result status '${result.status}'.`);
        }
    };

    const getReturnUrl = (state?: any): string => {
        const params = new URLSearchParams(window.location.search);
        const fromQuery = params.get(QueryParameterNames.ReturnUrl);
        if (fromQuery && !fromQuery.startsWith(`${window.location.origin}/`)) {
            throw new Error("Invalid return url. The return url needs to have the same origin as the current page.");
        }
        return (state && state.returnUrl) || fromQuery || `${window.location.origin}`;
    };

    const redirectToRegister = () => {
        redirectToApiAuthorizationPath(`${ApplicationPaths.IdentityRegisterPath}?${QueryParameterNames.ReturnUrl}=${encodeURI(ApplicationPaths.Login)}`);
    };

    const redirectToProfile = () => {
        redirectToApiAuthorizationPath(ApplicationPaths.IdentityManagePath);
    };

    const redirectToApiAuthorizationPath = (apiAuthorizationPath: string) => {
        const redirectUrl = `${window.location.origin}/${apiAuthorizationPath}`;
        window.location.replace(redirectUrl);
    };

    const navigateToReturnUrl = async (returnUrl: string) => {
        window.location.replace(returnUrl);
    };

    if (!!message) {
        return <div>{message}</div>;
    } else {
        const action = props.action;
        switch (action) {
            case LoginActions.Login:
                return (<div>Logging in...</div>);
            case LoginActions.LoginCallback:
                return (<div>Processing login callback...</div>);
            case LoginActions.Profile:
            case LoginActions.Register:
                return (<div></div>);
            default:
                throw new Error(`Invalid action '${action}'`);
        }
    }
};

export default Login;
