import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterImg from "../assets/images/Signup2.png";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../utils/config";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserPlus,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaCheck,
  FaCamera,
  FaShieldAlt,
} from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    photo: "",
    role: "user",
  });

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const { message } = await response.json();

      if (response.ok) {
        toast.success(message);
        navigate("/login");
      } else {
        toast.error(message);
      }
    } catch (err) {
      toast.error("Server not responding");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextStep = () => {
    if (formData.username && formData.email) {
      setStep(2);
    } else {
      toast.warning("Please fill in all fields");
    }
  };

  const validationChecks = {
    username: formData.username.length >= 3,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
    password: formData.password.length >= 6,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center px-4 sm:px-6 py-12 pt-32 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Illustration */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-600 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <img
                  src={RegisterImg}
                  alt="Register Illustration"
                  className="rounded-2xl w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Register Form */}
          <div className="w-full">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/20 shadow-2xl hover:border-white/30 transition-all">
              {/* Header */}
              <div className="mb-10 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                  <FaUserPlus className="text-4xl text-green-400 animate-bounce" />
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Join Us
                  </h1>
                </div>
                <p className="text-gray-100 text-lg">
                  Create your account and unlock amazing travel experiences
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-400">
                    Step {step} of 2
                  </span>
                  <span className="text-sm text-gray-400">
                    {step === 1 ? "Basic Info" : "Security"}
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-500"
                    style={{ width: `${(step / 2) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1 - Basic Info */}
                {step === 1 && (
                  <>
                    {/* Username Field */}
                    <div className="relative group animate-fade-in">
                      <label
                        htmlFor="username"
                        className="block text-sm font-bold text-gray-100 mb-3 uppercase tracking-wider"
                      >
                        Full Name
                      </label>
                      <div className="relative">
                        <FaUser className="absolute left-4 top-4 text-green-400 group-focus-within:scale-110 transition-transform" />
                        <input
                          type="text"
                          id="username"
                          name="username"
                          placeholder="John Doe"
                          value={formData.username}
                          onChange={handleInput}
                          onFocus={() => setFocusedField("username")}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-400/20 transition-all text-base"
                        />
                        {validationChecks.username && (
                          <FaCheck className="absolute right-4 top-4 text-green-400 animate-pulse" />
                        )}
                      </div>
                      {focusedField === "username" && (
                        <p className="text-xs text-gray-400 mt-2">
                          At least 3 characters required
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="relative group animate-fade-in">
                      <label
                        htmlFor="email"
                        className="block text-sm font-bold text-gray-100 mb-3 uppercase tracking-wider"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <FaEnvelope className="absolute left-4 top-4 text-green-400 group-focus-within:scale-110 transition-transform" />
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
                          className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-400/20 transition-all text-base"
                        />
                        {validationChecks.email && (
                          <FaCheck className="absolute right-4 top-4 text-green-400 animate-pulse" />
                        )}
                      </div>
                      {focusedField === "email" && (
                        <p className="text-xs text-gray-400 mt-2">
                          We'll verify this email address
                        </p>
                      )}
                    </div>

                    {/* Next Button */}
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 text-black font-bold text-lg hover:shadow-2xl hover:shadow-green-400/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group mt-8"
                    >
                      Continue
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </>
                )}

                {/* Step 2 - Security */}
                {step === 2 && (
                  <>
                    {/* Password Field */}
                    <div className="relative group animate-fade-in">
                      <label
                        htmlFor="password"
                        className="block text-sm font-bold text-gray-100 mb-3 uppercase tracking-wider"
                      >
                        Create Password
                      </label>
                      <div className="relative">
                        <FaLock className="absolute left-4 top-4 text-blue-400 group-focus-within:scale-110 transition-transform" />
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
                          className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 transition-all text-base"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-4 text-gray-400 hover:text-blue-400 transition-colors"
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      {formData.password && (
                        <div className="mt-3 p-3 rounded-lg bg-white/5 border border-white/10">
                          <div className="flex items-center gap-2 mb-2">
                            <FaShieldAlt className="text-blue-400" />
                            <span className="text-xs font-semibold text-gray-300">
                              Password Strength
                            </span>
                          </div>
                          <div className="space-y-1 text-xs text-gray-400">
                            <div
                              className={`flex items-center gap-2 ${
                                formData.password.length >= 6
                                  ? "text-green-400"
                                  : "text-gray-500"
                              }`}
                            >
                              <span>
                                {formData.password.length >= 6 ? "✓" : "○"}
                              </span>
                              At least 6 characters
                            </div>
                            <div
                              className={`flex items-center gap-2 ${
                                /[A-Z]/.test(formData.password)
                                  ? "text-green-400"
                                  : "text-gray-500"
                              }`}
                            >
                              <span>
                                {/[A-Z]/.test(formData.password) ? "✓" : "○"}
                              </span>
                              One uppercase letter
                            </div>
                            <div
                              className={`flex items-center gap-2 ${
                                /[0-9]/.test(formData.password)
                                  ? "text-green-400"
                                  : "text-gray-500"
                              }`}
                            >
                              <span>
                                {/[0-9]/.test(formData.password) ? "✓" : "○"}
                              </span>
                              One number
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="relative group animate-fade-in">
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-bold text-gray-100 mb-3 uppercase tracking-wider"
                      >
                        Confirm Password
                      </label>
                      <div className="relative">
                        <FaLock className="absolute left-4 top-4 text-blue-400 group-focus-within:scale-110 transition-transform" />
                        <input
                          type={showPassword ? "text" : "password"}
                          id="confirmPassword"
                          name="confirmPassword"
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={handleInput}
                          onFocus={() => setFocusedField("confirmPassword")}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 transition-all text-base"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-4 text-gray-400 hover:text-blue-400 transition-colors"
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {formData.confirmPassword && formData.password === formData.confirmPassword && (
                          <FaCheck className="absolute right-12 top-4 text-green-400 animate-pulse" />
                        )}
                        {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                          <span className="absolute right-12 top-4 text-red-400 text-lg">✕</span>
                        )}
                      </div>
                      {formData.confirmPassword && (
                        <p className={`text-xs mt-2 ${
                          formData.password === formData.confirmPassword
                            ? "text-green-400"
                            : "text-red-400"
                        }`}>
                          {formData.password === formData.confirmPassword
                            ? "✓ Passwords match"
                            : "✕ Passwords do not match"}
                        </p>
                      )}
                    </div>

                    {/* Terms & Conditions */}
                    <label className="flex items-start gap-3 cursor-pointer group p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded mt-0.5 bg-white/10 border-white/20 cursor-pointer accent-green-400 focus:outline-none"
                        required
                      />
                      <span className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
                        I agree to the{" "}
                        <a href="#" className="text-green-400 hover:text-blue-400">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-green-400 hover:text-blue-400">
                          Privacy Policy
                        </a>
                      </span>
                    </label>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-8">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 py-3 rounded-xl border-2 border-white/30 text-white font-bold hover:border-white/50 hover:bg-white/5 transition-all duration-300"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 text-black font-bold hover:shadow-2xl hover:shadow-green-400/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                            Creating Account...
                          </>
                        ) : (
                          <>
                            <FaUserPlus />
                            Create Account
                          </>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-400">
                    Already have an account?
                  </span>
                </div>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-gray-100 mb-4">
                  Sign in to your existing account
                </p>
                <Link
                  to="/login"
                  className="inline-block w-full py-3 rounded-xl border-2 border-green-400 text-green-400 font-bold hover:bg-green-400 hover:text-black transition-all duration-300 group flex items-center justify-center gap-2"
                >
                  Sign In
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Security Info */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs text-gray-500 text-center">
                  🔒 Your data is encrypted and secure. We never sell your information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Register;
