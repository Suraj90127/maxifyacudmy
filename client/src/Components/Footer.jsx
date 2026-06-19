import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaFacebookF,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaHeart,
  FaArrowUp,
  FaTelegramPlane,
  FaWhatsapp
} from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0b1120] text-white">
      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* ========================================= */}
        {/* SIMPLE NEWSLETTER */}
        {/* ========================================= */}

        <div className="mb-16">
          <div className="bg-[#111827] rounded-[28px] border border-white/10 p-6 md:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* LEFT */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  Subscribe To Our Newsletter
                </h3>
                <p className="text-white/50 mt-2 text-sm md:text-base">
                  Get latest course updates and learning resources.
                </p>
              </div>

              {/* RIGHT */}
              <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-3 w-full lg:max-w-xl">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 min-h-[50px] md:h-12 rounded-2xl bg-[#0b1120] border border-white/10 px-4 text-sm text-white placeholder:text-white/40 outline-none focus:border-primary transition-all"
                  required
                />
                <button
                  type="submit"
                  className="h-12 px-6 rounded-2xl bg-primary hover:bg-primary/90 text-white font-medium transition-all"
                >
                  {subscribed ? "Subscribed 🎉" : "Subscribe"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ========================================= */}
        {/* MAIN FOOTER */}
        {/* ========================================= */}

        {/* Desktop: 4 columns, Mobile: 1 column with inner grid for Quick Links + Support */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

          {/* BRAND - Full width on mobile */}
          <div>
            <div className="w-56 mb-5">
              <img
                src="https://i.ibb.co/5X9Fm9mc/logo-2.png"
                alt="Maxify Academy"
              />
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Learn practical digital skills with mentorship, projects and real-world experience.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-3 mt-6">
              <a href="#" className="w-10 h-10 rounded-xl bg-[#111827] border border-white/10 flex items-center justify-center hover:bg-primary transition-all">
                <FaInstagram className="text-white/70 text-sm" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-[#111827] border border-white/10 flex items-center justify-center hover:bg-primary transition-all">
                <FaTwitter className="text-white/70 text-sm" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-[#111827] border border-white/10 flex items-center justify-center hover:bg-primary transition-all">
                <FaLinkedinIn className="text-white/70 text-sm" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-[#111827] border border-white/10 flex items-center justify-center hover:bg-primary transition-all">
                <FaYoutube className="text-white/70 text-sm" />
              </a>
            </div>
          </div>

          {/* QUICK LINKS + SUPPORT - Side by side on mobile, normal on desktop */}
          {/* Mobile: grid-cols-2, Desktop: block (normal flow) */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-8">
              {/* QUICK LINKS */}
              <div>
                <h4 className="text-white font-semibold text-lg mb-5">Quick Links</h4>
                <ul className="space-y-3">
                  <li><Link to="/" className="text-white/50 hover:text-white text-sm transition-colors">Home</Link></li>
                  <li><Link to="/courses" className="text-white/50 hover:text-white text-sm transition-colors">Courses</Link></li>
                  <li><Link to="/about" className="text-white/50 hover:text-white text-sm transition-colors">About Us</Link></li>
                  <li><Link to="/contact" className="text-white/50 hover:text-white text-sm transition-colors">Contact</Link></li>
                </ul>
              </div>

              {/* SUPPORT */}
              <div>
                <h4 className="text-white font-semibold text-lg mb-5">Support</h4>
                <ul className="space-y-3">
                  <li><Link to="/faq" className="text-white/50 hover:text-white text-sm transition-colors">FAQs</Link></li>
                  <li><Link to="/privacy" className="text-white/50 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="text-white/50 hover:text-white text-sm transition-colors">Terms & Conditions</Link></li>
                  <li><Link to="/refund" className="text-white/50 hover:text-white text-sm transition-colors">Refund Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* CONTACT - Full width on mobile */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-primary mt-1 text-sm shrink-0" />
                <span className="text-white/50 text-sm leading-relaxed"> Noida sector 2, Block D, Near Metro Noida Sector -15 (201301)</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-primary text-sm shrink-0" />
                <span className="text-white/50 text-sm">+91 93103 28928</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-primary text-sm shrink-0" />
                <span className="text-white/50 text-sm">support@maxifyacademy.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ========================================= */}
        {/* BOTTOM BAR */}
        {/* ========================================= */}

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs text-center md:text-left">
            © {currentYear} Maxify Academy. All rights reserved.
          </p>
          <button onClick={scrollToTop} className="flex items-center gap-2 text-white/50 hover:text-white text-xs transition-colors">
            <FaArrowUp className="text-[10px]" />
            Back To Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;