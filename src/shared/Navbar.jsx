import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import UserContext from "../contexts/UserContext"; // Import UserContext

export default function Navbar() {
    const { user, logout } = useContext(UserContext); // Use UserContext
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const logoStyle = {
        width: '80px',
        height: 'auto'
    };

    useEffect(() => {
        // Close dropdown if user clicks outside of it
        const handleClickOutside = (event) => {
            const dropdownElement = document.getElementById('dropdown');
            if (dropdownElement && !dropdownElement.contains(event.target) && !event.target.classList.contains('dropdown-toggle')) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <header className="bg-gray-800">
            <div className="lg:border-b lg:border-b-gray-600">
                <nav className="container mx-auto p-4 text-gray-100 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/">
                            <img style={logoStyle} src={logo} alt="logo" />
                        </Link>
                    </div>

                    {/* Hamburger Menu for Mobile */}
                    <div className="block lg:hidden">
                        <button 
                            className="text-white focus:outline-none"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>

                    {/* Main Navigation Links */}
                    <div className={`lg:flex lg:items-center lg:space-x-6 ${dropdownOpen ? 'block' : 'hidden'} lg:block`}>
                        <Link to="/" className="block text-white py-2 px-4 rounded lg:inline-block lg:bg-transparent lg:text-black bg-custom">Home</Link>
                        <Link to="/about-us" className="block text-white py-2 px-4 rounded lg:inline-block lg:bg-transparent lg:text-black bg-custom">About Us</Link>

                        {/* Dropdown Menu */}
                        {user ? (
                            <div className="relative">
                                <button
                                    className="block text-white py-2 px-4 rounded lg:inline-block lg:bg-transparent lg:text-black bg-custom cursor-pointer dropdown-toggle"
                                    onClick={toggleDropdown}
                                >
                                    {user.name}
                                </button>
                                {dropdownOpen && (
                                    <div id="dropdown" className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-full lg:w-48 z-50">
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
                            <Link to="/login" className="block text-white py-2 px-4 rounded lg:inline-block lg:bg-transparent lg:text-black bg-custom">
                                Login
                            </Link>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}
