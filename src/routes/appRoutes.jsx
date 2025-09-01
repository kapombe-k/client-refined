import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import Patients from '../pages/patients';
import Appointments from '../pages/appointment';
import Inventory from '../pages/inventory';
import Billing from '../pages/billing';
import Analytics from '../pages/analytics';
import Login from '../pages/login';
import Register from '../pages/register';
import PrivateRoute from './privateRoutes';

const AppRoutes = () => (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/analytics" element={<Analytics />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
);

export default AppRoutes;
