import React, { useState } from 'react';
import DataTable from '../components/ui/Datatable';
import EnhancedSearchForm from '../components/EnhancedSearchForm';
import Modal from '../components/ui/modal';
import PatientQueuePanel from '../components/PatientQueuePanel';
import PatientList from '../components/PatientList';
import SideDrawer from '../components/SideDrawer';

const Patients = () => {
    const [searchParams, setSearchParams] = useState({});
    const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showDrawer, setShowDrawer] = useState(false);

    const handleSearch = (params) => {
        setSearchParams(params);
    };

    const handlePatientSelect = (patient) => {
        setSelectedPatient(patient);
        setShowDrawer(true);
    };

    const toggleViewMode = () => {
        setViewMode(viewMode === 'table' ? 'cards' : 'table');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Patients</h2>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">View:</span>
                    <button
                        onClick={toggleViewMode}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                            viewMode === 'table'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                    >
                        Table
                    </button>
                    <button
                        onClick={toggleViewMode}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                            viewMode === 'cards'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                    >
                        Cards
                    </button>
                </div>
            </div>

            {/* Enhanced Search + Filters */}
            <EnhancedSearchForm resource="patients" onSearch={handleSearch} />

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Patient Queue Panel - Sidebar */}
                <div className="lg:col-span-1">
                    <PatientQueuePanel onPatientSelect={handlePatientSelect} />
                </div>

                {/* Main Content - Table or Cards */}
                <div className="lg:col-span-3">
                    {viewMode === 'table' ? (
                        <DataTable resource="patients" searchParams={searchParams} />
                    ) : (
                        <PatientList
                            searchParams={searchParams}
                            onPatientSelect={handlePatientSelect}
                            viewMode="cards"
                        />
                    )}
                </div>
            </div>

            {/* Modals for CRUD operations */}
            <Modal resource="patients" operation="create" />
            <Modal resource="patients" operation="update" initialData={selectedPatient} id={selectedPatient?.id} />
            <Modal resource="patients" operation="delete" id={selectedPatient?.id} />

            {/* Side Drawer for Quick Preview */}
            {showDrawer && selectedPatient && (
                <SideDrawer
                    patient={selectedPatient}
                    onClose={() => setShowDrawer(false)}
                />
            )}
        </div>
    );
};

export default Patients;
