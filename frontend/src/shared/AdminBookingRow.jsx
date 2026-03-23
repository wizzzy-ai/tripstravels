import React, { useState } from "react";
import BASE_URL from "../utils/config";
import { toast } from "react-toastify";
import { User, Phone, Calendar, CheckCircle, Trash2 } from "lucide-react";

const AdminBookingRow = ({ booking }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  
  const {
    tourName,
    fullName,
    userId,
    phone,
    totalPrice,
    maxGroupSize,
    date,
    createdAt,
    _id,
  } = booking;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const confirmComplete = async () => {
    const result = window.confirm(
      `Mark booking for "${tourName}" by ${fullName} as completed?`
    );
    if (result) {
      completeBooking();
    }
  };

  const confirmDelete = async () => {
    const result = window.confirm(
      `Are you sure you want to delete the booking for "${tourName}"?`
    );
    if (result) {
      deleteBooking();
    }
  };

  const completeBooking = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`${BASE_URL}/booking/${_id}`, {
        method: "DELETE",
      });
      const { message } = await response.json();

      if (response.ok) {
        toast.success("Booking marked as completed!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(message);
      }
    } catch (err) {
      toast.error("Server not responding");
    } finally {
      setIsDeleting(false);
    }
  };

  const deleteBooking = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`${BASE_URL}/booking/${_id}`, {
        method: "DELETE",
      });
      const { message } = await response.json();

      if (response.ok) {
        toast.success(message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(message);
      }
    } catch (err) {
      toast.error("Server not responding");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-200 group">
      {/* Tour Name */}
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900 line-clamp-1">
            {tourName}
          </span>
          <span className="text-xs text-gray-500 mt-1">
            ID: {_id.substring(0, 8)}...
          </span>
        </div>
      </td>

      {/* Customer Info */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-50 rounded-lg">
            <User size={16} className="text-blue-600" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">{fullName}</span>
            <span className="text-xs text-gray-500">{userId.substring(0, 8)}...</span>
          </div>
        </div>
      </td>

      {/* Contact */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Phone size={16} className="text-gray-400" strokeWidth={2.5} />
          <span className="text-sm text-gray-700">{phone}</span>
        </div>
      </td>

      {/* Guests */}
      <td className="px-6 py-4 text-center">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-purple-50 text-purple-700 font-bold">
          {maxGroupSize}
        </span>
      </td>

      {/* Booking Date */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-400" strokeWidth={2.5} />
          <span className="text-sm text-gray-700">{formatDate(createdAt)}</span>
        </div>
      </td>

      {/* Tour Date */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-green-500" strokeWidth={2.5} />
          <span className="text-sm font-medium text-gray-900">{formatDate(date)}</span>
        </div>
      </td>

      {/* Total Price */}
      <td className="px-6 py-4 text-center">
        <span className="inline-flex items-center px-3 py-2 rounded-lg bg-green-50 text-green-700 font-bold">
          ₦{totalPrice.toLocaleString()}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-2">
          {/* Complete Button */}
          <button
            onClick={confirmComplete}
            disabled={isDeleting}
            className={`p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 hover:scale-110 transition-all duration-200 ${
              isDeleting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            title="Mark as Completed"
          >
            <CheckCircle 
              size={18} 
              strokeWidth={2.5}
              className={isDeleting ? "animate-pulse" : ""}
            />
          </button>

          {/* Delete Button */}
          <button
            onClick={confirmDelete}
            disabled={isDeleting}
            className={`p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:scale-110 transition-all duration-200 ${
              isDeleting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            title="Delete Booking"
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

export default AdminBookingRow;
