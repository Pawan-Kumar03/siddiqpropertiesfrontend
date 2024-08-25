import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import { AuthProvider } from './contexts/AuthContext'; // Import the AuthProvider
import './App.css';

export default function App() {
    return (
        <AuthProvider>
            <div className="bg-grey-light text-grey-darkest min-h-screen">
                <RouterProvider router={router} />
            </div>
        </AuthProvider>
    );
}
