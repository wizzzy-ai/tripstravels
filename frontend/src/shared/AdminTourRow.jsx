import React, { useContext, useState } from "react";
import BASE_URL from "../utils/config";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Edit2, Trash2, Eye, Star, StarOff } from "lucide-react";

const AdminTourRow = ({ tour }) => {
  const { token } = useContext(AuthContext);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    title,
    city,
    price,
    maxGroupSize,
    featured,
    reviews,
    photo,
    _id,
  } = tour;

  const handleDelete = () => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete "${title}"? This action cannot be undone.`
    );

    if (isConfirmed) {
      deleteTour();
    }
  };

  const deleteTour = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`${BASE_URL}/tour/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { message } = await response.json();

      if (!response.ok) {
        toast.error(message);
      } else {
        toast.success(message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      toast.error("Server not responding");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-200 group">
      {/* Image */}
      <td className="px-6 py-4">
        <div className="relative w-20 h-16 rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300">
          <img
            src={photo || 'https://via.placeholder.com/150x100?text=No+Image'}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150x100?text=No+Image'; }}
          />
          {featured && (
            <div className="absolute top-1 right-1 bg-amber-500 p-1 rounded-full">
              <Star size={12} className="text-white" fill="white" strokeWidth={2} />
            </div>
          )}
        </div>
      </td>

      {/* Title */}
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <Link
            to={`/tours/${_id}`}
            className="font-semibold text-gray-900 hover:text-BaseColor transition-colors duration-200 line-clamp-1"
          >
            {title}
          </Link>
          <span className="text-xs text-gray-500 mt-1">
            ID: {_id.substring(0, 8)}...
          </span>
        </div>
      </td>

      {/* City */}
      <td className="px-6 py-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
          {city}
        </span>
      </td>

      {/* Featured */}
      <td className="px-6 py-4 text-center">
        {featured ? (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
            <Star size={14} fill="currentColor" strokeWidth={2} />
            Yes
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
            <StarOff size={14} strokeWidth={2} />
            No
          </span>
        )}
      </td>

      {/* Group Size */}
      <td className="px-6 py-4 text-center">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-purple-50 text-purple-700 font-bold">
          {maxGroupSize}
        </span>
      </td>

      {/* Reviews */}
      <td className="px-6 py-4 text-center">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-green-50 text-green-700 font-bold">
          {reviews.length}
        </span>
      </td>

      {/* Price */}
      <td className="px-6 py-4 text-center">
        <span className="font-bold text-gray-900">
          ₦{price.toLocaleString()}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-2">
          {/* View Button */}
          <Link
            to={`/tours/${_id}`}
            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 hover:scale-110 transition-all duration-200 group/btn"
            title="View Tour"
          >
            <Eye size={18} strokeWidth={2.5} />
          </Link>

          {/* Edit Button */}
          <Link
            to={`/update-tour/${_id}`}
            className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 hover:scale-110 transition-all duration-200 group/btn"
            title="Edit Tour"
          >
            <Edit2 size={18} strokeWidth={2.5} />
          </Link>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:scale-110 transition-all duration-200 group/btn ${
              isDeleting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            title="Delete Tour"
          >
            <Trash2 
              size={18} 
              strokeWidth={2.5} 
              className={isDeleting ? "animate-pulse" : ""}
            />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdminTourRow;
