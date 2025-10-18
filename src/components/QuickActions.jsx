import React from 'react';
import { Link } from 'react-router-dom';

const QuickActionButton = ({ to, icon, title, description, color }) => (
    <Link
        to={to}
        className={`block p-4 rounded-lg border-2 border-dashed ${color} hover:bg-accent transition-colors group`}
    >
        <div className="flex items-center space-x-3">
            <div className="text-2xl">{icon}</div>
            <div>
                <h4 className="font-medium text-foreground group-hover:text-accent-foreground">{title}</h4>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
    </Link>
);

const QuickActions = () => {
    const actions = [
        {
            to: "/patients",
            icon: "👤",
            title: "Add Patient",
            description: "Register a new patient",
            color: "border-blue-300 hover:bg-blue-50"
        },
        {
            to: "/appointments",
            icon: "📅",
            title: "Create Appointment",
            description: "Schedule a new visit",
            color: "border-green-300 hover:bg-green-50"
        },
        {
            to: "/inventory",
            icon: "📦",
            title: "Upload Report",
            description: "Add patient documents",
            color: "border-purple-300 hover:bg-purple-50"
        },
        {
            to: "/billing",
            icon: "💳",
            title: "Process Payment",
            description: "Handle billing transactions",
            color: "border-yellow-300 hover:bg-yellow-50"
        }
    ];

    return (
        <div className="bg-background p-6 rounded-lg border border-border shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Actions</h3>
            <div className="space-y-3">
                {actions.map((action, index) => (
                    <QuickActionButton key={index} {...action} />
                ))}
            </div>
        </div>
    );
};

export default QuickActions;