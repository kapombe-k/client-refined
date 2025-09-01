import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import DataTable from '../components/DataTable';
import SearchForm from '../components/SearchForm';
import Modal from '../components/Modal';

const Appointments = () => {
    const [searchParams, setSearchParams] = useState({});
    const selectedAppointment = { name: 'Dental Checkup' };
    const selectedId = '1';

    const handleSearch = (params) => {
        setSearchParams(params);
    };

    return (
        <DashboardLayout>
            <h2 className="text-xl font-bold mb-4">Appointments</h2>
            <SearchForm resource="appointments" onSearch={handleSearch} />
            <DataTable resource="appointments" searchParams={searchParams} />
            <Modal resource="appointments" operation="create" />
            <Modal resource="appointments" operation="update" initialData={selectedAppointment} id={selectedId} />
            <Modal resource="appointments" operation="delete" id={selectedId} />
        </DashboardLayout>
    );
};

export default Appointments;
