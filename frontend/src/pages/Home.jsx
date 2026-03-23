import { Link } from 'react-router-dom';
import ServicesList from '../components/services/ServicesList';
import ImagesGallery from '../components/Gallery/Gallery';
import FeaturedTourList from '../components/featruredTour/FeaturedTourList';
import Testimonials from '../components/Testimonials/Testimonials';
import FaqList from '../components/Faq/FaqList';
import Newsletter from '../shared/Newsletter';
import heroImg01 from '../assets/images/hero-img01.jpg';
import heroImg02 from '../assets/images/hero-img02.jpg';
import { FaPlane, FaMapMarkerAlt, FaStar, FaUsers, FaGlobe, FaRocket, FaCamera, FaHeart } from 'react-icons/fa';
import { BiTrendingUp, BiShieldAlt, BiSupport } from 'react-icons/bi';
import './Home.css';

const Home = () => {
  return (
    <>
      {/* Hero Section - Wild Design */}
      <section className="relative min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-pink-400 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-green-400 rounded-full opacity-15 animate-ping"></div>
          <div className="absolute top-1/3 right-10 w-20 h-20 bg-orange-400 rounded-full opacity-25 animate-bounce"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen">
            {/* Hero Content */}
            <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <FaRocket className="text-4xl text-yellow-400 mr-4 animate-bounce" />
                <span className="text-2xl font-bold text-white">✨ Ready for Adventure?</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Discover the
                <span className="block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
                  World with
                </span>
                <span className="text-yellow-400">Trips & Travel</span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
                🚀 Embark on <span className="text-yellow-400 font-semibold">unforgettable journeys</span> and create memories that last a lifetime.
                Explore breathtaking destinations, immerse yourself in diverse cultures, and experience the adventure of a lifetime!
              </p>

              {/* Stats Cards */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <FaGlobe className="text-3xl text-yellow-400 mb-2" />
                  <div className="text-2xl font-bold text-white">50+</div>
                  <div className="text-sm text-gray-300">Countries</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <FaUsers className="text-3xl text-pink-400 mb-2" />
                  <div className="text-2xl font-bold text-white">10K+</div>
                  <div className="text-sm text-gray-300">Happy Travelers</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <FaStar className="text-3xl text-orange-400 mb-2" />
                  <div className="text-2xl font-bold text-white">4.9</div>
                  <div className="text-sm text-gray-300">Rating</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <Link to="/tours">
                  <button className="group bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-110 shadow-2xl flex items-center">
                    <FaPlane className="mr-3 group-hover:animate-bounce" />
                    Explore Tours
                    <BiTrendingUp className="ml-3" />
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="group border-2 border-white text-white hover:bg-white hover:text-black font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-110 flex items-center">
                    <BiSupport className="mr-3 group-hover:animate-pulse" />
                    Get Support
                  </button>
                </Link>
              </div>
            </div>

            {/* Hero Images */}
            <div className="lg:w-1/2 relative">
              <div className="relative">
                {/* Main Image */}
                <div className="relative z-10 transform hover:scale-105 transition-all duration-500">
                  <img
                    src={heroImg01}
                    alt="Adventure Travel"
                    className="w-full max-w-md mx-auto rounded-3xl shadow-2xl border-4 border-white/20"
                  />
                  <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-3 animate-bounce">
                    <FaCamera className="text-black text-xl" />
                  </div>
                </div>

                {/* Floating Images */}
                <div className="absolute -top-8 -left-8 transform rotate-12 hover:rotate-0 transition-all duration-300">
                  <img
                    src={heroImg02}
                    alt="Mountain Adventure"
                    className="w-32 h-32 rounded-2xl shadow-xl border-2 border-white/30"
                  />
                </div>

                <div className="absolute -bottom-8 -right-8 transform -rotate-12 hover:rotate-0 transition-all duration-300">
                  <img
                    src={heroImg01}
                    alt="Beach Paradise"
                    className="w-32 h-32 rounded-2xl shadow-xl border-2 border-white/30"
                  />
                </div>

                {/* Floating Elements */}
                <div className="absolute top-1/2 -left-12 text-6xl animate-bounce">🌍</div>
                <div className="absolute bottom-1/4 -right-12 text-4xl animate-pulse">✈️</div>
                <div className="absolute top-1/4 right-1/4 text-3xl animate-ping">🏖️</div>
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

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Why Choose <span className="text-yellow-400">Trips & Travel</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We do not just plan trips, we craft extraordinary experiences that become lifelong memories
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-8 rounded-2xl text-center transform hover:scale-105 transition-all duration-300 shadow-2xl">
              <BiShieldAlt className="text-6xl text-white mb-4 mx-auto" />
              <h3 className="text-2xl font-bold text-white mb-4">100% Safe & Secure</h3>
              <p className="text-purple-100">Your safety is our top priority with comprehensive travel insurance and 24/7 support</p>
            </div>

            <div className="bg-gradient-to-br from-pink-600 to-red-600 p-8 rounded-2xl text-center transform hover:scale-105 transition-all duration-300 shadow-2xl">
              <FaHeart className="text-6xl text-white mb-4 mx-auto" />
              <h3 className="text-2xl font-bold text-white mb-4">Personalized Experience</h3>
              <p className="text-pink-100">Custom-tailored itineraries designed around your preferences and dreams</p>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-teal-600 p-8 rounded-2xl text-center transform hover:scale-105 transition-all duration-300 shadow-2xl">
              <BiTrendingUp className="text-6xl text-white mb-4 mx-auto" />
              <h3 className="text-2xl font-bold text-white mb-4">Best Price Guarantee</h3>
              <p className="text-green-100">Competitive pricing with exclusive deals and money-back guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="services-title text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Our Premium Services
            </h2>
            <p className="services-description text-xl text-gray-600 max-w-2xl mx-auto">
              ✨ From luxury accommodations to adventure activities, we offer everything you need for the perfect journey
            </p>
          </div>
          <ServicesList />
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section py-20 bg-gradient-to-r from-purple-900 to-pink-900 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 to-pink-900/80"></div>
        <div className="relative z-10 container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="gallery-title text-4xl lg:text-5xl font-bold text-white mb-4">
              📸 Photo <span className="text-yellow-400">Gallery</span>
            </h2>
            <p className="gallery-description text-xl text-purple-100 max-w-2xl mx-auto">
              Explore stunning destinations through our curated photo collection from around the world
            </p>
          </div>
          <ImagesGallery />
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="featured-tours-section py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="featured-tours-title text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              🌟 Featured Tours
            </h2>
            <p className="featured-tours-description text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of the most popular and exciting tours around the globe
            </p>
          </div>
          <FeaturedTourList />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section py-20 bg-gradient-to-r from-green-900 to-teal-900 relative">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="testimonials-title text-4xl lg:text-5xl font-bold text-white mb-4">
              💬 What Our <span className="text-yellow-400">Customers Say</span>
            </h2>
            <p className="testimonials-description text-xl text-green-100 max-w-2xl mx-auto">
              Read testimonials from travelers who have experienced our exceptional services
            </p>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <h2 className="faq-title text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
                ❓ Frequently Asked <span className="text-purple-600">Questions</span>
              </h2>
              <FaqList />
            </div>
            <div className="lg:w-1/2 relative">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Travel FAQ"
                  className="w-full rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500"
                />
                <div className="absolute -top-6 -left-6 bg-yellow-400 rounded-full p-4 animate-bounce">
                  <FaMapMarkerAlt className="text-black text-2xl" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-pink-400 rounded-full p-4 animate-pulse">
                  <FaGlobe className="text-white text-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default Home;
