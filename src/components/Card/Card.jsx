import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function Card({ item }) {
    // Ensure item is defined
    if (!item) {
        return null; // Or return a placeholder UI for missing data
    }

    const {
        image = '', // Default to an empty string if image is undefined
        images = [], // Default to an empty array if images are undefined
        title = 'No title available', // Default title
        price = 'N/A', // Default price
        extension = '', // Default to an empty string if extension is undefined
        _id,
    } = item;

    const navigate = useNavigate();

    const handleClick = () => {
        if (_id) {
            navigate(`/property/${_id}`);
        }
    };

    // Determine the image to display
    const imageUrl = images.length > 0 ? images[0] : image;

    return (
        <div
            className="hover:shadow-lg p-4 rounded-lg bg-gray-800 dark:bg-gray-900 cursor-pointer transition duration-200"
            onClick={handleClick}
        >
            {imageUrl ? (
                <img
                    className="rounded-lg mb-3 object-cover h-56 lg:h-32 w-full"
                    src={imageUrl}
                    alt={`${title} image`}
                />
            ) : (
                <div className="rounded-lg mb-3 object-cover h-56 lg:h-32 w-full bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400">No Image Available</span>
                </div>
            )}
            <h3 className="text-lg font-semibold" style={{ color: '#c5a47e' }}>
                {price}
            </h3>
            <p className="text-gray-100 font-semibold">{title}</p>
            <p className="text-gray-300 text-sm">{extension}</p>
        </div>
    );
}

Card.propTypes = {
    item: PropTypes.shape({
        image: PropTypes.string,
        images: PropTypes.arrayOf(PropTypes.string),
        title: PropTypes.string,
        price: PropTypes.string,
        extension: PropTypes.string,
        _id: PropTypes.string.isRequired,
    }).isRequired,
};
