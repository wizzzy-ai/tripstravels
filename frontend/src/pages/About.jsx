import React from "react";
import ImagesGallery from "../components/Gallery/Gallery";

const About = () => {
  return (
    <>
      {/* Hero Section - Wild Design */}
      <section className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-pink-400 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-green-400 rounded-full opacity-15 animate-ping"></div>
          <div className="absolute top-1/3 right-10 w-20 h-20 bg-orange-400 rounded-full opacity-25 animate-bounce"></div>
          <div className="absolute bottom-1/4 left-1/2 w-16 h-16 bg-blue-400 rounded-full opacity-20 animate-spin"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="flex flex-col items-center justify-center min-h-screen text-center">
            {/* Hero Content */}
            <div className="max-w-4xl">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <span className="text-6xl animate-bounce">📸</span>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
                </div>
                <span className="text-3xl font-bold text-white ml-4">✨ Explore Our World</span>
              </div>

              <h1 className="text-6xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                Travel
                <span className="block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
                  Gallery
                </span>
                <span className="text-yellow-400">Collection</span>
              </h1>

              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                🌟 Immerse yourself in breathtaking destinations captured through our lens.
                Each image tells a story of adventure, culture, and unforgettable moments from around the globe!
              </p>

              {/* Stats Cards */}
              <div className="flex flex-wrap justify-center gap-8 mb-12">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                  <span className="text-4xl mb-2 block">📷</span>
                  <div className="text-3xl font-bold text-white">500+</div>
                  <div className="text-sm text-gray-300">Stunning Photos</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                  <span className="text-4xl mb-2 block">🌍</span>
                  <div className="text-3xl font-bold text-white">50+</div>
                  <div className="text-sm text-gray-300">Destinations</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                  <span className="text-4xl mb-2 block">⭐</span>
                  <div className="text-3xl font-bold text-white">4.9</div>
                  <div className="text-sm text-gray-300">Quality Rating</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="group bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-110 shadow-2xl flex items-center">
                  <span className="mr-3 group-hover:animate-bounce">🎯</span>
                  View Gallery
                  <span className="ml-3 group-hover:animate-pulse">👇</span>
                </button>
                <button className="group border-2 border-white text-white hover:bg-white hover:text-black font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-110 flex items-center">
                  <span className="mr-3 group-hover:animate-pulse">🎬</span>
                  Watch Stories
                </button>
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

      {/* Gallery Section - Professional & Wild */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="relative">
                <span className="text-5xl animate-spin">🌟</span>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
              <span className="text-2xl font-bold text-gray-800 ml-3">Professional Photography</span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-6">
              📸 Our Gallery Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              ✨ Discover the world through our professionally curated collection of travel photography.
              Each image captures the essence of adventure, culture, and natural beauty from destinations worldwide.
            </p>
          </div>

          {/* Gallery Component */}
          <div className="relative">
            <ImagesGallery />
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500">
              <h3 className="text-3xl font-bold text-white mb-4">
                🌍 Ready for Your Own Adventure?
              </h3>
              <p className="text-purple-100 mb-6 text-lg">
                Let us help you create memories that will last a lifetime. Explore our tours and start your journey today!
              </p>
              <button className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 shadow-lg">
                🚀 Explore Tours Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
