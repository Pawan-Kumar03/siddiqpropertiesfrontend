import React, { useState } from "react";
import emailjs from 'emailjs-com';

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

    

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     try {
    //         console.log("Form submitted:", formData);
    //         setSuccess(true);
    //         setError(false);
    //         setTimeout(() => setSuccess(false), 3000);
    //     } catch (err) {
    //         setError(true);
    //         setSuccess(false);
    //         setTimeout(() => setError(false), 3000);
    //     }
    // };
    const handleSubmit = (e) => {
        e.preventDefault();
    
        const templateParams = {
            from_name: formData.name,
            reply_to: formData.email,
            phone: formData.phone,
            property_type: formData.propertyType,
            preferred_contact_method: formData.contactMethod,
            query_message: formData.message,
        };
        console.log(templateParams)
        emailjs
            .send(
                'service_v5kh1li',       // Replace with your actual Service ID
                'template_dry15bi',      // Replace with your actual Template ID
                templateParams,
                'P2ZFcnicoD2IhAgfn'      // Replace with your actual Public Key
            )
            .then(() => {
                console.log('success')
                setSuccess(true);
                setError(false);
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    propertyType: "residential",
                    message: "",
                    contactMethod: "email",
                });
                setTimeout(() => setSuccess(false), 3000);
            })
            .catch(() => {
                setError(true);
                setSuccess(false);
                setTimeout(() => setError(false), 3000);
            });
    };
    
    
    return (
        <div className="flex font-playfair items-center justify-center min-h-screen bg-gray-800">
            <div className="w-full max-w-md bg-grey-darker p-8 rounded shadow-md border-4 border-custom">
                  <h1 className="text-3xl font-bold mb-6 text-custom text-center">Consultancy Form</h1>
                <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-custom text-sm font-bold mb-2">
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
                        <label htmlFor="email" className="block text-custom text-sm font-bold mb-2">
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
                        <label htmlFor="phone" className="block text-custom text-sm font-bold mb-2">
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
                        <label htmlFor="propertyType" className="block text-custom text-sm font-bold mb-2">
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
                        <label htmlFor="message" className="block text-custom text-sm font-bold mb-2">
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
                        <label htmlFor="contactMethod" className="block text-custom text-sm font-bold mb-2">
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
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-custom text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>

                {/* Success message */}
            {success && (
                <div className="mt-4 p-4 bg-green-200 text-green-800 text-center rounded-lg">
                    Thank you! Your message has been sent successfully.
                </div>
            )}

            {/* Error message */}
            {error && (
                <div className="mt-4 p-4 bg-red-200 text-red-800 text-center rounded-lg">
                    Oops! Something went wrong. Please try again later.
                </div>
            )}
            </div>
        </div>
    );
}
