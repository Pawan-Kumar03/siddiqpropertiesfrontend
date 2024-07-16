import React, { useState } from "react";
import saleProperty from "../../assets/icons/sale-property.svg";
import inputSearch from "../../assets/icons/input-search.svg";
import { Link } from "react-router-dom";

export default function Banner({ onSearch, onPlaceAnAd }) {
    const [city, setCity] = useState("");
    const [locations, setLocations] = useState([]);
    const [propertyType, setPropertyType] = useState("");
    const [priceMin, setPriceMin] = useState("");
    const [priceMax, setPriceMax] = useState("");
    const [beds, setBeds] = useState("");

    const handleSearch = (event) => {
        event.preventDefault();
        const searchParams = {
            city: city || "",
            location: locations.join(",") || "", // Join locations into a comma-separated string
            propertyType: propertyType || "",
            priceMin: priceMin || "",
            priceMax: priceMax || "",
            beds: beds || ""
        };
        onSearch(searchParams); // Pass the search params to the parent component
    };

    const handleAddLocation = (e) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
            setLocations([...locations, e.target.value.trim()]);
            e.target.value = ""; // Clear input field after adding location
        }
    };

    const handleRemoveLocation = (index) => {
        const updatedLocations = [...locations];
        updatedLocations.splice(index, 1);
        setLocations(updatedLocations);
    };

    const handleDisplayAllListings = (event) => {
        event.preventDefault();
        onSearch({}); // Trigger function to display all listings by passing an empty object
    };

    return (
        <section>
            <div className="container bg-none lg:bg-banner bg-cover bg-center bg-no-repeat lg:my-2 lg:pb-10 lg:pt-5 rounded-md">
                <h1 className="text-2xl text-center font-semibold lg:text-black lg:mb-8 hidden lg:block">
                    Properties for Sale in UAE
                </h1>
                <div className="lg:bg-black lg:bg-opacity-50 rounded-md lg:p-4 lg:w-[88%] mx-auto">
                    <div className="hidden lg:flex items-center space-x-14 mb-4">
                        <span className="text-base font-semibold lg:text-white hidden lg:block">
                            Searching in
                        </span>
                        <ul className="hidden lg:flex items-center space-x-2 text-sm">
                            <li>
                                <button
                                    className="hover:bg-primary-500 duration-200 text-white px-5 py-2 font-semibold rounded-full"
                                    onClick={handleDisplayAllListings} // Update onClick handler
                                >
                                    Property for Sale
                                </button>
                            </li>
                            <li>
                                <Link className="hover:bg-primary-500 duration-200 text-white px-5 py-2 font-semibold rounded-full" to="/place-an-ad">
                                    <span>Place an Ad</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <form className="lg:flex lg:flex-col lg:space-y-3 px-2 lg:px-0 py-4 lg:py-0 relative" onSubmit={handleSearch}>
                        <div className="lg:flex lg:space-x-3">
                            <div className="flex flex-col w-full mb-3">
                                <label className="mb-1 text-gray-600 dark:text-gray-300">City</label>
                                <select
                                    className="w-full p-4 lg:rounded-md rounded-full border border-gray-300/50 dark:border-gray-400/20 dark:bg-slate-800/40 dark:text-gray-300"
                                    name="city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                >
                                    <option value="">Select City</option>
                                    <option value="Dubai">Dubai</option>
                                    <option value="Abu Dhabi">Abu Dhabi</option>
                                    <option value="Sharjah">Sharjah</option>
                                    <option value="Ajman">Ajman</option>
                                    <option value="Fujairah">Fujairah</option>
                                    <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                                    <option value="Umm Al Quwain">Umm Al Quwain</option>
                                    {/* Add more cities as needed */}
                                </select>
                            </div>
                            <div className="flex flex-col w-full mb-3">
                                <label className="mb-1 text-gray-600 dark:text-gray-300">Location</label>
                                <div className="flex flex-wrap items-center">
                                    {locations.map((loc, index) => (
                                        <div key={index} className="flex items-center space-x-1 mb-1 mr-1 bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded-full">
                                            <span className="text-sm">{loc}</span>
                                            <button type="button" onClick={() => handleRemoveLocation(index)} className="ml-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                    <input
                                        type="text"
                                        placeholder="Add location and press Enter"
                                        onKeyPress={handleAddLocation}
                                        className="flex-1 p-2 lg:rounded-md rounded-full border border-gray-300/50 dark:border-gray-400/20 dark:bg-slate-800/40 dark:text-gray-300"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col w-full mb-3">
                                <label className="mb-1 text-gray-600 dark:text-gray-300">Property Type</label>
                                <select
                                    className="w-full p-4 lg:rounded-md rounded-full border border-gray-300/50 dark:border-gray-400/20 dark:bg-slate-800/40 dark:text-gray-300"
                                    name="propertyType"
                                    value={propertyType}
                                    onChange={(e) => setPropertyType(e.target.value)}
                                >
                                    <option value="">Select Property Type</option>
                                    <option value="Apartment">Apartment</option>
                                    <option value="Villa">Villa</option>
                                    <option value="Townhouse">Townhouse</option>
                                    <option value="Penthouse">Penthouse</option>
                                    {/* Add more property types as needed */}
                                </select>
                            </div>
                        </div>
                        <div className="lg:flex lg:space-x-3">
                            <div className="flex flex-col w-full mb-3">
                                <label className="mb-1 text-gray-600 dark:text-gray-300">Min Price</label>
                                <input
                                    type="number"
                                    name="priceMin"
                                    placeholder="Min Price"
                                    value={priceMin}
                                    onChange={(e) => setPriceMin(e.target.value)}
                                    className="w-full p-4 lg:rounded-md rounded-full border border-gray-300/50 dark:border-gray-400/20 dark:bg-slate-800/40 dark:text-gray-300"
                                />
                            </div>
                            <div className="flex flex-col w-full mb-3">
                                <label className="mb-1 text-gray-600 dark:text-gray-300">Max Price</label>
                                <input
                                    type="number"
                                    name="priceMax"
                                    placeholder="Max Price"
                                    value={priceMax}
                                    onChange={(e) => setPriceMax(e.target.value)}
                                    className="w-full p-4 lg:rounded-md rounded-full border border-gray-300/50 dark:border-gray-400/20 dark:bg-slate-800/40 dark:text-gray-300"
                                />
                            </div>
                        </div>
                        <div className="lg:flex lg:space-x-3">
                            <div className="flex flex-col w-full mb-3">
                                <label className="mb-1 text-gray-600 dark:text-gray-300">Beds</label>
                                <select
                                    className="w-full p-4 lg:rounded-md rounded-full border border-gray-300/50 dark:border-gray-400/20 dark:bg-slate-800/40 dark:text-gray-300"
                                    name="beds"
                                    value={beds}
                                    onChange={(e) => setBeds(e.target.value)}
                                >
                                    <option value="">Select Beds</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5+</option>
                                    {/* Add more bed options as needed */}
                                </select>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-primary-500 hover:bg-primary-600 text-white py-4 lg:rounded-md rounded-full mt-4 flex items-center justify-center"
                        >
                            <img src={inputSearch} alt="Search" className="mr-2" />
                            <span>Search</span>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
