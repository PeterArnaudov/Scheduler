import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './appRoutes';
import AuthorizeRoute from './api-authorization/authorizeRoute';
import { AuthProvider } from './contexts/authContext';
import Layout from './components/layout';
import './custom.css';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
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
                                    requireAuth ? <AuthorizeRoute path={rest.path ?? ""} element={element} /> : element
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
