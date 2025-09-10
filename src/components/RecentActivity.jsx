import React from 'react';

const ActivityItem = ({ time, action, user, details }) => (
    <div className="flex items-start space-x-3 py-3 border-b border-border last:border-b-0">
        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
        <div className="flex-1 min-w-0">
            <p className="text-sm text-foreground">
                <span className="font-medium">{user}</span> {action}
            </p>
            {details && <p className="text-sm text-muted-foreground">{details}</p>}
            <p className="text-xs text-muted-foreground">{time}</p>
        </div>
    </div>
);

const RecentActivity = () => {
    const activities = [
        {
            time: "2 minutes ago",
            action: "completed treatment for",
            user: "Dr. Smith",
            details: "Sarah Johnson - Dental Cleaning"
        },
        {
            time: "15 minutes ago",
            action: "scheduled appointment for",
            user: "Reception",
            details: "Mike Davis - Root Canal"
        },
        {
            time: "1 hour ago",
            action: "updated patient record for",
            user: "Dr. Johnson",
            details: "Emma Wilson - Added allergy info"
        },
        {
            time: "2 hours ago",
            action: "processed payment for",
            user: "Admin",
            details: "John Smith - $150.00"
        },
        {
            time: "3 hours ago",
            action: "added new patient",
            user: "Reception",
            details: "David Brown - Initial consultation"
        }
    ];

    return (
        <div className="bg-background p-6 rounded-lg border border-border shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Recent Activity</h3>
            <div className="space-y-1">
                {activities.map((activity, index) => (
                    <ActivityItem key={index} {...activity} />
                ))}
            </div>
        </div>
    );
};

export default RecentActivity;