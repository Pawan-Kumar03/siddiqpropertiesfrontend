import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ListingsContext from "../contexts/ListingsContext";
import AuthContext from "../contexts/UserContext";

export default function PropertyDetails() {
  const { id } = useParams();
  const { listings } = useContext(ListingsContext);
  const { user } = useContext(AuthContext);
  const [property, setProperty] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const selectedProperty = listings.find((listing) => listing._id === id);
    if (selectedProperty) {
      setProperty(selectedProperty);
    } else {
      fetchProperty();
    }
  }, [id, listings]);

  const fetchProperty = async () => {
    try {
      const response = await fetch(
        `https://backend-git-main-pawan-togas-projects.vercel.app/api/listings/${id}`
      );
      if (!response.ok) {
        throw new Error("Property not found");
      }
      const data = await response.json();
      setProperty(data);
    } catch (error) {
      console.error("Failed to fetch property:", error);
    }
  };

  const handleContactBroker = (contactMethod) => {
    if (!property) return;

    const propertyLink = `${window.location.origin}/property/${property._id}`;
    const message = `Property Details:\n\nTitle: ${property.title}\nPrice: ${property.price}\nCity: ${property.city}\nLocation: ${property.location}\nProperty Type: ${property.propertyType}\nBeds: ${property.beds}\n\nProperty Link: ${propertyLink}`;

    switch (contactMethod) {
      case "Email":
        const emailSubject = `Interested in ${property.title}`;
        const mailtoLink = `mailto:${
          property.agentEmail
        }?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(
          message
        )}`;
        window.open(mailtoLink);
        break;
      case "Call":
        const telLink = `tel:${property.agentCallNumber}`;
        window.open(telLink);
        break;
      case "WhatsApp":
        const whatsappMessage = `https://wa.me/${
          property.agentWhatsapp
        }?text=${encodeURIComponent(message)}`;
        window.open(whatsappMessage);
        break;
      default:
        break;
    }
  };

  const processImages = (images) => {
    if (typeof images === "string") {
      return images
        .split("/uploads/")
        .filter((image) => image)
        .map((image) => `/uploads/${image}`);
    }
    return images;
  };

  return (
    <div className="container mt-8 bg-gray-800 text-gray-100 p-6 rounded-lg">
      {!isDeleted && property && (
        <>
          <h2 className="text-2xl font-bold mb-4">{property.title}</h2>
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 lg:pr-6">
              {property.images && processImages(property.images).length > 0 ? (
                <Carousel
                  showThumbs={false}
                  infiniteLoop
                  useKeyboardArrows
                  autoPlay
                  className="h-80"
                >
                  {processImages(property.images).map((image, index) => (
                    <div key={index}>
                      <img
                        className="rounded-lg object-cover h-80 w-full"
                        src={image}
                        alt={property.title}
                      />
                    </div>
                  ))}
                </Carousel>
              ) : (
                <img
                  className="rounded-lg mb-4 object-cover h-80 w-full"
                  src={property.image}
                  alt={property.title}
                />
              )}
            </div>
            <div className="lg:w-1/2 lg:pl-6">
              <h3 className="text-lg font-semibold text-yellow-500 mb-2">
                {property.price} AED
              </h3>
              <p className="text-sm mb-2">
                <strong>City:</strong> {property.city}
              </p>
              <p className="text-sm mb-2">
                <strong>Location:</strong> {property.location}
              </p>
              <p className="text-sm mb-2">
                <strong>Property Type:</strong> {property.propertyType}
              </p>
              <p className="text-sm mb-2">
                <strong>Beds:</strong> {property.beds}
              </p>
              <p className="text-sm mb-2">
                <strong>Baths:</strong> {property.baths}
              </p>
              <p className="text-sm mb-2">
                <strong>Landlord:</strong> {property.landlordName}
              </p>
              <p className="text-sm mb-2">
                <strong>Building:</strong> {property.building}
              </p>
              <p className="text-sm mb-2">
                <strong>Status:</strong>{" "}
                {property.status === "false" ? "Incomplete" : "Complete"}
              </p>
              <div className="mt-4 flex items-center space-x-4">
                <EmailIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => handleContactBroker("Email")}
                />
                <PhoneIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => handleContactBroker("Call")}
                />
                <WhatsAppIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => handleContactBroker("WhatsApp")}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
