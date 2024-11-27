import React, { useState } from 'react';

export default function AgentProfile({ onNext, onBack, formData, setFormData }) {
  const [agentName, setAgentName] = useState(formData.agentName || '');
  const [agentEmail, setAgentEmail] = useState(formData.agentEmail || '');
  const [contactNumber, setContactNumber] = useState(formData.contactNumber || '');
  const [contactWhatsApp, setContactWhatsApp] = useState(formData.contactWhatsApp || '');
  const [profilePhoto, setProfilePhoto] = useState(formData.profilePhoto || null);
  const [error, setError] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPublishing(true); // Set publishing state to true
  
    if (!agentName || !agentEmail || !contactNumber || !contactWhatsApp || !profilePhoto) {
      setError('All fields are required.');
      setIsPublishing(false);
      return;
    }
  
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('agentName', agentName);
    formDataToSubmit.append('agentEmail', agentEmail);
    formDataToSubmit.append('contactNumber', contactNumber);
    formDataToSubmit.append('contactWhatsApp', contactWhatsApp);
    formDataToSubmit.append('profilePhoto', profilePhoto);
  
    try {
      // Adding a 2-second delay at the start (to simulate network delay)
      await new Promise(resolve => setTimeout(resolve, 2000));
  
      const token = localStorage.getItem('token'); // Retrieve token from local storage
  
      const response = await fetch('https://backend-git-main-pawan-togas-projects.vercel.app/api/agent-profile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: formDataToSubmit, // Send the form data directly
      });
  
      // Check if the response status is 201 (created)
      if (response.status === 201) {
        const data = await response.json();
        console.log('Agent Profile saved:', data);
        // onNext(); // Move to next step
      } else {
        // Handle other status codes
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save agent profile');
      }
    } catch (error) {
      setError(error.message);  // Display the error message returned by the backend
      console.error(error);
    } finally {
      setIsPublishing(false); // Reset publishing state after submission
    }
  };
  
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md bg-grey-darker p-8 rounded shadow-md border-4 border-custom">
        <h1 className="text-3xl font-bold mb-6 text-custom text-center">Agent Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-custom text-sm font-bold mb-2" htmlFor="agentName">
              Agent Name
            </label>
            <input
              id="agentName"
              type="text"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-custom text-sm font-bold mb-2" htmlFor="agentEmail">
              Agent Email
            </label>
            <input
              id="agentEmail"
              type="email"
              value={agentEmail}
              onChange={(e) => setAgentEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-custom text-sm font-bold mb-2" htmlFor="contactNumber">
              Contact Number
            </label>
            <input
              id="contactNumber"
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-custom text-sm font-bold mb-2" htmlFor="contactWhatsApp">
              WhatsApp Contact
            </label>
            <input
              id="contactWhatsApp"
              type="text"
              value={contactWhatsApp}
              onChange={(e) => setContactWhatsApp(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-6">
            <label className="block text-custom text-sm font-bold mb-2" htmlFor="profilePhoto">
              Agent Profile Photo
            </label>
            <input
              id="profilePhoto"
              type="file"
              onChange={handleFileChange}
              className="w-full text-gray-700 focus:outline-none focus:shadow-outline"
            />
            {profilePhoto && (
              <p className="text-sm text-green-500 mt-2">
                Selected file: {profilePhoto.name}
              </p>
            )}
          </div>

          {error && (
            <div className="text-red-500 text-sm mb-4">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onBack}
              className="bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-custom text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isPublishing ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
