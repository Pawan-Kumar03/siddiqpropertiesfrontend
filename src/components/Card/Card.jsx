// Card.jsx
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function Card({ item }) {
    const { image, title, price, extension, _id } = item;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/property/${_id}`);
    };

    // const imageUrl =image.startsWith('/uploads')
    //     ? `http://localhost:5000${image}`
    //     : image;
    return (
        <div className="hover:shadow-md p-2 rounded-md duration-200 cursor-pointer" onClick={handleClick}>
            <img className="rounded mb-3 object-cover h-56 lg:h-32 w-full" src={image} alt={title + " image"} />
            <h3 className="text-base text-primary-500 font-semibold">{price}</h3>
            <p className="dark:text-gray-300 font-semibold">{title}</p>
            <p className="dark:text-gray-400 text-sm text-gray-600">{extension}</p>
        </div>
    );
}

Card.propTypes = {
    item: PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        extension: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
    }).isRequired,
};
