import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';

const Patients = () => {
    // Example selectedPatient and id for update/delete
    const selectedPatient = { name: 'John Doe' };
    const selectedId = '1';
    return (
        <DashboardLayout>
            <h2 className="text-xl font-bold mb-4">Patients</h2>
            <DataTable resource="patients" />
            <Modal resource="patients" operation="create" />
            <Modal resource="patients" operation="update" initialData={selectedPatient} id={selectedId} />
            <Modal resource="patients" operation="delete" id={selectedId} />
        </DashboardLayout>
    );
};

export default Patients;
