import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaRocket, FaMagic, FaFire, FaBolt, FaGem } from "react-icons/fa";
import CalculateAvg from "../utils/CalculateAvg";

const TourCard = ({ tour }) => {
  const { photo, title, city, distance, price, desc, _id, reviews, featured } = tour;
  const { totalRating, avgRating } = CalculateAvg(reviews);

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
      {/* Professional Card Structure */}
      <div className="relative">
        {/* Image Section */}
        <div className="relative overflow-hidden">
          <img
            className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
            src={photo || 'https://via.placeholder.com/800x600?text=No+Image'}
            alt={title}
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/800x600?text=No+Image'; }}
          />
          {/* Subtle Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Crazy but Subtle Elements */}
          <div className="absolute top-3 left-3 text-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
            ✨
          </div>
          <div className="absolute top-3 right-3 text-pink-400 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-2 group-hover:translate-y-0 delay-100">
            🌟
          </div>

          {/* Featured Badge - Professional with Crazy Touch */}
          {featured && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold py-1.5 px-3 rounded-full shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
              <FaStar className="inline mr-1 text-xs animate-pulse" />
              FEATURED
              <FaFire className="inline ml-1 text-xs animate-bounce" />
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* City and Rating */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              <FaMapMarkerAlt className="text-blue-500" />
              {city}
            </div>
            <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-full font-medium">
              <FaStar className="text-amber-500" />
              {avgRating} ({reviews.length})
            </div>
          </div>

          {/* Title */}
          <Link to={`/tours/${_id}`} className="block mb-3">
            <h3 className="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300 line-clamp-2">
              {title.length > 30 ? title.substring(0, 30) + "..." : title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
            {desc.length > 80 ? desc.substring(0, 80) + "..." : desc}
          </p>

          {/* Price and Button */}
          <div className="flex items-center justify-between">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-3 rounded-xl font-bold shadow-md">
              <p className="text-xs opacity-90">From</p>
              <p className="text-xl">₦ {price}</p>
            </div>
            <Link
              to={`/tours/${_id}`}
              className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md flex items-center gap-2"
            >
              <FaRocket className="text-sm" />
              Book Now
            </Link>
          </div>
        </div>

        {/* Crazy Hover Effects - Subtle */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-60 transition-all duration-500 animate-ping"></div>
          <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-teal-400 rounded-full opacity-0 group-hover:opacity-60 transition-all duration-500 animate-pulse delay-200"></div>
          <div className="absolute top-1/2 left-2 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-60 transition-all duration-500 animate-bounce delay-300"></div>
        </div>
      </div>

      {/* Professional Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
    </div>
  );
};

export default TourCard;
