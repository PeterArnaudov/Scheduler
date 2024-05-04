import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { ApplicationPaths, QueryParameterNames } from './apiAuthorizationConstants';
import authService from './authorizeService';

interface AuthorizeRouteProps {
    path: string;
    element: JSX.Element;
}

const AuthorizeRoute: React.FC<AuthorizeRouteProps> = (props) => {
    const [ready, setReady] = useState<boolean>(false);
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const populateAuthenticationState = async () => {
            const isAuthenticated = await authService.isAuthenticated();
            setAuthenticated(isAuthenticated);
            setReady(true);
        };

        const authenticationChanged = async () => {
            setReady(false);
            setAuthenticated(false);
            await populateAuthenticationState();
        };

        const subscription = authService.subscribe(() => authenticationChanged());
        populateAuthenticationState();

        return () => {
            authService.unsubscribe(subscription);
        };
    }, []);

    if (!ready) {
        return <div></div>;
    }

    const link = document.createElement("a");
    link.href = props.path;
    const returnUrl = `${link.protocol}//${link.host}${link.pathname}${link.search}${link.hash}`;
    const redirectUrl = `${ApplicationPaths.Login}?${QueryParameterNames.ReturnUrl}=${encodeURIComponent(returnUrl)}`;

    return authenticated ? props.element : <Navigate replace to={redirectUrl} />;
};

export default AuthorizeRoute;
