import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../utils/config";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import {
  User,
  Mail,
  Camera,
  Edit,
  Save,
  X,
  Star,
  MapPin,
  Phone,
  Settings,
  ShieldCheck,
  LogOut,
  Calendar,
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
  Loader2
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { user, token, dispatch } = useContext(AuthContext);
  const { apiData: updatedUser, error } = useFetch(
    `${BASE_URL}/tour/${user._id}`
  );

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    photo: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("/user-images/admin.jpg");

  useEffect(() => {
    setFormData({ username: user.username, email: user.email, photo: "" });
  }, [user]);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/user/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const { message } = await response.json();

      if (response.ok) {
        dispatch({
          type: "UPDATE_USER",
          payload: {
            user: response.data,
            token: response.token,
          },
        });
        setIsEditing(false);
        toast.success(message || "Profile updated successfully!");
      } else {
        toast.error(message);
      }
    } catch (err) {
      toast.error("Server not responding");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/home");
    toast.info("Logged out successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 md:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            My Profile
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-24">
              {/* Avatar Section */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-BaseColor to-BHoverColor p-1">
                    <img
                      src={avatarPreview}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover bg-gray-200"
                    />
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-BaseColor text-white flex items-center justify-center cursor-pointer hover:bg-BHoverColor transition-all duration-300 shadow-lg hover:scale-110">
                      <Camera size={20} strokeWidth={2.5} />
                      <input
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-1">
                  {formData.username}
                </h2>
                <p className="text-gray-600 mb-3">{formData.email}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-amber-400"
                      fill="currentColor"
                      strokeWidth={2}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">5.0</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-3 mb-6 border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <Calendar size={20} className="text-blue-600" strokeWidth={2.5} />
                    <span className="text-gray-700 font-medium">Bookings</span>
                  </div>
                  <span className="font-bold text-blue-600">12</span>
                </div>

                <div className="flex justify-between items-center p-3 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <Star size={20} className="text-purple-600" strokeWidth={2.5} />
                    <span className="text-gray-700 font-medium">Reviews</span>
                  </div>
                  <span className="font-bold text-purple-600">8</span>
                </div>

                <div className="flex justify-between items-center p-3 rounded-xl bg-green-50 hover:bg-green-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <Award size={20} className="text-green-600" strokeWidth={2.5} />
                    <span className="text-gray-700 font-medium">Member Since</span>
                  </div>
                  <span className="font-bold text-green-600">2025</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-BaseColor to-BHoverColor hover:from-BHoverColor hover:to-BaseColor text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  {isEditing ? (
                    <>
                      <X size={20} strokeWidth={2.5} />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Edit size={20} strokeWidth={2.5} />
                      Edit Profile
                    </>
                  )}
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full py-3 px-4 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-semibold transition-all duration-300 flex items-center justify-center gap-2 border border-red-200"
                >
                  <LogOut size={20} strokeWidth={2.5} />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Edit Form */}
            {isEditing && (
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 animate-fadeIn">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Edit size={24} className="text-BaseColor" strokeWidth={2.5} />
                  Edit Personal Information
                </h3>

                <form onSubmit={submitHandler} className="space-y-6">
                  {/* Username Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User
                        size={20}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        strokeWidth={2.5}
                      />
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInput}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-BaseColor focus:border-transparent transition-all duration-300"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        size={20}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        strokeWidth={2.5}
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInput}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-BaseColor focus:border-transparent transition-all duration-300"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`flex-1 py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                        isLoading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transform hover:scale-105"
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={20} className="animate-spin" strokeWidth={2.5} />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={20} strokeWidth={2.5} />
                          Save Changes
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <X size={20} strokeWidth={2.5} />
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <TrendingUp size={24} className="text-purple-600" strokeWidth={2.5} />
                Recent Activity
              </h3>

              <div className="space-y-4">
                {[
                  {
                    title: "Bali Paradise Tour",
                    date: "Dec 15, 2025",
                    status: "Completed",
                    color: "green",
                  },
                  {
                    title: "Tokyo Adventure",
                    date: "Jan 5, 2026",
                    status: "Upcoming",
                    color: "blue",
                  },
                  {
                    title: "Paris City Tour",
                    date: "Feb 20, 2026",
                    status: "Pending",
                    color: "yellow",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-BaseColor transition-colors">
                          {activity.title}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock size={14} strokeWidth={2.5} />
                          {activity.date}
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          activity.color === "green"
                            ? "bg-green-100 text-green-700"
                            : activity.color === "blue"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {activity.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Settings size={24} className="text-blue-600" strokeWidth={2.5} />
                Account Settings
              </h3>

              <div className="space-y-3">
                <button className="w-full p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-left flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <Phone size={20} className="text-blue-600" strokeWidth={2.5} />
                    <div>
                      <p className="font-semibold text-gray-900">Phone Number</p>
                      <p className="text-sm text-gray-600">Add your phone number</p>
                    </div>
                  </div>
                  <CheckCircle
                    size={20}
                    className="text-gray-400 group-hover:text-BaseColor transition-colors"
                    strokeWidth={2.5}
                  />
                </button>

                <button className="w-full p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-left flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <ShieldCheck size={20} className="text-green-600" strokeWidth={2.5} />
                    <div>
                      <p className="font-semibold text-gray-900">Change Password</p>
                      <p className="text-sm text-gray-600">Update your password</p>
                    </div>
                  </div>
                  <CheckCircle
                    size={20}
                    className="text-gray-400 group-hover:text-BaseColor transition-colors"
                    strokeWidth={2.5}
                  />
                </button>

                <button className="w-full p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-left flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <MapPin size={20} className="text-purple-600" strokeWidth={2.5} />
                    <div>
                      <p className="font-semibold text-gray-900">Location Settings</p>
                      <p className="text-sm text-gray-600">Manage your location</p>
                    </div>
                  </div>
                  <CheckCircle
                    size={20}
                    className="text-gray-400 group-hover:text-BaseColor transition-colors"
                    strokeWidth={2.5}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
