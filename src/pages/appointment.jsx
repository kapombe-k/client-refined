import React, { useState } from 'react';
import DataTable from '../components/ui/Datatable';
import SearchForm from '../components/ui/SearchForm';
import Modal from '../components/ui/modal';

const Appointments = () => {
    const [searchParams, setSearchParams] = useState({});
    const selectedAppointment = { name: 'Dental Checkup' };
    const selectedId = '1';

    const handleSearch = (params) => {
        setSearchParams(params);
    };

    return (
        <>
            <h2 className="text-xl font-bold mb-4 text-foreground">Appointments</h2>
            <SearchForm resource="appointments" onSearch={handleSearch} />
            <DataTable resource="appointments" searchParams={searchParams} />
            <Modal resource="appointments" operation="create" />
            <Modal resource="appointments" operation="update" initialData={selectedAppointment} id={selectedId} />
            <Modal resource="appointments" operation="delete" id={selectedId} />
        </>
    );
};

export default Appointments;
