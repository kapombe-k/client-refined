import React from 'react';
import DataTable from '../components/ui/Datatable';
import Modal from '../components/ui/modal';

const Billing = () => {
    const selectedBilling = { name: 'Invoice #123' };
    const selectedId = '1';
    return (
        <>
            <h2 className="text-xl font-bold mb-4 text-foreground">Billing</h2>
            <DataTable resource="billings" />
            <Modal resource="billings" operation="create" />
            <Modal resource="billings" operation="update" initialData={selectedBilling} id={selectedId} />
            <Modal resource="billings" operation="delete" id={selectedId} />
        </>
    );
};

export default Billing;
