import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});
import avatar from "../assets/images/avatar.jpg";
import { FaPeopleGroup, FaLocationDot } from "react-icons/fa6";
import { FaStar, FaMapPin, FaCity, FaDollarSign, FaPlane, FaGlobe, FaCamera, FaRocket, FaHeart, FaFire, FaMagic, FaCrown, FaClock, FaUserFriends, FaShieldAlt, FaCalendarAlt, FaComments, FaPen, FaPaperPlane, FaSun, FaCloudRain, FaInfoCircle } from "react-icons/fa";
import CalculateAvg from "../utils/CalculateAvg";
import Booking from "../components/Booking/Booking";
import MapComponent from "../components/MapComponent";
import { toast } from "react-toastify";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../utils/config";
import { AuthContext } from "../context/AuthContext";
import toursData from "../assets/data/tours.json";

const TourDetails = () => {
  const { user, token } = useContext(AuthContext);
  const reviewMsgRef = useRef();
  const [tourRating, setTourRating] = useState();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const { apiData: tour, error } = useFetch(`${BASE_URL}/tour/${id}`, {
    method: "GET",
  });

  // Fallback to local data if API fails
  const localTour = toursData.find(t =>
    t.title.toLowerCase().replace(/\s+/g, '-').includes(id.toLowerCase()) ||
    id === t.title.toLowerCase().replace(/\s+/g, '-') ||
    t._id === id
  );
  const tourData = tour || localTour;

  const {
    title = "",
    photo = "",
    desc = "",
    price = "",
    reviews = "",
    city = "",
    distance = "",
    maxGroupSize = "",
    address = "",
    bestTimeToVisit = [],
    weather = {},
    location = {},
    quickInfo = {},
  } = tourData || {};
  const reviewsArray = Array.isArray(reviews) ? reviews : [];
  const { totalRating, avgRating } = CalculateAvg(reviewsArray);
  const options = { day: "numeric", month: "long", year: "numeric" };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {
      if (user) {
        const reviewData = {
          username: user.username,
          reviewText,
          rating: tourRating,
        };
        const response = await fetch(`${BASE_URL}/review/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(reviewData),
        });
        const result = await response.json();
        if (response.ok) {
          window.location.reload();
        } else {
          toast.error(result.message);
        }
      }
      if (!user || user === null || user === undefined) {
        toast.error("Please Sign In first");
      }
    } catch (err) {
      toast.error("Server not responding");
      console.log(err);
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Crazy Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-blue-200 rounded-full opacity-20 animate-spin-slow"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-4 border-teal-200 rounded-lg rotate-45 animate-bounce-slow"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 border-4 border-purple-200 rounded-full opacity-15 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 border-4 border-indigo-200 rounded-lg animate-spin-slow"></div>

        {/* Animated Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}

        {/* Floating Travel Icons */}
        <FaPlane className="absolute top-1/4 left-1/6 text-blue-300 text-4xl animate-bounce opacity-40" style={{ animationDelay: '0s' }} />
        <FaGlobe className="absolute top-1/2 right-1/6 text-teal-300 text-3xl animate-spin opacity-30" style={{ animationDelay: '2s' }} />
        <FaCamera className="absolute bottom-1/4 left-1/3 text-purple-300 text-3xl animate-pulse opacity-35" style={{ animationDelay: '1s' }} />
        <FaRocket className="absolute top-3/4 right-1/4 text-indigo-300 text-4xl animate-bounce opacity-25" style={{ animationDelay: '3s' }} />
        <FaHeart className="absolute bottom-1/3 right-1/3 text-pink-300 text-3xl animate-ping opacity-30" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Tour Details */}
          <div className="flex-1 space-y-8">
            {/* Hero Image Section */}
            <div className="relative group">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-white/50 backdrop-blur-sm">
                <img
                  src={photo || 'https://via.placeholder.com/1200x800?text=No+Image'}
                  alt={title}
                  className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/1200x800?text=No+Image'; }}
                />
                {/* Overlay Effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Crazy Floating Elements */}
                <div className="absolute top-4 left-4 text-4xl animate-bounce text-yellow-400 opacity-80">✨</div>
                <div className="absolute top-6 right-6 text-3xl animate-spin text-pink-400 opacity-70">🌟</div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-3xl animate-pulse text-cyan-400 opacity-75">🚀</div>

                {/* Featured Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold py-2 px-4 rounded-full shadow-lg transform rotate-6 animate-bounce">
                  <FaStar className="inline mr-1 animate-spin" />
                  PREMIUM TOUR
                  <FaFire className="inline ml-1 animate-pulse" />
                </div>
              </div>

              {/* Floating Accent Dots */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full animate-ping opacity-60"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-teal-400 rounded-full animate-pulse opacity-70"></div>
            </div>

            {/* Tour Information Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50">
              {/* Title with Crazy Effects */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center mb-4">
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"></div>
                  <FaMagic className="mx-4 text-2xl text-purple-500 animate-spin" />
                  <div className="w-12 h-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full"></div>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-4">
                  {title}
                </h1>
                <div className="flex justify-center items-center gap-2 text-lg text-gray-600">
                  <FaCrown className="text-yellow-500 animate-bounce" />
                  <span>Experience the Extraordinary</span>
                  <FaCrown className="text-yellow-500 animate-bounce" />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                  <FaStar className="text-2xl text-amber-500 mx-auto mb-2 animate-pulse" />
                  <div className="text-2xl font-bold text-gray-800">{avgRating}</div>
                  <div className="text-sm text-gray-600">Rating</div>
                  <div className="text-xs text-gray-500">({reviewsArray.length} reviews)</div>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl border border-teal-200">
                  <FaMapPin className="text-2xl text-red-500 mx-auto mb-2 animate-bounce" />
                  <div className="text-lg font-bold text-gray-800">{city}</div>
                  <div className="text-sm text-gray-600">Location</div>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
                  <FaClock className="text-2xl text-purple-500 mx-auto mb-2 animate-spin" />
                  <div className="text-lg font-bold text-gray-800">{distance}km</div>
                  <div className="text-sm text-gray-600">Distance</div>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl border border-emerald-200">
                  <FaUserFriends className="text-2xl text-emerald-500 mx-auto mb-2 animate-pulse" />
                  <div className="text-lg font-bold text-gray-800">{maxGroupSize}</div>
                  <div className="text-sm text-gray-600">Max Group</div>
                </div>
              </div>

              {/* Description Section */}
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <FaMagic className="text-purple-500 animate-spin" />
                  Journey Description
                  <FaStar className="text-yellow-500 animate-pulse" />
                </h3>
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl border border-gray-200">
                  <p className="text-gray-700 leading-relaxed text-lg">{desc}</p>
                </div>
              </div>

              {/* Interactive Map Section */}
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <FaGlobe className="text-blue-500 animate-spin" />
                  Location Map
                  <FaMapPin className="text-red-500 animate-bounce" />
                </h3>
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/50">
                  <MapComponent location={location} title={title} city={city} />
                </div>
              </div>

              {/* Best Time to Visit Section */}
              {bestTimeToVisit && bestTimeToVisit.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <FaCalendarAlt className="text-green-500 animate-bounce" />
                    Best Time to Visit
                    <FaSun className="text-yellow-500 animate-pulse" />
                  </h3>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                          <FaCalendarAlt className="animate-pulse" />
                          Recommended Months
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {bestTimeToVisit.map((month, index) => (
                            <span
                              key={index}
                              className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium animate-fade-in"
                              style={{ animationDelay: `${index * 0.1}s` }}
                            >
                              {month}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                          <FaCloudRain className="animate-bounce" />
                          Weather Info
                        </h4>
                        <div className="space-y-2">
                          <p className="text-green-700">
                            <span className="font-medium">Average Temperature:</span> {weather.avgTemp || 'N/A'}
                          </p>
                          <p className="text-green-700">
                            <span className="font-medium">Season:</span> {weather.season || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Info Section */}
              {quickInfo && (
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <FaInfoCircle className="text-purple-500 animate-spin" />
                    Quick Info
                    <FaStar className="text-yellow-500 animate-pulse" />
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-200 text-center">
                      <FaCalendarAlt className="text-2xl text-purple-500 mx-auto mb-2 animate-bounce" />
                      <div className="text-sm text-purple-600 mb-1">Best Time</div>
                      <div className="font-bold text-purple-800">{quickInfo.bestTime || 'N/A'}</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200 text-center">
                      <FaCloudRain className="text-2xl text-blue-500 mx-auto mb-2 animate-pulse" />
                      <div className="text-sm text-blue-600 mb-1">Weather</div>
                      <div className="font-bold text-blue-800">{quickInfo.weather || 'N/A'}</div>
                    </div>
                    <div className="bg-gradient-to-br from-red-50 to-pink-50 p-4 rounded-xl border border-red-200 text-center">
                      <FaMapPin className="text-2xl text-red-500 mx-auto mb-2 animate-bounce" />
                      <div className="text-sm text-red-600 mb-1">Location</div>
                      <div className="font-bold text-red-800">{quickInfo.location || 'N/A'}</div>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-200 text-center">
                      <FaDollarSign className="text-2xl text-emerald-500 mx-auto mb-2 animate-pulse" />
                      <div className="text-sm text-emerald-600 mb-1">Cost</div>
                      <div className="font-bold text-emerald-800">{quickInfo.estimatedCost || 'N/A'}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-200">
                  <h4 className="font-bold text-indigo-800 mb-2 flex items-center gap-2">
                    <FaShieldAlt className="animate-pulse" />
                    What's Included
                  </h4>
                  <ul className="text-sm text-indigo-700 space-y-1">
                    <li>• Professional Guide</li>
                    <li>• Transportation</li>
                    <li>• Meals</li>
                    <li>• Entrance Fees</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-4 rounded-xl border border-rose-200">
                  <h4 className="font-bold text-rose-800 mb-2 flex items-center gap-2">
                    <FaCalendarAlt className="animate-bounce" />
                    Best Time to Visit
                  </h4>
                  <p className="text-sm text-rose-700">
                    {bestTimeToVisit && bestTimeToVisit.length > 0
                      ? bestTimeToVisit.join(', ')
                      : 'Year-round adventure available'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center mb-4">
                  <FaComments className="text-2xl text-blue-500 animate-bounce" />
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mx-4"></div>
                  <FaStar className="text-2xl text-amber-500 animate-pulse" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">
                  Traveler Reviews
                </h3>
                <p className="text-gray-600">{reviewsArray.length} amazing experiences shared</p>
              </div>

              {/* Review Form */}
              <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl border border-blue-200">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaPen className="text-blue-500 animate-pulse" />
                  Share Your Experience
                </h4>
                <form onSubmit={handleSubmit}>
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`text-2xl cursor-pointer transition-all duration-300 ${
                          tourRating >= star
                            ? "text-amber-500 animate-bounce"
                            : "text-gray-300 hover:text-amber-400"
                        }`}
                        onClick={() => setTourRating(star)}
                      />
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      ref={reviewMsgRef}
                      placeholder="Share your adventure story..."
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    />
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
                    >
                      <FaPaperPlane className="animate-pulse" />
                      Submit
                    </button>
                  </div>
                </form>
              </div>

              {/* Reviews List */}
              <div className="space-y-6">
                {reviewsArray?.map((review, index) => (
                  <div
                    key={review._id || index}
                    className="p-6 bg-white/60 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-teal-500 flex items-center justify-center text-white font-bold shadow-lg">
                        {review.username?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-bold text-gray-800">{review.username}</h5>
                          <div className="flex items-center gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <FaStar key={i} className="text-amber-500 text-sm animate-pulse" />
                            ))}
                            <span className="text-sm text-gray-600 ml-1">({review.rating})</span>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-2 leading-relaxed">{review.reviewText}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString("en-US", options)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Component */}
          <div className="lg:w-96">
            <div className="sticky top-8">
              <Booking
                title={title}
                price={price}
                avgRating={avgRating}
                reviewsArray={reviewsArray}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourDetails;

