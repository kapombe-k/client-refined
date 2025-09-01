import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AuthLayout from '../layouts/authLayout';
import { useAuth } from '../hooks/useauth';
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
            <h2 className="text-2xl font-bold mb-6 text-foreground">Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block mb-1 text-foreground">Username</label>
                    <input {...register('username')} className="w-full border border-input bg-background px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring" />
                    {errors.username && <span className="text-destructive">{errors.username.message}</span>}
                </div>
                <div>
                    <label className="block mb-1 text-foreground">Email</label>
                    <input {...register('email')} className="w-full border border-input bg-background px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring" />
                    {errors.email && <span className="text-destructive">{errors.email.message}</span>}
                </div>
                <div>
                    <label className="block mb-1 text-foreground">Password</label>
                    <input type="password" {...register('password')} className="w-full border border-input bg-background px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring" />
                    {errors.password && <span className="text-destructive">{errors.password.message}</span>}
                </div>
                <button type="submit" className="w-full py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">Register</button>
            </form>
        </AuthLayout>
    );
};

export default Register;
