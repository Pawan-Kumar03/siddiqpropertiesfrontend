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
            className="hover:shadow-xl p-6 rounded-lg bg-primary text-primary cursor-pointer font-primary transition duration-300 ease-in-out h-96 flex flex-col justify-between"
            onClick={handleClick}
            style={{ minWidth: '240px' }} // Ensure minimum width for consistency
        >
            {imageUrl ? (
                <img
                    className="rounded-lg mb-4 object-cover h-48 w-full"
                    src={imageUrl}
                    alt={`${title} image`}
                    style={{ objectFit: "cover" }} // Ensure image fits within the container
                />
            ) : (
                <div className="rounded-lg mb-4 font-primary object-cover h-48 w-full bg-lightBlue flex items-center justify-center">
                    <span className="text-primary font-playfair">No Image Available</span>
                </div>
            )}
            <div className="flex flex-col font-primary justify-between">
                <h3 className="text-2xl font-semibold text-primary font-playfair">
                    {price}
                </h3>
                <p className="text-primary font-semibold truncate mb-2 font-playfair">{title}</p>
                <p className="text-primary text-sm truncate font-playfair">{extension}</p>
            </div>
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


// import React from "react";
// import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";

// export default function Card({ item }) {
//     if (!item) return null;

//     const {
//         image = '',
//         images = [],
//         title = 'No title available',
//         price = 'N/A',
//         extension = '',
//         _id,
//         details = {
//             bedrooms: 'Studio',
//             bathrooms: '1 bath',
//             area: '309 sqft'
//         },
//         location = 'Azizi Riviera 1, Azizi Riviera, Meydan One, Dubai'
//     } = item;

//     const navigate = useNavigate();

//     const handleClick = () => {
//         if (_id) {
//             navigate(`/property/${_id}`);
//         }
//     };

//     const imageUrl = images.length > 0 ? images[0] : image;

//     const handleCall = (e) => {
//         e.stopPropagation();
//         // Add call functionality
//         console.log('Calling...');
//     };

//     const handleWhatsApp = (e) => {
//         e.stopPropagation();
//         // Add WhatsApp functionality
//         console.log('Opening WhatsApp...');
//     };

//     return (
//         <div
//             className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
//             onClick={handleClick}
//             style={{ maxWidth: '340px' }}
//         >
//             <div className="relative">
//                 <img
//                     className="w-full h-48 object-cover"
//                     src={imageUrl}
//                     alt={title}
//                 />
//                 <button className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
//                     <svg
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                     >
//                         <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
//                     </svg>
//                 </button>
//                 <div className="absolute bottom-2 left-2 flex items-center space-x-1">
//                     <span className="px-2 py-1 bg-white/80 rounded text-xs">1/10</span>
//                 </div>
//             </div>

//             <div className="p-4">
//                 <div className="flex items-center justify-between mb-2">
//                     <h3 className="text-xl font-bold">AED {price}</h3>
//                     <span className="text-sm text-gray-600">{details.area}</span>
//                 </div>
                
//                 <h4 className="text-lg mb-2">{title || 'Apartment'}</h4>
                
//                 <div className="flex items-center space-x-4 mb-3 text-gray-600">
//                     <span>{details.bedrooms}</span>
//                     <span>•</span>
//                     <span>{details.bathrooms}</span>
//                     <span>•</span>
//                     <span>{details.area}</span>
//                 </div>

//                 <div className="text-sm text-gray-600 mb-4">
//                     <div className="flex items-start">
//                         <svg
//                             className="w-5 h-5 mr-1 mt-0.5 flex-shrink-0"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                         >
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                         </svg>
//                         <span className="line-clamp-2">{location}</span>
//                     </div>
//                 </div>

//                 <div className="flex space-x-2">
//                     <button
//                         onClick={handleCall}
//                         className="flex-1 py-2 px-4 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors"
//                     >
//                         Call
//                     </button>
//                     <button
//                         onClick={handleWhatsApp}
//                         className="flex-1 py-2 px-4 bg-green-50 text-green-600 rounded-lg font-medium hover:bg-green-100 transition-colors"
//                     >
//                         WhatsApp
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// Card.propTypes = {
//     item: PropTypes.shape({
//         image: PropTypes.string,
//         images: PropTypes.arrayOf(PropTypes.string),
//         title: PropTypes.string,
//         price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//         extension: PropTypes.string,
//         _id: PropTypes.string.isRequired,
//         details: PropTypes.shape({
//             bedrooms: PropTypes.string,
//             bathrooms: PropTypes.string,
//             area: PropTypes.string,
//         }),
//         location: PropTypes.string,
//     }).isRequired,
// };