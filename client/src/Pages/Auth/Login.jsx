import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, googleLogin } from "../../redux/slices/authSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import UserLayout from "../../Layouts/UserLayout";
import { Star, Rocket, Users, Award, TrendingUp, BadgeCheck, Zap } from "lucide-react";

const getSafeRedirectPath = (value) => {
  if (!value || typeof value !== "string") return "/";
  if (!value.startsWith("/") || value.startsWith("//")) return "/";
  if (value.startsWith("/login") || value.startsWith("/register")) return "/";
  return value;
};

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Add this to get location state
  const { loading } = useSelector((state) => state.auth);

  // Get the page user was trying to visit before login
  const redirectParam = new URLSearchParams(location.search).get("redirect");
  const stateFrom = typeof location.state?.from === "string"
    ? location.state.from
    : location.state?.from
      ? `${location.state.from.pathname || ""}${location.state.from.search || ""}${location.state.from.hash || ""}`
      : "";
  const from = getSafeRedirectPath(redirectParam || stateFrom);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ================= LOGIN SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      login: formData.username,
      password: formData.password,
    };

    const res = await dispatch(loginUser(payload));

    if (res.meta.requestStatus === "fulfilled") {
      // Redirect to the page user was trying to visit, or home page if none
      navigate(from, { replace: true });
    }
  };

  /* ================= GOOGLE LOGIN ================= */
  const handleGoogleLogin = () => {
    dispatch(googleLogin()).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        // Redirect to the page user was trying to visit, or home page if none
        navigate(from, { replace: true });
      }
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <UserLayout>
        <main className="min-h-screen bg-gradient-to-br from-white via-blue-100 to-indigo-200 relative overflow-hidden">
          {/* Background Glow - Same as HeroSection */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-purple-200/30 blur-3xl rounded-full" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-200/30 blur-3xl rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-100/20 blur-3xl rounded-full" />

          <div className="relative z-10 min-h-screen grid lg:grid-cols-2">
            {/* LEFT SIDE - Normal White Background with gradient accents */}
            <div className="hidden lg:flex flex-col justify-center bg-gradient-to-r from-blue-100 to-indigo-100 text-gray-900 px-16 xl:px-24 relative overflow-hidden">
              <div className="relative z-10 max-w-xl">
                <div className="inline-flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full mb-6 border border-purple-100">
                  <Zap size={14} className="text-purple-600" />
                  <span className="text-xs font-semibold uppercase tracking-wide text-purple-700">
                    Welcome To Maxify Academy
                  </span>
                </div>

                <h1 className="text-5xl font-bold leading-tight mb-6 text-gray-900">
                  Learn High Income Skills
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                    From Industry Experts
                  </span>
                </h1>

                <p className="text-gray-600 text-lg leading-relaxed mb-10">
                  Join thousands of students learning web development,
                  graphic design, marketing, AI and freelancing skills
                  to build a successful career.
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-5 mb-8">
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                    <div className="flex items-center gap-2 text-3xl font-bold mb-1 text-purple-600">
                      2500+ <Users size={24} />
                    </div>
                    <p className="text-gray-500 text-sm">Active Students</p>
                  </div>

                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                    <div className="flex items-center gap-2 text-3xl font-bold mb-1 text-purple-600">
                      92% <Rocket size={24} />
                    </div>
                    <p className="text-gray-500 text-sm">Success Rate</p>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: Award, text: "Certified Courses", color: "text-purple-600" },
                    { icon: BadgeCheck, text: "Expert Mentors", color: "text-green-600" },
                    { icon: TrendingUp, text: "Career Growth", color: "text-blue-600" },
                  ].map((badge, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1.5 border border-gray-100">
                      <badge.icon size={14} className={badge.color} />
                      <span className="text-xs text-gray-600">{badge.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - White Background with Form */}
            <div className="flex items-center justify-center px-4 py-10 bg-white">
              <div className="w-full max-w-md">
                {/* Mobile Logo */}
                <div className="lg:hidden text-center mb-8">
                  <img
                    src="https://i.ibb.co/5X9Fm9mc/logo-2.png"
                    alt="Logo"
                    className="h-14 mx-auto"
                  />
                </div>

                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-[36px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-6 sm:p-8 md:p-10"
                >
                  {/* Desktop Logo */}
                  <div className="hidden lg:block text-center mb-6">
                    <img
                      src="https://i.ibb.co/5X9Fm9mc/logo-2.png"
                      alt="Logo"
                      className="h-14 mx-auto"
                    />
                  </div>

                  {/* Heading */}
                  <div className="text-center mb-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                      Welcome Back!
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      Login to continue your learning journey with Maxify Academy
                    </p>
                  </div>

                  {/* Google Button */}
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full h-14 rounded-2xl border border-gray-300 bg-white hover:bg-gray-50 hover:scale-[1.01] hover:shadow-md text-gray-700 font-semibold transition-all duration-300 flex items-center justify-center gap-3 mb-6"
                  >
                    <FcGoogle size={22} />
                    Continue with Google
                  </button>

                  {/* Divider */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-sm text-gray-500">OR</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email or Mobile */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email or Mobile
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your email or mobile"
                        className="input"
                        required
                      />
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Enter your password"
                          className="input pr-14"
                          required
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors"
                        >
                          {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                        </button>
                      </div>
                    </div>

                    {/* Remember & Forgot Password */}
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="remember"
                          checked={formData.remember}
                          onChange={handleChange}
                          className="w-4 h-4 accent-purple-600"
                        />
                        <span className="text-sm text-gray-600">Remember me</span>
                      </label>

                      <Link
                        to="/forgetpassword"
                        className="text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors"
                      >
                        Forgot Password?
                      </Link>
                    </div>

                    {/* Login Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:scale-[1.01] hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Logging in..." : "Login To Dashboard"}
                    </button>
                  </form>

                  {/* Register Link */}
                  <p className="text-center text-sm text-gray-600 mt-8">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 hover:underline"
                    >
                      Create Account
                    </Link>
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          <style>{`
            .input {
              width: 100%;
              height: 56px;
              padding: 0 18px;
              border: 1px solid #e5e7eb;
              border-radius: 18px;
              background: rgba(255,255,255,0.9);
              transition: all 0.3s ease;
              outline: none;
            }

            .input:focus {
              border-color: #8b5cf6;
              box-shadow: 0 0 0 4px rgba(139,92,246,0.12);
              background: white;
            }
          `}</style>
        </main>
      </UserLayout>
    </>
  );
};

export default Login;
