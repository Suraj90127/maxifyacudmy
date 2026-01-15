import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsYoutube,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  subscribeUser,
  clearSubscriptionState,
} from "../redux/slices/subscriptionSlice";
import { fetchSocialLinks } from "../redux/slices/socialLinksSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Footer() {
  const dispatch = useDispatch();

  /* ===============================
     LOCAL STATE
  =============================== */
  const [email, setEmail] = useState("");

  /* ===============================
     REDUX STATE
  =============================== */
  const { loading, message, error } = useSelector(
    (state) => state.subscription
  );

  const { links } = useSelector((state) => state.socialLinks);

  /* ===============================
     FETCH SOCIAL LINKS
  =============================== */
  useEffect(() => {
    dispatch(fetchSocialLinks());
  }, [dispatch]);

  /* ===============================
     TOAST HANDLING
  =============================== */
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearSubscriptionState());
      setEmail("");
    }

    if (error) {
      toast.error(error);
      dispatch(clearSubscriptionState());
    }
  }, [message, error, dispatch]);

  /* ===============================
     SUBSCRIBE HANDLER
  =============================== */
  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email!");
      return;
    }

    dispatch(subscribeUser(email));
  };

  return (
    <footer className="relative bg-gray-50">
      <div className="relative py-6">
        {/* Decorative Shapes */}
        <img
          className="absolute bottom-[12%] left-0"
          src="https://eduna-html.vercel.app/assets/images/footer/footer-1/shape-1.svg"
          alt="shape"
        />
        <img
          className="absolute top-[14%] right-[10%]"
          src="https://eduna-html.vercel.app/assets/images/footer/footer-1/shape-2.svg"
          alt="shape"
        />

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* ABOUT */}
            <div>
              <Link to="/" className="inline-block mb-4">
                <img
                  src="https://i.ibb.co/5X9Fm9mc/logo-2.png"
                  alt="logo"
                  className="w-44"
                />
              </Link>

              <p className="text-gray-700">
                Maxify Academy empowers learners to master real-world digital
                skills through practical, industry-focused courses.
              </p>

              {/* ✅ SOCIAL LINKS FROM BACKEND */}
              <ul className="flex gap-6 mt-6">
                {links?.facebook && (
                  <li>
                    <a
                      href={links.facebook}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <BsFacebook className="text-3xl hover:text-blue-600 transition" />
                    </a>
                  </li>
                )}

                {links?.instagram && (
                  <li>
                    <a
                      href={links.instagram}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <BsInstagram className="text-3xl hover:text-pink-600 transition" />
                    </a>
                  </li>
                )}

                {links?.linkedin && (
                  <li>
                    <a
                      href={links.linkedin}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <BsLinkedin className="text-3xl hover:text-blue-700 transition" />
                    </a>
                  </li>
                )}

                {links?.youtube && (
                  <li>
                    <a
                      href={links.youtube}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <BsYoutube className="text-3xl hover:text-red-600 transition" />
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {/* LINKS */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Links</h4>
              <ul className="space-y-3 text-gray-700">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/courses">Our Courses</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/blogs">Our Blogs</Link></li>
                <li><Link to="/faq">FAQ’s</Link></li>
              </ul>
            </div>

            {/* POLICIES */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Policies</h4>
              <ul className="space-y-3 text-gray-700">
                <li><a href="/shipping-policy">Shipping Policy</a></li>
                <li><a href="/privacy-policy">Privacy Policy</a></li>
                <li>
                  <a href="/cancellation-refund-policy">
                    Refund Policy
                  </a>
                </li>
                <li>
                  <a href="/terms-and-conditions">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>

            {/* SUBSCRIBE */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Subscribe</h4>

              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-full px-6 py-3 border outline-none"
                />

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  disabled={loading}
                  className="bg-[#003366] text-white py-3 rounded-full font-semibold relative disabled:opacity-60"
                >
                  {loading ? "Subscribing..." : "Subscribe Now"}
                  <span className="absolute right-1 top-1/2 -translate-y-1/2 bg-white text-[#003366] rounded-full w-10 h-10 flex items-center justify-center">
                    <FiArrowRight />
                  </span>
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="bg-gray-100 text-center py-6">
        <p className="text-sm text-gray-700">
          © 2024 Maxify Academy | All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
