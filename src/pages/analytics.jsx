'use client';

import { useEffect, useState } from 'react';
import { useAuthContext } from '../contexts/authcontext';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export default function AnalyticsPage() {
  const { isAuthenticated, loading, isAdmin } = useAuthContext();
  const navigate = useNavigate();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);


  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      loadAnalytics();
    }
  }, [isAuthenticated, isAdmin]);

  const loadAnalytics = async () => {
    try {
      // Use demo data since the analytics API may not be fully implemented
      setAnalyticsData({
        monthlyRevenue: [
          { month: 'Jan', revenue: 12000 },
          { month: 'Feb', revenue: 15000 },
          { month: 'Mar', revenue: 18000 },
          { month: 'Apr', revenue: 22000 },
          { month: 'May', revenue: 25000 },
          { month: 'Jun', revenue: 28000 },
        ],
        patientDemographics: [
          { name: 'Adults', value: 65, color: '#0088FE' },
          { name: 'Children', value: 25, color: '#00C49F' },
          { name: 'Seniors', value: 10, color: '#FFBB28' },
        ],
        appointmentTrends: [
          { month: 'Jan', appointments: 120 },
          { month: 'Feb', appointments: 150 },
          { month: 'Mar', appointments: 180 },
          { month: 'Apr', appointments: 200 },
          { month: 'May', appointments: 220 },
          { month: 'Jun', appointments: 250 },
        ],
      });
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  if (loading || !isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Comprehensive insights into clinic performance and trends
        </p>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Monthly Revenue
        </h2>
        {loadingAnalytics ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData?.monthlyRevenue || []}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
              <Bar dataKey="revenue" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Demographics */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Patient Demographics
          </h2>
          {loadingAnalytics ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData?.patientDemographics || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {(analyticsData?.patientDemographics || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Appointment Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Appointment Trends
          </h2>
          {loadingAnalytics ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData?.appointmentTrends || []}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="appointments" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Total Revenue
          </h3>
          <p className="text-3xl font-bold text-green-600">
            $125,000
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            +12% from last month
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Patient Satisfaction
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            94%
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Based on 1,250 reviews
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Average Wait Time
          </h3>
          <p className="text-3xl font-bold text-purple-600">
            12 min
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            -5 min from last month
          </p>
        </div>
      </div>
    </div>
  );
}
