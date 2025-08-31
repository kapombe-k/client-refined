import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import RoleGate from '../components/RoleGate';

const Sidebar = () => {
    const { user } = useAuth();
    return (
        <aside className="w-64 bg-white border-r min-h-screen p-4">
            <nav>
                <ul className="space-y-2">
                    <li><Link to="/">Dashboard</Link></li>
                    <RoleGate roles={["admin", "receptionist", "doctor", "patient"]}>
                        <li><Link to="/patients">Patients</Link></li>
                    </RoleGate>
                    <RoleGate roles={["admin", "receptionist", "doctor", "patient"]}>
                        <li><Link to="/appointments">Appointments</Link></li>
                    </RoleGate>
                    <RoleGate roles={["admin", "technician"]}>
                        <li><Link to="/inventory">Inventory</Link></li>
                    </RoleGate>
                    <RoleGate roles={["admin", "receptionist"]}>
                        <li><Link to="/billing">Billing</Link></li>
                    </RoleGate>
                    <RoleGate roles={["admin"]}>
                        <li><Link to="/analytics">Analytics</Link></li>
                    </RoleGate>
                </ul>
            </nav>
        </aside>
    );
};

const Topbar = () => {
    const { user, logout } = useAuth();
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-gray-100 border-b">
            <h1 className="text-xl font-bold">Dental Clinic Management</h1>
            <div className="flex items-center gap-4">
                <span>{user?.username}</span>
                <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
            </div>
        </header>
    );
};

const DashboardLayout = () => (
    <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
            <Topbar />
            <main className="p-6 flex-1 bg-gray-50">
                <Outlet />
            </main>
        </div>
    </div>
);

export default DashboardLayout;
