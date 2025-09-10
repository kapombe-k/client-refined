import React from 'react';
import KPICards from '../components/KPICards';
import NextPatientCard from '../components/NextPatientCard';
import Timeline from '../components/Timeline';
import Charts from '../components/Charts';
import RecentActivity from '../components/RecentActivity';
import QuickActions from '../components/QuickActions';

const Dashboard = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Dashboard</h2>

        {/* KPI Cards */}
        <KPICards />

        {/* Next Patient Card and Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <NextPatientCard />
            <Timeline />
        </div>

        {/* Charts */}
        <Charts />

        {/* Recent Activity and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentActivity />
            <QuickActions />
        </div>
    </div>
);

export default Dashboard;
