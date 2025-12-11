import React, { useState } from 'react';
import { createResource, updateResource, deleteResource } from '../../api-calls/resources';

const Modal = ({ resource, operation = 'create', initialData = {}, id, onSuccess }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(initialData);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (operation === 'create') {
                await createResource(resource, formData);
                alert('Created successfully!');
            } else if (operation === 'update') {
                await updateResource(resource, id, formData);
                alert('Updated successfully!');
            } else if (operation === 'delete') {
                await deleteResource(resource, id);
                alert('Deleted successfully!');
            }
            setOpen(false);
            onSuccess?.();
        } catch (error) {
            alert(`Failed to ${operation}!`);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    let title = '';
    if (operation === 'create') title = `Add New ${resource}`;
    else if (operation === 'update') title = `Edit ${resource}`;
    else if (operation === 'delete') title = `Delete ${resource}`;

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className={`mb-4 px-4 py-2 rounded transition-colors ${
                    operation === 'delete'
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : operation === 'update'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-green-600 text-white hover:bg-green-700'
                }`}
            >
                {operation === 'create' && 'Add New'}
                {operation === 'update' && 'Edit'}
                {operation === 'delete' && 'Delete'}
            </button>

            {open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                        </div>
                        {(operation === 'create' || operation === 'update') && (
                            <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
                                <div>
                                    <label className="block mb-1 text-gray-700">Name</label>
                                    <input
                                        name="name"
                                        value={formData.name || ''}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 bg-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
                                    >
                                        {loading ? 'Saving...' : (operation === 'create' ? 'Create' : 'Update')}
                                    </button>
                                </div>
                            </form>
                        )}
                        {operation === 'delete' && (
                            <div className="px-6 py-4">
                                <p className="text-gray-700 mb-4">Are you sure you want to delete this {resource}?</p>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50"
                                    >
                                        {loading ? 'Deleting...' : 'Delete'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
