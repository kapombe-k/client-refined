import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useauth';
import DashboardLayout from '../layouts/dashBoardLayout';

const PrivateRoute = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? (
        <DashboardLayout>
            <Outlet />
        </DashboardLayout>
    ) : <Navigate to="/login" replace />;
};

export default PrivateRoute;
