import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginImg from "./../assets/images/login2.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import BASE_URL from "../utils/config";
import {
  FaEnvelope,
  FaLock,
  FaSignInAlt,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaCheck,
} from "react-icons/fa";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const navigate = useNavigate();
  const { dispatch, role } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const logInHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user: result.data,
            token: result.token,
            role: result.role,
          },
        });
        toast.success(result.message);

        {
          result.role === "admin" ? navigate("/all-booking") : navigate("/");
        }
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error("Server not responding");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center px-4 sm:px-6 py-12 pt-32 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Illustration */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <img
                  src={LoginImg}
                  alt="Login Illustration"
                  className="rounded-2xl w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/20 shadow-2xl hover:border-white/30 transition-all">
              {/* Header */}
              <div className="mb-10 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                  <FaSignInAlt className="text-4xl text-yellow-400 animate-bounce" />
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                    Welcome Back
                  </h1>
                </div>
                <p className="text-gray-100 text-lg">
                  Sign in to your account and start exploring amazing destinations
                </p>
              </div>

              {/* Form */}
              <form onSubmit={logInHandler} className="space-y-6">
                {/* Email Field */}
                <div className="relative group">
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold text-gray-100 mb-3 uppercase tracking-wider"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-4 text-yellow-400 group-focus-within:scale-110 transition-transform" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleInput}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20 transition-all text-base"
                    />
                    {formData.email && (
                      <FaCheck className="absolute right-4 top-4 text-green-400 animate-pulse" />
                    )}
                  </div>
                  {focusedField === "email" && (
                    <p className="text-xs text-gray-400 mt-2">
                      Enter your registered email address
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="relative group">
                  <label
                    htmlFor="password"
                    className="block text-sm font-bold text-gray-100 mb-3 uppercase tracking-wider"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-4 text-yellow-400 group-focus-within:scale-110 transition-transform" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInput}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20 transition-all text-base"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-4 text-gray-400 hover:text-yellow-400 transition-colors"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    {formData.password && (
                      <div className="absolute right-12 top-4">
                        <div className="flex gap-1">
                          {[...Array(Math.min(3, Math.ceil(formData.password.length / 3)))].map(
                            (_, i) => (
                              <div
                                key={i}
                                className="w-1 h-1 bg-green-400 rounded-full"
                              ></div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  {focusedField === "password" && (
                    <p className="text-xs text-gray-400 mt-2">
                      Enter your secure password
                    </p>
                  )}
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded bg-white/10 border-white/20 cursor-pointer accent-yellow-400"
                    />
                    <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      Remember me
                    </span>
                  </label>
                  <a
                    href="#"
                    className="text-sm text-yellow-400 hover:text-orange-400 transition-colors font-semibold"
                  >
                    Forgot Password?
                  </a>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg hover:shadow-2xl hover:shadow-yellow-400/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-8"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      Logging in...
                    </>
                  ) : (
                    <>
                      <FaSignInAlt />
                      Sign In to Your Account
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-400">
                    New to Trips & Travel?
                  </span>
                </div>
              </div>

              {/* Register Link */}
              <div className="text-center">
                <p className="text-gray-300 mb-4">
                  Don't have an account yet?{" "}
                  <span className="text-yellow-400 font-semibold">
                    Create one in seconds!
                  </span>
                </p>
                <Link
                  to="/register"
                  className="inline-block w-full py-3 rounded-xl border-2 border-yellow-400 text-yellow-400 font-bold hover:bg-yellow-400 hover:text-black transition-all duration-300 group flex items-center justify-center gap-2"
                >
                  Create New Account
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Security Info */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs text-gray-500 text-center">
                  🔒 Your data is secure and encrypted. We never share your information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
