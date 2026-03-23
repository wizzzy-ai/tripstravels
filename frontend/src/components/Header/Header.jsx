import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { BiMenu, BiUser, BiLogOut, BiHome, BiMap, BiImage, BiPhone, BiPlus, BiGrid, BiCalendar } from "react-icons/bi";
import { IoClose, IoRocketOutline } from "react-icons/io5";
import { FaGlobeAmericas } from "react-icons/fa";
import Logo from "./Logo";

const Header = () => {
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch, role } = useContext(AuthContext);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const lastToggleRef = useRef(0);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    handleMenuToggle();
    navigate("/home");
    toast.info("Logged Out");
  };

  useEffect(() => {
    let lastScrollTop = window.pageYOffset;
    const header = headerRef.current;

    const handleWheel = (event) => {
      const currentScrollTop = window.pageYOffset;

      if (event.deltaY > 0) {
        // Scrolling down
        header.classList.add("hidden");
      } else {
        // Scrolling up
        header.classList.remove("hidden");
      }

      lastScrollTop = currentScrollTop;
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const handleMenuToggle = () => {
    const now = Date.now();
    // prevent rapid double toggles (touch/click duplicates)
    if (now - lastToggleRef.current < 300) {
      console.log('handleMenuToggle - ignored duplicate');
      lastToggleRef.current = now;
      return;
    }
    lastToggleRef.current = now;
    console.log('handleMenuToggle - toggling, current:', isMenuOpen);
    setMenuOpen(prev => {
      const next = !prev;
      console.log('handleMenuToggle - next:', next);
      return next;
    });
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 backdrop-blur-lg bg-opacity-95 border-b border-white/20 shadow-2xl overflow-visible"
    >
      {/* Crazy Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Geometric Shapes */}
        <div className="absolute top-2 left-10 w-8 h-8 border-2 border-white/30 rounded-full animate-spin-slow opacity-60"></div>
        <div className="absolute top-4 right-20 w-6 h-6 border-2 border-yellow-300/40 rounded-lg rotate-45 animate-bounce-slow opacity-50"></div>
        <div className="absolute bottom-2 left-1/4 w-4 h-4 border-2 border-cyan-300/50 rounded-full animate-pulse-slow opacity-70"></div>
        <div className="absolute bottom-1 right-1/3 w-5 h-5 border-2 border-pink-300/40 rounded-lg animate-spin-slow opacity-60"></div>

        {/* Animated Particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/40 rounded-full animate-float"
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}

        {/* Floating Travel Emojis */}
        <div className="absolute top-3 left-1/3 text-lg animate-bounce opacity-80" style={{ animationDelay: '0s' }}>✈️</div>
        <div className="absolute top-2 right-1/4 text-base animate-spin opacity-70" style={{ animationDelay: '1s' }}>🌍</div>
        <div className="absolute bottom-3 left-2/3 text-sm animate-pulse opacity-75" style={{ animationDelay: '2s' }}>🏖️</div>
      </div>

      <nav className="container mx-auto px-6 py-4 relative z-10">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2 group hover:scale-110 transition-all duration-300">
              <div className="relative">
                <Logo className="h-14 md:h-18 w-auto drop-shadow-lg" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
              </div>
              <div className="hidden md:block">
                <span className="text-white font-bold text-lg bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent animate-pulse">
                  Travel
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {role === "admin" ? (
              <ul className="flex space-x-8">
                <li>
                  <Link
                    to="/all-booking"
                    className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-all duration-300 group relative transform hover:scale-105"
                  >
                    <BiCalendar className="text-xl group-hover:rotate-12 transition-transform duration-300" />
                    <span className="font-semibold relative">
                      Bookings
                      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></div>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/all-tours"
                    className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-all duration-300 group relative transform hover:scale-105"
                  >
                    <BiGrid className="text-xl group-hover:rotate-12 transition-transform duration-300" />
                    <span className="font-semibold relative">
                      Tours
                      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></div>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create"
                    className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-all duration-300 group relative transform hover:scale-105"
                  >
                    <BiPlus className="text-xl group-hover:rotate-12 transition-transform duration-300" />
                    <span className="font-semibold relative">
                      Create
                      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></div>
                    </span>
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="flex space-x-8">
                <li>
                  <Link
                    to="/home"
                    className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-all duration-300 group relative transform hover:scale-105"
                  >
                    <BiHome className="text-xl group-hover:rotate-12 transition-transform duration-300" />
                    <span className="font-semibold relative">
                      Home
                      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></div>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tours"
                    className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-all duration-300 group relative transform hover:scale-105"
                  >
                    <BiMap className="text-xl group-hover:rotate-12 transition-transform duration-300" />
                    <span className="font-semibold relative">
                      Tours
                      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></div>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-all duration-300 group relative transform hover:scale-105"
                  >
                    <BiImage className="text-xl group-hover:rotate-12 transition-transform duration-300" />
                    <span className="font-semibold relative">
                      Gallery
                      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></div>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-all duration-300 group relative transform hover:scale-105"
                  >
                    <BiPhone className="text-xl group-hover:rotate-12 transition-transform duration-300" />
                    <span className="font-semibold relative">
                      Contact
                      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></div>
                    </span>
                  </Link>
                </li>
              </ul>
            )}

            {/* User Section */}
            <div className="flex items-center space-x-6 ml-8">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to={role === "user" && "/my-account"}
                    className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-all duration-300 group transform hover:scale-105"
                  >
                    <BiUser className="text-xl group-hover:rotate-12 transition-transform duration-300" />
                    <span className="font-semibold">{user.username}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-3 shadow-lg"
                  >
                    <BiLogOut className="text-lg animate-pulse" />
                    <span className="font-semibold">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login">
                    <button className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/30 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 hover:rotate-2">
                      <BiUser className="text-lg animate-pulse" />
                      <span className="font-semibold">Login</span>
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-3 shadow-lg">
                      <IoRocketOutline className="text-lg animate-bounce" />
                      <span className="font-semibold">Register</span>
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {user && (
              <Link
                to={role === "user" && "/my-account"}
                className="text-white hover:text-yellow-300 transition-colors"
              >
                <BiUser className="text-xl" />
              </Link>
            )}
            <button
              onClick={handleMenuToggle}
              className="text-white hover:text-yellow-300 transition-all duration-300 p-2 transform hover:scale-110 hover:rotate-12"
            >
              <BiMenu className="text-2xl" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 w-full h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 backdrop-blur-lg bg-opacity-95 z-50 flex flex-col" style={{ zIndex: 9999 }}>
            {/* Mobile menu overlay */}
            <div className="flex justify-end p-6">
              <button
                onClick={handleMenuToggle}
                className="text-white hover:text-yellow-300 transition-all duration-300 p-2 transform hover:scale-110 hover:rotate-12"
              >
                <IoClose className="text-3xl" />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center space-y-8 px-6">
              {role === "admin" ? (
                <>
                  <Link
                    to="/all-booking"
                    onClick={handleMenuToggle}
                    className="flex items-center space-x-3 text-white hover:text-yellow-300 transition-all duration-300 text-xl font-semibold group transform hover:scale-110"
                  >
                    <BiCalendar className="text-2xl group-hover:rotate-12 transition-transform duration-300" />
                    <span>Bookings</span>
                  </Link>
                  <Link
                    to="/all-tours"
                    onClick={handleMenuToggle}
                    className="flex items-center space-x-3 text-white hover:text-yellow-300 transition-all duration-300 text-xl font-semibold group transform hover:scale-110"
                  >
                    <BiGrid className="text-2xl group-hover:rotate-12 transition-transform duration-300" />
                    <span>Tours</span>
                  </Link>
                  <Link
                    to="/create"
                    onClick={handleMenuToggle}
                    className="flex items-center space-x-3 text-white hover:text-yellow-300 transition-all duration-300 text-xl font-semibold group transform hover:scale-110"
                  >
                    <BiPlus className="text-2xl group-hover:rotate-12 transition-transform duration-300" />
                    <span>Create</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/home"
                    onClick={handleMenuToggle}
                    className="flex items-center space-x-3 text-white hover:text-yellow-300 transition-all duration-300 text-xl font-semibold group transform hover:scale-110"
                  >
                    <BiHome className="text-2xl group-hover:rotate-12 transition-transform duration-300" />
                    <span>Home</span>
                  </Link>
                  <Link
                    to="/tours"
                    onClick={handleMenuToggle}
                    className="flex items-center space-x-3 text-white hover:text-yellow-300 transition-all duration-300 text-xl font-semibold group transform hover:scale-110"
                  >
                    <BiMap className="text-2xl group-hover:rotate-12 transition-transform duration-300" />
                    <span>Tours</span>
                  </Link>
                  <Link
                    to="/about"
                    onClick={handleMenuToggle}
                    className="flex items-center space-x-3 text-white hover:text-yellow-300 transition-all duration-300 text-xl font-semibold group transform hover:scale-110"
                  >
                    <BiImage className="text-2xl group-hover:rotate-12 transition-transform duration-300" />
                    <span>Gallery</span>
                  </Link>
                  <Link
                    to="/contact"
                    onClick={handleMenuToggle}
                    className="flex items-center space-x-3 text-white hover:text-yellow-300 transition-all duration-300 text-xl font-semibold group transform hover:scale-110"
                  >
                    <BiPhone className="text-2xl group-hover:rotate-12 transition-transform duration-300" />
                    <span>Contact</span>
                  </Link>
                </>
              )}

              <div className="pt-8">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-3 shadow-lg"
                  >
                    <BiLogOut className="text-xl animate-pulse" />
                    <span className="font-semibold">Logout</span>
                  </button>
                ) : (
                  <div className="flex flex-col space-y-4">
                    <Link to="/login" onClick={handleMenuToggle}>
                      <button className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/30 px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:rotate-2 w-full justify-center">
                        <BiUser className="text-xl animate-pulse" />
                        <span className="font-semibold">Login</span>
                      </button>
                    </Link>
                    <Link to="/register" onClick={handleMenuToggle}>
                      <button className="flex items-center space-x-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-3 shadow-lg w-full justify-center">
                        <IoRocketOutline className="text-xl animate-bounce" />
                        <span className="font-semibold">Register</span>
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
