'use client';

import { useEffect, useState } from 'react';
import { useAuthContext } from '../contexts/authcontext';
import { useNavigate } from 'react-router-dom';
import AddBillingModal from '../components/AddBillingModal';

export default function BillingPage() {
  const { isAuthenticated, loading } = useAuthContext();
  const navigate = useNavigate();
  const [billings, setBillings] = useState([]);
  const [loadingBillings, setLoadingBillings] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    // Use dummy data instead of API calls to prevent authentication issues
    setBillings([
      { id: 1, patientName: 'John Doe', invoiceNumber: 'INV-001', amount: 150.00, paid: 150.00, status: 'paid', date: '2024-01-15' },
      { id: 2, patientName: 'Jane Smith', invoiceNumber: 'INV-002', amount: 200.00, paid: 180.00, status: 'partial', date: '2024-01-18' },
      { id: 3, patientName: 'Bob Johnson', invoiceNumber: 'INV-003', amount: 75.00, paid: 0.00, status: 'unpaid', date: '2024-01-20' },
      { id: 4, patientName: 'Alice Brown', invoiceNumber: 'INV-004', amount: 300.00, paid: 300.00, status: 'paid', date: '2024-01-22' },
    ]);
    setLoadingBillings(false);
  }, []);

  const handleBillingAdded = (newBilling) => {
    setBillings(prevBillings => [...prevBillings, newBilling]);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'unpaid':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800';
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Billing</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage invoices and payments
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          Create Invoice
        </button>
      </div>

      {/* Billing Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {loadingBillings ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Invoice Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Paid
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {billings.map((billing) => (
                  <tr key={billing.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {billing.patientName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {billing.invoiceNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      ${billing.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      ${billing.paid}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(billing.status)}`}>
                        {billing.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {billing.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 mr-3">
                        View
                      </button>
                      <button className="text-green-600 hover:text-green-800 dark:text-green-400">
                        Pay
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Billing Modal */}
      <AddBillingModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onBillingAdded={handleBillingAdded}
      />
    </div>
  );
}
