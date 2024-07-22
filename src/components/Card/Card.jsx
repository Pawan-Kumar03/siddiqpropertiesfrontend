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

    // const imageUrl =
    //     image.startsWith("/uploads")
    //         ? `http://localhost:5000${image}`
    //         : image;

    return (
        <div
            className="hover:shadow-lg p-4 rounded-lg bg-gray-800 dark:bg-gray-900 cursor-pointer transition duration-200"
            onClick={handleClick}
        >
            <img
                className="rounded-lg mb-3 object-cover h-56 lg:h-32 w-full"
                src={image}
                alt={`${title} image`}
            />
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
