import React from 'react';

const AuthLayout = ({ children }) => (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded shadow">{children}</div>
    </div>
);

export default AuthLayout;
