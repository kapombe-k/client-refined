import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/authLayout';
import { useAuth } from '../hooks/useauth';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required'),
});

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await login(data);
            toast.success('Login successful!');
            navigate('/');
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.response?.data?.error || 'Login failed!';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
                <p className="text-muted-foreground mt-2">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register('email')}
                        className={`w-full px-3 py-2 border border-input rounded-md shadow-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring ${
                            errors.email ? 'border-destructive' : ''
                        }`}
                        placeholder="Enter your email"
                        disabled={isLoading}
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        {...register('password')}
                        className={`w-full px-3 py-2 border border-input rounded-md shadow-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring ${
                            errors.password ? 'border-destructive' : ''
                        }`}
                        placeholder="Enter your password"
                        disabled={isLoading}
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground ${
                        isLoading
                            ? 'bg-primary/60 cursor-not-allowed'
                            : 'bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                    } transition duration-150 ease-in-out`}
                >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <Link
                        to="/register"
                        className="font-medium text-primary hover:text-primary/80 transition duration-150 ease-in-out"
                    >
                        Sign up here
                    </Link>
                </p>
            </div>

            <div className="mt-4 text-center">
                <div className="text-xs text-muted-foreground">
                    <p>Dental Clinic Management System</p>
                    <p className="mt-1">Secure login portal</p>
                </div>
            </div>
        </AuthLayout>
    );
};

export default Login;