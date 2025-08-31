import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api-calls/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // user object should include role
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Try to fetch current user on mount
        axios.get('/auth/me')
            .then(res => setUser(res.data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    const login = async (data) => {
        const res = await axios.post('/auth/login', data);
        setUser(res.data.user);
        navigate('/');
    };

    const logout = async () => {
        await axios.post('/auth/logout');
        setUser(null);
        navigate('/login');
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
