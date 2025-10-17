'use client';

import { useEffect, useState } from 'react';
import { useAuthContext } from '../contexts/authcontext';
import { useNavigate } from 'react-router-dom';
import PatientProfileModal from '../components/PatientProfileModal';

export default function VisitsPage() {
  const { isAuthenticated, loading, isAdmin, user } = useAuthContext();
  const navigate = useNavigate();

  const [visits, setVisits] = useState([]);
  const [filteredVisits, setFilteredVisits] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [loadingVisits, setLoadingVisits] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  // Form state for add/edit modal
  const [visitForm, setVisitForm] = useState({
    date: '',
    summary: '',
    procedure_details: '',
    amount_paid: '',
    balance: '',
    doctor_id: '',
    patient_id: '',
  });

  // Dummy patients for selection
  const patients = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Bob Johnson' },
    { id: 4, name: 'Alice Brown' },
    { id: 5, name: 'Charlie Wilson' },
  ];

  // Dummy doctors for selection
  const doctors = [
    { id: 1, name: 'Dr. Sarah Smith' },
    { id: 2, name: 'Dr. Michael Johnson' },
    { id: 3, name: 'Dr. Emily Davis' },
    { id: 4, name: 'Dr. Robert Lee' },
  ];

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    // Use dummy data instead of API calls to prevent authentication issues
    const dummyVisits = [
      {
        id: 1,
        patient_id: 1,
        patient_name: 'John Doe',
        doctor_id: 1,
        doctor_name: 'Dr. Sarah Smith',
        date: '2024-01-15',
        summary: 'Routine checkup and cleaning',
        procedure_details: 'Professional dental cleaning, fluoride treatment, oral examination',
        amount_paid: 150.00,
        balance: 0.00,
      },
      {
        id: 2,
        patient_id: 2,
        patient_name: 'Jane Smith',
        doctor_id: 2,
        doctor_name: 'Dr. Michael Johnson',
        date: '2024-01-18',
        summary: 'Cavity filling',
        procedure_details: 'Composite filling for molar cavity, local anesthesia',
        amount_paid: 200.00,
        balance: 0.00,
      },
      {
        id: 3,
        patient_id: 3,
        patient_name: 'Bob Johnson',
        doctor_id: 1,
        doctor_name: 'Dr. Sarah Smith',
        date: '2024-01-20',
        summary: 'Root canal consultation',
        procedure_details: 'Initial consultation for root canal procedure, X-rays taken',
        amount_paid: 100.00,
        balance: 150.00,
      },
      {
        id: 4,
        patient_id: 1,
        patient_name: 'John Doe',
        doctor_id: 3,
        doctor_name: 'Dr. Emily Davis',
        date: '2024-01-22',
        summary: 'Follow-up visit',
        procedure_details: 'Post-treatment check, oral hygiene instructions',
        amount_paid: 75.00,
        balance: 0.00,
      },
      {
        id: 5,
        patient_id: 4,
        patient_name: 'Alice Brown',
        doctor_id: 4,
        doctor_name: 'Dr. Robert Lee',
        date: '2024-01-25',
        summary: 'Wisdom tooth extraction',
        procedure_details: 'Surgical extraction of impacted wisdom tooth, sutures placed',
        amount_paid: 300.00,
        balance: 200.00,
      },
    ];

    setVisits(dummyVisits);
    setFilteredVisits(dummyVisits);
    setLoadingVisits(false);
  }, []);

  // Filter visits based on selected patient and search term
  useEffect(() => {
    let filtered = visits;

    if (selectedPatient) {
      filtered = filtered.filter(visit => visit.patient_id === parseInt(selectedPatient));
    }

    if (searchTerm) {
      filtered = filtered.filter(visit =>
        visit.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        visit.doctor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        visit.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredVisits(filtered);
  }, [selectedPatient, searchTerm, visits]);

  const handleAddVisit = () => {
    setModalMode('add');
    setVisitForm({
      date: '',
      summary: '',
      procedure_details: '',
      amount_paid: '',
      balance: '',
      doctor_id: '',
      patient_id: '',
    });
    setShowModal(true);
  };

  const handleEditVisit = (visit) => {
    if (!isAdmin) return;

    setModalMode('edit');
    setSelectedVisit(visit);
    setVisitForm({
      date: visit.date,
      summary: visit.summary,
      procedure_details: visit.procedure_details,
      amount_paid: visit.amount_paid.toString(),
      balance: visit.balance.toString(),
      doctor_id: visit.doctor_id.toString(),
      patient_id: visit.patient_id.toString(),
    });
    setShowModal(true);
  };

  const handleSaveVisit = () => {
    // In a real app, this would make an API call
    if (modalMode === 'add') {
      const newVisit = {
        id: visits.length + 1,
        patient_id: parseInt(visitForm.patient_id),
        patient_name: patients.find(p => p.id === parseInt(visitForm.patient_id))?.name || '',
        doctor_id: parseInt(visitForm.doctor_id),
        doctor_name: doctors.find(d => d.id === parseInt(visitForm.doctor_id))?.name || '',
        date: visitForm.date,
        summary: visitForm.summary,
        procedure_details: visitForm.procedure_details,
        amount_paid: parseFloat(visitForm.amount_paid),
        balance: parseFloat(visitForm.balance),
      };
      setVisits([...visits, newVisit]);
    } else if (modalMode === 'edit' && selectedVisit) {
      const updatedVisits = visits.map(visit =>
        visit.id === selectedVisit.id
          ? {
              ...visit,
              patient_id: parseInt(visitForm.patient_id),
              patient_name: patients.find(p => p.id === parseInt(visitForm.patient_id))?.name || '',
              doctor_id: parseInt(visitForm.doctor_id),
              doctor_name: doctors.find(d => d.id === parseInt(visitForm.doctor_id))?.name || '',
              date: visitForm.date,
              summary: visitForm.summary,
              procedure_details: visitForm.procedure_details,
              amount_paid: parseFloat(visitForm.amount_paid),
              balance: parseFloat(visitForm.balance),
            }
          : visit
      );
      setVisits(updatedVisits);
    }
    setShowModal(false);
  };

  const handleDeleteVisit = (visitId) => {
    if (!isAdmin) return;

    if (window.confirm('Are you sure you want to delete this visit?')) {
      setVisits(visits.filter(visit => visit.id !== visitId));
    }
  };

  const handleViewPatientProfile = (patientId) => {
    setSelectedPatientId(patientId);
    setShowProfileModal(true);
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Patient Visits</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track and manage patient visit records
          </p>
        </div>
        <button
          onClick={handleAddVisit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          Add Visit
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Filter by Patient
            </label>
            <select
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Patients</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Search
            </label>
            <input
              type="text"
              placeholder="Search visits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Visits Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {loadingVisits ? (
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
                    Doctor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Summary
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Amount Paid
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Balance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredVisits.map((visit) => (
                  <tr key={visit.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleViewPatientProfile(visit.patient_id)}
                        className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 hover:underline"
                      >
                        {visit.patient_name}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {visit.doctor_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {new Date(visit.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
                      {visit.summary}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      ${visit.amount_paid}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        visit.balance === 0
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        ${visit.balance}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleEditVisit(visit)}
                        disabled={!isAdmin}
                        className={`mr-2 px-3 py-1 text-xs font-medium rounded ${
                          isAdmin
                            ? 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
                        }`}
                      >
                        Edit
                      </button>
                      {isAdmin && (
                        <button
                          onClick={() => handleDeleteVisit(visit.id)}
                          className="px-3 py-1 text-xs font-medium rounded bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Visit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {modalMode === 'add' ? 'Add New Visit' : 'Edit Visit'}
              </h3>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Patient
                </label>
                <select
                  value={visitForm.patient_id}
                  onChange={(e) => setVisitForm({...visitForm, patient_id: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="">Select Patient</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Doctor
                </label>
                <select
                  value={visitForm.doctor_id}
                  onChange={(e) => setVisitForm({...visitForm, doctor_id: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="">Select Doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={visitForm.date}
                  onChange={(e) => setVisitForm({...visitForm, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Summary
                </label>
                <input
                  type="text"
                  value={visitForm.summary}
                  onChange={(e) => setVisitForm({...visitForm, summary: e.target.value})}
                  placeholder="Brief summary of the visit"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Procedure Details
                </label>
                <textarea
                  value={visitForm.procedure_details}
                  onChange={(e) => setVisitForm({...visitForm, procedure_details: e.target.value})}
                  placeholder="Detailed description of procedures performed"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Amount Paid
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={visitForm.amount_paid}
                    onChange={(e) => setVisitForm({...visitForm, amount_paid: e.target.value})}
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Balance
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={visitForm.balance}
                    onChange={(e) => setVisitForm({...visitForm, balance: e.target.value})}
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveVisit}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                {modalMode === 'add' ? 'Add Visit' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
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


