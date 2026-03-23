import Logo from "./../../assets/images/new.png";
import React, { useContext, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";
import Newsletter from "../../shared/Newsletter";
import { AuthContext } from "../../context/AuthContext";
import LogoSVG from "../Header/Logo";
import { Link } from "react-router-dom";

const Footer = () => {
  const { role } = useContext(AuthContext);

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Tours", path: "/tours" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const services = [
    "Flight Bookings",
    "Hotel Reservations",
    "Tour Packages",
    "Travel Insurance",
  ];

  const socialLinks = [
    { icon: FaFacebookF, url: "#", color: "hover:bg-blue-600" },
    { icon: FaTwitter, url: "#", color: "hover:bg-blue-400" },
    { icon: FaInstagram, url: "#", color: "hover:bg-pink-600" },
    { icon: FaYoutube, url: "#", color: "hover:bg-red-600" },
    { icon: FaLinkedinIn, url: "#", color: "hover:bg-blue-700" },
  ];

  return (
    <>
      {role === "admin" ? null : (
        <footer className="bg-gradient-to-b from-slate-900 via-purple-900 to-slate-950 text-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-10 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
            <div className="absolute top-40 right-10 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          </div>

          <div className="relative z-10">
            {/* Main Footer Content */}
            <div className="container mx-auto px-5 py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                {/* Brand Section */}
                <div className="lg:col-span-1 flex flex-col items-center lg:items-start">
                  <div className="mb-4 transform hover:scale-110 transition-transform duration-300">
                    <LogoSVG className="h-20 md:h-24 w-auto" />
                  </div>
                  <p className="text-gray-100 text-sm text-center lg:text-left mb-4">
                    Discover the world's most amazing destinations with us
                  </p>
                  <div className="flex gap-3">
                    {socialLinks.map((social, idx) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={idx}
                          href={social.url}
                          className={`w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${social.color}`}
                        >
                          <Icon className="text-white text-sm" />
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col items-center lg:items-start">
                  <h3 className="text-lg font-bold mb-6 text-yellow-300">
                    Quick Links
                  </h3>
                  <ul className="space-y-3">
                    {quickLinks.map((link, idx) => (
                      <li key={idx}>
                        <Link
                          to={link.path}
                          className="text-gray-100 hover:text-white transition-colors duration-300 relative group"
                        >
                          {link.name}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services */}
                <div className="flex flex-col items-center lg:items-start">
                  <h3 className="text-lg font-bold mb-6 text-yellow-300">
                    Services
                  </h3>
                  <ul className="space-y-3">
                    {services.map((service, idx) => (
                      <li key={idx}>
                        <a
                          href="#"
                          className="text-gray-100 hover:text-white transition-colors duration-300 relative group"
                        >
                          {service}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-300"></span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col items-center lg:items-start">
                  <h3 className="text-lg font-bold mb-6 text-yellow-300">
                    Contact
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 group">
                      <FaMapMarkerAlt className="text-yellow-400 mt-1 group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="text-gray-300 text-sm group-hover:text-white transition-colors">
                          123 Travel St, City, Country
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 group">
                      <FaPhone className="text-yellow-400 group-hover:scale-110 transition-transform" />
                      <a
                        href="tel:+1234567890"
                        className="text-gray-300 text-sm hover:text-white transition-colors"
                      >
                        +1 234 567 890
                      </a>
                    </div>
                    <div className="flex items-center gap-3 group">
                      <FaEnvelope className="text-yellow-400 group-hover:scale-110 transition-transform" />
                      <a
                        href="mailto:info@travelersdestination.com"
                        className="text-gray-300 text-sm hover:text-white transition-colors"
                      >
                        info@travel.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex flex-col items-center lg:items-start">
                  <h3 className="text-lg font-bold mb-6 text-yellow-300">
                    Business Hours
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <FaClock className="text-yellow-400" />
                      <div className="text-sm">
                        <p className="text-gray-300">Mon - Fri</p>
                        <p className="text-gray-400">9:00 AM - 6:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-yellow-400" />
                      <div className="text-sm">
                        <p className="text-gray-300">Sat - Sun</p>
                        <p className="text-gray-400">10:00 AM - 4:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Newsletter Section */}
              <div className="border-t border-purple-700/50 pt-12 mb-12">
                <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/30">
                  <Newsletter />
                </div>
              </div>

              {/* Bottom Section */}
              <div className="border-t border-purple-700/50 pt-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-gray-400 text-sm text-center md:text-left">
                    &copy; 2024 Trips & Travel World. All rights reserved.
                  </p>
                  <div className="flex gap-6 text-sm">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Privacy Policy
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Terms & Conditions
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Sitemap
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
