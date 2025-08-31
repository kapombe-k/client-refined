import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';

const Inventory = () => {
    const selectedInventory = { name: 'Toothpaste' };
    const selectedId = '1';
    return (
        <DashboardLayout>
            <h2 className="text-xl font-bold mb-4">Inventory</h2>
            <DataTable resource="inventory" />
            <Modal resource="inventory" operation="create" />
            <Modal resource="inventory" operation="update" initialData={selectedInventory} id={selectedId} />
            <Modal resource="inventory" operation="delete" id={selectedId} />
        </DashboardLayout>
    );
};

export default Inventory;
