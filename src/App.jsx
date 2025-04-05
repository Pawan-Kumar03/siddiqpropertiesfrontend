import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import { ListingsProvider } from './contexts/ListingsContext';
import { UserProvider } from './contexts/UserContext'; // Import UserProvider
import './App.css';

export default function App() {
    return (
        <UserProvider>
            <ListingsProvider>
                <div className="font-aller bg-primary text-primary min-h-screen overflow-x-hidden">
                    <RouterProvider router={router} />
                </div>
            </ListingsProvider>
        </UserProvider>
    );
}
