import React, { useState,useEffect } from "react";
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
    const [baths, setBaths] = useState("");
    const [agentType, setAgentType] = useState("");
    const [status, setStatus] = useState("");
    const [purpose, setPurpose] = useState("");
    const [locationCounts, setLocationCounts] = useState([]);

    useEffect(() => {
        if (city) {
            fetch(`https://backend-git-main-pawan-togas-projects.vercel.app/api/listings/${city}`)
                .then(response => response.json())
                .then(data => {
                    // Ensure data is an array
                    if (Array.isArray(data)) {
                        setLocationCounts(data);
                    } else {
                        setLocationCounts([]); // or handle as needed
                        console.error('Expected array but received:', data);
                    }
                })
                .catch(error => console.error('Error fetching location counts:', error));
        } else {
            setLocationCounts([]);
        }
    }, [city]);
    const totalProperties = locationCounts.reduce((total, loc) => {
        return total + (typeof loc.count === 'number' ? loc.count : 0);
    }, 0);
    
    const handleSearch = (event) => {
        event.preventDefault();
        const searchParams = {
            city: city || "",
            location: locations.join(",") || "",
            propertyType: propertyType || "",
            priceMin: priceMin || "",
            priceMax: priceMax || "",
            beds: beds || "",
            baths: baths || "",
            agentType: agentType || "",
            status: status || "",
            purpose: purpose || ""
        };
        onSearch(searchParams); // Pass searchParams to onSearch function
    };
    
    const handleAddLocation = (e) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
            setLocations([...locations, e.target.value.trim()]);
            e.target.value = "";
        }
    };

    const handleRemoveLocation = (index) => {
        const updatedLocations = [...locations];
        updatedLocations.splice(index, 1);
        setLocations(updatedLocations);
    };

    const handleClearFilters = () => {
        setCity("");
        setLocations([]);
        setPropertyType("");
        setPriceMin("");
        setPriceMax("");
        setBeds("");
        setBaths("");
        setAgentType("");
        setStatus("");
        setPurpose("");
    };

    const handleDisplayAllListings = (event) => {
        event.preventDefault();
        onSearch({});
    };

    const handleLocationClick = (location) => {
        const query = new URLSearchParams({
            city,
            location,
        }).toString();
        window.location.href = `/properties?${query}`;
    };

    return (
        <section>
            <div className="container bg-grey-light lg:bg-banner bg-cover bg-center bg-no-repeat lg:my-2 lg:pb-10 lg:pt-5 rounded-md">
            <h1 className="text-2xl text-center font-semibold lg:text-white lg:mb-8 ">
                    Properties for Sale in UAE
                </h1>
                <div className="lg:bg-gray-800 lg:bg-opacity-50 rounded-md lg:p-4 lg:w-[88%] mx-auto">
                <div className="flex items-center space-x-2 lg:space-x-14 mb-4">
    <span className="hidden lg:inline-block text-base font-semibold lg:text-white">
        Searching in
    </span>
    <ul className="flex items-center space-x-20 lg:space-x-8 text-sm"> {/* Increased space here */}
        <li>
            <button
                className="bg-custom text-white hover:bg-custom duration-200 px-5 py-2 font-semibold rounded-full"
                onClick={handleDisplayAllListings}
            >
                Property for Sale
            </button>
        </li>
        <li>
            <Link className="bg-custom text-white hover:bg-custom duration-200 px-5 py-2 font-semibold rounded-full" to="/place-an-ad">
                <span>Place an Ad</span>
            </Link>
        </li>
    </ul>
</div>

                    <form className="lg:flex lg:flex-col lg:space-y-3 px-2 lg:px-0 py-4 lg:py-0 relative" onSubmit={handleSearch}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            <div className="flex flex-col mb-3">
                                <label className="mb-1 text-gray-300">City</label>
                                <select
                                    className="w-full p-2 lg:rounded-md rounded-full border border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
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
                                </select>
                            </div>
                            <div className="flex flex-col mb-3">
                                <label className="mb-1 text-gray-300">Location</label>
                                <div className="flex flex-wrap items-center">
                                    {locations.map((loc, index) => (
                                        <div key={index} className="flex items-center space-x-1 mb-1 mr-1 bg-gray-700 dark:bg-gray-900 px-2 py-1 rounded-full">
                                            <span className="text-sm text-gray-100">{loc}</span>
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
                                        className="flex-1 p-2 lg:rounded-md rounded-full border border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col mb-3">
                                <label className="mb-1 text-gray-300">Property Type</label>
                                <select
                                    className="w-full p-2 lg:rounded-md rounded-full border border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                                    name="propertyType"
                                    value={propertyType}
                                    onChange={(e) => setPropertyType(e.target.value)}
                                >
                                    <option value="">Select Property Type</option>
                                    <option value="Apartment">Apartment</option>
                                    <option value="Villa">Villa</option>
                                    <option value="Townhouse">Townhouse</option>
                                    <option value="Penthouse">Penthouse</option>
                                </select>
                            </div>
                            <div className="flex flex-col mb-3">
                                <label className="mb-1 text-gray-300">Min Price</label>
                                <input
                                    type="number"
                                    name="priceMin"
                                    placeholder="Min Price"
                                    value={priceMin}
                                    onChange={(e) => setPriceMin(e.target.value)}
                                    className="w-full p-2 lg:rounded-md rounded-full border border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                                />
                            </div>
                            <div className="flex flex-col mb-3">
                                <label className="mb-1 text-gray-300">Max Price</label>
                                <input
                                    type="number"
                                    name="priceMax"
                                    placeholder="Max Price"
                                    value={priceMax}
                                    onChange={(e) => setPriceMax(e.target.value)}
                                    className="w-full p-2 lg:rounded-md rounded-full border border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                                />
                            </div>
                            <div className="flex flex-col mb-3">
                                <label className="mb-1 text-gray-300">Beds</label>
                                <select
                                    className="w-full p-2 lg:rounded-md rounded-full border border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
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
                                </select>
                            </div>
                            <div className="flex flex-col mb-3">
                                <label className="mb-1 text-gray-300">Baths</label>
                                <select
                                    className="w-full p-2 lg:rounded-md rounded-full border border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                                    name="baths"
                                    value={baths}
                                    onChange={(e) => setBaths(e.target.value)}
                                >
                                    <option value="">Select Baths</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5+</option>
                                </select>
                            </div>
                            <div className="flex flex-col mb-3">
                                <label className="mb-1 text-gray-300">Owner Type</label>
                                <select
                                    className="w-full p-2 lg:rounded-md rounded-full border border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                                    name="agentType"
                                    value={agentType}
                                    onChange={(e) => setAgentType(e.target.value)}
                                >
                                    <option value="">Select Owner Type</option>
                                    <option value="Owner">Landlord</option>
                                    <option value="Agent">Agent</option>
                                </select>
                            </div>
                            <div className="flex flex-col mb-3">
                                <label className="mb-1 text-gray-300">Status</label>
                                <select
                                    className="w-full p-2 lg:rounded-md rounded-full border border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                                    name="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    <option value="Complete">Ready to Move</option>
                                    <option value="Incomplete">Under Construction</option>
                                </select>
                            </div>
                            <div className="flex flex-col mb-3">
                                <label className="mb-1 text-gray-300">Purpose</label>
                                <select
                                    className="w-full p-2 lg:rounded-md rounded-full border border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                                    name="purpose"
                                    value={purpose}
                                    onChange={(e) => setPurpose(e.target.value)}
                                >
                                    <option value="">Select Purpose</option>
                                    <option value="sell">Sell</option>
                                    <option value="buy">Buy</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-4 w-full ">
                            <button type="submit" className="bg-custom text-white flex items-center justify-center  w-1/2 px-6 py-2 rounded-full font-semibold mr-2 ">
                                <img src={inputSearch} alt="Search" className="w-5 h-5 mr-2" />
                                Search
                            </button>
                            <button
                                type="button"
                                onClick={handleClearFilters}
                                className="flex items-center justify-center bg-gray-700 text-white w-1/2 px-6 py-2 rounded-full font-semibold ml-2 bg-custom text-white"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </form>
                    {city && locationCounts.length > 0 && (
        <div className="mt-4">
            <h2 className="text-xl font-semibold text-custom">
                Properties by Location in {city} . {totalProperties} Ads
            </h2>
            <ul className="mt-2 flex flex-wrap gap-2 text-black">
                {locationCounts.map((loc, index) => (
                    <li
                        key={index}
                        className="flex items-center bg-custom text-white px-4 rounded shadow-md cursor-pointer"
                        onClick={() => handleLocationClick(loc.location)}
                    >
                        <span className="mr-2">{loc.location}</span>
                        <span className="text-black">{loc.count} properties</span>
                    </li>
                ))}
            </ul>
        </div>
    )}
                </div>
            </div>
        </section>
    );
}

