import useFetch from "../../hooks/useFetch";
import BASE_URL from "../../utils/config";
import React, { useState, useEffect } from "react";
import { Search, Filter, Plus, BarChart3, Star, Users, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import AdminTourTable from "../../shared/AdminTourTable";

const AdminTours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFeatured, setFilterFeatured] = useState("all");
  
  const { apiData: tours, error } = useFetch(`${BASE_URL}/tour?page=${page}`);
  const { apiData: tourCount } = useFetch(`${BASE_URL}/tour/count`);

  useEffect(() => {
    const pages = Math.ceil(tourCount / 12) || 0;
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, tourCount]);

  // Calculate statistics
  const featuredCount = tours?.filter(tour => tour.featured).length || 0;
  const totalReviews = tours?.reduce((sum, tour) => sum + (tour.reviews?.length || 0), 0) || 0;
  const avgGroupSize = tours?.length > 0 
    ? Math.round(tours.reduce((sum, tour) => sum + (tour.maxGroupSize || 0), 0) / tours.length) 
    : 0;

  // Filter tours based on search and filter
  const filteredTours = tours?.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tour.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterFeatured === "all" || 
                         (filterFeatured === "featured" && tour.featured) ||
                         (filterFeatured === "regular" && !tour.featured);
    return matchesSearch && matchesFilter;
  }) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 md:px-6 lg:px-10">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Tour Management
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Manage and organize your tour listings
            </p>
          </div>
          <Link
            to="/create"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-BaseColor to-BHoverColor hover:from-BHoverColor hover:to-BaseColor text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Plus size={20} strokeWidth={2.5} />
            Add New Tour
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Tours */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-blue-50 rounded-xl">
                <BarChart3 size={24} className="text-blue-600" strokeWidth={2.5} />
              </div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Total
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              {tourCount || 0}
            </h3>
            <p className="text-sm text-gray-600">Total Tours</p>
          </div>

          {/* Featured Tours */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-amber-50 rounded-xl">
                <Star size={24} className="text-amber-600" strokeWidth={2.5} />
              </div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Featured
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              {featuredCount}
            </h3>
            <p className="text-sm text-gray-600">Featured Tours</p>
          </div>

          {/* Total Reviews */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-purple-50 rounded-xl">
                <MessageSquare size={24} className="text-purple-600" strokeWidth={2.5} />
              </div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Reviews
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              {totalReviews}
            </h3>
            <p className="text-sm text-gray-600">Total Reviews</p>
          </div>

          {/* Avg Group Size */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-green-50 rounded-xl">
                <Users size={24} className="text-green-600" strokeWidth={2.5} />
              </div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Average
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              {avgGroupSize}
            </h3>
            <p className="text-sm text-gray-600">Avg Group Size</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search 
                size={20} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
                strokeWidth={2.5}
              />
              <input
                type="text"
                placeholder="Search by tour name or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-BaseColor focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative flex items-center gap-2">
              <Filter size={20} className="text-gray-400" strokeWidth={2.5} />
              <select
                value={filterFeatured}
                onChange={(e) => setFilterFeatured(e.target.value)}
                className="px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-BaseColor focus:border-transparent transition-all duration-300 bg-white cursor-pointer"
              >
                <option value="all">All Tours</option>
                <option value="featured">Featured Only</option>
                <option value="regular">Regular Only</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      )}

      {/* Tours Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        {filteredTours && filteredTours.length > 0 ? (
          <AdminTourTable tours={filteredTours} />
        ) : (
          <div className="py-16 text-center">
            <div className="mb-4">
              <BarChart3 size={64} className="mx-auto text-gray-300" strokeWidth={1.5} />
            </div>
            <p className="text-gray-500 text-lg font-medium mb-2">No tours found</p>
            <p className="text-gray-400 text-sm">
              {searchTerm || filterFeatured !== "all" 
                ? "Try adjusting your search or filters" 
                : "Start by adding your first tour"}
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              page === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-BaseColor hover:text-white shadow-md"
            }`}
          >
            Previous
          </button>
          
          <div className="flex gap-2">
            {[...Array(pageCount).keys()].map((number) => (
              <button
                key={number}
                onClick={() => setPage(number)}
                className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
                  page === number
                    ? "bg-gradient-to-r from-BaseColor to-BHoverColor text-white shadow-lg scale-110"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                }`}
              >
                {number + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setPage(Math.min(pageCount - 1, page + 1))}
            disabled={page === pageCount - 1}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              page === pageCount - 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-BaseColor hover:text-white shadow-md"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminTours;
