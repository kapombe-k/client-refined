import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createResource, updateResource, deleteResource } from '../api/resourceApi';
import { toast } from 'react-toastify';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
    DialogDescription
} from './ui/dialog';

const ResourceDialog = ({ resource, operation = 'create', initialData = {}, id }) => {
    const schema = yup.object().shape({
        name: yup.string().required(),
        // Add more fields as needed per resource
    });
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialData
    });

    const onSubmit = async (data) => {
        try {
            if (operation === 'create') {
                await createResource(resource, data);
                toast.success('Created successfully!');
            } else if (operation === 'update') {
                await updateResource(resource, id, data);
                toast.success('Updated successfully!');
            } else if (operation === 'delete') {
                await deleteResource(resource, id);
                toast.success('Deleted successfully!');
            }
            reset();
        } catch {
            toast.error(`Failed to ${operation}!`);
        }
    };

    let title = '';
    if (operation === 'create') title = `Add New ${resource}`;
    else if (operation === 'update') title = `Edit ${resource}`;
    else if (operation === 'delete') title = `Delete ${resource}`;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className={`mb-4 px-4 py-2 ${operation === 'delete' ? 'bg-red-600' : operation === 'update' ? 'bg-yellow-600' : 'bg-green-600'} text-white rounded`}>
                    {operation === 'create' && 'Add New'}
                    {operation === 'update' && 'Edit'}
                    {operation === 'delete' && 'Delete'}
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {operation === 'delete' ? `Are you sure you want to delete this ${resource}?` : null}
                    </DialogDescription>
                </DialogHeader>
                {(operation === 'create' || operation === 'update') && (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block mb-1">Name</label>
                            <input {...register('name')} className="w-full border px-3 py-2 rounded" />
                            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                        </div>
                        <DialogFooter>
                            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">{operation === 'create' ? 'Create' : 'Update'}</button>
                            <DialogClose asChild>
                                <button type="button" className="w-full py-2 mt-2 bg-gray-300 rounded">Cancel</button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                )}
                {operation === 'delete' && (
                    <DialogFooter>
                        <button onClick={onSubmit} className="w-full py-2 bg-red-600 text-white rounded">Delete</button>
                        <DialogClose asChild>
                            <button type="button" className="w-full py-2 bg-gray-300 rounded">Cancel</button>
                        </DialogClose>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ResourceDialog;