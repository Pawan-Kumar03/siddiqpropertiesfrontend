import React, { useState } from 'react';

export default function Broker({ onNext, onBack, formData = {}, setFormData }) {
  const [reraBrokerID, setReraBrokerID] = useState(formData.reraBrokerID || '');
  const [companyLicenseNumber, setCompanyLicenseNumber] = useState(formData.companyLicenseNumber || '');
  const [companyTelephoneNumber, setCompanyTelephoneNumber] = useState(formData.companyTelephoneNumber || '');
  const [reraIDCard, setReraIDCard] = useState(formData.reraIDCard || null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPublishing(true);
    setError('');
    setSuccessMessage('');

    if (!reraBrokerID || !companyLicenseNumber || !companyTelephoneNumber || !reraIDCard) {
      setError('All fields are required.');
      setIsPublishing(false);
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('reraBrokerID', reraBrokerID);
    formDataToSubmit.append('companyLicenseNumber', companyLicenseNumber);
    formDataToSubmit.append('companyTelephoneNumber', companyTelephoneNumber);
    formDataToSubmit.append('reraIDCard', reraIDCard);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://backend-git-main-pawan-togas-projects.vercel.app/api/broker-profile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSubmit,
      });

      if (response.status === 201) {
        const data = await response.json();
        console.log('Broker profile created:', data);
        setSuccessMessage('Broker profile created successfully!');
        // setFormData({}); // Clear the form data if necessary
        // if (onNext) onNext();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save Broker profile');
      }
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReraIDCard(file);
    }
  };

  return (
    <div className="flex font-playfair items-center justify-center min-h-screen bg-gray-800">
      <div className="w-full font-playfair max-w-md bg-grey-darker p-8 rounded shadow-md border-4 border-custom">
        <h1 className="text-3xl font-bold mb-6 text-custom text-center">Broker Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-custom text-sm font-bold mb-2" htmlFor="reraBrokerID">
              RERA Broker ID
            </label>
            <input
              id="reraBrokerID"
              type="text"
              value={reraBrokerID}
              onChange={(e) => setReraBrokerID(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-custom text-sm font-bold mb-2" htmlFor="companyLicenseNumber">
              Company License Number
            </label>
            <input
              id="companyLicenseNumber"
              type="text"
              value={companyLicenseNumber}
              onChange={(e) => setCompanyLicenseNumber(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-custom text-sm font-bold mb-2" htmlFor="companyTelephoneNumber">
              Company Telephone Number
            </label>
            <input
              id="companyTelephoneNumber"
              type="text"
              value={companyTelephoneNumber}
              onChange={(e) => setCompanyTelephoneNumber(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-custom text-sm font-bold mb-2" htmlFor="reraIDCard">
              RERA ID Card
            </label>
            <input
              id="reraIDCard"
              type="file"
              onChange={handleFileChange}
              className="w-full text-gray-700 focus:outline-none focus:shadow-outline"
            />
            {reraIDCard && (
              <p className="text-sm text-green-500 mt-2">
                Selected file: {reraIDCard.name}
              </p>
            )}
          </div>

          {error && (
            <div className="text-red-500 text-sm mb-4">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="text-green-500 text-sm mb-4">
              {successMessage}
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
              disabled={isPublishing}
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
