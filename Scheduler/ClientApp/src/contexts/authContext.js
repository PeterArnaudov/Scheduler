import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../components/api-authorization/authorizeService';
import { ClaimKeys, Roles } from '../components/api-authorization/apiAuthorizationConstants';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
            const currentUser = await authService.getUser();

            if (currentUser && currentUser[ClaimKeys.Role]) {
                currentUser.isAdmin = currentUser && currentUser[ClaimKeys.Role].includes(Roles.ClinicAdmin);
            }

            setUser(currentUser);
        };

        checkUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};