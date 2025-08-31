import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';

const Appointments = () => {
    const selectedAppointment = { name: 'Dental Checkup' };
    const selectedId = '1';
    return (
        <DashboardLayout>
            <h2 className="text-xl font-bold mb-4">Appointments</h2>
            <DataTable resource="appointments" />
            <Modal resource="appointments" operation="create" />
            <Modal resource="appointments" operation="update" initialData={selectedAppointment} id={selectedId} />
            <Modal resource="appointments" operation="delete" id={selectedId} />
        </DashboardLayout>
    );
};

export default Appointments;
