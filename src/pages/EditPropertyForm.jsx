import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditPropertyForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false); // New state for submission

    useEffect(() => {
        const fetchPropertyData = async () => {
            try {
                console.log(`Fetching property data for id: ${id}`);
                const response = await fetch(`https://backend-git-main-pawan-togas-projects.vercel.app/api/listings/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch property data');
                }
                const data = await response.json();
                console.log('Property data fetched:', data);
                setFormData(data);
            } catch (error) {
                console.error("Failed to fetch property data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPropertyData();
    }, [id]);

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

        const submissionData = new FormData();
        for (const key in formData) {
            if (key === "images") {
                formData.images.forEach((image) => {
                    submissionData.append("images", image);
                });
            } else {
                submissionData.append(key, formData[key]);
            }
        }

        try {
            const response = await fetch(`https://backend-git-main-pawan-togas-projects.vercel.app/api/listings/${id}`, {
                method: "PUT",
                body: submissionData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const result = await response.json();
            console.log("Updated:", result);
            setSubmitted(true); // Set submitted to true on successful update
        } catch (error) {
            alert("Failed to update listing: " + error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!formData) {
        return <div>No property data found</div>;
    }

    if (submitted) {
        return (
            <div className="container mx-auto p-4">
                <div className="text-center bg-green-200 text-green-700 p-4 rounded">
                    Your ad has been modified successfully!
                </div>
                <div className="flex justify-center mt-4">
                    <button onClick={() => navigate("/")} className="px-6 py-3 bg-green-600 text-white rounded">
                        Go to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold text-center">Edit Property</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-md mx-auto">
                <input
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="border border-gray-300 p-2 rounded w-full"
                />
                <input
                    name="price"
                    type="text"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="border border-gray-300 p-2 rounded w-full"
                />
                <input
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="border border-gray-300 p-2 rounded w-full"
                />
                <input
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Location"
                    className="border border-gray-300 p-2 rounded w-full"
                />
                <input
                    name="propertyType"
                    type="text"
                    value={formData.propertyType}
                    onChange={handleChange}
                    placeholder="Property Type"
                    className="border border-gray-300 p-2 rounded w-full"
                />
                <input
                    name="beds"
                    type="number"
                    value={formData.beds}
                    onChange={handleChange}
                    placeholder="Beds"
                    className="border border-gray-300 p-2 rounded w-full"
                />
                <input
                    type="file"
                    multiple
                    name="images"
                    onChange={handleImageChange}
                    className="border border-gray-300 p-2 rounded w-full"
                />
                <button type="submit" className="px-6 py-3 bg-red-600 text-white rounded w-full">
                    Update Property
                </button>
            </form>
        </div>
    );
}
