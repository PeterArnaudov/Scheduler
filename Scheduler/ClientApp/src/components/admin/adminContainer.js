import { Route, Routes } from "react-router-dom";
import AdminMenu from "./adminMenu";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
var AdminContainer = function () {
    var navigate = useNavigate();
    var user = useAuth().user;
    useEffect(function () {
        if (!user) {
            navigate('/Authentication/Login');
            return;
        }
        if (!(user === null || user === void 0 ? void 0 : user.isAdmin)) {
            navigate('/');
            return;
        }
    }, [user, navigate]);
    return (React.createElement(Routes, null,
        React.createElement(Route, { path: '/', element: React.createElement(AdminMenu, null) })));
};
export default AdminContainer;
//# sourceMappingURL=adminContainer.js.map