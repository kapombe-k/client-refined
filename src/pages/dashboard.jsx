import { useEffect, useState } from 'react';
import { useAuthContext } from '../contexts/authcontext';
import { useNavigate } from 'react-router-dom';
import { getDashboardAnalytics } from '../api-calls/analytics';
import { showToast } from '../components/ui/toast';

export default function DashboardPage() {
  const { user, isAuthenticated, loading, isAdmin, isDoctor, isReceptionist, isTechnician } = useAuthContext();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);


  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardStats();
    }
  }, [isAuthenticated]);

  const loadDashboardStats = async () => {
    try {
      // Try to get analytics data from API
      const analyticsData = await getDashboardAnalytics();

      // Set stats based on user role and API response
      if (isAdmin) {
        setStats({
          totalPatients: analyticsData.totalPatients || 0,
          todayAppointments: analyticsData.todayAppointments || 0,
          monthlyRevenue: analyticsData.monthlyRevenue || 0,
          pendingBillings: analyticsData.pendingBillings || 0,
        });
      } else if (isDoctor) {
        setStats({
          todayAppointments: analyticsData.todayAppointments || 0,
          pendingVisits: analyticsData.pendingVisits || 0,
          monthlyEarnings: analyticsData.monthlyEarnings || 0,
          completedTreatments: analyticsData.completedTreatments || 0,
        });
      } else if (isReceptionist) {
        setStats({
          todayAppointments: analyticsData.todayAppointments || 0,
          pendingCheckIns: analyticsData.pendingCheckIns || 0,
          pendingInvoices: analyticsData.pendingInvoices || 0,
          availableDoctors: analyticsData.availableDoctors || 0,
        });
      } else if (isTechnician) {
        setStats({
          inventoryItems: analyticsData.inventoryItems || 0,
          lowStockItems: analyticsData.lowStockItems || 0,
          patientRecords: analyticsData.patientRecords || 0,
          todayTasks: analyticsData.todayTasks || 0,
        });
      } else {
        setStats({
          todayAppointments: analyticsData.todayAppointments || 0,
          pendingTasks: analyticsData.pendingTasks || 0,
          recentActivity: analyticsData.recentActivity || [],
        });
      }
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
      showToast('Failed to load dashboard data. Using default values.', 'error');

      // Fallback to basic stats
      setStats({
        todayAppointments: 0,
        pendingTasks: 0,
        recentActivity: [],
      });
    } finally {
      setLoadingStats(false);
    }
  };

  if (loading || !isAuthenticated) {
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
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Here's what's happening today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isAdmin && (
          <>
            <StatCard
              title="Total Patients"
              value={stats?.totalPatients || '0'}
              icon="👥"
              loading={loadingStats}
            />
            <StatCard
              title="Today's Appointments"
              value={stats?.todayAppointments || '0'}
              icon="📅"
              loading={loadingStats}
            />
            <StatCard
              title="Revenue (This Month)"
              value={`$${stats?.monthlyRevenue || '0'}`}
              icon="💰"
              loading={loadingStats}
            />
            <StatCard
              title="Pending Billings"
              value={stats?.pendingBillings || '0'}
              icon="📄"
              loading={loadingStats}
            />
          </>
        )}

        {isDoctor && (
          <>
            {/* TODO: Replace with API calls */}
            {/* <StatCard title="Today's Appointments" value={stats?.todayAppointments || '0'} icon="📅" />
            <StatCard title="Pending Visits" value={stats?.pendingVisits || '0'} icon="📋" />
            <StatCard title="This Month Earnings" value={`$${stats?.monthlyEarnings || '0'}`} icon="💰" />
            <StatCard title="Completed Treatments" value={stats?.completedTreatments || '0'} icon="✅" /> */}
            <StatCard title="Today's Appointments" value="0" icon="📅" />
            <StatCard title="Pending Visits" value="0" icon="📋" />
            <StatCard title="This Month Earnings" value="$0" icon="💰" />
            <StatCard title="Completed Treatments" value="0" icon="✅" />
          </>
        )}

        {isReceptionist && (
          <>
            {/* TODO: Replace with API calls */}
            {/* <StatCard title="Today's Appointments" value={stats?.todayAppointments || '0'} icon="📅" />
            <StatCard title="Pending Check-ins" value={stats?.pendingCheckIns || '0'} icon="⏰" />
            <StatCard title="Pending Invoices" value={stats?.pendingInvoices || '0'} icon="📄" />
            <StatCard title="Available Doctors" value={stats?.availableDoctors || '0'} icon="👨‍⚕️" /> */}
            <StatCard title="Today's Appointments" value="0" icon="📅" />
            <StatCard title="Pending Check-ins" value="0" icon="⏰" />
            <StatCard title="Pending Invoices" value="0" icon="📄" />
            <StatCard title="Available Doctors" value="0" icon="👨‍⚕️" />
          </>
        )}

        {isTechnician && (
          <>
            {/* TODO: Replace with API calls */}
            {/* <StatCard title="Inventory Items" value={stats?.inventoryItems || '0'} icon="📦" />
            <StatCard title="Low Stock Items" value={stats?.lowStockItems || '0'} icon="⚠️" />
            <StatCard title="Patient Records" value={stats?.patientRecords || '0'} icon="📋" />
            <StatCard title="Today's Tasks" value={stats?.todayTasks || '0'} icon="✅" /> */}
            <StatCard title="Inventory Items" value="0" icon="📦" />
            <StatCard title="Low Stock Items" value="0" icon="⚠️" />
            <StatCard title="Patient Records" value="0" icon="📋" />
            <StatCard title="Today's Tasks" value="0" icon="✅" />
          </>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(isAdmin || isReceptionist || isTechnician) && (
            <QuickActionButton
              label="Add Patient"
              icon="➕"
              onClick={() => navigate('/patients?action=new')}
            />
          )}
          {(isAdmin || isReceptionist || isDoctor) && (
            <QuickActionButton
              label="Schedule Appointment"
              icon="📅"
              onClick={() => navigate('/appointments?action=new')}
            />
          )}
          {(isAdmin || isDoctor || isTechnician) && (
            <QuickActionButton
              label="New Visit Record"
              icon="📋"
              onClick={() => navigate('/visits?action=new')}
            />
          )}
          {(isAdmin || isTechnician) && (
            <QuickActionButton
              label="Update Inventory"
              icon="📦"
              onClick={() => navigate('/inventory')}
            />
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h2>
        <div className="space-y-3">
          {stats?.recentActivity && stats.recentActivity.length > 0 ? (
            stats.recentActivity.map((activity, index) => (
              <ActivityItem
                key={index}
                title={activity.title}
                time={activity.time}
                icon={activity.icon}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>No recent activity to display</p>
              <p className="text-sm mt-1">Recent activities will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, loading }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          {loading ? (
            <div className="mt-2 h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          ) : (
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
              {value}
            </p>
          )}
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
}

function QuickActionButton({ label, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
    >
      <span className="text-3xl mb-2">{icon}</span>
      <span className="text-sm font-medium text-gray-900 dark:text-white text-center">
        {label}
      </span>
    </button>
  );
}

function ActivityItem({ title, time, icon }) {
  return (
    <div className="flex items-center space-x-3 py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
      <span className="text-2xl">{icon}</span>
      <div className="flex-1">
        <p className="text-sm text-gray-900 dark:text-white">{title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{time}</p>
      </div>
    </div>
  );
}
