import React, { useState, useEffect } from "react";
import Card from "../Card/Card";

export default function ResidentialForSale({ searchParams = {}, listings = [] }) {
    const [filteredResults, setFilteredResults] = useState([]);
    const [relatedResults, setRelatedResults] = useState([]);

    useEffect(() => {
        const isEmptySearch = Object.values(searchParams).every(param => param === "");

        const filtered = Array.isArray(listings) ? listings.filter((listing) => {
            // Parse the price, handling commas and currency symbols
            const listingPrice = parseInt(listing.price.replace(/[^0-9]/g, ""));
            const minPrice = searchParams.priceMin ? parseInt(searchParams.priceMin) : 0;
            const maxPrice = searchParams.priceMax ? parseInt(searchParams.priceMax) : Infinity;

            // Check if location matches any in the comma-separated list
            const locationMatches = !searchParams.location || 
                searchParams.location.split(",").some(loc => 
                    listing.location && listing.location.toLowerCase().includes(loc.trim().toLowerCase())
                );

            // Handle 5+ beds/baths correctly
            const bedsMatch = !searchParams.beds || 
                (searchParams.beds === "5" ? 
                    parseInt(listing.beds) >= 5 : 
                    parseInt(listing.beds) === parseInt(searchParams.beds));

            const bathsMatch = !searchParams.baths || 
                (searchParams.baths === "5" ? 
                    parseInt(listing.baths) >= 5 : 
                    parseInt(listing.baths) === parseInt(searchParams.baths));
            
            // Handle off-plan (status "false") properties
            const statusMatch = searchParams.status !== "false" || listing.status === "false";
            
            // Purpose matching (Sale or Rent)
            const purposeMatch = !searchParams.purpose || listing.purpose === searchParams.purpose;

            return (
                (!searchParams.city || listing.city === searchParams.city) &&
                locationMatches &&
                (!searchParams.propertyType || listing.propertyType === searchParams.propertyType) &&
                (listingPrice >= minPrice && listingPrice <= maxPrice) &&
                bedsMatch &&
                bathsMatch &&
                statusMatch &&
                purposeMatch &&
                (!searchParams.agentType || 
                    (searchParams.agentType === "Owner" ? 
                        listing.landlordName : 
                        listing.agentName))
            );
        }) : [];

        setFilteredResults(isEmptySearch ? listings : filtered);

        if (filtered.length === 0 && !isEmptySearch) {
            // Find related properties if no direct matches
            const related = Array.isArray(listings) ? listings.filter((listing) => {
                return (
                    (searchParams.city ? listing.city === searchParams.city : false) ||
                    (searchParams.propertyType ? listing.propertyType === searchParams.propertyType : false)
                );
            }) : [];
            setRelatedResults(related);
        } else {
            setRelatedResults([]);
        }
    }, [searchParams, listings]);

    return (
        <section className="py-8 px-4 lg:px-0 bg-primary font-primary text-primary">
            <div className="container mx-auto font-primary">
                <h1 className="text-3xl font-bold mb-6 text-primary flex justify-between items-center relative">
                    <span>
                        {searchParams.city ? `Properties in ${searchParams.city}` : "Popular Developments"}
                    </span>
                    <span className="absolute right-0 text-primary text-2xl animate-bounce">
                        ➡️
                    </span>
                </h1>

                {filteredResults.length > 0 ? (
                    <div className="flex overflow-x-auto gap-4 pb-4">
                        {filteredResults.map((item, index) => (
                            <div key={index} className="min-w-[250px]">
                                <Card item={item} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <p className="text-center text-primary">No properties match your search criteria.</p>
                        {relatedResults.length > 0 && (
                            <>
                                <h2 className="text-2xl font-semibold mt-8 text-primary">
                                    Related Properties in {searchParams.city} - {searchParams.propertyType}
                                </h2>
                                <div className="flex overflow-x-auto gap-4 pb-4 mt-4">
                                    {relatedResults.map((item, index) => (
                                        <div key={index} className="min-w-[250px]">
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