import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../utils/config";
import TourCard from "../shared/TourCard";
import SearchTours from "../components/Search/SearchTours";

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const { apiData: tours, error } = useFetch(`${BASE_URL}/tour?page=${page}`);
  const { apiData: tourCount } = useFetch(`${BASE_URL}/tour/count`);

  useEffect(() => {
    if (typeof tourCount === 'number' && !isNaN(tourCount)) {
      const pages = Math.ceil(tourCount / 12);
      setPageCount(pages);
    } else {
      setPageCount(0);
    }
    window.scrollTo(0, 0);
  }, [page, tourCount, tours]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-teal-900 to-green-900">
        <div className="container mx-auto px-6 py-20">
          <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <div className="max-w-5xl">
              <h1 className="text-6xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                Explore Amazing Tours
              </h1>
              <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Discover extraordinary destinations around the world. From cultural explorations to adventure-packed experiences, find your perfect getaway.
              </p>

              {/* Stats Cards */}
              <div className="flex flex-wrap justify-center gap-8 mb-12">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-white">50+</div>
                  <div className="text-sm text-gray-300">Destinations</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-white">100+</div>
                  <div className="text-sm text-gray-300">Tours Available</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-white">4.9</div>
                  <div className="text-sm text-gray-300">Customer Rating</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-white">Best</div>
                  <div className="text-sm text-gray-300">Price Guarantee</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-4 px-10 rounded-full transition-all duration-300">
                  Explore Tours
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-black font-bold py-4 px-10 rounded-full transition-all duration-300">
                  Get Custom Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Find Your Perfect Tour
            </h2>
            <p className="text-gray-600">
              Search through our extensive collection of travel experiences
            </p>
          </div>
          <SearchTours />
        </div>
      </section>

      {/* Tours Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-blue-300 rounded-full"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border-2 border-teal-300 rounded-lg rotate-45"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 border-2 border-purple-300 rounded-full"></div>
          <div className="absolute bottom-40 right-1/3 w-28 h-28 border-2 border-indigo-300 rounded-lg"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"></div>
              <div className="mx-4 text-2xl">✈️</div>
              <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full"></div>
            </div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
              Available Tours
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover extraordinary destinations with our expertly crafted tours. Each journey is designed to create unforgettable memories and cultural connections.
            </p>
          </div>

          {/* Tour Grid with Unique Layout */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
            {tours?.map((tour, index) => (
              <div
                key={tour._id}
                className="group relative transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card Container with Gradient Border */}
                <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group-hover:shadow-2xl transition-all duration-500">
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-teal-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Tour Card */}
                  <div className="relative z-10">
                    <TourCard tour={tour} />
                  </div>

                  {/* Floating Accent Elements */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100" style={{ transitionDelay: '100ms' }}></div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-teal-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pageCount > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <button
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Previous
              </button>

              <div className="flex space-x-1">
                {[...Array(pageCount).keys()].map((number) => (
                  <button
                    key={number}
                    onClick={() => setPage(number)}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      page === number
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {number + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setPage(Math.min(pageCount - 1, page + 1))}
                disabled={page === pageCount - 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Next
              </button>
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-20">
            <div className="bg-blue-600 p-8 rounded-lg shadow-lg">
              <h3 className="text-3xl font-bold text-white mb-4">
                Can't Find What You're Looking For?
              </h3>
              <p className="text-blue-100 mb-6 text-lg">
                Let our travel experts create a custom itinerary tailored just for you. Contact us for personalized recommendations!
              </p>
              <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-300">
                Contact Our Experts
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Tours;

