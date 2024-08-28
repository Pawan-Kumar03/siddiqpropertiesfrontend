import React, { useEffect, useState } from 'react';
import Card from '../components/Card/Card';

const MyAds = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                // Get the token from localStorage
                const token = localStorage.getItem('token');

                const response = await fetch('https://backend-git-main-pawan-togas-projects.vercel.app/api/user-listings', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch listings.');
                }

                const data = await response.json();
                setListings(data);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Failed to fetch listings.');
                setLoading(false);
            }
        };

        fetchListings();
    }, []);

    if (loading) return <div className='text-custom text-center'>Loading...</div>;
    if (error) return <div className='text-red text-center'>{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-custom text-center">My Ads</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {listings.length > 0 ? (
                    listings.map((listing) => (
                        <Card key={listing._id} item={listing} />
                    ))
                ) : (
                    <div>No properties found.</div>
                )}
            </div>
        </div>
    );
};

export default MyAds;
