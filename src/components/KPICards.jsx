import React from 'react';

const KPICard = ({ title, value, change, icon, color }) => (
    <div className={`bg-background p-6 rounded-lg border border-border shadow-sm ${color}`}>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-muted-foreground">{title}</p>
                <p className="text-2xl font-bold text-foreground">{value}</p>
                {change && (
                    <p className={`text-sm ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {change}
                    </p>
                )}
            </div>
            <div className={`p-3 rounded-full ${color.replace('border-l-', 'bg-').replace('-500', '-100')}`}>
                {icon}
            </div>
        </div>
    </div>
);

const KPICards = () => {
    const kpis = [
        {
            title: "Patients Today",
            value: "24",
            change: "+12%",
            icon: "👥",
            color: "border-l-blue-500"
        },
        {
            title: "Appointments",
            value: "18",
            change: "+5%",
            icon: "📅",
            color: "border-l-green-500"
        },
        {
            title: "Revenue",
            value: "$2,450",
            change: "+8%",
            icon: "💰",
            color: "border-l-yellow-500"
        },
        {
            title: "Treatments",
            value: "32",
            change: "+15%",
            icon: "🦷",
            color: "border-l-purple-500"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi, index) => (
                <KPICard key={index} {...kpi} />
            ))}
        </div>
    );
};

export default KPICards;