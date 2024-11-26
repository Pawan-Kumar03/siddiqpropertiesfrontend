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
            setTimeout(() => setSuccess(false), 3000); // Hide success message after 3 seconds
        } catch (err) {
            setError(true);
            setSuccess(false);
            setTimeout(() => setError(false), 3000); // Hide error message after 3 seconds
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-800">
            <div className="w-full max-w-md bg-grey-darker p-8 rounded shadow-md border-4 border-custom">
                <h1 className="text-3xl font-bold mb-6 text-blue-500 text-center">Consultancy Form</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-custom text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-custom text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-custom text-sm font-bold mb-2" htmlFor="phone">
                            Phone (Optional)
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-custom text-sm font-bold mb-2" htmlFor="propertyType">
                            Property Type
                        </label>
                        <select
                            id="propertyType"
                            name="propertyType"
                            value={formData.propertyType}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="residential">Residential</option>
                            <option value="commercial">Commercial</option>
                            <option value="rental">Rental</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-custom text-sm font-bold mb-2" htmlFor="message">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            rows="4"
                            placeholder="Provide details about your inquiry"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-custom text-sm font-bold mb-2" htmlFor="contactMethod">
                            Preferred Contact Method
                        </label>
                        <select
                            id="contactMethod"
                            name="contactMethod"
                            value={formData.contactMethod}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="email">Email</option>
                            <option value="phone">Phone</option>
                            <option value="in-person">In-Person Meeting</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-custom text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>

                {success && (
                    <div className="text-center bg-green-200 text-green-700 p-4 rounded mt-4">
                        Thank you! Our team will contact you shortly.
                    </div>
                )}
                {error && (
                    <div className="text-center bg-red-200 text-red-700 p-4 rounded mt-4">
                        Oops! Something went wrong. Please try again later.
                    </div>
                )}
            </div>
        </div>
    );
}
