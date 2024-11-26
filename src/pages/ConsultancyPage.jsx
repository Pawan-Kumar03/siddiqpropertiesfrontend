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

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            console.log("Form submitted:", formData);
            setSuccess(true);
            setError(false);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError(true);
            setSuccess(false);
            setTimeout(() => setError(false), 3000);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-800">
            <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-700">
                <h1 className="text-3xl font-bold text-center text-white mb-6">Consultancy Form</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                            Phone (Optional)
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="propertyType" className="block text-sm font-medium text-white mb-2">
                            Property Type
                        </label>
                        <select
                            id="propertyType"
                            name="propertyType"
                            value={formData.propertyType}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="residential">Residential</option>
                            <option value="commercial">Commercial</option>
                            <option value="rental">Rental</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Provide details about your inquiry"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="contactMethod" className="block text-sm font-medium text-white mb-2">
                            Preferred Contact Method
                        </label>
                        <select
                            id="contactMethod"
                            name="contactMethod"
                            value={formData.contactMethod}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="email">Email</option>
                            <option value="phone">Phone</option>
                            <option value="in-person">In-Person Meeting</option>
                        </select>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Submit
                        </button>
                    </div>
                </form>

                {success && (
                    <div className="mt-4 p-4 bg-green-200 text-green-800 text-center rounded-lg">
                        Thank you! Our team will contact you shortly.
                    </div>
                )}
                {error && (
                    <div className="mt-4 p-4 bg-red-200 text-red-800 text-center rounded-lg">
                        Oops! Something went wrong. Please try again later.
                    </div>
                )}
            </div>
        </div>
    );
}
