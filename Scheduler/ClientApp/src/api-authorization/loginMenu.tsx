import React, { useState, useEffect, Fragment, FC } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import authService from './authorizeService';
import { ApplicationPaths } from './apiAuthorizationConstants';

interface LogoutState {
    local: boolean
};

const LoginMenu: FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        const populateState = async () => {
            const [authStatus, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()]);
            setIsAuthenticated(authStatus);
            setUserName(user && user.name);
        };

        const subscription = authService.subscribe(() => populateState());
        populateState();

        return () => {
            authService.unsubscribe(subscription);
        };
    }, []);

    const authenticatedView = (profilePath: string, logoutPath: string, logoutState: LogoutState) => (
        <Fragment>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={profilePath}>Профил</NavLink>
            </NavItem>
            <NavItem>
                <NavLink replace tag={Link} className="text-dark" to={logoutPath} state={logoutState}>Излез</NavLink>
            </NavItem>
        </Fragment>
    );

    const anonymousView = (registerPath : string, loginPath : string) => (
        <Fragment>
            {/* <NavItem>
                <NavLink tag={Link} className="text-dark" to={registerPath}>Регистрирай се</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={loginPath}>Влез</NavLink>
            </NavItem> */}
        </Fragment>
    );

    if (!isAuthenticated) {
        const registerPath = `${ApplicationPaths.Register}`;
        const loginPath = `${ApplicationPaths.Login}`;
        return anonymousView(registerPath, loginPath);
    } else {
        const profilePath = `${ApplicationPaths.Profile}`;
        const logoutPath = `${ApplicationPaths.LogOut}`;
        const logoutState = { local: true };
        return authenticatedView(profilePath, logoutPath, logoutState);
    }
};

export default LoginMenu;
