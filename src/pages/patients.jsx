import React, { useState } from 'react';
import DashboardLayout from '../layouts/dashBoardLayout';
import DataTable from '../components/ui/Datatable';
import SearchForm from '../components/ui/SearchForm';
import Modal from '../components/ui/modal';

const Patients = () => {
    const [searchParams, setSearchParams] = useState({});
    // Example selectedPatient and id for update/delete
    const selectedPatient = { name: 'John Doe' };
    const selectedId = '1';

    const handleSearch = (params) => {
        setSearchParams(params);
    };

    return (
        <DashboardLayout>
            <h2 className="text-xl font-bold mb-4 text-foreground">Patients</h2>
            <SearchForm resource="patients" onSearch={handleSearch} />
            <DataTable resource="patients" searchParams={searchParams} />
            <Modal resource="patients" operation="create" />
            <Modal resource="patients" operation="update" initialData={selectedPatient} id={selectedId} />
            <Modal resource="patients" operation="delete" id={selectedId} />
        </DashboardLayout>
    );
};

export default Patients;
