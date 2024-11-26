import React, { useState } from "react";

const AgentProfile = ({ onNext, user, formData, setFormData }) => {
  const [agentData, setAgentData] = useState({
    username: "",
    email: "",
    whatsapp: "",
    contact: "",
    reraId: "",
    profilePhoto: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async () => {
    try {
      const response = await fetch("https://your-api-url.com/api/agents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(agentData),
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({ ...formData, ...data });
        onNext();
      } else {
        throw new Error("Failed to create agent profile");
      }
    } catch (error) {
      console.error("Error creating agent profile:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">
        Create Your Agent Profile
      </h2>
      <form className="space-y-4">
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-600">Username</label>
          <input
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="username"
            placeholder="Enter username"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="email"
            placeholder="Enter email"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-600">WhatsApp</label>
          <input
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="whatsapp"
            placeholder="Enter WhatsApp number"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-600">Contact</label>
          <input
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="contact"
            placeholder="Enter contact number"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-600">RERA ID</label>
          <input
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="reraId"
            placeholder="Enter RERA ID"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-600">Profile Photo</label>
          <input
            type="file"
            className="p-2 border rounded-lg focus:outline-none"
            name="profilePhoto"
            onChange={(e) =>
              setAgentData((prev) => ({ ...prev, profilePhoto: e.target.files[0] }))
            }
          />
        </div>
        <button
          type="button"
          onClick={handleProfileSubmit}
          className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Submit Profile
        </button>
      </form>
    </div>
  );
};

export default AgentProfile;
