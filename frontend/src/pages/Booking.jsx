import React, {useState} from "react";
import { FaCalendarAlt, FaUserFriends, FaMapMarkerAlt, FaCreditCard, FaCheck } from "react-icons/fa";

const Booking = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    guests: 2,
    startDate: "",
    endDate: "",
    packageType: "standard",
    cardName: "",
    cardNumber: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const packages = [
    { id: "standard", name: "Standard", price: 499 },
    { id: "premium", name: "Premium", price: 799 },
    { id: "deluxe", name: "Deluxe", price: 1199 },
  ];

  const subtotal = packages.find(p => p.id === form.packageType)?.price || 0;
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + taxes;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // mock submit
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Hero & Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-lg">
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-400 text-black">
                  <FaMapMarkerAlt className="text-2xl" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2">Book Your Next Adventure</h1>
                  <p className="text-gray-200 max-w-2xl">Choose dates, select a package and complete your booking with our secure mock payment. Fast, simple and beautiful.</p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl bg-white/3 border border-white/5">
                  <h4 className="font-semibold text-gray-100">Quick Benefits</h4>
                  <ul className="mt-3 space-y-2 text-sm text-gray-300">
                    <li>✔️ Hand-picked tours</li>
                    <li>✔️ 24/7 Support</li>
                    <li>✔️ Free cancellations</li>
                  </ul>
                </div>
                <div className="p-5 rounded-xl bg-white/3 border border-white/5">
                  <h4 className="font-semibold text-gray-100">What to bring</h4>
                  <ul className="mt-3 space-y-2 text-sm text-gray-300">
                    <li>Passport/ID</li>
                    <li>Travel insurance</li>
                    <li>Comfortable shoes</li>
                  </ul>
                </div>
                <div className="p-5 rounded-xl bg-white/3 border border-white/5">
                  <h4 className="font-semibold text-gray-100">Need help?</h4>
                  <p className="mt-2 text-sm text-gray-300">Contact our travel experts anytime — we’ll make it seamless.</p>
                </div>
              </div>

            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10">
              <h3 className="text-2xl font-bold mb-4">Reviews & Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[1,2,3,4].map(i=> (
                  <div key={i} className="h-28 rounded-lg bg-white/3 flex items-center justify-center text-gray-200">Photo {i}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Booking Form & Summary */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10">
              <h3 className="text-xl font-bold mb-4">Your Details</h3>

              <div className="grid grid-cols-1 gap-4">
                <label className="block">
                  <span className="text-sm text-gray-300">Full name</span>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className="mt-2 w-full rounded-lg px-4 py-3 bg-transparent border border-white/20 placeholder-gray-400 focus:outline-none focus:border-yellow-400" required />
                </label>

                <label className="block">
                  <span className="text-sm text-gray-300">Email</span>
                  <input name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="mt-2 w-full rounded-lg px-4 py-3 bg-transparent border border-white/20 placeholder-gray-400 focus:outline-none focus:border-yellow-400" required />
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-sm text-gray-300">Guests</span>
                    <input name="guests" type="number" min="1" value={form.guests} onChange={handleChange} className="mt-2 w-full rounded-lg px-4 py-3 bg-transparent border border-white/20 placeholder-gray-400 focus:outline-none focus:border-yellow-400" />
                  </label>

                  <label className="block">
                    <span className="text-sm text-gray-300">Package</span>
                    <select name="packageType" value={form.packageType} onChange={handleChange} className="mt-2 w-full rounded-lg px-4 py-3 bg-transparent border border-white/20 text-white">
                      {packages.map(p => (
                        <option key={p.id} value={p.id}>{p.name} - ₦{p.price}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <label>
                    <span className="text-sm text-gray-300">Start Date</span>
                    <div className="mt-2 relative">
                      <FaCalendarAlt className="absolute left-3 top-3 text-yellow-400" />
                      <input name="startDate" value={form.startDate} onChange={handleChange} type="date" className="w-full pl-10 rounded-lg px-4 py-3 bg-transparent border border-white/20" required />
                    </div>
                  </label>

                  <label>
                    <span className="text-sm text-gray-300">End Date</span>
                    <div className="mt-2 relative">
                      <FaCalendarAlt className="absolute left-3 top-3 text-yellow-400" />
                      <input name="endDate" value={form.endDate} onChange={handleChange} type="date" className="w-full pl-10 rounded-lg px-4 py-3 bg-transparent border border-white/20" required />
                    </div>
                  </label>
                </div>

                <label>
                  <span className="text-sm text-gray-300">Special Requests</span>
                  <textarea name="requests" onChange={handleChange} placeholder="Any food preferences, mobility needs..." className="mt-2 w-full rounded-lg px-4 py-3 bg-transparent border border-white/20 placeholder-gray-400"></textarea>
                </label>

                <div className="pt-2">
                  <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold hover:scale-105 transition-transform">Pay & Book (₦{total})</button>
                </div>

                {submitted && (
                  <div className="mt-4 p-4 rounded-lg bg-green-500/20 border border-green-500/40 text-green-200 text-center">
                    <FaCheck className="inline mr-2" /> Booking confirmed! (mock)
                  </div>
                )}

              </div>
            </form>

            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10">
              <h4 className="text-lg font-bold mb-4">Booking Summary</h4>
              <div className="space-y-3 text-gray-200">
                <div className="flex justify-between">
                  <span>Package</span>
                  <span className="font-semibold">{packages.find(p=>p.id===form.packageType)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₦{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>₦{taxes}</span>
                </div>
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>₦{total}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/4 rounded-2xl h-48 flex items-center justify-center border border-white/10">
              <div className="text-center text-gray-300">
                <FaMapMarkerAlt className="text-4xl text-yellow-400 mb-2" />
                <p>Map placeholder — integrate Google Maps or Leaflet here</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Booking;
