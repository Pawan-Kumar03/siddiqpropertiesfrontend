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
        // Check if user is authenticated
        if (!user) {
            sessionStorage.setItem('redirectPath', '/get-verified');
            return;
        }
            setStatus(user.isVerified ? 'Verified' : 'Not verified yet');
    }, [user, navigate]);
    const handleRequestVerification = async () => {
        setIsRequesting(true);
       // Get the user from localStorage
        const user = localStorage.getItem('user');
        // Parse the string back into an object
        const parsedUser = JSON.parse(user);
        // Now you can access the token
        const token = parsedUser.token;
        // console.log('user:', parsedUser);
        // console.log('token:', token);
        try {
            const response = await fetch('https://backend-git-main-pawan-togas-projects.vercel.app/api/verify/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                alert('Verification email sent successfully. Please check your inbox.');
                setStatus('Verification requested');
            } else {
                const errorData = await response.json();
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
                    <label className="block text-m font-bold mb-2 text-custom">Verification Status:</label>
                    <p className="w-full p-2 border border-gray-300 rounded text-custom">{status}</p>
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
