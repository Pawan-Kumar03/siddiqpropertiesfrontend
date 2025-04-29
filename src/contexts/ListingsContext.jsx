import React, { createContext, useState, useEffect } from 'react';

const ListingsContext = createContext();

export const ListingsProvider = ({ children }) => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await fetch(`https://siddiqproperties-backend-b0esbfg2b9g9a0fj.uaenorth-01.azurewebsites.net/api/listings`);
      
      // console.log("Status Code:", response.status);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Fetch failed with status ${response.status}: ${errorText}`);
      }
      // console.log(response)
  
      const data = await response.json();
      // console.log("Listings loaded", data);
      setListings(data);
    } catch (error) {
      console.log("Failed to load listings");
      console.error('Error fetching listings:', error);
    }
  };
  

  const addListing = async (newListing) => {
    try {
      // Get the user from localStorage
    const user = localStorage.getItem('user');
    // Parse the string back into an object
    const parsedUser = JSON.parse(user);
    // Now you can access the token
    const token = parsedUser.token;
      const response = await fetch(`https://siddiqproperties-backend-b0esbfg2b9g9a0fj.uaenorth-01.azurewebsites.net/api/listings`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the Authorization header
          'Accept': 'application/json'
        },
        body: JSON.stringify(newListing),
      });
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const addedListing = await response.json();
      setListings(prevListings => [...prevListings, addedListing]); // Update state with new listing
    } catch (error) {
      // console.error('Failed to add listing:', error);
      // alert('Failed to add listing: ' + error.message);
    }
  };

  const updateListing = async (id, updatedListing) => {
    try {
      const response = await fetch(`https://siddiqproperties-backend-b0esbfg2b9g9a0fj.uaenorth-01.azurewebsites.net/api/listings/${id}`, {
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
    } catch (error) {
      console.error('Failed to update listing:', error);
      alert('Failed to update listing: ' + error.message);
    }
  };

  const deleteListing = async (id) => {
    try {
      const response = await fetch(`https://siddiqproperties-backend-b0esbfg2b9g9a0fj.uaenorth-01.azurewebsites.net/api/listings/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete listing');
      }

      setListings(prevListings => prevListings.filter(listing => listing._id !== id)); // Update state to remove listing
    } catch (error) {
      console.error('Failed to delete listing:', error);
      alert('Failed to delete listing: ' + error.message);
    }
  };

  return (
    <ListingsContext.Provider value={{ listings, setListings, addListing, updateListing, deleteListing }}>
      {children}
    </ListingsContext.Provider>
  );
};

export default ListingsContext;
