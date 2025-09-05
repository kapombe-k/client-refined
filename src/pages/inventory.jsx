import React from 'react';
import DataTable from '../components/ui/Datatable';
import Modal from '../components/ui/modal';

const Inventory = () => {
    const selectedInventory = { name: 'Toothpaste' };
    const selectedId = '1';
    return (
        <>
            <h2 className="text-xl font-bold mb-4 text-foreground">Inventory</h2>
            <DataTable resource="inventory" />
            <Modal resource="inventory" operation="create" />
            <Modal resource="inventory" operation="update" initialData={selectedInventory} id={selectedId} />
            <Modal resource="inventory" operation="delete" id={selectedId} />
        </>
    );
};

export default Inventory;
