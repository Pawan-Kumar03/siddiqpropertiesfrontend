import React, { useState } from "react";

export default function ConsultancyPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        propertyType: "residential",
        message: "",
        contactMethod: "email",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        alert("Thank you! Our team will contact you shortly.");
        // Add form submission logic (e.g., API call)
    };

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold text-center mb-6">Your InvestiBayt Journey</h1>
            <p className="text-lg text-center mb-8">
                At <strong>InvestiBayt</strong>, we provide personalized property consultancy services tailored to your needs. 
                Whether you're looking for residential, commercial, or rental properties, we are here to assist you every step of the way.
            </p>

            <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold mb-4">Let Us Help You Find Your Dream Property</h2>
                <p className="text-gray-700 mb-6">
                    Fill out the form below, and one of our team members will reach out to you shortly to discuss your requirements.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                            placeholder="Enter your full name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="phone">Phone Number (Optional)</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="propertyType">Property Type</label>
                        <select
                            id="propertyType"
                            name="propertyType"
                            value={formData.propertyType}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        >
                            <option value="residential">Residential</option>
                            <option value="commercial">Commercial</option>
                            <option value="rental">Rental</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="message">Message/Inquiry</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            rows="4"
                            placeholder="Provide details about your inquiry"
                        ></textarea>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2" htmlFor="contactMethod">Preferred Contact Method</label>
                        <select
                            id="contactMethod"
                            name="contactMethod"
                            value={formData.contactMethod}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        >
                            <option value="email">Email</option>
                            <option value="phone">Phone</option>
                            <option value="in-person">In-Person Meeting</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
