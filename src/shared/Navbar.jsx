import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import UserContext from "../contexts/UserContext";

export default function Navbar() {
    const { user, logout } = useContext(UserContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            const dropdownElement = document.getElementById("dropdown");
            if (
                dropdownElement &&
                !dropdownElement.contains(event.target) &&
                !event.target.classList.contains("dropdown-toggle")
            ) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header className="bg-primary">
            <nav className="backdrop-blur-lg rounded-full mx-auto max-w-5xl flex items-center justify-between px-6 py-2 shadow-lg">
                {/* Logo */}
                <div>
                    <Link to="/">
                        <img
                            src={logo}
                            alt="logo"
                            className="w-16 h-auto"
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden sm:flex items-center space-x-4">
                    <Link
                        to="/"
                        className="px-4 py-2 text-primary rounded-full bg-primary hover:dark-primary"
                    >
                        Home
                    </Link>
                    <Link
                        to="/about-us"
                        className="px-4 py-2 text-primary rounded-full bg-primary hover:dark-primary"
                    >
                        About Us
                    </Link>
                    <Link
                        to="/ConsultancyPage"
                        className="px-4 py-2 text-primary rounded-full bg-primary hover:dark-primary"
                    >
                        Consultant
                    </Link>

                    {user ? (
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="px-4 py-2 text-primary rounded-full bg-primary  dropdown-toggle"
                            >
                                {user.name}
                            </button>
                            {dropdownOpen && (
                                <div
                                    id="dropdown"
                                    className="absolute right-0 mt-2 bg-white text-primary rounded-lg shadow-lg w-48 z-50"
                                >
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 hover:dark-primary"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        My Profile
                                    </Link>
                                    <Link
                                        to="/get-verified"
                                        className="block px-4 py-2 hover:dark-primary"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Get Verified
                                    </Link>
                                    <Link
                                        to="/my-ads"
                                        className="block px-4 py-2 hover:dark-primary"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        My Ads
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 hover:dark-primary"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="px-4 py-2 text-button rounded-full bg-button "
                        >
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Navigation */}
                <div className="sm:hidden flex items-center relative z-50">
    <button
        onClick={toggleMobileMenu}
        className="text-primary focus:outline-none"
    >
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

    {mobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-primary backdrop-blur-lg text-primary flex flex-col z-50 p-6 overflow-y-auto">
            <button
                onClick={toggleMobileMenu}
                className="self-end mb-4 focus:outline-none"
            >
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
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>

            <Link
                to="/"
                className="block px-4 py-2 mb-2 rounded-full hover:dark-primary"
                onClick={() => setMobileMenuOpen(false)}
            >
                Home
            </Link>
            <Link
                to="/about-us"
                className="block px-4 py-2 mb-2 rounded-full hover:dark-primary"
                onClick={() => setMobileMenuOpen(false)}
            >
                About Us
            </Link>
            <Link
                to="/ConsultancyPage"
                className="block px-4 py-2 mb-2 rounded-full hover:dark-primary"
                onClick={() => setMobileMenuOpen(false)}
            >
                Consultant
            </Link>
            {user ? (
                <>
                    <Link
                        to="/profile"
                        className="block px-4 py-2 mb-2 rounded-full hover:dark-primary"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        My Profile
                    </Link>
                    <Link
                        to="/get-verified"
                        className="block px-4 py-2 mb-2 rounded-full hover:dark-primary"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Get Verified
                    </Link>
                    <Link
                        to="/my-ads"
                        className="block px-4 py-2 mb-2 rounded-full hover:dark-primary"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        My Ads
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 mb-2 rounded-full bg-primary text-primary"
                    >
                        Sign Out
                    </button>
                </>
            ) : (
                <Link
                    to="/login"
                    className="block px-4 py-2 mb-2 text-primary bg-primary rounded-full"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    Login
                </Link>
            )}
        </div>
    )}
</div>


            </nav>
        </header>
    );
}
