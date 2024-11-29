import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function Card({ item }) {
    if (!item) return null;

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
            className="hover:shadow-lg p-4 rounded-lg bg-gray-800 dark:bg-gray-900 cursor-pointer transition duration-200 h-80 flex flex-col justify-between"
            onClick={handleClick}
            style={{ minWidth: '220px' }} // Ensure minimum width for consistency
        >
            {imageUrl ? (
                <img
                    className="rounded-lg mb-3 object-cover h-40 w-full"
                    src={imageUrl}
                    alt={`${title} image`}
                    style={{ objectFit: "cover" }} // Ensure image fits within the container
                />
            ) : (
                <div className="rounded-lg mb-3 object-cover h-40 w-full bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400 font-playfair">No Image Available</span>
                </div>
            )}
            <h3 className="text-lg font-semibold text-custom font-playfair">
                {price}
            </h3>
            <p className="text-gray-100 font-semibold truncate font-playfair">{title}</p>
            <p className="text-gray-300 text-sm truncate font-playfair">{extension}</p>
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
