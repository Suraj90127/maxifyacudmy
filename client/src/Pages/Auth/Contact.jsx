// import React, { useState } from 'react';
// import UserLayout from '../../Layouts/UserLayout';
// import { useDispatch, useSelector } from "react-redux";
// import { sendMessage } from "../../redux/slices/contactSlice";
// import { useEffect } from 'react';

// const ContactPage = () => {
//   useEffect(() => {
//     window.scroll(0, 0)
//   })
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.contact);

//   const user = JSON.parse(localStorage.getItem("user")); // Check if user exists

//   const isLoggedIn = !!user; // true/false

//   const contactData = {
//     header: "Get in Touch",
//     subheader: "Have questions? We're here to help. Send us a message and we'll respond as soon as possible.",
//     contact_details: "1234 Business Street, Suite 567, San Francisco, CA 94107",
//     email_instruction: "Send us an email for any inquiries",
//     email_address: "support@example.com",
//     mobile_instruction: "Call us during business hours (9am-5pm PST)",
//     contact_number: "+1 (555) 123-4567"
//   };

//   const [formData, setFormData] = useState({
//     name: isLoggedIn ? user.firstname : "",
//     email: isLoggedIn ? user.email : "",
//     subject: "",
//     message: "",
//   });

//   const [submitSuccess, setSubmitSuccess] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     dispatch(sendMessage(formData))
//       .unwrap()
//       .then(() => {
//         setSubmitSuccess(true);

//         setFormData(prev => ({
//           ...prev,
//           subject: "",
//           message: "",
//         }));

//         setTimeout(() => setSubmitSuccess(false), 5000);
//       })
//       .catch(() => {
//         alert("Something went wrong");
//       });
//   };

//   return (
//     <UserLayout>
//       <main>
//         <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
//           <div className="container mx-auto px-4 max-w-7xl">

//             <div className="text-center mb-12">
//               <h1 className="text-3xl md:text-4xl font-bold">{contactData.header}</h1>
//               <p className="text-lg text-gray-600 max-w-2xl mx-auto">{contactData.subheader}</p>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

//               {/* LEFT: FORM */}
//               <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
//                 {submitSuccess && (
//                   <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex">
//                     <div className="text-green-500 mr-3">✔</div>
//                     <div>
//                       <p className="font-semibold text-green-800">Message sent successfully</p>
//                       <p className="text-green-600 text-sm">We will respond soon</p>
//                     </div>
//                   </div>
//                 )}

//                 <form onSubmit={handleSubmit} className="space-y-6">

//                   {/* NAME */}
//                   <div>
//                     <label className="block font-semibold text-gray-700 mb-2">Name</label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       className={`w-full p-2 rounded-xl border ${isLoggedIn ? "bg-gray-50" : "bg-white"}`}
//                       readOnly={isLoggedIn}
//                       required
//                     />

//                     {isLoggedIn && (
//                       <p className="text-xs text-gray-500 mt-1">
//                         Prefilled from your account
//                       </p>
//                     )}
//                   </div>

//                   {/* EMAIL */}
//                   <div>
//                     <label className="block font-semibold text-gray-700 mb-2">Email</label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className={`w-full p-2 rounded-xl border ${isLoggedIn ? "bg-gray-50" : "bg-white"}`}
//                       readOnly={isLoggedIn}
//                       required
//                     />
//                   </div>

//                   {/* SUBJECT */}
//                   <div>
//                     <label className="block font-semibold text-gray-700 mb-2">Subject</label>
//                     <input
//                       type="text"
//                       name="subject"
//                       value={formData.subject}
//                       onChange={handleInputChange}
//                       className="w-full p-2 rounded-xl border"
//                       required
//                     />
//                   </div>

//                   {/* MESSAGE */}
//                   <div>
//                     <label className="block font-semibold text-gray-700 mb-2">Message</label>
//                     <textarea
//                       name="message"
//                       value={formData.message}
//                       onChange={handleInputChange}
//                       rows="5"
//                       className="w-full p-2 rounded-xl border"
//                       required
//                     ></textarea>
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className={`w-full mt-4 py-3 px-6 rounded-xl font-semibold bg-[#003366] text-white ${loading ? "opacity-75 cursor-not-allowed" : "hover:bg-[#003366]/90"
//                       }`}
//                   >
//                     {loading ? "Sending..." : "Submit Message"}
//                   </button>

//                 </form>
//               </div>

//               {/* RIGHT: CONTACT INFO */}
//               {/* RIGHT: CONTACT INFO */}
//               <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">

//                 <div className="mb-8 pb-8 border-b border-gray-100">
//                   <h5 className="text-lg font-bold text-gray-900 mb-2">Merchant Legal Entity Name</h5>
//                   <p className="text-gray-600">Maxify Academy</p>
//                 </div>

//                 <div className="mb-8 pb-8 border-b border-gray-100">
//                   <h5 className="text-lg font-bold text-gray-900 mb-2">Registered Address</h5>
//                   <p className="text-gray-600">
//                     garhi khaira jamui, Jamui, BIHAR 811317
//                   </p>
//                 </div>

//                 <div className="mb-8 pb-8 border-b border-gray-100">
//                   <h5 className="text-lg font-bold text-gray-900 mb-2">Operational Address</h5>
//                   <p className="text-gray-600">
//                     garhi khaira jamui, Jamui, BIHAR 811317
//                   </p>
//                 </div>

//                 <div className="mb-8 pb-8 border-b border-gray-100">
//                   <h5 className="text-lg font-bold text-gray-900 mb-2">Telephone</h5>
//                   <a
//                     href="tel:+917033976030"
//                     className="text-[#003366] font-medium"
//                   >
//                     7033976030
//                   </a>
//                 </div>

