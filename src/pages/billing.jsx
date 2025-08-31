import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';

const Billing = () => {
    const selectedBilling = { name: 'Invoice #123' };
    const selectedId = '1';
    return (
        <DashboardLayout>
            <h2 className="text-xl font-bold mb-4">Billing</h2>
            <DataTable resource="billings" />
            <Modal resource="billings" operation="create" />
            <Modal resource="billings" operation="update" initialData={selectedBilling} id={selectedId} />
            <Modal resource="billings" operation="delete" id={selectedId} />
        </DashboardLayout>
    );
};

export default Billing;
