import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!acceptedTerms) {
            setErrorMessage("You must agree to the Terms and Conditions to proceed.");
            return;
        }

        try {
            // Replace with actual login logic
            console.log("Login data:", { email, password, acceptedTerms });
            navigate("/");
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const handleSignupRedirect = () => {
        navigate("/signup");
    };

    const handleTermsRedirect = () => {
        navigate("/terms-and-conditions", { state: { from: "/login" } });
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-800">
            <div className="bg-grey-dark p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-white text-center">Log in to favorite an Ad</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-custom text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-custom text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                        />
                    </div>
                    {errorMessage && (
                        <div className="mb-4 p-2 bg-red-500 text-white rounded">
                            {errorMessage}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-custom text-black py-2 px-4 rounded transition-colors duration-300 hover:bg-custom-dark"
                    >
                        Login
                    </button>
                    <div className="ml-4 flex items-center mt-4">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={acceptedTerms}
                            onChange={() => setAcceptedTerms(!acceptedTerms)}
                            className="mr-2"
                        />
                        <label htmlFor="terms" className="text-white text-sm">
                            By signing up, I agree to the{" "}
                            <button
                                onClick={handleTermsRedirect}
                                className="text-blue-400 underline"
                            >
                                Terms and Conditions
                            </button>.
                        </label>
                    </div>
                    <div className="mt-4 text-center">
                        <button
                            type="button"
                            onClick={handleSignupRedirect}
                            className="text-red-400 underline"
                        >
                            Don't have an account? Create one
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
