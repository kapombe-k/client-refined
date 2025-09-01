import React, { useState, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { getResource } from '../api-calls/resources';
import { searchPatients } from '../api-calls/patients';
import { searchAppointments } from '../api-calls/appointments';
import { searchDoctors } from '../api-calls/doctors';
import Loader from './Loader';
import { toast } from 'react-toastify';
import Modal from './Modal';

const ActionCellRenderer = ({ data, onEdit, onDelete }) => {
    return (
        <div>
            <button onClick={() => onEdit(data)} className="mr-2 px-2 py-1 bg-blue-500 text-white rounded">Edit</button>
            <button onClick={() => onDelete(data.id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
        </div>
    );
};

const DataTable = ({ resource, searchParams = {} }) => {
    const queryClient = useQueryClient();

    // Choose the appropriate API function based on resource type
    const getDataFunction = () => {
        if (Object.keys(searchParams).length > 0) {
            switch (resource) {
                case 'patients':
                    return searchPatients(searchParams);
                case 'appointments':
                    return searchAppointments(searchParams);
                case 'doctors':
                    return searchDoctors(searchParams);
                default:
                    return getResource(resource);
            }
        }
        return getResource(resource);
    };

    const queryKey = Object.keys(searchParams).length > 0 ? [resource, searchParams] : [resource];
    const { data, isLoading, error } = useQuery(queryKey, getDataFunction);
    const [modalState, setModalState] = useState({ open: false, operation: '', data: {}, id: null });

    const handleEdit = (rowData) => {
        setModalState({ open: true, operation: 'update', data: rowData, id: rowData.id });
    };

    const handleDelete = (id) => {
        setModalState({ open: true, operation: 'delete', data: {}, id });
    };

    const closeModal = () => {
        setModalState({ open: false, operation: '', data: {}, id: null });
    };

    const onMutationSuccess = () => {
        queryClient.invalidateQueries([resource]);
        closeModal();
    };

    // Handle different data structures from search vs basic endpoints
    const tableData = useMemo(() => {
        if (!data) return [];
        // If data has the search response structure, extract the array
        if (data[resource]) {
            return data[resource];
        }
        // Otherwise, assume it's the direct array
        return Array.isArray(data) ? data : [];
    }, [data, resource]);

    const columnDefs = useMemo(() => {
        if (!tableData || !tableData.length) return [];
        const keys = Object.keys(tableData[0]);
        const cols = keys.map(key => ({
            field: key,
            headerName: key.charAt(0).toUpperCase() + key.slice(1),
            sortable: true,
            filter: true
        }));
        cols.push({
            headerName: 'Actions',
            cellRenderer: (params) => <ActionCellRenderer data={params.data} onEdit={handleEdit} onDelete={handleDelete} />,
            width: 150
        });
        return cols;
    }, [tableData]);

    if (isLoading) return <Loader />;
    if (error) {
        toast.error('Failed to load data');
        return <div className="text-red-500">Error loading data</div>;
    }

    if (!tableData || !tableData.length) return <div>No records found.</div>;

    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
            <AgGridReact
                rowData={tableData}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
            />
            {modalState.open && (
                <Modal
                    resource={resource}
                    operation={modalState.operation}
                    initialData={modalState.data}
                    id={modalState.id}
                    onSuccess={onMutationSuccess}
                />
            )}
        </div>
    );
};

export default DataTable;
