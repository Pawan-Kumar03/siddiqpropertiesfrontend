import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

export default function GetVerifiedPage() {
    const { user } = useContext(UserContext);
    const [status, setStatus] = useState('');
    const [error, setError] = useState(null);
    const [isRequesting, setIsRequesting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        // Fetch current verification status
        const fetchStatus = async () => {
            try {
                const response = await fetch('https://backend-git-main-pawan-togas-projects.vercel.app/api/verify/status', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setStatus(data.verificationStatus || 'Not verified yet');
                } else {
                    // Check if the response is HTML
                    const text = await response.text();
                    if (text.startsWith('<!DOCTYPE html>')) {
                        throw new Error('Unexpected response from the server');
                    }
                    const errorData = JSON.parse(text);
                    throw new Error(errorData.message || 'An error occurred');
                }
            } catch (err) {
                console.error('Fetch verification status error:', err);
                setError(err.message || 'An error occurred');
            }
        };

        fetchStatus();
    }, [user, navigate]);

    const handleRequestVerification = async () => {
        setIsRequesting(true);
        try {
            const response = await fetch('https://backend-git-main-pawan-togas-projects.vercel.app/api/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                alert('Verification request submitted successfully');
                setStatus('Verification requested');
            } else {
                // Check if the response is HTML
                const text = await response.text();
                if (text.startsWith('<!DOCTYPE html>')) {
                    throw new Error('Unexpected response from the server');
                }
                const errorData = JSON.parse(text);
                throw new Error(errorData.message || 'An error occurred');
            }
        } catch (err) {
            console.error('Verification request error:', err);
            setError(err.message || 'An error occurred');
        } finally {
            setIsRequesting(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md bg-grey-darker p-8 rounded shadow-md border-4 border-custom">
                <h2 className="text-2xl font-bold mb-6 text-center text-custom">Get Verified</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2 text-custom">Verification Status:</label>
                    <p className="w-full p-2 border border-gray-300 rounded">{status}</p>
                </div>
                {status !== 'Verified' && (
                    <button
                        onClick={handleRequestVerification}
                        disabled={isRequesting}
                        className="w-full bg-custom text-black py-2 px-4 rounded"
                    >
                        {isRequesting ? 'Requesting...' : 'Request Verification'}
                    </button>
                )}
            </div>
        </div>
    );
}
