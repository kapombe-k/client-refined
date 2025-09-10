import React from 'react';

const ChartCard = ({ title, children }) => (
    <div className="bg-background p-6 rounded-lg border border-border shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>
        {children}
    </div>
);

const BarChart = ({ data, color }) => (
    <div className="space-y-2">
        {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
                <div className="w-20 text-sm text-muted-foreground">{item.label}</div>
                <div className="flex-1 bg-muted rounded-full h-4">
                    <div
                        className={`h-4 rounded-full ${color}`}
                        style={{ width: `${item.value}%` }}
                    ></div>
                </div>
                <div className="w-12 text-sm text-muted-foreground text-right">{item.value}%</div>
            </div>
        ))}
    </div>
);

const PieChart = ({ data }) => (
    <div className="flex flex-wrap justify-center gap-4">
        {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                <span className="text-sm text-muted-foreground">{item.label}: {item.value}%</span>
            </div>
        ))}
    </div>
);

const Charts = () => {
    const attendanceData = [
        { label: 'Mon', value: 85 },
        { label: 'Tue', value: 92 },
        { label: 'Wed', value: 78 },
        { label: 'Thu', value: 95 },
        { label: 'Fri', value: 88 }
    ];

    const treatmentData = [
        { label: 'Cleaning', value: 35, color: 'bg-blue-500' },
        { label: 'Filling', value: 25, color: 'bg-green-500' },
        { label: 'Extraction', value: 20, color: 'bg-red-500' },
        { label: 'Checkup', value: 20, color: 'bg-yellow-500' }
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Weekly Attendance">
                <BarChart data={attendanceData} color="bg-primary" />
            </ChartCard>

            <ChartCard title="Treatment Types">
                <PieChart data={treatmentData} />
            </ChartCard>
        </div>
    );
};

export default Charts;