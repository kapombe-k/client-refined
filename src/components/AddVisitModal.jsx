'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function AddVisitModal({ patientId, patientName, isOpen, onClose, onVisitAdded }) {
  const [formData, setFormData] = useState({
    date: '',
    summary: '',
    procedure_details: '',
    amount_paid: '',
    balance: '',
    doctor_id: '',
    patient_id: patientId || '',
  });

  // Dummy doctors data
  const doctors = [
    { id: 1, name: 'Dr. Sarah Smith' },
    { id: 2, name: 'Dr. Michael Johnson' },
    { id: 3, name: 'Dr. Emily Davis' },
    { id: 4, name: 'Dr. Robert Lee' },
  ];

  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      setFormData({
        date: '',
        summary: '',
        procedure_details: '',
        amount_paid: '',
        balance: '',
        doctor_id: '',
        patient_id: patientId || '',
      });
    }
  }, [isOpen, patientId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create new visit object
    const newVisit = {
      id: Date.now(), // Simple ID generation for demo
      patient_id: parseInt(formData.patient_id),
      patient_name: patientName,
      doctor_id: parseInt(formData.doctor_id),
      doctor_name: doctors.find(d => d.id === parseInt(formData.doctor_id))?.name || '',
      date: formData.date,
      summary: formData.summary,
      procedure_details: formData.procedure_details,
      amount_paid: parseFloat(formData.amount_paid) || 0,
      balance: parseFloat(formData.balance) || 0,
      prescriptions: [], // Empty for new visits
    };

    // Call the callback to add the visit
    if (onVisitAdded) {
      onVisitAdded(newVisit);
    }

    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

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
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add Visit for {patientName}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Record a new patient visit
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - Compact Fields */}
          <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 p-4 space-y-4 overflow-y-auto">
            {/* Patient Info (Read-only) */}
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
                Patient Information
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p><strong>Name:</strong> {patientName}</p>
                <p><strong>ID:</strong> {patientId}</p>
              </div>
            </div>

            {/* Visit Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Visit Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Doctor Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Doctor *
              </label>
              <select
                name="doctor_id"
                value={formData.doctor_id}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount Paid */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Amount Paid
              </label>
              <input
                type="number"
                name="amount_paid"
                value={formData.amount_paid}
                onChange={handleInputChange}
                placeholder="0.00"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Outstanding Balance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Outstanding Balance
              </label>
              <input
                type="number"
                name="balance"
                value={formData.balance}
                onChange={handleInputChange}
                placeholder="0.00"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Cancel Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={onClose}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Right Side - Main Content */}
          <div className="flex-1 p-4 overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Visit Summary */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Visit Summary *
                </label>
                <input
                  type="text"
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                  placeholder="Brief summary of the visit"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Procedure Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Procedure Details *
                </label>
                <textarea
                  name="procedure_details"
                  value={formData.procedure_details}
                  onChange={handleInputChange}
                  placeholder="Detailed description of procedures performed during the visit"
                  required
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-vertical"
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  Add Visit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}