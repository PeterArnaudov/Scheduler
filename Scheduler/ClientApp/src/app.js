import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './appRoutes';
import AuthorizeRoute from './components/api-authorization/authorizeRoute';
import { AuthProvider } from './contexts/authContext';
import Layout from './components/layout';
import './custom.css';
import { ToastContainer } from 'react-toastify';

const App = () => {

    return (
        <AuthProvider>
            <Layout>
                <ToastContainer />
                <Routes>
                    {AppRoutes.map((route, index) => {
                        const { element, requireAuth, ...rest } = route;
                        return (
                            <Route
                                key={index}
                                {...rest}
                                element={
                                    requireAuth ? <AuthorizeRoute {...rest} element={element} /> : element
                                }
                            />
                        );
                    })}
                </Routes>
            </Layout>
        </AuthProvider>
    );
};

export default App;
