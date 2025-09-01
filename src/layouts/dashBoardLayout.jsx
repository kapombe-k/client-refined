import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useauth';

import RoleGate from '../components/ui/rolegate';

const Sidebar = () => {
    const { user } = useAuth();
    return (
        <aside className="w-64 bg-sidebar border-sidebar-border border-r min-h-screen p-4">
            <nav>
                <ul className="space-y-2">
                    <li><Link to="/" className="text-sidebar-foreground hover:text-sidebar-foreground/80">Dashboard</Link></li>
                    <RoleGate roles={["admin", "receptionist", "doctor", "patient"]}>
                        <li><Link to="/patients" className="text-sidebar-foreground hover:text-sidebar-foreground/80">Patients</Link></li>
                    </RoleGate>
                    <RoleGate roles={["admin", "receptionist", "doctor", "patient"]}>
                        <li><Link to="/appointments" className="text-sidebar-foreground hover:text-sidebar-foreground/80">Appointments</Link></li>
                    </RoleGate>
                    <RoleGate roles={["admin", "technician"]}>
                        <li><Link to="/inventory" className="text-sidebar-foreground hover:text-sidebar-foreground/80">Inventory</Link></li>
                    </RoleGate>
                    <RoleGate roles={["admin", "receptionist"]}>
                        <li><Link to="/billing" className="text-sidebar-foreground hover:text-sidebar-foreground/80">Billing</Link></li>
                    </RoleGate>
                    <RoleGate roles={["admin"]}>
                        <li><Link to="/analytics" className="text-sidebar-foreground hover:text-sidebar-foreground/80">Analytics</Link></li>
                    </RoleGate>
                </ul>
            </nav>
        </aside>
    );
};

const Topbar = () => {
    const { user, logout } = useAuth();
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-muted/50 border-b border-border">
            <h1 className="text-xl font-bold text-foreground">Dental Clinic Management</h1>
            <div className="flex items-center gap-4">
                <span className="text-foreground">{user?.name || user?.username}</span>
                <button
                    onClick={logout}
                    className="px-3 py-1 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90 transition-colors"
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

const DashboardLayout = () => (
    <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
            <Topbar />
            <main className="p-6 flex-1 bg-muted/20">
                <Outlet />
            </main>
        </div>
    </div>
);

export default DashboardLayout;
