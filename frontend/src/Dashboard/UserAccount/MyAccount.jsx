import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import avatar from "../../assets/images/avatar.jpg";
import Bookings from "./Bookings";
import BASE_URL from "../../utils/config";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPlane,
  FaCamera,
  FaStar,
  FaTrash,
  FaEdit,
  FaGlobe,
  FaRocket,
  FaHeart,
  FaCrown,
  FaShieldAlt,
  FaAward
} from "react-icons/fa";

const MyAccount = () => {
  const { user, dispatch, token } = useContext(AuthContext);
  const [tab, setTab] = useState("bookings");
  const navigate = useNavigate();

  const confirmDelete = async () => {
    const result = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (result) {
      deleteAccount();
    }
  };

  const deleteAccount = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user/users/${user._id}`, {
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
        dispatch({ type: "LOGOUT" });
        navigate("/register");
      }
    } catch (err) {
      toast.error("Server not responding");
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-400 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-green-400 rounded-full opacity-15 animate-ping"></div>
        <div className="absolute top-1/3 right-10 w-20 h-20 bg-orange-400 rounded-full opacity-25 animate-bounce"></div>
        <div className="absolute bottom-1/3 left-1/2 w-16 h-16 bg-cyan-400 rounded-full opacity-20 animate-spin"></div>
      </div>

      {/* Floating Travel Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <FaPlane className="absolute top-1/4 left-1/6 text-white/20 text-4xl animate-bounce" style={{ animationDelay: '0s' }} />
        <FaGlobe className="absolute top-1/2 right-1/6 text-white/20 text-3xl animate-spin" style={{ animationDelay: '1s' }} />
        <FaCamera className="absolute bottom-1/4 left-1/3 text-white/20 text-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        <FaRocket className="absolute top-3/4 right-1/4 text-white/20 text-3xl animate-bounce" style={{ animationDelay: '0.5s' }} />
        <FaHeart className="absolute bottom-1/3 right-1/3 text-white/20 text-2xl animate-ping" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 max-w-[1170px] py-8 px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Sidebar Profile Card */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-500">
              {/* Crown Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-3 shadow-lg animate-bounce">
                  <FaCrown className="text-white text-xl" />
                </div>
              </div>

              {/* Avatar Section */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <figure className="w-[120px] h-[120px] rounded-full border-4 border-white/30 shadow-2xl overflow-hidden transform hover:scale-110 transition-all duration-300">
                    <img
                      src={avatar}
                      alt="Profile Avatar"
                      className="w-full h-full object-cover hover:scale-110 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </figure>
                  {/* Status Indicator */}
                  <div className="absolute -bottom-2 -right-2 bg-green-400 rounded-full p-2 border-4 border-white shadow-lg animate-pulse">
                    <FaShieldAlt className="text-white text-sm" />
                  </div>
                </div>
              </div>

              {/* User Info */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                  <FaUser className="text-yellow-400" />
                  {user.username}
                </h3>
                <p className="text-gray-300 text-sm flex items-center justify-center gap-2 mb-4">
                  <FaEnvelope className="text-blue-400" />
                  {user.email}
                </p>

                {/* User Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                    <div className="text-2xl font-bold text-yellow-400">12</div>
                    <div className="text-xs text-gray-300">Trips</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                    <div className="text-2xl font-bold text-pink-400">4.9</div>
                    <div className="text-xs text-gray-300">Rating</div>
                  </div>
                </div>

                {/* Achievement Badges */}
                <div className="flex justify-center gap-2 mb-6">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2">
                    <FaAward className="text-white text-sm" />
                  </div>
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full p-2">
                    <FaStar className="text-white text-sm" />
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-full p-2">
                    <FaMapMarkerAlt className="text-white text-sm" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setTab("settings")}
                  className="group w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  <FaEdit className="group-hover:animate-bounce" />
                  Update Profile
                  <FaRocket className="group-hover:animate-pulse" />
                </button>
                <button
                  onClick={confirmDelete}
                  className="group w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  <FaTrash className="group-hover:animate-bounce" />
                  Delete Account
                  <FaHeart className="group-hover:animate-pulse" />
                </button>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-60 animate-ping"></div>
              <div className="absolute -top-4 -left-4 w-6 h-6 bg-pink-400 rounded-full opacity-60 animate-bounce"></div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-2">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl min-h-[600px]">
              {/* Tab Navigation */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => setTab("bookings")}
                  className={`group flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3 ${
                    tab === "bookings" ? "ring-4 ring-white/50 scale-105" : ""
                  }`}
                >
                  <FaPlane className="group-hover:animate-bounce" />
                  My Adventures
                  <FaGlobe className="group-hover:animate-spin" />
                </button>
                <button
                  onClick={() => setTab("settings")}
                  className={`group flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3 ${
                    tab === "settings" ? "ring-4 ring-white/50 scale-105" : ""
                  }`}
                >
                  <FaUser className="group-hover:animate-pulse" />
                  Profile Settings
                  <FaStar className="group-hover:animate-bounce" />
                </button>
              </div>

              {/* Tab Content */}
              <div className="relative">
                <div className={`transition-all duration-500 ${
                  tab === "bookings" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 absolute inset-0"
                }`}>
                  {tab === "bookings" && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-6">
                        <FaPlane className="text-yellow-400 text-2xl animate-bounce" />
                        <h2 className="text-3xl font-bold text-white">My Travel Adventures</h2>
                        <FaGlobe className="text-blue-400 text-2xl animate-spin" />
                      </div>
                      <Bookings />
                    </div>
                  )}
                </div>

                <div className={`transition-all duration-500 ${
                  tab === "settings" ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 absolute inset-0"
                }`}>
                  {tab === "settings" && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-6">
                        <FaUser className="text-purple-400 text-2xl animate-pulse" />
                        <h2 className="text-3xl font-bold text-white">Profile Customization</h2>
                        <FaEdit className="text-pink-400 text-2xl animate-bounce" />
                      </div>
                      <Profile user={user} dispatch={dispatch} token={token} />
                    </div>
                  )}
                </div>
              </div>

              {/* Floating Decorative Elements */}
              <div className="absolute top-4 right-4 text-4xl animate-bounce">✨</div>
              <div className="absolute bottom-4 left-4 text-3xl animate-pulse">🌟</div>
              <div className="absolute top-1/2 right-8 text-2xl animate-ping">💫</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
