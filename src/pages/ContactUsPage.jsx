import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';

export default function ContactUsPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const sendEmail = (e) => {
        e.preventDefault();

        const templateParams = {
            from_name: name,        // Sender's name
            reply_to: email,        // Sender's email
            query_message: query    // The actual query message
        };

        emailjs.send(
            'service_v5kh1li',       // Replace with your actual Service ID
            'template_81xid4a',      // Replace with your actual Template ID
            templateParams,
            'P2ZFcnicoD2IhAgfn'      // Replace with your actual Public Key
        )
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            // Show success message and navigate to home
            document.querySelector('#success-message').style.display = 'block';
            setTimeout(() => navigate("/"), 3000); // Redirect after 3 seconds
        })
        .catch((error) => {
            console.error('FAILED...', error);
            // Show error message and navigate to home
            document.querySelector('#error-message').style.display = 'block';
            setTimeout(() => navigate("/"), 3000); // Redirect after 3 seconds
        });

        setName('');
        setEmail('');
        setQuery('');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-800">
            <div className="w-full max-w-md bg-grey-darker p-8 rounded shadow-md border-4 border-custom">
                <h1 className="text-3xl font-bold mb-6 text-custom text-center">Contact Us</h1>
                <form className="max-w-md mx-auto" onSubmit={sendEmail}>
                    <div className="mb-4">
                        <label className="block text-custom text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-custom text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-custom text-sm font-bold mb-2" htmlFor="query">
                            Query
                        </label>
                        <textarea
                            id="query"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
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
                <div id="success-message" className="container mx-auto p-4 mt-4" style={{ display: 'none' }}>
                    <div className="text-center bg-green-200 text-green-700 p-4 rounded">
                        Your query has been sent successfully!
                    </div>
                </div>
                <div id="error-message" className="container mx-auto p-4 mt-4" style={{ display: 'none' }}>
                    <div className="text-center bg-red-200 text-black p-4 rounded">
                        Error in Sending Your Query.
                    </div>
                </div>
            </div>
        </div>
    );
    
}
