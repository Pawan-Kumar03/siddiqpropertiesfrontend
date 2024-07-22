import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
    const logoStyle = {
        width: '80px',
        height: 'auto'
    };

    return (
        <header className="bg-gray-800">
            <div className="lg:border-b lg:border-b-gray-600">
                <nav className="flex justify-center lg:justify-between lg:items-center container mx-auto p-4 text-gray-100">
                    <div className="inline-flex lg:flex items-center space-x-3 py-3 md:py-0">
                        <Link to="/">
                            <img style={logoStyle} className="dark:hidden" src={logo} alt="logo" />
                        </Link>
                        <span className="mt-5 text-sm hidden lg:inline-block dark:text-gray-200 text-custom">Dubai</span>
                    </div>
                </nav>
            </div>
        </header>
    );
}
