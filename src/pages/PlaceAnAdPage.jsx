import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ListingsContext from "../contexts/ListingsContext"; // Import ListingsContext

export default function PlaceAnAdPage() {
  const { addListing } = useContext(ListingsContext); // Use listings context
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    city: '',
    location: '',
    propertyType: '',
    beds: 0,
    extension: '',
    images: [], // Store images as an array,
    broker: '',
    email: '',
    phone: '',
    whatsapp: '',
    agentName: '',      // New fields for Agent details
    agentCallNumber: '',
    agentEmail: '',
    agentWhatsapp: '',
    landlord: false, // to distinguish between landlord and agent
  });
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false); // State variable for submission success
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'beds' ? parseInt(value, 10) || 0 : value;
    setFormData(prev => {
      const updatedData = { ...prev, [name]: newValue };
      if (name === 'city' || name === 'location') {
        updatedData.extension = `${updatedData.city}, ${updatedData.location}`;
      }
      return updatedData;
    });
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({ ...prev, images: Array.from(e.target.files) }));
  };

  const handleNextStep = (newData) => {
    setFormData({ ...formData, ...newData });
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Adding a 2-second delay at the start
    await new Promise(resolve => setTimeout(resolve, 2000));
  
    // Create a new FormData object
    const submissionData = new FormData();
  
    // Iterate through formData and append data to submissionData
    for (const key in formData) {
      if (key === 'images') {
        // Handle images separately if formData has an 'images' key
        formData.images.forEach(image => {
            // console.log('Image: ',image.name)
            submissionData.append('images', image);
        });
      } else {
        submissionData.append(key, formData[key]);
      }
    }
  
    // Add default or user-input agent details if the user is an agent
    if (!formData.landlord) {
      submissionData.set('broker', formData.agentName);
      submissionData.set('email', formData.agentEmail);
      submissionData.set('phone', formData.agentCallNumber);
      submissionData.set('whatsapp', formData.agentWhatsapp);
    }
  
    try {
      // Fetch listings first
      let listingsResponse;
      const startTime = Date.now();
      while (true) {
        const response = await fetch('https://backend-git-main-pawan-togas-projects.vercel.app/api/listings');
        if (response.ok) {
          listingsResponse = await response.json();
          break;
        } else {
          // console.log('Waiting for listings...');
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
          if (Date.now() - startTime > 10000) { // Timeout after 10 seconds
            throw new Error('Timeout waiting for listings');
          }
        }
      }
  
      // After listings are fetched, proceed to submit data
      let postResponse;
      const postStartTime = Date.now();
      // console.log(typeof submissionData,"in Posts")
      while (true) {
        postResponse = await fetch('https://backend-git-main-pawan-togas-projects.vercel.app/api/listings', {
          method: 'POST',
          body: submissionData,
        });
        if (postResponse.ok) {
          // console.log("post Submission: ",submissionData)
          break;
        } else {
          // console.log('Waiting for post response...');
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
          if (Date.now() - postStartTime > 10000) { // Timeout after 30 seconds
            // throw new Error('Timeout waiting for post response');
          }
        }
      }
  
      const result = await postResponse.json();
      // console.log('Submitted:', result);
  
      setSubmitted(true);
      // navigate("/"); // Comment this line if you want to show the success message before redirecting
    } catch (error) {
      console.log('Failed to submit listing: ' + error.message);
    }
  };

  const handleCategorySelect = (category) => {
    if (category === "Land" || category === "Multiple Units") {
      setFormData({ ...formData, category, subcategory: category });
      setStep(4);
    } else {
      setFormData({ ...formData, category });
      setStep(3);
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center bg-green-200 text-green-700 p-4 rounded">
          Your ad has been published successfully!
        </div>
        <div className="flex justify-center mt-4">
          <button onClick={() => navigate("/")} className="px-6 py-3 bg-green-600 text-white rounded">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {step === 1 && <Step1 onNext={handleNextStep} />}
      {step === 2 && <StepChooseCategory onNext={handleCategorySelect} onBack={handlePrevStep} title={formData.title} />}
      {step === 3 && formData.category === "Residential" && (
        <Step2Residential onNext={handleNextStep} onBack={handlePrevStep} category={formData.category} title={formData.title} />
      )}
      {step === 3 && formData.category === "Commercial" && (
        <Step2Commercial onNext={handleNextStep} onBack={handlePrevStep} category={formData.category} title={formData.title} />
      )}
      {step === 4 && (
        <Step3Details
          onNext={handleNextStep}
          onBack={handlePrevStep}
          formData={formData}
          noAmenities={formData.category === "Land" || formData.category === "Multiple Units"}
        />
      )}
      {step === 5 && <Step4Review onSubmit={handleSubmit} onBack={handlePrevStep} formData={formData} />}
    </div>
  );
}

