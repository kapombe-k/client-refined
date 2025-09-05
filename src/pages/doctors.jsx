import React, { useState } from 'react';
import DataTable from '../components/ui/Datatable';
import SearchForm from '../components/ui/SearchForm';
import Modal from '../components/ui/modal';

const Doctors = () => {
    const [searchParams, setSearchParams] = useState({});
    const selectedDoctor = { name: 'Dr. Smith' };
    const selectedId = '1';

    const handleSearch = (params) => {
        setSearchParams(params);
    };

    return (
        <>
            <h2 className="text-xl font-bold mb-4 text-foreground">Doctors</h2>
            <SearchForm resource="doctors" onSearch={handleSearch} />
            <DataTable resource="doctors" searchParams={searchParams} />
            <Modal resource="doctors" operation="create" />
            <Modal resource="doctors" operation="update" initialData={selectedDoctor} id={selectedId} />
            <Modal resource="doctors" operation="delete" id={selectedId} />
        </>
    );
};

export default Doctors;
