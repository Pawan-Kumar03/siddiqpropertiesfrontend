import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import UserContext from "../contexts/UserContext";

export default function Navbar() {
    const { user, logout } = useContext(UserContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Track mobile menu state
    const navigate = useNavigate();
    const logoStyle = {
        width: '80px',
        height: 'auto',
    };

    useEffect(() => {
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

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen); // Toggle mobile menu
    };

    return (
<header className="bg-lightBlue font-primary">
    <div className="lg:border-b lg:border-b-accent font-primary">
        <nav className="relative font-primary container mx-auto p-4 flex items-center justify-between">
            {/* Logo on the top left */}
            <div className="flex items-center">
                <Link to="/">
                    <img style={logoStyle} src={logo} alt="logo" />
                </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden sm:flex items-center space-x-4">
                <Link
                    to="/"
                    className="bg-white text-primary py-2 px-4 rounded-lg hover:bg-gray-100"
                >
                    Home
                </Link>
                <Link
                    to="/about-us"
                    className="bg-white text-primary py-2 px-4 rounded-lg hover:bg-gray-100"
                >
                    About Us
                </Link>
                <Link
                    to="/ConsultancyPage"
                    className="bg-white text-primary py-2 px-4 rounded-lg hover:bg-gray-100"
                >
                    Consultant
                </Link>
                {user ? (
                    <div className="relative">
                        <span
                            className="bg-white text-primary py-2 px-4 rounded-lg cursor-pointer dropdown-toggle"
                            onClick={toggleDropdown}
                        >
                            {user.name}
                        </span>
                        {dropdownOpen && (
                            <div
                                id="dropdown"
                                className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-48 z-50"
                            >
                                <Link
                                    to="/profile"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    to="/get-verified"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    Get Verified
                                </Link>
                                <Link
                                    to="/my-ads"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    My Ads
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark"
                    >
                        Login
                    </Link>
                )}
            </div>

                    {/* Mobile Menu for Smaller Screens */}
<div className="sm:hidden flex items-center">
    <button
        onClick={toggleMobileMenu}
        className="text-primary focus:outline-none"
    >
        {/* Hamburger Menu Icon */}
        <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
            />
        </svg>
    </button>

    {/* Mobile Menu Dropdown */}
    {mobileMenuOpen && (
        <div className="absolute right-0 top-12 bg-lightBlue text-primary rounded-lg shadow-lg w-48 z-50">
            <Link
                to="/"
                className="block bg-white text-primary py-2 px-4 rounded-lg hover:bg-gray-100 mb-2"
                onClick={() => setMobileMenuOpen(false)}
            >
                Home
            </Link>
            <Link
                to="/about-us"
                className="block bg-white text-primary py-2 px-4 rounded-lg hover:bg-gray-100 mb-2"
                onClick={() => setMobileMenuOpen(false)}
            >
                About Us
            </Link>
            <Link
                to="/ConsultancyPage"
                className="block bg-white text-primary py-2 px-4 rounded-lg hover:bg-gray-100 mb-2"
                onClick={() => setMobileMenuOpen(false)}
            >
                Consultant
            </Link>
            {user ? (
                <>
                    <Link
                        to="/profile"
                        className="block bg-white text-primary py-2 px-4 rounded-lg hover:bg-gray-100 mb-2"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        My Profile
                    </Link>
                    <Link
                        to="/get-verified"
                        className="block bg-white text-primary py-2 px-4 rounded-lg hover:bg-gray-100 mb-2"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Get Verified
                    </Link>
                    <Link
                        to="/my-ads"
                        className="block bg-white text-primary py-2 px-4 rounded-lg hover:bg-gray-100 mb-2"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        My Ads
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left bg-white text-primary py-2 px-4 rounded-lg hover:bg-gray-100 mb-2"
                    >
                        Sign Out
                    </button>
                </>
            ) : (
                <Link
                    to="/login"
                    className="block bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    Login
                </Link>
            )}
        </div>
    )}
</div>

                </nav>
            </div>
        </header>
    );
}
