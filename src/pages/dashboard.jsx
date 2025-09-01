import React from 'react';
import DashboardLayout from '../layouts/dashBoardLayout';

const Dashboard = () => (
    <DashboardLayout>
        <h2 className="text-2xl font-bold mb-4 text-foreground">Welcome to the Dental Clinic Dashboard</h2>
        <p className="text-muted-foreground">Quick stats and overview will appear here.</p>
    </DashboardLayout>
);

export default Dashboard;
