'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Calendar, DollarSign, User, Phone, Mail, MapPin, CreditCard, Stethoscope, Pill, Plus } from 'lucide-react';
import AddVisitModal from './AddVisitModal';

export default function PatientProfileModal({ patientId, isOpen, onClose }) {
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddVisitModal, setShowAddVisitModal] = useState(false);

  // Mock patient data - in real app this would come from API
  const mockPatients = {
    1: {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      dateOfBirth: '1985-05-15',
      address: '123 Main St, Anytown, USA',
      insuranceId: 'INS123456789',
      emergencyContact: {
        name: 'Jane Doe',
        phone: '+1 (555) 987-6543',
        relationship: 'Spouse'
      },
      medicalHistory: 'No known allergies. Previous root canal treatment.',
      totalBalance: 150.00,
      lastVisit: '2024-01-22'
    },
    2: {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+1 (555) 234-5678',
      dateOfBirth: '1990-08-22',
      address: '456 Oak Ave, Somewhere, USA',
      insuranceId: 'INS987654321',
      emergencyContact: {
        name: 'Bob Smith',
        phone: '+1 (555) 876-5432',
        relationship: 'Husband'
      },
      medicalHistory: 'Mild penicillin allergy. Regular cleanings.',
      totalBalance: 0.00,
      lastVisit: '2024-01-18'
    },
    3: {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob.johnson@email.com',
      phone: '+1 (555) 345-6789',
      dateOfBirth: '1978-03-10',
      address: '789 Pine Rd, Elsewhere, USA',
      insuranceId: 'INS456789123',
      emergencyContact: {
        name: 'Alice Johnson',
        phone: '+1 (555) 765-4321',
        relationship: 'Wife'
      },
      medicalHistory: 'Hypertension. Requires dental prophylaxis.',
      totalBalance: 300.00,
      lastVisit: '2024-01-20'
    }
  };

  // Mock visits data
  const mockVisits = {
    1: [
      {
        id: 1,
        date: '2024-01-22',
        doctor: 'Dr. Emily Davis',
        summary: 'Follow-up visit',
        details: 'Post-treatment check, oral hygiene instructions provided. Patient showing good progress.',
        amountPaid: 75.00,
        prescriptions: ['Amoxicillin 500mg - 10 days', 'Ibuprofen 400mg - as needed']
      },
      {
        id: 4,
        date: '2024-01-15',
        doctor: 'Dr. Sarah Smith',
        summary: 'Routine checkup and cleaning',
        details: 'Professional dental cleaning performed. Fluoride treatment applied. Oral examination completed.',
        amountPaid: 150.00,
        prescriptions: []
      }
    ],
    2: [
      {
        id: 2,
        date: '2024-01-18',
        doctor: 'Dr. Michael Johnson',
        summary: 'Cavity filling',
        details: 'Composite filling placed in molar. Local anesthesia used. Patient tolerated procedure well.',
        amountPaid: 200.00,
        prescriptions: ['Ibuprofen 400mg - 5 days']
      }
    ],
    3: [
      {
        id: 3,
        date: '2024-01-20',
        doctor: 'Dr. Sarah Smith',
        summary: 'Root canal consultation',
        details: 'Initial consultation for root canal procedure. X-rays taken and reviewed. Treatment plan discussed.',
        amountPaid: 100.00,
        prescriptions: []
      }
    ]
  };

  useEffect(() => {
    if (isOpen && patientId) {
      // Load patient data
      setPatient(mockPatients[patientId] || null);
      setVisits(mockVisits[patientId] || []);
      setLoading(false);
    }
  }, [isOpen, patientId]);

  const handleAction = (action) => {
    // Close the modal first
    onClose();

    // Navigate to the appropriate page based on action
    switch (action) {
      case 'billings':
        navigate('/billing');
        break;
      case 'appointments':
        navigate('/appointments');
        break;
      case 'doctors':
        navigate('/doctors');
        break;
      case 'prescriptions':
        navigate('/visits'); // Prescriptions are part of visits
        break;
      default:
        console.log(`Unknown action: ${action}`);
    }
  };

  const handleAddVisit = () => {
    setShowAddVisitModal(true);
  };

  const handleVisitAdded = (newVisit) => {
    // Add the new visit to the visits list and sort by date (newest first)
    setVisits(prevVisits => [newVisit, ...prevVisits].sort((a, b) => new Date(b.date) - new Date(a.date)));
  };

  if (!isOpen || !patient) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-[65vw] max-h-[85vh] bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {patient.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Patient ID: {patient.id}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleAddVisit}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Visit</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - Patient Info */}
          <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto">
            {/* Patient Details */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">{patient.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">{patient.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">
                  Born: {new Date(patient.dateOfBirth).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">{patient.address}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CreditCard className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">{patient.insuranceId}</span>
              </div>
            </div>

            {/* Balance */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    Outstanding Balance
                  </span>
                </div>
                <span className={`text-lg font-semibold ${
                  patient.totalBalance > 0
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-green-600 dark:text-green-400'
                }`}>
                  ${patient.totalBalance.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                Emergency Contact
              </h4>
              <div className="text-sm text-blue-700 dark:text-blue-300">
                <p className="font-medium">{patient.emergencyContact.name}</p>
                <p>{patient.emergencyContact.phone}</p>
                <p className="text-xs opacity-75">{patient.emergencyContact.relationship}</p>
              </div>
            </div>

            {/* Medical History */}
            <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
                Medical History
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {patient.medicalHistory}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => handleAction('billings')}
                className="w-full flex items-center space-x-2 px-4 py-2 text-left text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <DollarSign className="w-4 h-4" />
                <span>View Billings</span>
              </button>
              <button
                onClick={() => handleAction('appointments')}
                className="w-full flex items-center space-x-2 px-4 py-2 text-left text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>View Appointments</span>
              </button>
              <button
                onClick={() => handleAction('doctors')}
                className="w-full flex items-center space-x-2 px-4 py-2 text-left text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Previous Doctors</span>
              </button>
              <button
                onClick={() => handleAction('prescriptions')}
                className="w-full flex items-center space-x-2 px-4 py-2 text-left text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <Pill className="w-4 h-4" />
                <span>View Prescriptions</span>
              </button>
            </div>
          </div>

          {/* Right Side - Visit Timeline */}
          <div className="flex-1 p-4 overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Visit History
            </h3>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : visits.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">No visits recorded yet</p>
              </div>
            ) : (
              <div className="space-y-6">
                {visits
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((visit, index) => (
                    <div key={visit.id} className="relative">
                      {/* Timeline line */}
                      {index < visits.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-full bg-gray-200 dark:bg-gray-700"></div>
                      )}

                      {/* Timeline dot */}
                      <div className="absolute left-4 top-6 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-800"></div>

                      {/* Visit card */}
                      <div className="ml-12 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {visit.summary}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {new Date(visit.date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              ${visit.amountPaid.toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {visit.doctor}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                          {visit.details}
                        </p>

                        {visit.prescriptions && visit.prescriptions.length > 0 && (
                          <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                            <h5 className="text-xs font-medium text-gray-800 dark:text-gray-200 mb-2 flex items-center">
                              <Pill className="w-3 h-3 mr-1" />
                              Prescriptions
                            </h5>
                            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                              {visit.prescriptions.map((prescription, idx) => (
                                <li key={idx} className="flex items-center">
                                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                                  {prescription}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Visit Modal */}
      <AddVisitModal
        patientId={patientId}
        patientName={patient?.name}
        isOpen={showAddVisitModal}
        onClose={() => setShowAddVisitModal(false)}
        onVisitAdded={handleVisitAdded}
      />
    </div>
  );
}