import React, { useState, useEffect } from 'react';
import { getResource } from '../../api-calls/resources';
import { searchPatients } from '../../api-calls/patients';
import { searchAppointments } from '../../api-calls/appointments';
import { searchDoctors } from '../../api-calls/doctors';
import Loader from './loader';
import Modal from './modal';

const ActionCellRenderer = ({ data, onEdit, onDelete }) => {
    return (
        <div>
            <button
                onClick={() => onEdit(data)}
                className="mr-2 px-2 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
            >
                Edit
            </button>
            <button
                onClick={() => onDelete(data.id)}
                className="px-2 py-1 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90 transition-colors"
            >
                Delete
            </button>
        </div>
    );
};

const DataTable = ({ resource, searchParams = {} }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalState, setModalState] = useState({ open: false, operation: '', data: {}, id: null });

    useEffect(() => {
        loadData();
    }, [resource, searchParams]);

    const loadData = async () => {
        try {
            setLoading(true);
            setError(null);

            let result;
            if (Object.keys(searchParams).length > 0) {
                switch (resource) {
                    case 'patients':
                        result = await searchPatients(searchParams);
                        break;
                    case 'appointments':
                        result = await searchAppointments(searchParams);
                        break;
                    case 'doctors':
                        result = await searchDoctors(searchParams);
                        break;
                    default:
                        result = await getResource(resource);
                }
            } else {
                result = await getResource(resource);
            }

            setData(Array.isArray(result) ? result : result[resource] || []);
        } catch (err) {
            setError('Failed to load data');
            console.error('Error loading data:', err);
        } finally {
            setLoading(false);
        }
    };

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
        loadData(); // Reload data after mutation
        closeModal();
    };

    if (loading) return <Loader />;

    if (error) {
        return <div className="text-red-600 p-4 bg-red-50 rounded-lg border border-red-200">Error loading data</div>;
    }

    if (!data || !data.length) {
        return <div className="text-gray-500 p-4 bg-gray-50 rounded-lg">No records found.</div>;
    }

    const columns = Object.keys(data[0]).filter(key => key !== 'id');

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map(col => (
                            <th key={col} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {col.charAt(0).toUpperCase() + col.slice(1)}
                            </th>
                        ))}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((row, index) => (
                        <tr key={row.id || index} className="hover:bg-gray-50">
                            {columns.map(col => (
                                <td key={col} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {row[col]}
                                </td>
                            ))}
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <ActionCellRenderer data={row} onEdit={handleEdit} onDelete={handleDelete} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
