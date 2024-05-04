import React, { useState } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import LoginMenu from '../api-authorization/loginMenu';
import './navMenu.css';
import { useAuth } from '../contexts/authContext';
var NavMenu = function () {
    var _a = useState(true), collapsed = _a[0], setCollapsed = _a[1];
    var user = useAuth().user;
    var toggleNavbar = function () {
        setCollapsed(!collapsed);
    };
    return (React.createElement("header", null,
        React.createElement(Navbar, { className: "navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3", container: true, light: true },
            React.createElement(NavbarBrand, { tag: Link, to: "/" }, "Scheduler"),
            React.createElement(NavbarToggler, { onClick: toggleNavbar, className: "mr-2" }),
            React.createElement(Collapse, { className: "d-sm-inline-flex flex-sm-row-reverse", isOpen: !collapsed, navbar: true },
                React.createElement("ul", { className: "navbar-nav flex-grow" },
                    React.createElement(NavItem, null,
                        React.createElement(NavLink, { tag: Link, className: "text-dark", to: "/clinics" }, "\u041A\u043B\u0438\u043D\u0438\u043A\u0438")),
                    (user === null || user === void 0 ? void 0 : user.isAdmin) &&
                        React.createElement(NavItem, null,
                            React.createElement(NavLink, { tag: Link, className: "text-dark", to: "/admin" }, "\u0410\u0434\u043C\u0438\u043D")),
                    React.createElement(LoginMenu, null))))));
};
export default NavMenu;
//# sourceMappingURL=navMenu.js.map