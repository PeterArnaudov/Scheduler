import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../api-authorization/authorizeService';
import { ClaimKeys, Roles } from '../api-authorization/apiAuthorizationConstants';
import { SchedulerUser } from '../models/user';

interface AuthContextType {
    user: SchedulerUser | null;
}

interface AuthContextProps {
    children: React.ReactNode
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
    const [user, setUser] = useState<SchedulerUser | null>(null);

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

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
