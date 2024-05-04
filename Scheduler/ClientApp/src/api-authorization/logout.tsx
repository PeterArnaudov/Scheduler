import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import authService, { AuthenticationResultStatus } from './authorizeService';
import { LogoutActions, QueryParameterNames, ApplicationPaths } from './apiAuthorizationConstants';

interface LogoutProps {
    action: string;
}

const Logout: React.FC<LogoutProps> = (props) => {
    const [message, setMessage] = useState<string | undefined>(undefined);
    const [isReady, setIsReady] = useState<boolean>(false);
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const action = props.action;

        const logout = async (returnUrl: string) => {
            const state = { returnUrl };
            const isauthenticated = await authService.isAuthenticated();
            if (isauthenticated) {
                const result = await authService.signOut(state);
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
                        throw new Error("Invalid authentication result status.");
                }
            } else {
                setMessage("You successfully logged out!");
            }
        };

        const processLogoutCallback = async () => {
            const url = window.location.href;
            const result = await authService.completeSignOut(url);
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
                    throw new Error("Invalid authentication result status.");
            }
        };

        const populateAuthenticationState = async () => {
            const authenticated = await authService.isAuthenticated();
            setAuthenticated(authenticated);
            setIsReady(true);
        };

        switch (action) {
            case LogoutActions.Logout:
                if (!!window.history.state.usr.local) {
                    logout(getReturnUrl());
                } else {
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
                throw new Error(`Invalid action '${action}'`);
        }

        populateAuthenticationState();
    }, [props.action, navigate]);

    const getReturnUrl = (state?: any): string => {
        const params = new URLSearchParams(window.location.search);
        const fromQuery = params.get(QueryParameterNames.ReturnUrl);
        if (fromQuery && !fromQuery.startsWith(`${window.location.origin}/`)) {
            throw new Error("Invalid return url. The return url needs to have the same origin as the current page.");
        }
        return (state && state.returnUrl) || fromQuery || `${window.location.origin}${ApplicationPaths.LoggedOut}`;
    };

    const navigateToReturnUrl = async (returnUrl: string) => {
        return window.location.replace(returnUrl);
    };

    if (!isReady) {
        return <div></div>;
    }

    if (!!message) {
        return <div>{message}</div>;
    } else {
        const action = props.action;
        switch (action) {
            case LogoutActions.Logout:
                return (<div>Отписване...</div>);
            case LogoutActions.LogoutCallback:
                return (<div>Обработва се обратно извикване при отписване...</div>);
            case LogoutActions.LoggedOut:
                return (<div>{message}</div>);
            default:
                throw new Error(`Invalid action '${action}'`);
        }
    }
};

export default Logout;
