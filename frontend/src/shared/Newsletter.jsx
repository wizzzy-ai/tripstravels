import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaEnvelope } from "react-icons/fa";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/.+@.+\..+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      setLoading(true);
      // placeholder for server call
      await new Promise((r) => setTimeout(r, 700));
      toast.success("Thanks — you are subscribed!");
      console.log(`Subscribed with email: ${email}`);
      setEmail("");
    } catch (err) {
      toast.error("Subscription failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-yellow-400 to-pink-400 shadow-lg">
          <div className="p-3 bg-white rounded-full">
            <FaEnvelope className="text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Join Our Newsletter</h3>
            <p className="text-sm text-white/90">Get travel deals, tips and inspiration weekly.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex items-center space-x-3">
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={handleInputChange}
            required
            className="flex-1 px-4 py-3 rounded-full border border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-300 text-gray-800"
            aria-label="Email address"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold shadow-md hover:scale-105 transition-transform disabled:opacity-60"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>

      <p className="mt-4 text-xs text-gray-300">
        We respect your privacy. Unsubscribe anytime. By subscribing you agree to our terms.
      </p>
    </section>
  );
};

export default Newsletter;
