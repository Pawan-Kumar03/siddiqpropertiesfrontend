import React, { useState } from "react";
const AgentProfile = ({ onNext, user, formData, setFormData }) => {
    const [agentData, setAgentData] = useState({
      username: '',
      email: '',
      whatsapp: '',
      contact: '',
      reraId: '',
      profilePhoto: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setAgentData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleProfileSubmit = async () => {
      try {
        const response = await fetch('https://your-api-url.com/api/agents', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
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
      <div className="container mx-auto p-4">
        <h2 className="text-lg font-bold mb-4">Create Your Agent Profile</h2>
        <form>
          <input name="username" placeholder="Username" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="whatsapp" placeholder="WhatsApp" onChange={handleChange} />
          <input name="contact" placeholder="Contact" onChange={handleChange} />
          <input name="reraId" placeholder="RERA ID" onChange={handleChange} />
          <input
            type="file"
            name="profilePhoto"
            onChange={(e) =>
              setAgentData((prev) => ({ ...prev, profilePhoto: e.target.files[0] }))
            }
          />
          <button type="button" onClick={handleProfileSubmit}>
            Submit Profile
          </button>
        </form>
      </div>
    );
  };
  export default AgentProfile;