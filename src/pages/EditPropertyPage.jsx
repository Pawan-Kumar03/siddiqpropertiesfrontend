import React, { useState, useEffect, useContext } from "react";
import ListingsContext from "../contexts/ListingsContext";
import EditPropertyForm from "../pages/EditPropertyForm";

const EditPropertyPage = () => {
    const { listings } = useContext(ListingsContext);
    const [selectedProperty, setSelectedProperty] = useState(null);

    // Function to handle property selection from dropdown
    const handlePropertySelect = (event) => {
        const propertyId = event.target.value;
        const property = listings.find(listing => listing._id === propertyId);
        setSelectedProperty(property);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Property</h1>
            <select onChange={handlePropertySelect} className="mb-4 p-2 border border-gray-300 rounded">
                <option value="">Select a property to edit</option>
                {listings.map(listing => (
                    <option key={listing._id} value={listing._id}>
                        {listing.title} - {listing.city}, {listing.location}
                    </option>
                ))}
            </select>
            {selectedProperty ? (
                <EditPropertyForm property={selectedProperty} />
            ) : (
                <p>Please select a property to edit.</p>
            )}
        </div>
    );
};

export default EditPropertyPage;
