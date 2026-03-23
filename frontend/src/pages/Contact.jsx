import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaHeadset,
  FaGlobeAmericas,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ email: "", subject: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: FaPhone,
      title: "Call Us",
      description: "+1 234 567 890",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: FaEnvelope,
      title: "Email Us",
      description: "info@travel.com",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Visit Us",
      description: "123 Travel St, City, Country",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: FaClock,
      title: "Business Hours",
      description: "Mon-Fri: 9AM-6PM",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const faqs = [
    {
      q: "How do I book a tour?",
      a: "Simply browse our tours, select your preferred dates, and complete the booking process.",
    },
    {
      q: "What is your cancellation policy?",
      a: "We offer flexible cancellations up to 7 days before your tour date.",
    },
    {
      q: "Do you offer group discounts?",
      a: "Yes! We provide special rates for groups of 10 or more travelers.",
    },
    {
      q: "Are flights included in the package?",
      a: "Flight inclusion varies by package. Check the tour details for specifics.",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden pt-24">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-5 py-16 text-center">
          <div className="inline-block mb-6">
            <FaGlobeAmericas className="text-6xl text-yellow-400 animate-bounce" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto mb-8">
            Have questions about your next adventure? We're here to help! Reach out to us anytime.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="container mx-auto px-5 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20"
                >
                  <div
                    className={`inline-block p-4 rounded-xl bg-gradient-to-r ${item.color} mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-100 group-hover:text-white transition-colors">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Main Content - Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Contact Form */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <FaPaperPlane className="text-yellow-400" />
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                  />
                </div>

                <div className="relative">
                  <label htmlFor="subject" className="block text-sm font-semibold mb-2 text-gray-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                  />
                </div>

                <div className="relative">
                  <label htmlFor="message" className="block text-sm font-semibold mb-2 text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Tell us everything..."
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg hover:shadow-lg hover:shadow-yellow-400/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <FaPaperPlane className="group-hover:rotate-12 transition-transform" />
                  Send Message
                </button>

                {submitted && (
                  <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/50 text-green-300 animate-pulse text-center">
                    ✓ Thank you! We'll get back to you soon.
                  </div>
                )}
              </form>
            </div>

            {/* Info & Map */}
            <div className="space-y-8">
              {/* Quick Info */}
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <FaHeadset className="text-purple-400" />
                  Customer Support
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <FaPhone className="text-yellow-400 mt-1 text-lg flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-300">Call us</p>
                      <p className="text-gray-400">+1 234 567 890</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <FaEnvelope className="text-yellow-400 mt-1 text-lg flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-300">Email us</p>
                      <p className="text-gray-400">info@travel.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <FaClock className="text-yellow-400 mt-1 text-lg flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-300">Available</p>
                      <p className="text-gray-400">9AM - 6PM, Mon-Fri</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-3xl h-64 border border-white/10 flex items-center justify-center hover:border-white/30 transition-all">
                <div className="text-center">
                  <FaMapMarkerAlt className="text-6xl text-yellow-400 mx-auto mb-4" />
                  <p className="text-gray-300">123 Travel St, City, Country</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all group"
                >
                  <h4 className="font-bold text-lg mb-3 text-yellow-400 group-hover:text-orange-400 transition-colors">
                    Q: {faq.q}
                  </h4>
                  <p className="text-gray-100 leading-relaxed">
                    A: {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
