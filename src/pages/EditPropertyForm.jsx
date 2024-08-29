import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ListingsContext from "../contexts/ListingsContext";

export default function EditPropertyForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { listings, updateListing } = useContext(ListingsContext);
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const selectedProperty = listings.find((listing) => listing._id === id);
        if (selectedProperty) {
            setFormData(selectedProperty);
            setLoading(false);
        } else {
            setLoading(false); // Stop loading if no property is found
        }
    }, [id, listings]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            images: Array.from(e.target.files),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // or wherever you store the token
    
        const submissionData = new FormData();
        for (const key in formData) {
            if (key === "images" && formData.images) {
                formData.images.forEach((image) => {
                    submissionData.append("images", image);
                });
            } else if (key !== "images") {
                submissionData.append(key, formData[key]);
            }
        }
    
        try {
            const response = await fetch(`https://backend-git-main-pawan-togas-projects.vercel.app/api/listings/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: submissionData
            });
    
            if (!response.ok) {
                throw new Error(`Failed to update listing: ${response.statusText}`);
            }
    
            const data = await response.json();
            setSubmitted(true);
        } catch (error) {
            alert("Failed to update listing: " + error.message);
        }
    };
    
    if (loading) {
        return <div className="text-center text-custom">Loading...</div>;
    }

    if (!formData) {
        return <div className="text-center text-custom">No property data found</div>;
    }

    if (submitted) {
        return (
            <div className="container mx-auto p-4">
                <div className="text-center bg-green-200 text-green-700 p-4 rounded">
                    Your ad has been modified successfully!
                </div>
                <div className="flex justify-center mt-4">
                    <button onClick={() => navigate("/")} className="px-6 py-3 bg-custom text-white rounded">
                        Go to Home
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="container mx-auto p-4 bg-gray-800 text-gray-100">
            <h2 className="text-2xl font-semibold text-center text-custom">Edit Property</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-md mx-auto bg-gray-900 p-6 rounded">
                <input
                    name="title"
                    type="text"
                    value={formData.title || ''}
                    onChange={handleChange}
                    placeholder="Title"
                    className="border border-gray-600 p-2 rounded w-full bg-gray-700 text-gray-100"
                />
                <input
                    name="price"
                    type="text"
                    value={formData.price || ''}
                    onChange={handleChange}
                    placeholder="Price"
                    className="border border-gray-600 p-2 rounded w-full bg-gray-700 text-gray-100"
                />
                <input
                    name="city"
                    type="text"
                    value={formData.city || ''}
                    onChange={handleChange}
                    placeholder="City"
                    className="border border-gray-600 p-2 rounded w-full bg-gray-700 text-gray-100"
                />
                <input
                    name="location"
                    type="text"
                    value={formData.location || ''}
                    onChange={handleChange}
                    placeholder="Location"
                    className="border border-gray-600 p-2 rounded w-full bg-gray-700 text-gray-100"
                />
                <input
                    name="propertyType"
                    type="text"
                    value={formData.propertyType || ''}
                    onChange={handleChange}
                    placeholder="Property Type"
                    className="border border-gray-600 p-2 rounded w-full bg-gray-700 text-gray-100"
                />
                <input
                    name="beds"
                    type="number"
                    value={formData.beds || ''}
                    onChange={handleChange}
                    placeholder="Beds"
                    className="border border-gray-600 p-2 rounded w-full bg-gray-700 text-gray-100"
                />
                <input
                    name="bathrooms"
                    type="number"
                    value={formData.bathrooms || ''}
                    onChange={handleChange}
                    placeholder="Bathrooms"
                    className="border border-gray-600 p-2 rounded w-full bg-gray-700 text-gray-100"
                />
                <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={handleChange}
                    placeholder="Description"
                    className="border border-gray-600 p-2 rounded w-full h-24 bg-gray-700 text-gray-100"
                />
                <input
                    name="propertyReferenceId"
                    type="text"
                    value={formData.propertyReferenceId || ''}
                    onChange={handleChange}
                    placeholder="Property Reference ID"
                    className="border border-gray-600 p-2 rounded w-full bg-gray-700 text-gray-100"
                />
                <input
                    name="building"
                    type="text"
                    value={formData.building || ''}
                    onChange={handleChange}
                    placeholder="Building"
                    className="border border-gray-600 p-2 rounded w-full bg-gray-700 text-gray-100"
                />
                <input
                    name="neighborhood"
                    type="text"
                    value={formData.neighborhood || ''}
                    onChange={handleChange}
                    placeholder="Neighborhood"
                    className="border border-gray-600 p-2 rounded w-full bg-gray-700 text-gray-100"
                />
                <input
                    name="landlordName"
                    type="text"
                    value={formData.landlordName || ''}
                    onChange={handleChange}
                    placeholder="Landlord Name"
                    className="border border-gray-600 p-2 rounded w-full bg-gray-700 text-gray-100"
                />
                <input
                    name="reraTitleNumber"
                    type="text"
                    value={formData.reraTitleNumber || ''}
                    onChange={handleChange}
                    placeholder="RERA Title Number"
                    className="border border-gray-600 p-2 rounded w-full bg-gray-700 text-gray-100"
                />
                <input
                    name="reraPreRegistrationNumber"
                    type="text"
                    value={formData.reraPreRegistrationNumber || ''}
                    onChange={handleChange}
                    placeholder="RERA Pre Registration Number"
                    className="border border-gray-600 p-2 rounded w-full bg-gray-700 text-gray-100"
                />
                <input
                    name="agentName"
                    type="text"
                    value={formData.agentName || ''}
                    onChange={handleChange}
                    placeholder="Agent Name"
                    className="border border-gray-600 p-2 rounded w-full bg-gray-700 text-gray-100"
                />
                <input
                    name="agentCallNumber"
                    type="text"
                    value={formData.agentCallNumber || ''}
                    onChange={handleChange}
                    placeholder="Agent Call Number"
                    className="border border-gray-600 p-2 rounded w-full bg-gray-700 text-gray-100"
                />
                <input
                    name="agentEmail"
                    type="email"
                    value={formData.agentEmail || ''}
                    onChange={handleChange}
                    placeholder="Agent Email"
                    className="border border-gray-600 p-2 rounded w-full bg-gray-700 text-gray-100"
                />
                <input
                    name="agentWhatsapp"
                    type="text"
                    value={formData.agentWhatsapp || ''}
                    onChange={handleChange}
                    placeholder="Agent WhatsApp"
                    className="border border-gray-600 p-2 rounded w-full bg-gray-700 text-gray-100"
                />
                <input
                    name="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="border border-gray-600 p-2 rounded w-full bg-gray-700 text-gray-100"
                />
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={() => navigate(-1)} // Go back to the previous page
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition duration-300"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-custom text-white rounded hover:bg-gray-600 transition duration-300"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
