// Banner.jsx

import React, { useState } from "react";
import saleProperty from "../../assets/icons/sale-property.svg";
import inputSearch from "../../assets/icons/input-search.svg";
import { Link } from "react-router-dom";

export default function Banner({ onSearch, onDisplayAllListings, onPlaceAnAd }) {
    const [city, setCity] = useState("");
    const [location, setLocation] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [priceMin, setPriceMin] = useState("");
    const [priceMax, setPriceMax] = useState("");
    const [beds, setBeds] = useState("");

    const handleSearch = (event) => {
        event.preventDefault();
        const searchParams = {
            city: city || "",
            location: location || "",
            propertyType: propertyType || "",
            priceRange: `${priceMin}-${priceMax}` || "",
            beds: beds || ""
        };
        console.log(searchParams);
        onSearch(searchParams); // Pass the search params to the parent component
    };

    const handleDisplayAllListings = (event) => {
        event.preventDefault();
        onDisplayAllListings(); // Trigger function to display all listings
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
                                <input
                                    className="w-full p-4 lg:rounded-md rounded-full border border-gray-300/50 dark:border-gray-400/20 dark:bg-slate-800/40 dark:text-gray-300"
                                    placeholder="Type Location"
                                    type="text"
                                    name="location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="lg:flex lg:space-x-3">
                            <div className="flex flex-col w-full mb-3">
                                <label className="mb-1 text-gray-600 dark:text-gray-300">Property Type</label>
                                <select
                                    className="w-full p-4 lg:rounded-md rounded-full border border-gray-300/50 dark:border-gray-400/20 dark:bg-slate-800/40 dark:text-gray-300"
                                    name="propertyType"
                                    value={propertyType}
                                    onChange={(e) => setPropertyType(e.target.value)}
                                >
                                    <option value="">Select Property Type</option>
                                    <option value="House">TownHouse</option>
                                    <option value="Apartment">Apartment</option>
                                    <option value="Villa">Villa</option>
                                    {/* Add more property types as needed */}
                                </select>
                            </div>
                            <div className="flex flex-col w-full mb-3">
                                <label className="mb-1 text-gray-600 dark:text-gray-300">Price Range</label>
                                <div className="flex space-x-3">
                                    <input
                                        className="w-full p-4 lg:rounded-md rounded-full border border-gray-300/50 dark:border-gray-400/20 dark:bg-slate-800/40 dark:text-gray-300"
                                        placeholder="Min Price"
                                        type="number"
                                        name="priceMin"
                                        value={priceMin}
                                        onChange={(e) => setPriceMin(e.target.value)}
                                    />
                                    <input
                                        className="w-full p-4 lg:rounded-md rounded-full border border-gray-300/50 dark:border-gray-400/20 dark:bg-slate-800/40 dark:text-gray-300"
                                        placeholder="Max Price"
                                        type="number"
                                        name="priceMax"
                                        value={priceMax}
                                        onChange={(e) => setPriceMax(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col w-full mb-3">
                                <label className="mb-1 text-gray-600 dark:text-gray-300">Beds</label>
                                <input
                                    className="w-full p-4 lg:rounded-md rounded-full border border-gray-300/50 dark:border-gray-400/20 dark:bg-slate-800/40 dark:text-gray-300"
                                    placeholder="Number of Beds"
                                    type="number"
                                    name="beds"
                                    value={beds}
                                    onChange={(e) => setBeds(e.target.value)}
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn w-full py-4">
                            <img
                                src={inputSearch}
                                alt="input-search"
                                className="w-5 opacity-60 inline mr-2"
                            />
                            Search
                        </button>
                    </form>
                </div>
            </div>

            <div className="container lg:hidden grid grid-cols-3 gap-2 px-2 py-3 text-center text-xs">
                <a
                    className="flex flex-col space-y-1 items-center px-3 py-6 hover:underline rounded decoration-primary-500 border border-gray-300/40 dark:border-gray-400/30 shadow-sm"
                    onClick={handleDisplayAllListings}
                    href="#"
                >
                    <img className="w-5" src={saleProperty} alt="property-sale-icon" />
                    <span className="dark:text-gray-100">Property for Sale</span>
                </a>
                <a
                    className="flex flex-col space-y-1 items-center px-3 py-6 hover:underline rounded decoration-primary-500 border border-gray-300/40 dark:border-gray-400/30 shadow-sm"
                    onClick={onPlaceAnAd}
                    href="#"
                >
                    <img className="w-5" src={saleProperty} alt="place-ad-icon" />
                    <span className="dark:text-gray-100">Place an Ad</span>
                </a>
            </div>
        </section>
    );
}
