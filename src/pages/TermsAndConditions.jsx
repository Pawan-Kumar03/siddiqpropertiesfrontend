import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const TermsAndConditions = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBack = () => {
        if (location.state && location.state.from) {
            navigate(location.state.from);
        } else {
            navigate(-1); // Go back to the previous page
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-800 ">
            <div className="bg-grey-dark p-8 rounded shadow-md w-full max-w-md w-full max-w-md bg-grey-darker p-8 rounded shadow-md border-4 border-custom">
                <h2 className="text-2xl font-bold mb-6 text-white text-center">Terms and Conditions</h2>
                <div className="text-white text-sm">
                    <p className="mb-4">
                        Welcome to our platform. By using our services, you agree to the following terms and conditions...
                    </p>
                    <p className="mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                    </p>
                </div>
                <div className="mt-6 text-center">
                    <button
                        onClick={handleBack}
                        className="bg-custom text-black py-2 px-4 rounded transition-colors duration-300 hover:bg-custom-dark"
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
