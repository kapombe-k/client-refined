import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api-calls/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // user object should include role
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Try to fetch current user on mount
        API.get('/auth/me')
            .then(res => {
                console.log('Auth check response:', res);
                setUser(res.user || res);
            })
            .catch((err) => {
                console.log('Auth check failed:', err);
                setUser(null);
            })
            .finally(() => setLoading(false));
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

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user, hasRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
