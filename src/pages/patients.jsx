'use client';

import { useEffect, useState } from 'react';
import { useAuthContext } from '../contexts/authcontext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getPatients, deletePatient } from '../api-calls/patients';
import PatientProfileModal from '../components/PatientProfileModal';
import AddPatientModal from '../components/AddPatientModal';

export default function PatientsPage() {
  const { isAuthenticated, loading } = useAuthContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [patients, setPatients] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);


  useEffect(() => {
    // Use dummy data instead of API calls to prevent authentication issues
    setPatients([
      { id: 1, name: 'John Doe', email: 'john@example.com', phone: '555-0101', dateOfBirth: '1985-05-15', lastVisit: '2024-01-15' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '555-0102', dateOfBirth: '1990-08-22', lastVisit: '2024-01-20' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '555-0103', dateOfBirth: '1978-03-10', lastVisit: '2024-01-18' },
      { id: 4, name: 'Alice Brown', email: 'alice@example.com', phone: '555-0104', dateOfBirth: '1982-11-05', lastVisit: '2024-01-22' },
      { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', phone: '555-0105', dateOfBirth: '1975-07-18', lastVisit: '2024-01-19' },
    ]);
    setLoadingPatients(false);

    if (searchParams.get('action') === 'new') {
      setShowModal(true);
    }
  }, [searchParams]);

  const handleAddPatient = () => {
    setSelectedPatient(null);
    setShowModal(true);
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const handleViewProfile = (patientId) => {
    setSelectedPatientId(patientId);
    setShowProfileModal(true);
  };

  const handlePatientAdded = (newPatient) => {
    setPatients(prevPatients => [...prevPatients, newPatient]);
  };

  const handleDeletePatient = async (id) => {
    if (confirm('Are you sure you want to delete this patient?')) {
      try {
        await deletePatient(id);
        loadPatients();
      } catch (error) {
        console.error('Failed to delete patient:', error);
      }
    }
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Patients</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage patient records and information
          </p>
        </div>
        <button
          onClick={handleAddPatient}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Patient
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <input
          type="text"
          placeholder="Search patients by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Patients Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {loadingPatients ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date of Birth
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Last Visit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {patient.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {patient.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {patient.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {patient.dateOfBirth}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {patient.lastVisit || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleEditPatient(patient)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleViewProfile(patient.id)}
                        className="text-green-600 hover:text-green-800 dark:text-green-400 mr-3"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={() => handleDeletePatient(patient.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Patient Modal */}
      {showModal && (
        <AddPatientModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onPatientAdded={handlePatientAdded}
        />
      )}

      {/* Patient Profile Modal */}
      <PatientProfileModal
        patientId={selectedPatientId}
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </div>
  );
}

