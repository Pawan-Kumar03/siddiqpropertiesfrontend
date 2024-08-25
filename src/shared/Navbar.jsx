import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
    const [username, setUsername] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility
    const navigate = useNavigate();
    const logoStyle = {
        width: '80px',
        height: 'auto'
    };

    useEffect(() => {
        // Retrieve the username from localStorage
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername);
    }, []);

    const handleLogout = () => {
        // Clear localStorage on logout and reset username state
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setUsername(null);
        navigate("/login"); // Redirect to login page after logout
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <header className="bg-gray-800">
            <div className="lg:border-b lg:border-b-gray-600">
                <nav className="relative container mx-auto p-4 text-gray-100">
                    {/* Login Button with Dropdown Menu */}
                    <div className="absolute right-4 top-4">
                        {username ? (
                            <div className="relative">
                                <span
                                    className="bg-custom text-black py-2 px-4 rounded cursor-pointer"
                                    onClick={toggleDropdown} // Toggle dropdown on click
                                >
                                    {username}
                                </span>
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg">
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 hover:bg-gray-200"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            My Profile
                                        </Link>
                                        <Link
                                            to="/get-verified"
                                            className="block px-4 py-2 hover:bg-gray-200"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            Get Verified
                                        </Link>
                                        <Link
                                            to="/my-ads"
                                            className="block px-4 py-2 hover:bg-gray-200"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            My Ads
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-200"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
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
