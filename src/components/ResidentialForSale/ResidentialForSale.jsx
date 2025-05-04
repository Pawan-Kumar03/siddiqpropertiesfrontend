import React, { useState, useEffect } from "react";
import Card from "../Card/Card";

export default function ResidentialForSale({ searchParams = {}, listings = [] }) {
    const [filteredResults, setFilteredResults] = useState([]);
    const [relatedResults, setRelatedResults] = useState([]);
    const [isVertical, setIsVertical] = useState(false);

    // Helper function to extract numeric price from string
    const extractPrice = (priceString) => {
        const prices = priceString.split('-').map(p => 
            parseInt(p.replace(/[^0-9]/g, ""))
        );
        return Math.max(...prices);
    };

    useEffect(() => {
        const isEmptySearch = Object.values(searchParams).every((param) => param === "");

        const filtered = Array.isArray(listings)
            ? listings.filter((listing) => {
                const listingBeds = String(listing.beds || "")
  .split(",")
  .map((b) => parseInt(b.trim().replace("+", "")) || 0);

const selectedBeds = String(searchParams.beds || "")
  .split(",")
  .map((b) => parseInt(b.trim()) || 0);

const bedsMatch = () => {
  if (!searchParams.beds) return true;
  return selectedBeds.some((bed) => listingBeds.includes(bed));
};

const listingBaths = String(listing.baths || "")
.split(",")
.map((b) => parseInt(b.trim().replace("+", "")) || 0);

const selectedBaths = String(searchParams.baths || "")
.split(",")
.map((b) => parseInt(b.trim()) || 0);

const bathsMatch = () => {
if (!searchParams.baths) return true;
return selectedBaths.some((bath) => listingBaths.includes(bath));
};
// Extract and clean listing price string
const priceString = listing.price.replace(/[^0-9\-]/g, ""); // Remove everything except digits and dashes
const priceParts = priceString.split("-");
const listingMinPrice = parseInt(priceParts[0]) || 0;
const listingMaxPrice = parseInt(priceParts[1]) || listingMinPrice;

// Clean and parse user input prices
const filterMinPrice = searchParams.priceMin
  ? parseInt(searchParams.priceMin.replace(/,/g, ""))
  : null;

const filterMaxPrice = searchParams.priceMax
  ? parseInt(searchParams.priceMax.replace(/,/g, ""))
  : null;

// Determine if price is in acceptable range
let priceInRange = true;

if (filterMinPrice !== null && filterMaxPrice !== null) {
  // If both min and max are provided
  priceInRange =
    listingMaxPrice >= filterMinPrice && listingMinPrice <= filterMaxPrice;
} else if (filterMinPrice !== null) {
  // Only min is provided
  priceInRange = listingMaxPrice >= filterMinPrice;
} else if (filterMaxPrice !== null) {
  // Only max is provided
  priceInRange = listingMinPrice <= filterMaxPrice;
}



                  return (
                      (!searchParams.city || listing.city === searchParams.city) &&
                      (!searchParams.location || searchParams.location.split(",").some((loc) =>
                          listing.location.toLowerCase().includes(loc.trim().toLowerCase())
                      )) &&
                      (!searchParams.propertyType || listing.propertyType === searchParams.propertyType) &&
                      priceInRange &&
                      bedsMatch() &&
                      bathsMatch() &&
                      (!searchParams.status || listing.status.toString() === searchParams.status) &&
                      (!searchParams.purpose || listing.purpose === searchParams.purpose) &&
                      (!searchParams.agentType || (
                          searchParams.agentType === "Owner" ? listing.landlordName : listing.agentName
                      ))
                  );
              })
            : [];

        if (isEmptySearch) {
            // Sort listings by price (high to low) and take top 10
            const sortedListings = [...listings].sort((a, b) => {
                const priceA = extractPrice(a.price);
                const priceB = extractPrice(b.price);
                return priceB - priceA;
            }).slice(0, 10);
            setFilteredResults(sortedListings);
        } else {
            setFilteredResults(filtered);
        }

        if (filtered.length === 0 && !isEmptySearch) {
            const related = Array.isArray(listings)
                ? listings.filter((listing) => {
                      return (
                          (searchParams.city ? listing.city === searchParams.city : false) ||
                          (searchParams.propertyType ? listing.propertyType === searchParams.propertyType : false)
                      );
                  })
                : [];
            setRelatedResults(related);
        } else {
            setRelatedResults([]);
        }

        // Set vertical layout after search
        if (!isEmptySearch) {
            setIsVertical(true);
        } else {
            setIsVertical(false);
        }
    }, [searchParams, listings]);

    return (
        <section className="py-8 px-4 lg:px-0 bg-primary font-aller font-light text-primary">
            <div className="container mx-auto font-aller font-light">
                <h1 className="text-3xl font-aller font-bold mb-6 text-primary flex justify-between items-center relative">
                    <span>
                        {searchParams.city
                            ? `Properties in ${searchParams.city}`
                            : "Popular Developments"}
                    </span>
                    {isVertical ? (
                        <span className="absolute right-0 text-primary text-2xl animate-bounce">↓</span>
                    ) : (
                        <span className="absolute right-0 text-primary text-2xl animate-bounce">→</span>
                    )}
                </h1>

                {filteredResults.length > 0 ? (
                    <div
                        className={`${
                            isVertical
                                ? "grid grid-cols-1 lg:grid-cols-2 gap-6"
                                : "flex overflow-x-scroll space-x-4"
                        }`}
                    >
                        {filteredResults.map((item, index) => (
                            <div
                                key={index}
                                className={`${!isVertical ? "min-w-[300px]" : ""}`}
                            >
                                <Card item={item} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <p className="text-center text-primary font-aller font-light">
                            No properties match your search criteria.
                        </p>
                        {relatedResults.length > 0 && (
                            <>
                                <h2 className="text-2xl font-aller font-bold mt-8 text-primary font-aller font-light">
                                    Related Properties in {searchParams.city} - {searchParams.propertyType}
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {relatedResults.map((item, index) => (
                                        <div key={index}>
                                            <Card item={item} />
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}