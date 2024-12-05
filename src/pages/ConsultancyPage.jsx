import React, { useState } from "react";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";

export default function ConsultantContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        propertyType: "residential",
        contactMethod: "email",
        message: "",
    });

    const [status, setStatus] = useState({ success: false, error: false });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const templateParams = {
            from_name: formData.name,
            reply_to: formData.email,
            phone: formData.phone,
            property_type: formData.propertyType,
            contact_method: formData.contactMethod,
            query_message: formData.message,
        };

        emailjs
            .send(
                "service_v5kh1li", // Replace with actual Service ID
                "template_81xid4a", // Replace with actual Template ID
                templateParams,
                "P2ZFcnicoD2IhAgfn" // Replace with actual Public Key
            )
            .then(() => {
                setStatus({ success: true, error: false });
                setTimeout(() => navigate("/"), 3000); // Redirect after 3 seconds
                resetForm();
            })
            .catch(() => {
                setStatus({ success: false, error: true });
            });
    };

    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            phone: "",
            propertyType: "residential",
            contactMethod: "email",
            message: "",
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    Contact Us / Consultancy Form
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2" htmlFor="phone">
                            Phone (Optional)
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2" htmlFor="propertyType">
                            Property Type
                        </label>
                        <select
                            id="propertyType"
                            name="propertyType"
                            value={formData.propertyType}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="residential">Residential</option>
                            <option value="commercial">Commercial</option>
                            <option value="rental">Rental</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2" htmlFor="contactMethod">
                            Preferred Contact Method
                        </label>
                        <select
                            id="contactMethod"
                            name="contactMethod"
                            value={formData.contactMethod}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="email">Email</option>
                            <option value="phone">Phone</option>
                            <option value="in-person">In-Person Meeting</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2" htmlFor="message">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="4"
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Provide details about your query"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Submit
                        </button>
                    </div>
                </form>
                {status.success && (
                    <div className="mt-4 text-center text-green-600 font-semibold">
                        Your query has been sent successfully!
                    </div>
                )}
                {status.error && (
                    <div className="mt-4 text-center text-red-600 font-semibold">
                        An error occurred. Please try again.
                    </div>
                )}
            </div>
        </div>
    );
}
