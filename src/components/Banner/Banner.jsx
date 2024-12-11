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
                    // console.log(data); // Inspect the API response
    
                    // Grouping properties by location
                    const locationMap = data.reduce((acc, property) => {
                        const location = property.location;
                        if (location) {
                            if (!acc[location]) {
                                acc[location] = { location: location, count: 0 };
                            }
                            acc[location].count += 1;
                        }
                        return acc;
                    }, {});
    
                    // Convert the grouped data back to an array
                    const groupedLocations = Object.values(locationMap);
                    setLocationCounts(groupedLocations);
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
            status: status !== "" ? status : "", // Ensure status is included in the search
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

    const handleSaleClick = () => {
        setPurpose("sell"); // For sale, set the purpose to 'sell'
        onSearch({ purpose: "sell" }); // Trigger search with purpose 'sell'
    };
    
    const handleRentClick = () => {
        setPurpose("buy"); // For rent, set the purpose to 'buy'
        onSearch({ purpose: "buy" }); // Trigger search with purpose 'buy'
    };
    
    const handleOffPlanClick = () => {
        const searchParams = {
            city: city || "",
            location: locations.join(",") || "",
            propertyType: propertyType || "",
            priceMin: priceMin || "",
            priceMax: priceMax || "",
            beds: beds || "",
            baths: baths || "",
            agentType: agentType || "",
            status: "false", // This ensures that only off-plan properties are shown
            purpose: purpose || ""
        };
    
        // console.log("Searching for off-plan properties with parameters:", searchParams); // Add this to inspect search parameters
    
        onSearch(searchParams); // Pass the search params including the status=false for off-plan properties
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
    <div
        className="container font-primary bg-banner lg:bg-cover lg:bg-center lg:bg-no-repeat lg:my-2 lg:pb-10 lg:pt-5 rounded-m"
        // style={{ backgroundImage: `url('/homepage-banner-img.jpeg')` }} // Applies background image on large screens
    >
                {/* "Your InvestiBayt Journey Starts Here" Section */}
                <h1 className="text-2xl text-center font-primary text-primary lg:text-primary lg:mb-8 mx-auto">
    Your InvestiBayt Journey Starts Here
</h1>

        <div className="lg:bg-banner lg:bg-opacity-50 rounded-md lg:p-4 lg:w-[88%] mx-auto">
        <div className="flex flex-wrap justify-center items-center space-x-4 lg:space-x-10 mb-6">
  <ul className="flex flex-wrap justify-center items-center gap-2 lg:gap-6 text-sm sm:text-base">
    <li>
      <button
        className="bg-primary text-primary hover:bg-primary-dark transition duration-300 px-4 py-2 sm:px-6 sm:py-2 rounded-full font-semibold shadow-md"
        onClick={handleSaleClick}
      >
        Sale
      </button>
    </li>
    <li>
      <button
        className="bg-primary text-primary hover:bg-primary-dark transition duration-300 px-4 py-2 sm:px-6 sm:py-2 rounded-full font-semibold shadow-md"
        onClick={handleRentClick}
      >
        Rent
      </button>
    </li>
    <li>
      <button
        className="bg-primary text-primary hover:bg-primary-dark  transition duration-300 px-4 py-2 sm:px-6 sm:py-2 rounded-full font-semibold shadow-md"
        onClick={handleOffPlanClick}
      >
        Off-Plan
      </button>
    </li>
    <li>
      <Link
        className="bg-primary text-primary hover:bg-primary-dark transition duration-300 px-4 py-2 sm:px-6 sm:py-2 rounded-full font-semibold shadow-md"
        to="/place-an-ad"
      >
        Create A Listing
      </Link>
    </li>
  </ul>
</div>



          <form className="lg:flex lg:flex-col lg:space-y-3 px-2 lg:px-0 py-4 lg:py-0 relative bg-primary lg:bg-transparent" onSubmit={handleSearch}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                             {/* City Input */}
        <div className="flex flex-col mb-3">
            <label className="mb-1 font-playfair  text-primary">City</label>
            <select
                className="w-full p-3 h-12 rounded-md "
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            >
                <option value="" className=" font-playfair ">Select City</option>
                                    <option value="Dubai" className=" font-playfair ">Dubai</option>
                                    <option value="Abu Dhabi" className=" font-playfair ">Abu Dhabi</option>
                                    <option value="Sharjah" className=" font-playfair ">Sharjah</option>
                                    <option value="Ajman" className=" font-playfair ">Ajman</option>
                                    <option value="Fujairah" className=" font-playfair ">Fujairah</option>
                                    <option value="Ras Al Khaimah" className=" font-playfair ">Ras Al Khaimah</option>
                                    <option value="Umm Al Quwain" className=" font-playfair ">Umm Al Quwain</option>
            </select>
        </div>

        {/* Location Input */}
        <div className="flex flex-col mb-3">
            <label className="mb-1 text-primary font-playfair">Location</label>
            <div className="flex flex-wrap items-center">
                <input
                    type="text"
                    placeholder="Add location and press Enter"
                    onKeyPress={handleAddLocation}
                    className="flex-1 p-3 h-12 rounded-md border border-primary dark:border-primary dark:bg-primary dark:text-primary"
                />
                {/* Location Chips */}
                {locations.map((loc, index) => (
                    <div key={index} className="flex items-center space-x-1 mb-1 mr-1 bg-primary dark:bg-primary px-2 py-1 rounded-full">
                        <span className="text-sm text-primary">{loc}</span>
                        <button type="button" onClick={() => handleRemoveLocation(index)} className="ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>

        {/* Property Type */}
        <div className="flex flex-col mb-3">
            <label className="mb-1 text-primary font-playfair">Property Type</label>
            <select
                className="w-full p-3 h-12 rounded-md "
                name="propertyType"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
            >
                <option value="" className=" font-playfair ">Select Property Type</option>
                                    <option value="Apartment" className=" font-playfair ">Apartment</option>
                                    <option value="Villa" className=" font-playfair ">Villa</option>
                                    <option value="Townhouse" className=" font-playfair ">Townhouse</option>
                                    <option value="Penthouse" className=" font-playfair ">Penthouse</option>
            </select>
        </div>

        {/* Min Price */}
        <div className="flex flex-col mb-3">
            <label className="mb-1 text-primary font-playfair">Min Price</label>
            <input
                type="number"
                name="priceMin"
                placeholder="Min Price"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                className="w-full p-3 h-12 rounded-md font-playfair border border-primary dark:border-primary dark:bg-primary dark:text-primary"
            />
        </div>

        {/* Max Price */}
        <div className="flex flex-col mb-3">
            <label className="mb-1 text-primary font-playfair">Max Price</label>
            <input
                type="number"
                name="priceMax"
                placeholder="Max Price"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                className="w-full p-3 h-12 font-playfair rounded-md border border-primary dark:border-primary dark:bg-primary dark:text-primary"
            />
        </div>

        {/* Beds */}
        <div className="flex flex-col mb-3">
            <label className="mb-1 text-primary font-playfair">Beds</label>
            <select
                className="w-full font-playfair p-3 h-12 rounded-md  dark:border-primary dark:bg-primary dark:text-primary"
                name="beds"
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
            >
                 <option value="" className="text-primary font-playfair ">Select Beds</option>
                                    <option value="1" className="text-primary font-playfair ">1</option>
                                    <option value="2" className="text-primary font-playfair ">2</option>
                                    <option value="3" className="text-primary font-playfair ">3</option>
                                    <option value="4" className="text-primary font-playfair ">4</option>
                                    <option value="5" className="text-primary font-playfair ">5+</option>
            </select>
        </div>

        {/* Baths */}
        <div className="flex flex-col mb-3">
            <label className="mb-1 text-primary font-playfair">Baths</label>
            <select
                className="w-full font-playfair p-3 h-12 rounded-md  dark:border-primary dark:bg-primary dark:text-primary"
                name="baths"
                value={baths}
                onChange={(e) => setBaths(e.target.value)}
            >
                <option value="" className="text-primary font-playfair ">Select Baths</option>
                                    <option value="1" className="text-primary font-playfair ">1</option>
                                    <option value="2" className="text-primary font-playfair ">2</option>
                                    <option value="3" className="text-primary font-playfair ">3</option>
                                    <option value="4" className="text-primary font-playfair ">4</option>
                                    <option value="5" className="text-primary font-playfair ">5+</option>
            </select>
        </div>

        {/* Agent Type */}
        <div className="flex flex-col mb-3">
            <label className="mb-1 text-primary font-playfair">Owner Type</label>
            <select
                className="w-full  font-playfair p-3 h-12 rounded-md dark:border-primary dark:bg-primary dark:text-primary"
                name="agentType"
                value={agentType}
                onChange={(e) => setAgentType(e.target.value)}
            >
                <option value="" className="text-primary font-playfair ">Select Owner Type</option>
                <option value="Owner" className="text-primary font-playfair ">Landlord</option>
                <option value="Agent" className="text-primary font-playfair ">Agent</option>
            </select>
        </div>
    </div>
    <div className="flex items-center justify-between mt-4 w-full ">
                            <button type="submit" className="bg-button text-button flex items-center justify-center  w-1/2 px-6 py-2 rounded-full font-semibold mr-2 ">
                                <img src={inputSearch} alt="Search" className="w-5 h-5 mr-2 font-playfair" />
                                Search
                            </button>
                            <button
                                type="button"
                                onClick={handleClearFilters}
                                className="flex items-center font-playfair justify-center bg-primary text-primary w-1/2 px-6 py-2 rounded-full font-semibold ml-2 bg-primary text-primary"
                            >
                                Clear Filters
                            </button>
                        </div>
</form>


                </div>
            </div>
            {city && locationCounts.length > 0 && (
    <div className=" bg-primary font-primary pl-14">
        <h2 className="text-xl font-semibold  text-primary font-primary">
            Properties by Location in {city}. {totalProperties} Ads
        </h2>
        <ul className="mt-2 flex flex-wrap gap-2 text-black">
            {locationCounts.map((loc, index) => (
                <li 
                    key={index}
                    className="flex  font-playfair items-center px-4 rounded shadow-md cursor-pointer text-primary"
                    onClick={() => handleLocationClick(loc.location)}
                >
                    <span className="mr-2 font-playfair truncate max-w-[120px]">{loc.location.split(' ').slice(0, 2).join(' ')}</span>
                    <span className="text-primary font-playfair">( {loc.count} )</span>
                </li>
            ))}
        </ul>
    </div>
)}
        </section>
    );
}

