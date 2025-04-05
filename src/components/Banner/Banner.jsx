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
    const [isMobile, setIsMobile] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640 ) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Set the initial state on component mount

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (city) {
            fetch(`https://backend-h9z5egn2i-pawan-togas-projects.vercel.app/api/listings/${city}`)
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
    // Check if any filters are applied
  const isFilterApplied = city || locations.length > 0 || propertyType || priceMin || priceMax || beds || baths;

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
                className={`container font-primary lg:relative lg:bg-right lg:bg-no-repeat lg:bg-[length:50%] lg:my-2 lg:pt-10 rounded-md ${
                    !isMobile ? "bg-banner" : ""
                }`}
                style={{
                    backgroundImage: !isMobile ? "url('/bg-remove.png')" : "none",
                    backgroundPosition: "top right",
                }}
            >

        <div className="lg:bg-banner lg:bg-opacity-50 rounded-md lg:p-4 lg:w-[88%] mx-auto">
        <div className="flex flex-wrap justify-center items-center space-x-4 lg:space-x-10 mb-8">
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
    <li>
      <Link
        className="bg-primary text-primary hover:bg-primary-dark transition duration-300 px-4 py-2 sm:px-6 sm:py-2 rounded-full font-semibold shadow-md"
        to="/AgentProfile"
      >
        Agent
      </Link>
    </li>
    <li>
      <Link
        className="bg-primary text-primary hover:bg-primary-dark transition duration-300 px-4 py-2 sm:px-6 sm:py-2 rounded-full font-semibold shadow-md"
        to="/Broker"
      >
        Broker
      </Link>
    </li>
  </ul>
</div>

{/* <div className="bg-primary text-primary min-h-screen overflow-x-hidden">
                    <h1 className="font-aller font-light text-4xl">Welcome to the Real Estate Listings Aller(Light)</h1>
                    <h2 className="font-aller font-normal text-3xl">Browse Our Property Collection Aller(Regular)</h2>
                    <h3 className="font-aller font-bold text-2xl">Special Offers Just for You Aller(Bold)</h3>
                    <h1 className="font-primary text-4xl">Welcome to the Real Estate Listings previous font</h1>
                </div> */}
               

               <h1
  className="text-1rem text-center font-primary text-primary mt-[-1rem] 
             lg:text-5xl lg:text-left lg:mt-28 lg:mb-8">
  Your <span className="animate-blink font-bold">InvestiBayt</span>
  <span className="lg:block hidden -mt-10 relative"> <br />Journey Starts Here</span>
  <span className="lg:hidden"> Journey Starts Here</span>
</h1>


<form
      className="px-3 py-3 bg-primary rounded-lg lg:grid lg:grid-cols-8 lg:gap-4"
      onSubmit={handleSearch}
    >
      {/* Toggle Filters Button for Mobile */}
      <button
        type="button"
        className="lg:hidden bg-button text-button hover:bg-primary-dark transition duration-300 px-4 py-2 rounded-full font-semibold shadow-md w-full mb-3"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Filter Fields Container */}
      <div
        className={`${
          showFilters ? "block" : "hidden"
        } lg:block lg:contents space-y-4 lg:space-y-0`}
      >
        {/* City Filter */}
        <div className="flex flex-col w-full">
          <label className="mb-1 text-sm font-medium text-primary">City</label>
          <select
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-2 h-10 rounded-md border border-primary text-sm text-primary w-full"
          >
            <option value="">Any</option>
            <option value="Dubai">Dubai</option>
            <option value="Abu Dhabi">Abu Dhabi</option>
            <option value="Sharjah">Sharjah</option>
            <option value="Ajman">Ajman</option>
            <option value="Fujairah">Fujairah</option>
            <option value="Ras Al Khaimah">Ras Al Khaimah</option>
            <option value="Umm Al Quwain">Umm Al Quwain</option>
          </select>
        </div>

        {/* Location Filter */}
        <div className="flex flex-col w-full">
          <label className="mb-1 text-sm font-medium text-primary">Location</label>
          <input
            type="text"
            placeholder="Add location and press enter"
            onKeyPress={handleAddLocation}
            className="p-2 h-10 rounded-md border border-primary text-sm text-primary w-full"
          />
          {locations.map((loc, index) => (
            <div
              key={index}
              className="flex items-center space-x-1 mb-1 bg-primary px-2 py-1 rounded-full"
            >
              <span className="text-sm text-primary">{loc}</span>
              <button
                type="button"
                onClick={() => handleRemoveLocation(index)}
                className="ml-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Property Type Filter */}
        <div className="flex flex-col w-full">
          <label className="mb-1 text-sm font-medium text-primary">Property Type</label>
          <select
            name="propertyType"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="p-2 h-10 rounded-md border border-primary text-sm text-primary w-full"
          >
            <option value="">Any</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Penthouse">Penthouse</option>
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="flex flex-col w-full">
          <label className="mb-1 text-sm font-medium text-primary">Price Range</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="min"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              className="p-2 h-10 rounded-md text-primary border border-primary focus:ring-2 focus:ring-gray-500 outline-none w-1/2"
            />
            <input
              type="text"
              placeholder="max"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              className="p-2 h-10 rounded-md text-primary border border-primary focus:ring-2 focus:ring-gray-500 outline-none w-1/2"
            />
          </div>
        </div>

        {/* Beds Filter */}
        <div className="flex flex-col w-full">
          <label className="mb-1 text-sm font-medium text-primary">Beds</label>
          <select
            name="beds"
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
            className="p-2 h-10 rounded-md border border-primary text-sm text-primary w-full"
          >
            <option value="">Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5+</option>
          </select>
        </div>

        {/* Baths Filter */}
        <div className="flex flex-col w-full">
          <label className="mb-1 text-sm font-medium text-primary">Baths</label>
          <select
            name="baths"
            value={baths}
            onChange={(e) => setBaths(e.target.value)}
            className="p-2 h-10 rounded-md border border-primary text-sm text-primary w-full"
          >
            <option value="">Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5+</option>
          </select>
        </div>
        {/* Search and Clear Filters Buttons */}
      <div className="flex items-center gap-4 w-full col-span-2 mt-auto">
        <button
          type="submit"
          className="bg-button text-button hover:bg-primary-dark transition duration-300 px-4 py-2 rounded-full font-semibold shadow-md w-full"
        >
          Search
        </button>
        {isFilterApplied && (
          <button
            type="button"
            onClick={handleClearFilters}
            className="bg-primary-dark text-primary hover:bg-primary transition duration-300 px-4 py-2 rounded-full font-semibold shadow-md"
          >
            Clear
          </button>
        )}
      </div>
      </div>

      
    </form>
  

                </div>

            </div>
            {city && locationCounts.length > 0 && (
    <div className="bg-primary font-primary pl-14">
        <h2 className="text-xl font-semibold text-primary font-primary">
            Properties by Location in {city}. {totalProperties} Ads
        </h2>
        <div className="mt-2 flex overflow-x-auto space-x-2">
            {locationCounts.map((loc, index) => (
                <div
                    key={index}
                    className="flex-shrink-0 font-playfair items-center px-4 py-2 rounded shadow-md cursor-pointer text-primary bg-white"
                    onClick={() => handleLocationClick(loc.location)}
                    style={{ minWidth: '150px' }}
                >
                    <span className="mr-2 font-playfair truncate max-w-[120px]">
                        {loc.location.split(' ').slice(0, 2).join(' ')}
                    </span>
                    <span className="text-primary font-playfair">({loc.count})</span>
                </div>
            ))}
        </div>
    </div>
)}

        </section>
    );
}

