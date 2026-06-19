import React, { useState, useEffect } from "react";

import UserLayout from "../../Layouts/UserLayout";

import { useDispatch, useSelector } from "react-redux";

import { sendMessage } from "../../redux/slices/contactSlice";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaPaperPlane,
  FaClock,
  FaCheckCircle,
  FaHeadset,
  FaRegSmile,
  FaRocket,
  FaBuilding,
} from "react-icons/fa";

import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const ContactPage = () => {
  // =========================================
  // SCROLL TOP
  // =========================================

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // =========================================
  // REDUX
  // =========================================

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.contact);

  // =========================================
  // USER DATA
  // =========================================

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const isLoggedIn = !!user;

  // =========================================
  // STATES
  // =========================================

  const [formData, setFormData] = useState({
    name: isLoggedIn ? user.firstname : "",
    email: isLoggedIn ? user.email : "",
    subject: "",
    message: "",
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);

  // =========================================
  // INPUT CHANGE
  // =========================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================
  // SUBMIT FORM
  // =========================================

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(sendMessage(formData))
      .unwrap()
      .then(() => {
        setSubmitSuccess(true);
        toast.success("Message sent successfully!");
        setFormData((prev) => ({
          ...prev,
          subject: "",
          message: "",
        }));
        setTimeout(() => setSubmitSuccess(false), 5000);
      })
      .catch(() => {
        toast.error("Something went wrong. Please try again.");
      });
  };

  return (
    <UserLayout>
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50 overflow-hidden">
        {/* ========================================= */}
        {/* HERO SECTION - MATCHING HOME PAGE STYLE */}
        {/* ========================================= */}

        <div className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-indigo-50 py-12 md:py-16">
          {/* Decorative Shapes - Like Home Page */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20 -z-10"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20 -z-10"></div>

          <div className="max-w-[100rem] mx-auto px-5 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center"
            >
              {/* Heading with Gradient */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
                Get in{" "}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Touch
                </span>{" "}
                With Us
              </h1>

              <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
                Need help with courses, payments, certificates, or technical
                support? Our team is here to help you anytime.
                <span className="block text-sm text-purple-600 font-semibold mt-1">
                  24/7 Student Support Available
                </span>
              </p>
            </motion.div>
          </div>
        </div>

        {/* ========================================= */}
        {/* MAIN SECTION */}
        {/* ========================================= */}

        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* ========================================= */}
            {/* LEFT SIDE - CONTACT INFO - UPDATED */}
            {/* ========================================= */}

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* TITLE */}
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-full mb-4">
                  <FaHeadset size={14} className="text-purple-600" />
                  <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                    Contact Information
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Let's{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Connect
                  </span>
                </h2>
                <p className="text-gray-500 mt-3 text-lg">
                  Reach out through any of these official channels.
                </p>
              </div>

              {/* INFO BOXES - With Hover Effects Like Home Page */}
              <div className="space-y-4 sm:space-y-5 w-full">
                {/* LEGAL */}
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="group w-full bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-premium transition-all duration-300 p-4 sm:p-6 flex items-start gap-4 overflow-hidden"
                >
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-purple-100 to-indigo-100 flex items-center justify-center text-purple-600 group-hover:from-purple-600 group-hover:to-blue-600 group-hover:text-white transition-all">
                    <FaBuilding size={20} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">
                      Legal Entity
                    </p>

                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 break-words">
                      Maxify Academy
                    </h4>
                  </div>
                </motion.div>

                {/* ADDRESS */}
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="group w-full bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-premium transition-all duration-300 p-4 sm:p-6 flex items-start gap-4 overflow-hidden"
                >
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-purple-100 to-indigo-100 flex items-center justify-center text-purple-600 group-hover:from-purple-600 group-hover:to-blue-600 group-hover:text-white transition-all">
                    <FaMapMarkerAlt size={20} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">
                      Location
                    </p>

                    <h4 className="text-base sm:text-lg font-bold text-gray-900 leading-relaxed break-words">
                      Noida sector 2, Block D, Near Metro Noida Sector -15, (201301)
                    </h4>
                  </div>
                </motion.div>

                {/* PHONE */}
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="group w-full bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-premium transition-all duration-300 p-4 sm:p-6 flex items-start gap-4 overflow-hidden"
                >
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-purple-100 to-indigo-100 flex items-center justify-center text-purple-600 group-hover:from-purple-600 group-hover:to-blue-600 group-hover:text-white transition-all">
                    <FaPhoneAlt size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">
                      Call Us
                    </p>

                    <a
                      href="tel:+919310328928"
                      className="block text-base sm:text-xl font-bold text-gray-900 hover:text-purple-600 transition-colors break-all"
                    >
                      +91 93103 28928
                    </a>
                  </div>
                </motion.div>

                {/* EMAIL */}
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="group w-full bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-premium transition-all duration-300 p-4 sm:p-6 flex items-start gap-4 overflow-hidden"
                >
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-purple-100 to-indigo-100 flex items-center justify-center text-purple-600 group-hover:from-purple-600 group-hover:to-blue-600 group-hover:text-white transition-all">
                    <FaEnvelope size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">
                      Email Us
                    </p>

                    <a
                      href="mailto:support@maxifyacademy.com"
                      className="block text-sm sm:text-xl font-bold text-gray-900 hover:text-purple-600 transition-colors break-all"
                    >
                      support@maxifyacademy.com
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* SOCIAL LINKS - UPDATED */}
              <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-md p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-5">
                  Connect With Us
                </h4>
                <div className="flex gap-3">
                  {[
                    {
                      Icon: FaInstagram,
                      color:
                        "hover:bg-gradient-to-r from-purple-600 to-pink-600",
                    },
                    {
                      Icon: FaTwitter,
                      color:
                        "hover:bg-gradient-to-r from-purple-600 to-blue-600",
                    },
                    {
                      Icon: FaLinkedinIn,
                      color:
                        "hover:bg-gradient-to-r from-purple-600 to-blue-600",
                    },
                    {
                      Icon: FaYoutube,
                      color:
                        "hover:bg-gradient-to-r from-purple-600 to-red-600",
                    },
                  ].map((item, index) => (
                    <a
                      key={index}
                      href="#"
                      className={`w-12 h-12 rounded-xl bg-gray-100 ${item.color} hover:text-white flex items-center justify-center text-gray-600 transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                    >
                      <item.Icon />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ========================================= */}
            {/* RIGHT SIDE - FORM - UPDATED */}
            {/* ========================================= */}

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 md:px-10 relative overflow-hidden"
            >
              {/* BG EFFECT - Purple Glow */}
              <div className="absolute top-0 right-0 w-60 h-60 bg-purple-100 rounded-full blur-3xl opacity-30"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-30"></div>

              <div className="relative z-10">
                {/* TITLE */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-100 to-indigo-100 flex items-center justify-center">
                    <FaPaperPlane className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Send a Message
                    </h3>
                    <p className="text-gray-500 text-sm">
                      We'll get back to you within 4 hours
                    </p>
                  </div>
                </div>

                {/* SUCCESS MESSAGE */}
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-8 p-5 rounded-xl bg-green-50 border border-green-100 flex gap-4"
                  >
                    <FaCheckCircle className="text-green-500 text-2xl mt-1" />
                    <div>
                      <h4 className="font-bold text-green-900">
                        Message Delivered!
                      </h4>
                      <p className="text-green-700 text-sm mt-1">
                        We'll get back to you within 24 hours.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* NAME + EMAIL */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        readOnly={isLoggedIn}
                        required
                        placeholder="John Doe"
                        className={`w-full px-5 py-4 rounded-xl border border-gray-200 outline-none transition-all focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 ${
                          isLoggedIn ? "bg-gray-50 text-gray-500" : "bg-white"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        readOnly={isLoggedIn}
                        required
                        placeholder="john@example.com"
                        className={`w-full px-5 py-4 rounded-xl border border-gray-200 outline-none transition-all focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 ${
                          isLoggedIn ? "bg-gray-50 text-gray-500" : "bg-white"
                        }`}
                      />
                    </div>
                  </div>

                  {/* SUBJECT */}
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="How can we help?"
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 outline-none transition-all focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
                    />
                  </div>

                  {/* MESSAGE */}
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="5"
                      required
                      placeholder="Describe your inquiry..."
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 outline-none transition-all focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 resize-none"
                    ></textarea>
                  </div>

                  {/* SUBMIT BUTTON - Purple to Blue Gradient like Home Page */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`group relative w-full py-5 rounded-xl text-white font-semibold uppercase tracking-wider transition-all duration-300 shadow-lg flex items-center justify-center gap-3 overflow-hidden ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-xl active:scale-[0.99]"
                    }`}
                  >
                    <span className="relative z-10">
                      {loading ? "Processing..." : "Submit Inquiry"}
                    </span>
                    {!loading && (
                      <FaPaperPlane className="relative z-10 group-hover:translate-x-1 transition-transform" />
                    )}
                    {!loading && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    )}
                  </button>

                  {/* RESPONSE TIME */}
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                    <FaClock className="text-xs" />
                    <span>Typically replies within 4 hours</span>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>

          {/* ========================================= */}
          {/* STATS SECTION - UPDATED */}
          {/* ========================================= */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="group bg-white rounded-2xl border border-gray-100 p-8 text-center shadow-md hover:shadow-premium transition-all hover:-translate-y-1">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-600 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:text-white flex items-center justify-center mx-auto mb-4 transition-all">
                <FaRegSmile size={28} />
              </div>
              <h3 className="text-4xl font-bold text-gray-900">2500+</h3>
              <p className="text-gray-500 mt-1">Active Students</p>
            </div>

            <div className="group bg-white rounded-2xl border border-gray-100 p-8 text-center shadow-md hover:shadow-premium transition-all hover:-translate-y-1">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-600 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:text-white flex items-center justify-center mx-auto mb-4 transition-all">
                <FaRocket size={28} />
              </div>
              <h3 className="text-4xl font-bold text-gray-900">92%</h3>
              <p className="text-gray-500 mt-1">Course Completion Ratee</p>
            </div>

            <div className="group bg-white rounded-2xl border border-gray-100 p-8 text-center shadow-md hover:shadow-premium transition-all hover:-translate-y-1">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-600 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:text-white flex items-center justify-center mx-auto mb-4 transition-all">
                <FaHeadset size={28} />
              </div>
              <h3 className="text-4xl font-bold text-gray-900">24/7</h3>
              <p className="text-gray-500 mt-1">Support Available</p>
            </div>
          </motion.div>
        </div>
      </div>
    </UserLayout>
  );
};

export default ContactPage;
