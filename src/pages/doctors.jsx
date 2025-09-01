import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import DataTable from '../components/DataTable';
import SearchForm from '../components/SearchForm';
import Modal from '../components/Modal';

const Doctors = () => {
    const [searchParams, setSearchParams] = useState({});
    const selectedDoctor = { name: 'Dr. Smith' };
    const selectedId = '1';

    const handleSearch = (params) => {
        setSearchParams(params);
    };

    return (
        <DashboardLayout>
            <h2 className="text-xl font-bold mb-4">Doctors</h2>
            <SearchForm resource="doctors" onSearch={handleSearch} />
            <DataTable resource="doctors" searchParams={searchParams} />
            <Modal resource="doctors" operation="create" />
            <Modal resource="doctors" operation="update" initialData={selectedDoctor} id={selectedId} />
            <Modal resource="doctors" operation="delete" id={selectedId} />
        </DashboardLayout>
    );
};

export default Doctors;
