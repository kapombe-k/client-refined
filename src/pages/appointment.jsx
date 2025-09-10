import React, { useState } from 'react';
import EnhancedAppointmentSearchForm from '../components/EnhancedAppointmentSearchForm';
import AppointmentFilters from '../components/AppointmentFilters';
import Calendar from '../components/Calendar';
import AppointmentList from '../components/AppointmentList';
import AppointmentDrawer from '../components/AppointmentDrawer';
import Modal from '../components/ui/modal';
import { Calendar as CalendarIcon, List, Plus, Download } from 'lucide-react';

const Appointments = () => {
    const [searchParams, setSearchParams] = useState({});
    const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'list'
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [showDrawer, setShowDrawer] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('create');

    const handleSearch = (params) => {
        setSearchParams(params);
    };

    const handleAppointmentSelect = (appointment) => {
        setSelectedAppointment(appointment);
        setShowDrawer(true);
    };

    const handleAddAppointment = () => {
        setSelectedAppointment(null);
        setModalType('create');
        setShowModal(true);
    };

    const handleEditAppointment = (appointment) => {
        setSelectedAppointment(appointment);
        setModalType('update');
        setShowModal(true);
        setShowDrawer(false);
    };

    const toggleViewMode = () => {
        setViewMode(viewMode === 'calendar' ? 'list' : 'calendar');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Appointments & Scheduling</h2>
                    <p className="text-sm text-muted-foreground">Manage patient appointments and schedules</p>
                </div>

                <div className="flex items-center gap-3">
                    {/* View Toggle */}
                    <div className="flex items-center bg-muted rounded-lg p-1">
                        <button
                            onClick={() => setViewMode('calendar')}
                            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                viewMode === 'calendar'
                                    ? 'bg-background text-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            <CalendarIcon className="w-4 h-4" />
                            Calendar
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                viewMode === 'list'
                                    ? 'bg-background text-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            <List className="w-4 h-4" />
                            List
                        </button>
                    </div>

                    {/* Action Buttons */}
                    <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                    <button
                        onClick={handleAddAppointment}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Appointment
                    </button>
                </div>
            </div>

            {/* Enhanced Search */}
            <EnhancedAppointmentSearchForm resource="appointments" onSearch={handleSearch} />

            {/* Filters */}
            <AppointmentFilters onFiltersChange={(filters) => {
                // Merge filters with search params
                handleSearch({ ...searchParams, ...filters });
            }} />

            {/* Main Content */}
            <div className="bg-background border border-border rounded-lg shadow-sm">
                {viewMode === 'calendar' ? (
                    <Calendar onAppointmentSelect={handleAppointmentSelect} />
                ) : (
                    <AppointmentList
                        onAppointmentSelect={handleAppointmentSelect}
                        searchParams={searchParams}
                    />
                )}
            </div>

            {/* Appointment Drawer */}
            {showDrawer && selectedAppointment && (
                <AppointmentDrawer
                    appointment={selectedAppointment}
                    onClose={() => setShowDrawer(false)}
                    onEdit={handleEditAppointment}
                />
            )}

            {/* Modals */}
            {showModal && (
                <Modal
                    resource="appointments"
                    operation={modalType}
                    initialData={selectedAppointment}
                    id={selectedAppointment?.id}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default Appointments;
