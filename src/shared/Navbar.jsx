import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
    const [username, setUsername] = useState(null);
    const logoStyle = {
        width: '80px',
        height: 'auto'
    };
    useEffect(() => {
        // Retrieve the username from localStorage if available
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    return (
        <header className="bg-gray-800">
            <div className="lg:border-b lg:border-b-gray-600">
                <nav className="relative container mx-auto p-4 text-gray-100">
                    {/* Login Button - Positioned at the top left */}
                    <div className="absolute right-4 top-4">
                        {username ? (
                            <span className="bg-custom text-black py-2 px-4 rounded">
                                {username}
                            </span>
                        ) : (
                            <Link to="/login" className="bg-custom hover:bg-custom text-black py-2 px-4 rounded">
                                Login
                            </Link>
                        )}
                    </div>


                    {/* Centered Logo */}
                    <div className="flex justify-center">
                        <Link to="/">
                            <img style={logoStyle} src={logo} alt="logo" />
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}
