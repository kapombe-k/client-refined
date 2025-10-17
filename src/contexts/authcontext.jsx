import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api-calls/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // user object should include role
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if we have a session cookie by trying to access a protected endpoint
        // For now, just set loading to false - auth will be checked when needed
        setLoading(false);
    }, []);

    const login = async (data) => {
        try {
            console.log('Login attempt with data:', data);
            const res = await API.post('/auth/login', data);
            console.log('Login response:', res);

            // Handle different response structures
            const userData = res.user || res.data?.user || res;
            setUser(userData);
            navigate('/');
            return res;
        } catch (error) {
            console.error('Login error in context:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await API.post('/auth/logout');
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
            // Still clear user state even if logout request fails
            setUser(null);
            navigate('/login');
        }
    };

    const hasRole = (roles) => {
        if (!user || !user.role) return false;
        return Array.isArray(roles) ? roles.includes(user.role) : user.role === roles;
    };

    // Helper functions for role checking
    const isAdmin = () => user?.role === 'admin';
    const isDoctor = () => user?.role === 'doctor';
    const isReceptionist = () => user?.role === 'receptionist';
    const isTechnician = () => user?.role === 'technician';

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            logout,
            isAuthenticated: !!user,
            hasRole,
            isAdmin,
            isDoctor,
            isReceptionist,
            isTechnician
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
