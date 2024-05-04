import { Route, Routes } from "react-router-dom";
import AdminMenu from "./adminMenu";
import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

const AdminContainer: FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            navigate('/Authentication/Login');
            return;
        }
        if (!user?.isAdmin) {
            navigate('/');
            return;
        }
    }, [user, navigate]);

    return (
        <Routes>
            <Route
                path='/'
                element={
                    <AdminMenu />
                }>
            </Route>
        </Routes>
    );
};

export default AdminContainer;