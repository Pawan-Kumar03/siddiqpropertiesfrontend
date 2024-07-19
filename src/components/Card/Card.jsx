// Card.jsx
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function Card({ item }) {
    const {
        image,
        title,
        price,
        extension,
        _id,
        city,
        location,
        propertyType,
        beds,
        bathrooms,
        propertyReferenceId,
        description,
        landlord,
        landlordName,
        propertyComplete,
        reraTitleNumber,
        reraPreRegistrationNumber,
        building,
        neighborhood,
        agentName,
        agentCallNumber,
        agentEmail,
        agentWhatsapp,
    } = item;

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/property/${_id}`);
    };

    const imageUrl =
        image.startsWith("/uploads")
            ? `https://backend-git-main-pawan-togas-projects.vercel.app${image}`
            : image;

    return (
        <div className="hover:shadow-md p-2 rounded-md duration-200 cursor-pointer" onClick={handleClick}>
            <img className="rounded mb-3 object-cover h-56 lg:h-32 w-full" src={imageUrl} alt={`${title} image`} />
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
        city: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        propertyType: PropTypes.string.isRequired,
        beds: PropTypes.string.isRequired,
        bathrooms: PropTypes.string.isRequired,
        propertyReferenceId: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        landlord: PropTypes.bool.isRequired,
        landlordName: PropTypes.string,
        propertyComplete: PropTypes.bool,
        reraTitleNumber: PropTypes.string,
        reraPreRegistrationNumber: PropTypes.string,
        building: PropTypes.string,
        neighborhood: PropTypes.string,
        agentName: PropTypes.string.isRequired,
        agentCallNumber: PropTypes.string.isRequired,
        agentEmail: PropTypes.string.isRequired,
        agentWhatsapp: PropTypes.string.isRequired,
    }).isRequired,
};
