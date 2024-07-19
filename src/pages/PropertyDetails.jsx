import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ListingsContext from "../contexts/ListingsContext";

export default function PropertyDetails() {
    const { id } = useParams();
    const { listings, setListings } = useContext(ListingsContext);
    const [property, setProperty] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const selectedProperty = listings.find((listing) => listing._id === id);
        setProperty(selectedProperty);
        console.log(selectedProperty);
    }, [id, listings]);

    const handleEditProperty = () => {
        navigate(`/edit-property/${property._id}`);
    };

    const handleDeleteProperty = async () => {
        if (window.confirm("Are you sure you want to delete this property?")) {
            try {
                const response = await fetch(`https://backend-git-main-pawan-togas-projects.vercel.app/api/listings/${property._id}`, {
                    method: "DELETE",
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message);
                }

                // Set the delete message
                setIsDeleted(true);

                // Remove the deleted listing from the state
                setListings(prevListings => prevListings.filter(listing => listing._id !== property._id));

                // Redirect to homepage after showing the message
                setTimeout(() => {
                    navigate("/");
                }, 2000); // Redirect after 2 seconds

            } catch (error) {
                console.error("Failed to delete listing:", error);
            }
        }
    };

    const handleContactBroker = (contactMethod) => {
        if (!property) return;

        const message = `Property Details:\n\nTitle: ${property.title}\nPrice: ${property.price}\nCity: ${property.city}\nLocation: ${property.location}\nProperty Type: ${property.propertyType}\nBeds: ${property.beds}`;

        switch (contactMethod) {
            case 'Email':
                const emailSubject = `Interested in ${property.title}`;
                const mailtoLink = `mailto:${property.agentEmail}?subject=${encodeURIComponent(
                    emailSubject
                )}&body=${encodeURIComponent(message)}`;
                window.open(mailtoLink);
                break;
            case 'Call':
                const telLink = `tel:${property.agentCallNumber}`;
                window.open(telLink);
                break;
            case 'WhatsApp':
                const whatsappMessage = `https://wa.me/${property.agentWhatsapp}?text=${encodeURIComponent(
                    message
                )}`;
                window.open(whatsappMessage);
                break;
            default:
                break;
        }
    };

    // Render property details only if not deleted
    return (
        <div className="container mt-8">
            {isDeleted && (
                <div className="text-center bg-green-200 text-green-700 p-4 rounded mb-4">
                    Your ad has been deleted successfully!
                </div>
            )}
            {!isDeleted && property && (
                <>
                    <h2 className="text-xl font-semibold mb-3 dark:text-gray-100">Property Details</h2>
                    <div className="flex flex-col lg:flex-row">
                        <div className="lg:w-1/2 lg:pr-4">
                            <img className="rounded-lg mb-4 object-cover h-80 w-full" src={`backend-git-main-pawan-togas-projects.vercel.app/${property.image}`} alt={property.title} />
                        </div>
                        <div className="lg:w-1/2 lg:pl-4">
                            <h3 className="text-lg font-semibold mb-2 text-primary-500">{property.title}</h3>
                            <p className="text-sm mb-2 dark:text-gray-300">{property.price}</p>
                            <p className="mb-4 dark:text-gray-400 text-sm">{property.city}, {property.location}</p>
                            <p className="mb-4 dark:text-gray-400 text-sm">{property.propertyType}</p>
                            <p className="mb-4 dark:text-gray-400 text-sm">{property.beds} Beds</p>
                            <p className="mb-4 dark:text-gray-400 text-sm">{property.baths} Baths</p>
                            {
                                <>
                                    <p className="mb-4 dark:text-gray-400 text-sm">Landlord: {property.landlordName}</p>
                                    <p className="mb-4 dark:text-gray-400 text-sm">
  {property.status === "true" ? 'Property Complete' : 'Property Incomplete'}
</p>
  
                                </>
                             }
                            <p className="mb-4 text-sm">Broker: {property.broker}</p>
                            <div className="mb-4 text-sm flex items-center">
                                <EmailIcon style={{ cursor: 'pointer' }} onClick={() => handleContactBroker('Email')} />
                                <PhoneIcon style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={() => handleContactBroker('Call')} />
                                <WhatsAppIcon style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={() => handleContactBroker('WhatsApp')} />
                            </div>

                            <button
                                onClick={handleEditProperty}
                                className="px-6 py-3 bg-blue-600 text-white rounded mr-2"
                            >
                                Edit Property
                            </button>
                            <button
                                onClick={handleDeleteProperty}
                                className="px-6 py-3 bg-red-600 text-white rounded"
                            >
                                Delete Property
                            </button>
                        </div>
                    </div>
                </>
            )}
            {isDeleted && (
                <div className="flex justify-center mt-4">
                    <button onClick={() => navigate("/")} className="px-6 py-3 bg-green-600 text-white rounded">
                        Go to Home
                    </button>
                </div>
            )}
        </div>
    );
}
