import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import BASE_URL from "../../utils/config";
import { Search, Filter, Calendar, Users, DollarSign, CheckCircle } from "lucide-react";
import AdminBookingTable from "../../shared/AdminBookingTable";

const Bookings = () => {
  const { apiData: bookings } = useFetch(`${BASE_URL}/booking`);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Calculate statistics
  const totalBookings = bookings?.length || 0;
  const totalRevenue = bookings?.reduce((sum, booking) => sum + (booking.totalPrice || 0), 0) || 0;
  const totalGuests = bookings?.reduce((sum, booking) => sum + (booking.maxGroupSize || 0), 0) || 0;
  const avgBookingValue = totalBookings > 0 ? Math.round(totalRevenue / totalBookings) : 0;

  // Filter bookings based on search
  const filteredBookings = bookings?.filter(booking => {
    const matchesSearch = booking.tourName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.phone.includes(searchTerm);
    return matchesSearch;
  }) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 md:px-6 lg:px-10">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Booking Management
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Track and manage all tour bookings
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Bookings */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Calendar size={24} className="text-blue-600" strokeWidth={2.5} />
              </div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Total
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              {totalBookings}
            </h3>
            <p className="text-sm text-gray-600">Total Bookings</p>
          </div>

          {/* Total Revenue */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-green-50 rounded-xl">
                <DollarSign size={24} className="text-green-600" strokeWidth={2.5} />
              </div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Revenue
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              ₦{totalRevenue.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-600">Total Revenue</p>
          </div>

          {/* Total Guests */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-purple-50 rounded-xl">
                <Users size={24} className="text-purple-600" strokeWidth={2.5} />
              </div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Guests
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              {totalGuests}
            </h3>
            <p className="text-sm text-gray-600">Total Guests</p>
          </div>

          {/* Average Booking Value */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-amber-50 rounded-xl">
                <CheckCircle size={24} className="text-amber-600" strokeWidth={2.5} />
              </div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Average
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              ₦{avgBookingValue.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-600">Avg Booking Value</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search 
                size={20} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
                strokeWidth={2.5}
              />
              <input
                type="text"
                placeholder="Search by tour name, customer name, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-BaseColor focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        {filteredBookings && filteredBookings.length > 0 ? (
          <AdminBookingTable bookings={filteredBookings} />
        ) : (
          <div className="py-16 text-center">
            <div className="mb-4">
              <Calendar size={64} className="mx-auto text-gray-300" strokeWidth={1.5} />
            </div>
            <p className="text-gray-500 text-lg font-medium mb-2">No bookings found</p>
            <p className="text-gray-400 text-sm">
              {searchTerm 
                ? "Try adjusting your search" 
                : "No bookings have been made yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
