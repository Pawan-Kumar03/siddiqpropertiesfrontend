// PropertyDetails.jsx
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ListingsContext from "../contexts/ListingsContext";

export default function PropertyDetails() {
    const { id } = useParams();
    const { listings } = useContext(ListingsContext);
    const [property, setProperty] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const selectedProperty = listings.find((listing) => listing._id === id);
        setProperty(selectedProperty);
    }, [id, listings]);

    if (!property) {
        return <div>Loading...</div>;
    }

    const handleEditProperty = () => {
        navigate(`/edit-property/${property._id}`);
    };

    const handleDeleteProperty = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/listings/${property._id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const result = await response.json();
            console.log("Listing deleted:", result);

            navigate("/");
        } catch (error) {
            console.error("Failed to delete listing:", error);
        }
    };

    return (
        <div className="container mt-8">
            <h2 className="text-xl font-semibold mb-3 dark:text-gray-100">Property Details</h2>
            <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 lg:pr-4">
                    <img className="rounded-lg mb-4 object-cover h-80 w-full" src={property.image} alt={property.title} />
                </div>
                <div className="lg:w-1/2 lg:pl-4">
                    <h3 className="text-lg font-semibold mb-2 text-primary-500">{property.title}</h3>
                    <p className="text-sm mb-2 dark:text-gray-300">{property.price}</p>
                    <p className="mb-4 dark:text-gray-400 text-sm">{property.city}, {property.location}</p>
                    <p className="mb-4 dark:text-gray-400 text-sm">{property.propertyType}</p>
                    <p className="mb-4 dark:text-gray-400 text-sm">{property.beds} Beds</p>
                    <button
                        onClick={handleEditProperty}
                        className="px-6 py-3 bg-blue-600 text-white rounded mr-2"
                    >
                        Edit Property
                    </button>
                    <button
                        onClick={handleDeleteProperty}
                        className="px-6 py-3 bg-red-600 text-white rounded"
                    >
                        Delete Property
                    </button>
                </div>
            </div>
        </div>
    );
}
