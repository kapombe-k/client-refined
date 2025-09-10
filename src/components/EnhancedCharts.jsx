import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Users, Calendar, Activity } from 'lucide-react';

const ChartCard = ({ title, subtitle, children, trend, trendValue }) => (
    <div className="bg-background border border-border rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
            <div>
                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            </div>
            {trend && (
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                    {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {trendValue}
                </div>
            )}
        </div>
        {children}
    </div>
);

const KPICard = ({ title, value, change, icon: Icon, color }) => (
    <div className={`bg-background border border-border rounded-lg shadow-sm p-6`}>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-muted-foreground">{title}</p>
                <p className="text-2xl font-bold text-foreground">{value}</p>
                {change && (
                    <p className={`text-sm flex items-center gap-1 ${
                        change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                        {change.startsWith('+') ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {change}
                    </p>
                )}
            </div>
            <div className={`p-3 rounded-full ${color}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
        </div>
    </div>
);

const EnhancedCharts = () => {
    // Revenue data
    const revenueData = [
        { month: 'Jan', revenue: 45000, patients: 120, appointments: 180 },
        { month: 'Feb', revenue: 52000, patients: 135, appointments: 195 },
        { month: 'Mar', revenue: 48000, patients: 125, appointments: 175 },
        { month: 'Apr', revenue: 61000, patients: 155, appointments: 220 },
        { month: 'May', revenue: 55000, patients: 140, appointments: 200 },
        { month: 'Jun', revenue: 67000, patients: 170, appointments: 240 }
    ];

    // Treatment distribution
    const treatmentData = [
        { name: 'Cleaning', value: 35, color: '#3b82f6' },
        { name: 'Filling', value: 25, color: '#10b981' },
        { name: 'Extraction', value: 15, color: '#ef4444' },
        { name: 'Checkup', value: 20, color: '#f59e0b' },
        { name: 'X-Ray', value: 5, color: '#8b5cf6' }
    ];

    // Daily appointments
    const dailyAppointments = [
        { day: 'Mon', appointments: 12, completed: 10 },
        { day: 'Tue', appointments: 15, completed: 14 },
        { day: 'Wed', appointments: 18, completed: 16 },
        { day: 'Thu', appointments: 14, completed: 13 },
        { day: 'Fri', appointments: 16, completed: 15 },
        { day: 'Sat', appointments: 8, completed: 7 },
        { day: 'Sun', appointments: 2, completed: 2 }
    ];

    // Patient satisfaction
    const satisfactionData = [
        { month: 'Jan', satisfaction: 4.2 },
        { month: 'Feb', satisfaction: 4.5 },
        { month: 'Mar', satisfaction: 4.1 },
        { month: 'Apr', satisfaction: 4.6 },
        { month: 'May', satisfaction: 4.4 },
        { month: 'Jun', satisfaction: 4.7 }
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-background border border-border rounded-lg shadow-lg p-3">
                    <p className="font-medium text-foreground">{`${label}`}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {`${entry.dataKey}: ${entry.value}${entry.dataKey === 'revenue' ? '$' : ''}`}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard
                    title="Total Revenue"
                    value="$328K"
                    change="+12.5%"
                    icon={DollarSign}
                    color="bg-green-500"
                />
                <KPICard
                    title="Total Patients"
                    value="845"
                    change="+8.2%"
                    icon={Users}
                    color="bg-blue-500"
                />
                <KPICard
                    title="Appointments"
                    value="1,210"
                    change="+15.3%"
                    icon={Calendar}
                    color="bg-purple-500"
                />
                <KPICard
                    title="Avg Satisfaction"
                    value="4.5"
                    change="+0.3"
                    icon={Activity}
                    color="bg-orange-500"
                />
            </div>

            {/* Main Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Trend */}
                <ChartCard
                    title="Revenue Trend"
                    subtitle="Monthly revenue and patient count"
                    trend="up"
                    trendValue="+12.5%"
                >
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                            <YAxis stroke="hsl(var(--muted-foreground))" />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="hsl(var(--primary))"
                                fill="hsl(var(--primary))"
                                fillOpacity={0.2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartCard>

                {/* Treatment Distribution */}
                <ChartCard
                    title="Treatment Distribution"
                    subtitle="Breakdown by treatment type"
                >
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={treatmentData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                dataKey="value"
                                label={({ name, value }) => `${name}: ${value}%`}
                            >
                                {treatmentData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>

                {/* Daily Appointments */}
                <ChartCard
                    title="Daily Appointments"
                    subtitle="Appointments vs completions by day"
                >
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={dailyAppointments}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                            <YAxis stroke="hsl(var(--muted-foreground))" />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="appointments" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="completed" fill="hsl(var(--primary))" opacity={0.7} radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                {/* Patient Satisfaction */}
                <ChartCard
                    title="Patient Satisfaction"
                    subtitle="Average rating over time"
                    trend="up"
                    trendValue="+0.3"
                >
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={satisfactionData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                            <YAxis domain={[0, 5]} stroke="hsl(var(--muted-foreground))" />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                type="monotone"
                                dataKey="satisfaction"
                                stroke="hsl(var(--primary))"
                                strokeWidth={3}
                                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Top Treatments */}
                <ChartCard title="Top Treatments" subtitle="By frequency">
                    <div className="space-y-3">
                        {treatmentData.slice(0, 5).map((treatment, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: treatment.color }}
                                    ></div>
                                    <span className="text-sm font-medium text-foreground">{treatment.name}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">{treatment.value}%</span>
                            </div>
                        ))}
                    </div>
                </ChartCard>

                {/* Performance Metrics */}
                <ChartCard title="Performance Metrics" subtitle="Key indicators">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Avg Wait Time</span>
                            <span className="text-sm font-medium text-foreground">12 min</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Cancellation Rate</span>
                            <span className="text-sm font-medium text-green-600">3.2%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">No-show Rate</span>
                            <span className="text-sm font-medium text-red-600">5.1%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Patient Retention</span>
                            <span className="text-sm font-medium text-green-600">87.5%</span>
                        </div>
                    </div>
                </ChartCard>

                {/* Recent Activity */}
                <ChartCard title="Recent Activity" subtitle="Last 24 hours">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 p-2 bg-muted/50 rounded">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-foreground">New patient registered</p>
                                <p className="text-xs text-muted-foreground">2 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-2 bg-muted/50 rounded">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-foreground">Appointment completed</p>
                                <p className="text-xs text-muted-foreground">4 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-2 bg-muted/50 rounded">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-foreground">Payment received</p>
                                <p className="text-xs text-muted-foreground">6 hours ago</p>
                            </div>
                        </div>
                    </div>
                </ChartCard>
            </div>
        </div>
    );
};

export default EnhancedCharts;