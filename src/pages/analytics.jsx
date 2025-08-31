import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const sampleData = [
    { name: 'Jan', visits: 40 },
    { name: 'Feb', visits: 55 },
    { name: 'Mar', visits: 60 },
    { name: 'Apr', visits: 80 },
];

const Analytics = () => (
    <DashboardLayout>
        <h2 className="text-xl font-bold mb-4">Analytics</h2>
        <div className="bg-white p-6 rounded shadow">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sampleData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="visits" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </DashboardLayout>
);

export default Analytics;