//                 <div className="mb-8">
//                   <h5 className="text-lg font-bold text-gray-900 mb-2">Email Us</h5>
//                   <a
//                     href="mailto:support@maxifyacademy.com"
//                     className="text-[#003366] font-medium"
//                   >
//                     support@maxifyacademy.com
//                   </a>
//                 </div>

//               </div>


//             </div>
//           </div>
//         </section>
//       </main>
//     </UserLayout>
//   );
// };

// export default ContactPage;


import React, { useState, useEffect } from 'react';
import UserLayout from '../../Layouts/UserLayout';
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../redux/slices/contactSlice";
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaBuilding, 
  FaCheckCircle,
  FaHeadset
} from 'react-icons/fa';
import { toast } from "react-toastify";

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.contact);

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const isLoggedIn = !!user;

  const [formData, setFormData] = useState({
    name: isLoggedIn ? user.firstname : "",
    email: isLoggedIn ? user.email : "",
    subject: "",
    message: "",
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendMessage(formData))
      .unwrap()
      .then(() => {
        setSubmitSuccess(true);
        toast.success("Message sent successfully!");
        setFormData(prev => ({
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
      <div className="min-h-screen bg-white font-sans text-[#1c1d1f]">
        
        {/* Header Section */}
        <div className="bg-gray-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto py-16 px-4 md:px-6 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              Get in <span className="text-cyan-500">Touch</span>
            </h1>
            <p className="text-gray-500 mt-4 text-lg max-w-2xl font-medium mx-auto lg:mx-0">
              Have questions or need technical assistance? Our team is here to support your learning journey.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-12 lg:py-20 px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* LEFT: FORM SECTION */}
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl shadow-gray-100 p-8 md:p-10">
                <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
                  <FaHeadset className="text-cyan-500" /> Send a Message
                </h3>

                {submitSuccess && (
                  <div className="mb-8 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-4 animate-fade-in">
                    <FaCheckCircle className="text-emerald-500 text-xl" />
                    <div>
                      <p className="font-bold text-emerald-900">Message Delivered</p>
                      <p className="text-emerald-700 text-sm font-medium">We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/5 font-medium ${isLoggedIn ? "bg-gray-50 text-gray-500" : "bg-white"}`}
                        readOnly={isLoggedIn}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/5 font-medium ${isLoggedIn ? "bg-gray-50 text-gray-500" : "bg-white"}`}
                        readOnly={isLoggedIn}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/5 font-medium"
                      placeholder="How can we help?"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="5"
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/5 font-medium resize-none"
                      placeholder="Describe your inquiry in detail..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-5 rounded-2xl font-black text-white uppercase tracking-widest transition-all shadow-xl ${
                      loading 
                      ? "bg-gray-300 cursor-not-allowed" 
                      : "bg-cyan-500 hover:bg-cyan-600 shadow-cyan-100 active:scale-[0.98]"
                    }`}
                  >
                    {loading ? "Processing..." : "Submit Inquiry"}
                  </button>
                </form>
              </div>
            </div>

            {/* RIGHT: CONTACT INFO SECTION */}
            <div className="order-1 lg:order-2 space-y-10">
              <div>
                <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-tight flex items-center gap-2">
                  <span className="w-2 h-6 bg-cyan-500 rounded-full"></span>
                  Contact Information
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed mb-10">
                  Prefer a more direct route? Reach out via our official channels below.
                </p>
              </div>

              <div className="grid gap-8">
                {/* Legal Entity */}
                <div className="flex gap-6 group">
                  <div className="w-14 h-14 shrink-0 bg-gray-50 rounded-2xl flex items-center justify-center text-cyan-500 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300">
                    <FaBuilding size={24} />
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Legal Entity</h5>
                    <p className="text-lg font-bold text-gray-900">Maxify Academy</p>
                  </div>
                </div>

                {/* Addresses */}
                <div className="flex gap-6 group">
                  <div className="w-14 h-14 shrink-0 bg-gray-50 rounded-2xl flex items-center justify-center text-cyan-500 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300">
                    <FaMapMarkerAlt size={24} />
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Our Location</h5>
                    <p className="text-lg font-bold text-gray-900 leading-snug max-w-xs">
                      Garhi Khaira Jamui, Jamui, BIHAR 811317
                    </p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex gap-6 group">
                  <div className="w-14 h-14 shrink-0 bg-gray-50 rounded-2xl flex items-center justify-center text-cyan-500 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300">
                    <FaPhoneAlt size={22} />
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Call Support</h5>
                    <a href="tel:+917033976030" className="text-xl font-black text-gray-900 hover:text-cyan-500 transition-colors">
                      +91 7033976030
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-6 group">
                  <div className="w-14 h-14 shrink-0 bg-gray-50 rounded-2xl flex items-center justify-center text-cyan-500 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300">
                    <FaEnvelope size={22} />
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Email Us</h5>
                    <a href="mailto:support@maxifyacademy.com" className="text-xl font-black text-gray-900 hover:text-cyan-500 transition-colors">
                      support@maxifyacademy.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Decorative Card */}
              <div className="bg-cyan-500 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-cyan-100">
                <div className="relative z-10">
                  <h4 className="text-xl font-black mb-2">24/7 Support</h4>
                  <p className="text-cyan-100 text-sm font-medium leading-relaxed">
                    Our technical team is available around the clock to help you with course access and platform issues.
                  </p>
                </div>
                <FaHeadset size={100} className="absolute -right-4 -bottom-4 text-white/10 rotate-12" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default ContactPage;