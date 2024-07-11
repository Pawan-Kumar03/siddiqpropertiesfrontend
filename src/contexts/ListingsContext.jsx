import React, { createContext, useState, useEffect } from 'react';

const ListingsContext = createContext();

export const ListingsProvider = ({ children }) => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await fetch(`https://backend-git-main-pawan-togas-projects.vercel.app/api/listings`);
      const data = await response.json();
      setListings(data);
    } catch (error) {
      console.error('Failed to fetch listings:', error);
    }
  };

  const addListing = async (newListing) => {
    try {
      const response = await fetch(`https://backend-git-main-pawan-togas-projects.vercel.app/api/listings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newListing),
      });
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const addedListing = await response.json();
      setListings(prevListings => [...prevListings, addedListing]);
      alert('Listing added successfully!');
    } catch (error) {
      console.error('Failed to add listing:', error);
      alert('Failed to add listing: ' + error.message);
    }
  };

  const updateListing = async (id, updatedListing) => {
    try {
      const response = await fetch(`https://backend-git-main-pawan-togas-projects.vercel.app/api/listings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedListing),
      });
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const updatedListingData = await response.json();
      setListings(prevListings => prevListings.map(listing => listing._id === id ? updatedListingData : listing));
      alert('Listing updated successfully!');
    } catch (error) {
      console.error('Failed to update listing:', error);
      alert('Failed to update listing: ' + error.message);
    }
  };

  return (
    <ListingsContext.Provider value={{ listings, addListing, updateListing }}>
      {children}
    </ListingsContext.Provider>
  );
};

export default ListingsContext;
