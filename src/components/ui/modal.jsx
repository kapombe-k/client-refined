import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createResource, updateResource, deleteResource } from '../api-calls/resources';
import { toast } from 'react-toastify';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
    DialogClose,
} from './dialog';

const Modal = ({ resource, operation = 'create', initialData = {}, id, onSuccess }) => {
    const [open, setOpen] = useState(false);
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
            setOpen(false);
            onSuccess?.();
        } catch {
            toast.error(`Failed to ${operation}!`);
        }
    };

    let title = '';
    if (operation === 'create') title = `Add New ${resource}`;
    else if (operation === 'update') title = `Edit ${resource}`;
    else if (operation === 'delete') title = `Delete ${resource}`;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className={`mb-4 px-4 py-2 ${operation === 'delete' ? 'bg-red-600' : operation === 'update' ? 'bg-yellow-600' : 'bg-green-600'} text-white rounded`}>
                    {operation === 'create' && 'Add New'}
                    {operation === 'update' && 'Edit'}
                    {operation === 'delete' && 'Delete'}
                </button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                {(operation === 'create' || operation === 'update') && (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block mb-1">Name</label>
                            <input {...register('name')} className="w-full border px-3 py-2 rounded" />
                            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <button type="button" className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                            </DialogClose>
                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{operation === 'create' ? 'Create' : 'Update'}</button>
                        </DialogFooter>
                    </form>
                )}
                {operation === 'delete' && (
                    <div>
                        <p>Are you sure you want to delete this {resource}?</p>
                        <DialogFooter>
                            <DialogClose asChild>
                                <button className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                            </DialogClose>
                            <button onClick={onSubmit} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
                        </DialogFooter>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
