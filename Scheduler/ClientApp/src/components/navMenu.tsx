import React, { FC, useState } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import LoginMenu from '../api-authorization/loginMenu';
import './navMenu.css';
import { useAuth } from '../contexts/authContext';

const NavMenu: FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(true);
    const { user } = useAuth();

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                <NavbarBrand tag={Link} to="/">Scheduler</NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                    <ul className="navbar-nav flex-grow">
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/clinics">Клиники</NavLink>
                        </NavItem>
                        {user?.isAdmin &&
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/admin">Админ</NavLink>
                            </NavItem>}
                        <LoginMenu />
                    </ul>
                </Collapse>
            </Navbar>
        </header>
    );
};

export default NavMenu;
