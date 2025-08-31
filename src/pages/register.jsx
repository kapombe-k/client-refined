import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AuthLayout from '../layouts/AuthLayout';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
});

const Register = () => {
    const { login } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (data) => {
        try {
            // Replace with actual register API call
            await login(data); // Simulate login after register
            toast.success('Registration successful!');
        } catch (err) {
            toast.error('Registration failed!');
        }
    };

    return (
        <AuthLayout>
            <h2 className="text-2xl font-bold mb-6">Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block mb-1">Username</label>
                    <input {...register('username')} className="w-full border px-3 py-2 rounded" />
                    {errors.username && <span className="text-red-500">{errors.username.message}</span>}
                </div>
                <div>
                    <label className="block mb-1">Email</label>
                    <input {...register('email')} className="w-full border px-3 py-2 rounded" />
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                </div>
                <div>
                    <label className="block mb-1">Password</label>
                    <input type="password" {...register('password')} className="w-full border px-3 py-2 rounded" />
                    {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                </div>
                <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">Register</button>
            </form>
        </AuthLayout>
    );
};

export default Register;