function Step1({ onNext }) {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    onNext({ title });
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center">Enter a short title to describe your listing</h2>
      <h3 className="text-center">Make your title informative and attractive.</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g. 1 Bedroom available in Al-Barsha"
        className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:border-red-500"
      />
      <button onClick={handleSubmit} className="px-4 py-2 bg-red-600 text-white rounded w-full">Let's Go</button>
    </div>
  );
}

function StepChooseCategory({ onNext, onBack, title }) {
  const [category, setCategory] = useState("");

  const handleCategorySelect = (category) => {
    setCategory(category);
    onNext(category);
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center">Now choose the right category for your ad: {title}</h2>
      <div className="space-y-2 w-3/4">
        <button onClick={() => handleCategorySelect("Residential")} className={`block w-full px-6 py-3 rounded ${category === "Residential" ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Residential</button>
        <button onClick={() => handleCategorySelect("Commercial")} className={`block w-full px-6 py-3 rounded ${category === "Commercial" ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Commercial</button>
        <button onClick={() => handleCategorySelect("Land")} className={`block w-full px-6 py-3 rounded ${category === "Land" ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Land</button>
        <button onClick={() => handleCategorySelect("Multiple Units")} className={`block w-full px-6 py-3 rounded ${category === "Multiple Units" ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Multiple Units</button>
      </div>
      <button onClick={onBack} className="px-4 py-2 bg-gray-500 text-white rounded w-full">Back</button>
    </div>
  );
}

function Step2Residential({ onNext, onBack, category, title }) {
  const [subcategory, setSubcategory] = useState("Apartment");

  const handleSubmit = () => {
    onNext({ subcategory, propertyType: subcategory });
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center">Now choose the right category for your ad: {title} {">"} {category}</h2>
      <div className="space-y-2 w-3/4">
        <button onClick={() => setSubcategory("Apartment")} className={`block w-full px-6 py-3 rounded ${subcategory === "Apartment" ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Apartment</button>
        <button onClick={() => setSubcategory("Villa")} className={`block w-full px-6 py-3 rounded ${subcategory === "Villa" ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Villa</button>
        <button onClick={() => setSubcategory("Townhouse")} className={`block w-full px-6 py-3 rounded ${subcategory === "Townhouse" ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Townhouse</button>
        <button onClick={() => setSubcategory("Penthouse")} className={`block w-full px-6 py-3 rounded ${subcategory === "Penthouse" ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Penthouse</button>
        <button onClick={() => setSubcategory("Residential Building")} className={`block w-full px-6 py-3 rounded ${subcategory === "Residential Building" ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Residential Building</button>
        <button onClick={() => setSubcategory("Residential Floor")} className={`block w-full px-6 py-3 rounded ${subcategory === "Residential Floor" ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Residential Floor</button>
        <button onClick={() => setSubcategory("Villa Compound")} className={`block w-full px-6 py-3 rounded ${subcategory === "Villa Compound" ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Villa Compound</button>
      </div>
      <button onClick={handleSubmit} className="px-6 py-3 bg-red-600 text-white rounded w-3/4">Continue</button>
      <button onClick={onBack} className="px-6 py-3 bg-gray-500 text-white rounded w-3/4">Back</button>
    </div>
  );
}

function Step2Commercial({ onNext, onBack, category, title }) {
  const [subcategory, setSubcategory] = useState("Office");

  const handleSubmit = () => {
    onNext({ subcategory, propertyType: subcategory });
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center">Now choose the right category for your ad: {title} {">"} {category}</h2>
      <div className="space-y-2 w-3/4">
        <button onClick={() => setSubcategory("Office")} className={`block w-full px-6 py-3 rounded ${subcategory === "Office" ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Office</button>
        <button onClick={() => setSubcategory("Retail")} className={`block w-full px-6 py-3 rounded ${subcategory === "Retail" ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Retail</button>
        <button onClick={() => setSubcategory("Industrial")} className={`block w-full px-6 py-3 rounded ${subcategory === "Industrial" ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Industrial</button>
        <button onClick={() => setSubcategory("Staff Accommodation")} className={`block w-full px-6 py-3 rounded ${subcategory === "Staff Accommodation" ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Staff Accommodation</button>
        <button onClick={() => setSubcategory("Shop")} className={`block w-full px-6 py-3 rounded ${subcategory === "Shop" ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Shop</button>
        <button onClick={() => setSubcategory("Warehouse")} className={`block w-full px-6 py-3 rounded ${subcategory === "Warehouse" ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Warehouse</button>
        <button onClick={() => setSubcategory("Commercial Floor")} className={`block w-full px-6 py-3 rounded ${subcategory === "Commercial Floor" ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Commercial Floor</button>
        <button onClick={() => setSubcategory("Commercial Building")} className={`block w-full px-6 py-3 rounded ${subcategory === "Commercial Building" ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Commercial Building</button>
        <button onClick={() => setSubcategory("Commercial Villa")} className={`block w-full px-6 py-3 rounded ${subcategory === "Commercial Villa" ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Commercial Villa</button>
        <button onClick={() => setSubcategory("Factory")} className={`block w-full px-6 py-3 rounded ${subcategory === "Factory" ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Factory</button>
        <button onClick={() => setSubcategory("Other")} className={`block w-full px-6 py-3 rounded ${subcategory === "Other" ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Other</button>
        <button onClick={() => setSubcategory("Showroom")} className={`block w-full px-6 py-3 rounded ${subcategory === "Showroom" ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Showroom</button>
      </div>
      <button onClick={handleSubmit} className="px-6 py-3 bg-red-600 text-white rounded w-3/4">Continue</button>
      <button onClick={onBack} className="px-6 py-3 bg-gray-500 text-white rounded w-3/4">Back</button>
    </div>
  );
}

function Step3Details({ onNext, onBack, formData, noAmenities }) {
  const [details, setDetails] = useState({
    description: "",
    images: [],
    price: '',
    city: '',
    location: '',
    beds: 0,
    bathrooms: "",
    propertyReferenceId: "",
    amenities: [],
    landlordName: "",
    reraTitleNumber: "",
    reraPreRegistrationNumber: "",
    building: "",
    neighborhood: "",
    propertyType: formData.propertyType || '',
    agentName: formData.agentName,
    agentCallNumber: formData.agentCallNumber,
    agentEmail: formData.agentEmail,
    agentWhatsapp: formData.agentWhatsapp,
    landlord: formData.landlord,
    ...formData,
  });
  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'beds' && value === '' ? '' : (name === 'beds' ? parseInt(value, 10) || 0 : value);
    setDetails(prev => ({ ...prev, [name]: newValue }));
  };

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    setDetails((prevDetails) => {
      if (checked) {
        return { ...prevDetails, amenities: [...prevDetails.amenities, value] };
      } else {
        return { ...prevDetails, amenities: prevDetails.amenities.filter((amenity) => amenity !== value) };
      }
    });
  };

  const handleImageChange = (e) => {
    setDetails(prev => ({ ...prev, images: Array.from(e.target.files) }));
  };
  

  const handleSubmit = () => {
    const extension = `${details.city}, ${details.location}`;
    onNext({ ...details, extension });
  };

  const getAmenitiesOptions = () => {
    switch (formData.category) {
      case "Residential":
        return [
          "Maids Room", "Study", "Central A/C & Heating", "Concierge Service", "Balcony", "Private Garden", "Private Pool", "Private Gym", "Private Jacuzzi",
          "Shared Pool", "Shared Spa", "Shared Gym", "Security", "Maid Service", "Covered Parking", "Built in Wardrobes", "Walk-in Closet", "Built in Kitchen Appliances",
          "View of Water", "View of Landmark", "Pets Allowed", "Double Glazed Windows", "Day Care Center", "Electricity Backup", "First Aid Medical Center", "Service Elevators",
          "Prayer Room", "Laundry Room", "Broadband Internet", "Satellite / Cable TV", "Business Center", "Intercom", "ATM Facility", "Kids Play Area", "Reception / Waiting Room",
          "Maintenance Staff", "CCTV Security", "Cafeteria or Canteen", "Shared Kitchen", "Facilities for Disabled", "Storage Areas", "Cleaning Services", "Barbeque Area",
          "Lobby in Building", "Waste Disposal"
        ];
      case "Commercial":
        return [
          "Shared Spa", "Shared Gym", "Covered Parking", "View of Water", "View of Landmark", "Conference Room", "Available Furnished", "Available Networked",
          "Dining in Building", "Retail in Building"
        ];
      default:
        return [];
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    const extension = `${details.city}, ${details.location}`;
    onNext({ ...details, extension });
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-center">You’re almost there!</h2>
      <h3 className="text-center">Include as much details and pictures as possible, and set the right price!</h3>
      <h4 className="text-center">{formData.title} {">"} {formData.category}</h4>
      <input
        type="text"
        name="city"
        value={details.city}
        onChange={handleChange}
        placeholder="City"
        className="border border-gray-300 p-2 rounded w-full"
      />
      <input
        name="location"
        type="text"
        value={details.location}
        onChange={handleDetailsChange}
        placeholder="Location"
        className="border border-gray-300 p-2 rounded w-full"
      />
      <input
        name="propertyType"
        type="text"
        value={details.propertyType}
        onChange={handleDetailsChange}
        placeholder="Property Type"
        className="border border-gray-300 p-2 rounded w-full"
      />
      <input
  name="beds"
  type="number"
  value={details.beds || ""}
  onChange={handleDetailsChange}
  placeholder="Beds"
  className="border border-gray-300 p-2 rounded w-full"
/>
      <input
        type="file"
        multiple
        name="images"
        onChange={handleImageChange}
        className="border border-gray-300 p-2 rounded w-full"
      />
      <textarea
        value={details.description}
        onChange={(e) => setDetails({ ...details, description: e.target.value })}
        placeholder="Description"
        className="border border-gray-300 p-2 rounded w-full h-24"
      />
      <input
        type="text"
        name="price"
        value={details.price}
        onChange={handleChange}
        placeholder="Price"
        className="border border-gray-300 p-2 rounded w-full"
      />
      
      <input
        name="bathrooms"
        type="text"
        value={details.bathrooms}
        onChange={handleDetailsChange}
        placeholder="Bathrooms"
        className="border border-gray-300 p-2 rounded w-full"
      />
      <input
        name="propertyReferenceId"
        type="text"
        value={details.propertyReferenceId}
        onChange={handleDetailsChange}
        placeholder="Property Reference ID"
        className="border border-gray-300 p-2 rounded w-full"
      />
      {!noAmenities && (
        <div className="grid grid-cols-2 gap-4 w-full">
          {getAmenitiesOptions().map((amenity) => (
            <label key={amenity}>
              <input
                type="checkbox"
                value={amenity}
                onChange={handleAmenityChange}
              /> {amenity}
            </label>
          ))}
        </div>
      )}
      <h2 className="text-lg font-semibold text-center">Are you a Landlord or an Agent?</h2>
      <div className="flex space-x-4">
                <button onClick={() => setDetails({ ...details, landlord: true })} className="px-4 py-2 bg-blue-500 text-white rounded">Landlord</button>
                <button onClick={() => setDetails({ ...details, landlord: false })} className="px-4 py-2 bg-blue-500 text-white rounded">Agent</button>
            </div>
            {details.landlord ? (
                <>
                    <input
                        type="text"
                        value={details.landlordName}
                        onChange={(e) => setDetails({ ...details, landlordName: e.target.value })}
                        placeholder="Landlord Name"
                        className="border border-gray-300 p-2 rounded w-full"
                    />
                    <div className="flex space-x-4">
                        <button onClick={() => setDetails({ ...details, propertyComplete: true })} className="px-4 py-2 bg-green-500 text-white rounded">Property Complete</button>
                        <button onClick={() => setDetails({ ...details, propertyComplete: false })} className="px-4 py-2 bg-yellow-500 text-white rounded">Property Incomplete</button>
                    </div>
                    {details.propertyComplete ? (
                        <input
                            type="text"
                            value={details.reraTitleNumber}
                            onChange={(e) => setDetails({ ...details, reraTitleNumber: e.target.value })}
                            placeholder="RERA Title Number"
                            className="border border-gray-300 p-2 rounded w-full"
                        />
                    ) : (
                        <input
                            type="text"
                            value={details.reraPreRegistrationNumber}
                            onChange={(e) => setDetails({ ...details, reraPreRegistrationNumber: e.target.value })}
                            placeholder="RERA Pre Registration Number"
                            className="border border-gray-300 p-2 rounded w-full"
                        />
                    )}
                    <input
                        type="text"
                        value={details.building}
                        onChange={(e) => setDetails({ ...details, building: e.target.value })}
                        placeholder="Building"
                        className="border border-gray-300 p-2 rounded w-full"
                    />
                    <input
                        type="text"
                        value={details.neighborhood}
                        onChange={(e) => setDetails({ ...details, neighborhood: e.target.value })}
                        placeholder="Neighborhood"
                        className="border border-gray-300 p-2 rounded w-full"
                    />
                </>
            ) : (
                <>
  
                </>
            )}
        <>
        <input
            type="text"
            name="agentName"
            value={details.agentName}
            onChange={handleChange}
            placeholder="Agent Name"
            className="border border-gray-300 p-2 rounded w-full"
          />
          <input
            type="text"
            name="agentCallNumber"
            value={details.agentCallNumber}
            onChange={handleChange}
            placeholder="Agent Call Number"
            className="border border-gray-300 p-2 rounded w-full"
          />
          <input
            type="email"
            name="agentEmail"
            value={details.agentEmail}
            onChange={handleChange}
            placeholder="Agent Email"
            className="border border-gray-300 p-2 rounded w-full"
          />
          <input
            type="text"
            name="agentWhatsapp"
            value={details.agentWhatsapp}
            onChange={handleChange}
            placeholder="Agent WhatsApp"
            className="border border-gray-300 p-2 rounded w-full"
          />
        </>
     
      <button onClick={handleNext} className="px-4 py-2 bg-red-600 text-white rounded w-full">Next</button>
      <button onClick={onBack} className="px-4 py-2 bg-gray-500 text-white rounded w-full">Back</button>
    </div>
  );
}


function Step4Review({ onSubmit, onBack, formData }) {
  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-lg mx-auto p-4 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-semibold text-center mb-4">Review Your Ad</h2>

      <div className="w-full space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Title:</label>
          <div className="p-2 border border-gray-300 rounded bg-gray-100">{formData.title}</div>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Category:</label>
          <div className="p-2 border border-gray-300 rounded bg-gray-100">{formData.category}</div>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Subcategory:</label>
          <div className="p-2 border border-gray-300 rounded bg-gray-100">{formData.subcategory}</div>
        </div>

        {formData.images.length > 0 && (
          <div className="flex flex-col space-y-2">
            <label className="font-semibold">Images:</label>
            <div className="flex flex-wrap">
              {formData.images.map((image, index) => (
                <img key={index} src={URL.createObjectURL(image)} alt={`Upload ${index + 1}`} className="w-24 h-24 object-cover m-2 border border-gray-300 rounded" />
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Description:</label>
          <div className="p-2 border border-gray-300 rounded bg-gray-100">{formData.description}</div>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Price:</label>
          <div className="p-2 border border-gray-300 rounded bg-gray-100">{formData.price}</div>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Detailed Description:</label>
          <div className="p-2 border border-gray-300 rounded bg-gray-100">{formData.detailedDescription}</div>
        </div>

        {formData.bedrooms && (
          <div className="flex flex-col space-y-2">
            <label className="font-semibold">Bedrooms:</label>
            <div className="p-2 border border-gray-300 rounded bg-gray-100">{formData.bedrooms}</div>
          </div>
        )}

        {formData.bathrooms && (
          <div className="flex flex-col space-y-2">
            <label className="font-semibold">Bathrooms:</label>
            <div className="p-2 border border-gray-300 rounded bg-gray-100">{formData.bathrooms}</div>
          </div>
        )}

        {formData.propertyReferenceId && (
          <div className="flex flex-col space-y-2">
            <label className="font-semibold">Property Reference ID:</label>
            <div className="p-2 border border-gray-300 rounded bg-gray-100">{formData.propertyReferenceId}</div>
          </div>
        )}

        {formData.amenities.length > 0 && (
          <div className="flex flex-col space-y-2">
            <label className="font-semibold">Amenities:</label>
            <div className="p-2 border border-gray-300 rounded bg-gray-100">{formData.amenities.join(", ")}</div>
          </div>
        )}

        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Landlord/Agent:</label>
          <div className="p-2 border border-gray-300 rounded bg-gray-100">{formData.landlord ? "Landlord" : "Agent"}</div>
        </div>

        {formData.landlord ? (
          <>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold">Landlord Name:</label>
              <div className="p-2 border border-gray-300 rounded bg-gray-100">{formData.landlordName}</div>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold">Property Status:</label>
              <div className="p-2 border border-gray-300 rounded bg-gray-100">{formData.propertyComplete ? "Complete" : "Incomplete"}</div>
            </div>
            {formData.propertyComplete ? (
              <div className="flex flex-col space-y-2">
                <label className="font-semibold">RERA Title Number:</label>
                <div className="p-2 border border-gray-300 rounded bg-gray-100">{formData.reraTitleNumber}</div>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <label className="font-semibold">RERA Pre Registration Number:</label>
                <div className="p-2 border border-gray-300 rounded bg-gray-100">{formData.reraPreRegistrationNumber}</div>
              </div>
            )}
            <div className="flex flex-col space-y-2">
              <label className="font-semibold">Building:</label>
              <div className="p-2 border border-gray-300 rounded bg-gray-100">{formData.building}</div>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold">Neighborhood:</label>
              <div className="p-2 border border-gray-300 rounded bg-gray-100">{formData.neighborhood}</div>
            </div>
          </>
        ) : (
          <div className="flex flex-col space-y-2">
            <div className="border border-gray-300 p-2 rounded w-full">
              <h3 className="font-semibold">Agent Name</h3>
              <p>{formData.agentName}</p>
            </div>
            <div className="border border-gray-300 p-2 rounded w-full">
              <h3 className="font-semibold">Agent Call Number</h3>
              <p>{formData.agentCallNumber}</p>
            </div>
            <div className="border border-gray-300 p-2 rounded w-full">
              <h3 className="font-semibold">Agent Email</h3>
              <p>{formData.agentEmail}</p>
            </div>
            <div className="border border-gray-300 p-2 rounded w-full">
              <h3 className="font-semibold">Agent WhatsApp</h3>
              <p>{formData.agentWhatsapp}</p>
            </div>
          </div>
        )}
      </div>

      <button onClick={onSubmit} className="px-4 py-2 bg-red-600 text-white rounded w-full">Submit</button>
      <button onClick={onBack} className="px-4 py-2 bg-gray-500 text-white rounded w-full">Back</button>
    </div>
  );
}

