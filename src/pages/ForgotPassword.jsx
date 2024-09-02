import React, { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://backend-git-main-pawan-togas-projects.vercel.app/api/password-reset-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.message || 'Request failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-800">
      <div className="bg-grey-dark p-8 rounded shadow-md w-full max-w-md border-4 border-custom">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-custom text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          {message && (
            <div className="mb-4 p-2 bg-green-500 text-white rounded">
              {message}
            </div>
          )}
          {error && (
            <div className="mb-4 p-2 bg-red-500 text-white rounded">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-custom text-black py-2 px-4 rounded transition-colors duration-300 hover:bg-custom-dark"
          >
            Request Password Reset
          </button>
        </form>
      </div>
    </div>
  );
}
