import React, { useRef } from "react";
import BASE_URL from "../../utils/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Sparkles } from "lucide-react";

const SearchTours = () => {
  const cityRef = useRef(null);
  const navigate = useNavigate();

  const SubmitHandler = async () => {
    const searchTerm = cityRef.current.value;

    if (searchTerm === "") {
      toast.error("Please enter a destination to search");
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/tour/search?search=${searchTerm}`
      );
      const result = await response.json();
      
      if (!response.ok) {
        toast.info("No tours found for this destination");
      }
      
      navigate(`/tours/search?search=${searchTerm}`, { state: result.data });
    } catch (error) {
      toast.error("Failed to fetch search results");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      SubmitHandler();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles size={24} className="text-yellow-500" strokeWidth={2.5} />
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Find Your Perfect Tour
            </h2>
            <Sparkles size={24} className="text-yellow-500" strokeWidth={2.5} />
          </div>
          <p className="text-gray-600">
            Explore amazing destinations around the world
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative flex items-center bg-gray-50 rounded-xl border-2 border-gray-200 focus-within:border-BaseColor focus-within:ring-4 focus-within:ring-BaseColor/10 transition-all duration-300">
          <div className="flex items-center gap-3 pl-5 pr-3 border-r border-gray-200">
            <MapPin size={22} className="text-gray-400" strokeWidth={2.5} />
          </div>
          
          <input
            type="search"
            ref={cityRef}
            onKeyPress={handleKeyPress}
            className="flex-1 py-4 px-4 bg-transparent focus:outline-none text-gray-800 placeholder:text-gray-400 text-lg"
            placeholder="Search by city, destination or country..."
          />
          
          <button
            onClick={SubmitHandler}
            className="m-2 px-6 py-3 bg-gradient-to-r from-BaseColor to-BHoverColor hover:from-BHoverColor hover:to-BaseColor text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
          >
            <Search size={20} strokeWidth={2.5} />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>

        {/* Popular Searches */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-500 font-medium">Popular:</span>
          {['Paris', 'Tokyo', 'New York', 'Bali', 'Dubai'].map((city) => (
            <button
              key={city}
              onClick={() => {
                cityRef.current.value = city;
                SubmitHandler();
              }}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-BaseColor hover:text-white text-gray-700 rounded-full transition-all duration-300 font-medium"
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchTours;
