import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner/Banner";
import ResidentialForSale from "../components/ResidentialForSale/ResidentialForSale";
import ListingsContext from "../contexts/ListingsContext";

export default function HomePage() {
    const { listings, setListings } = useContext(ListingsContext); // Assuming you have a setListings method in your context
    const [searchParams, setSearchParams] = useState({});
    const [showAllListings, setShowAllListings] = useState(false);
    const [loading, setLoading] = useState(false); // New loading state
    const [submitted, setSubmitted] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState("");
    const navigate = useNavigate();

    const handleSearch = (query) => {
        setSearchParams(query);
        setShowAllListings(false);
    };

    const handleDisplayAllListings = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://backend-git-main-pawan-togas-projects.vercel.app/api/listings');
            const data = await response.json();
            setListings(data);
            setShowAllListings(true);
        } catch (error) {
            console.error("Failed to fetch listings:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePlaceAnAd = () => {
        navigate("/place-an-ad");
    };

    const handleEditProperty = (id) => {
        if (/^[0-9a-fA-F]{24}$/.test(id)) {
            navigate(`/edit-property/${id}`);
        } else {
            console.error("Invalid property ID");
        }
    };

    const handleDeleteProperty = async (id) => {
        try {
            const response = await fetch(`https://backend-git-main-pawan-togas-projects.vercel.app/api/listings/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const result = await response.json();
            // console.log("Listing deleted:", result);

            // Set the submitted state to true and set the delete message
            setSubmitted(true);
            setDeleteMessage("Your ad has been deleted successfully!");
            // Remove the deleted listing from the state
            setListings((prevListings) => prevListings.filter((listing) => listing._id !== id));

        } catch (error) {
            console.error("Failed to delete listing:", error);
        }
    };

    if (submitted) {
        return (
            <div className="container mx-auto p-4">
                <div className="text-center bg-green-200 text-green-700 p-4 rounded">
                    {deleteMessage}
                </div>
                <div className="flex justify-center mt-4">
                    <button onClick={() => { setSubmitted(false); navigate("/"); }} className="px-6 py-3 bg-green-600 text-white rounded">
                        Go to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Banner
                onSearch={handleSearch}
                onDisplayAllListings={handleDisplayAllListings}
                onPlaceAnAd={handlePlaceAnAd}
            />
            {loading ? (
                <div>Loading...</div>
            ) : (
                <ResidentialForSale
                    searchParams={searchParams}
                    showAll={showAllListings}
                    listings={listings}
                    onEditProperty={handleEditProperty}
                    onDeleteProperty={handleDeleteProperty}
                />
            )}
        </>
    );
}
