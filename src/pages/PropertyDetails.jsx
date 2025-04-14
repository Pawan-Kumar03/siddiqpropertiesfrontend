import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ArrowLeft, X } from "lucide-react";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ListingsContext from "../contexts/ListingsContext";
import AuthContext from "../contexts/UserContext";
import AgentCard from "../components/Card/AgentCard";

export default function PropertyDetails() {
  const { id } = useParams();
  const { listings } = useContext(ListingsContext);
  const { user } = useContext(AuthContext);
  const [property, setProperty] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null); 
  const [agent, setAgent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const selectedProperty = listings.find((listing) => listing._id === id);
    if (selectedProperty) {
      setProperty(selectedProperty);
      fetchAgent(selectedProperty.agentEmail); // Fetch agent data
    } else {
      fetchProperty();
    }
  }, [id, listings]);

  const fetchProperty = async () => {
    try {
      const response = await fetch(
        `https://siddiqproperties-backend-b0esbfg2b9g9a0fj.uaenorth-01.azurewebsites.net/api/listings/${id}`
      );
      if (!response.ok) throw new Error("Property not found");

      const data = await response.json();
      setProperty(data);
      fetchAgent(data.agentEmail); // Fetch agent when property is loaded
    } catch (error) {
      console.error("Failed to fetch property:", error);
    }
  };

  const fetchAgent = async (agentEmail) => {
    if (!agentEmail) return;

    try {
      const response = await fetch(
        `https://siddiqproperties-backend-b0esbfg2b9g9a0fj.uaenorth-01.azurewebsites.net/api/agents/pawan.kumar@investibayt.com`
      );
      if (!response.ok) throw new Error("Agent not found");

      const agentData = await response.json();
      setAgent(agentData);
    } catch (error) {
      console.error("Failed to fetch agent:", error);
    }
  };


  const openFullscreenImage = (image) => {
    setFullscreenImage(image);
  };

  const closeFullscreenImage = () => {
    setFullscreenImage(null);
  };

  const handleEditProperty = () => {
    navigate(`/edit-property/${property._id}`);
  };

  const handleDeleteProperty = async () => {
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    const token = parsedUser.token;

    try {
      const response = await fetch(
        `https://siddiqproperties-backend-b0esbfg2b9g9a0fj.uaenorth-01.azurewebsites.net/api/listings/${property._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      setIsDeleted(true);
      // Optionally, you could also update the listings context here

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Failed to delete listing:", error);
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
  const handleViewPDF = () => {
    if (property.pdf) {
      window.open(property.pdf, "_blank");
    }
  };
  return (
    <div className="min-h-screen bg-background">
      {isDeleted && (
        <div className="max-w-7xl mx-auto px-4 py-6 text-center bg-green-100 text-green-800 rounded-lg mt-8">
          Your ad has been deleted successfully!
        </div>
      )}
      
      {!isDeleted && property && (
        <div className="w-full">
          {/* Navigation Bar */}
          <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium transition-colors rounded-full hover:bg-muted"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </button>
            
            <button
              onClick={property.pdf ? handleViewPDF : undefined}
              disabled={!property.pdf}
              className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                property.pdf
                  ? "hover:bg-muted"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              View Brochure
            </button>
          </div>

          {/* Full Width Image Section */}
          <div className="w-full mb-8">
            {property.images && processImages(property.images).length > 1 ? (
              <div className="w-full h-[70vh]">
                <Carousel
                  showThumbs={false}
                  infiniteLoop
                  useKeyboardArrows
                  autoPlay
                  className="h-full"
                >
                  {processImages(property.images).map((image, index) => (
                    <div
                      key={index}
                      className="w-full h-[70vh]"
                      onClick={() => openFullscreenImage(image)}
                    >
                      <img
                        src={image}
                        alt={`${property.title} - ${index + 1}`}
                        className="w-full h-full object-cover cursor-pointer"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            ) : (
              <div
                className="w-full h-[70vh]"
                onClick={() => openFullscreenImage(property.image)}
              >
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
              <p className="text-2xl font-semibold mb-6">{property.price}</p>
              
              <div className="space-y-4 mb-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm font-medium">Property Type</p>
                    <p className="text-lg">{property.propertyType}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm font-medium">Purpose</p>
                    <p className="text-lg">{property.purpose}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm font-medium">Beds</p>
                    <p className="text-lg">{property.beds}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm font-medium">Baths</p>
                    <p className="text-lg">{property.baths}</p>
                  </div>
                </div>
              </div>

              <div className="prose max-w-none mb-8">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-muted-foreground">{property.description}</p>
              </div>

              {property.amenities && property.amenities.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {property.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-lg bg-muted text-sm"
                      >
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Contact Buttons */}
          <div className="mb-4 flex items-center space-x-4 text-primary">
            <EmailIcon
              style={{ cursor: "pointer" }}
              onClick={() => handleContactBroker("Email")}
              className=" transition duration-300"
            />
            <PhoneIcon
              style={{ cursor: "pointer" }}
              onClick={() => handleContactBroker("Call")}
              className=" transition duration-300"
            />
            <WhatsAppIcon
              style={{ cursor: "pointer" }}
              onClick={() => handleContactBroker("WhatsApp")}
              className=" transition duration-300"
            />
          </div>

            </div>

            {/* Sticky Agent Section */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {agent && <AgentCard agent={agent} />}
                
              
                {user && property && user._id === property.user && (
                  <div className="space-y-3">
                    <button
                      onClick={handleEditProperty}
                      className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Edit Property
                    </button>
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="w-full px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Delete Property
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={closeFullscreenImage}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img
              src={fullscreenImage}
              alt="Fullscreen View"
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-background/50 hover:bg-background/70 transition-colors"
              onClick={closeFullscreenImage}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-background rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6 text-muted-foreground">
              Are you sure you want to delete this property?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProperty}
                className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground hover:opacity-90 transition-opacity"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


