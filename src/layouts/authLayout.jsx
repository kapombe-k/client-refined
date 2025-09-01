import React from 'react';

const AuthLayout = ({ children }) => (
    <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg border">{children}</div>
    </div>
);

export default AuthLayout;
