import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import logo from '../assets/logo.png';

export default function Navbar() {
    const { username, logout } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const logoStyle = {
        width: '80px',
        height: 'auto'
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
                                    onClick={toggleDropdown}
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
                                            onClick={logout}
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
