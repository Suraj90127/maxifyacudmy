import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, verifyOTP, googleLogin } from "../../redux/slices/authSlice";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import UserLayout from "../../Layouts/UserLayout";
import { Mail, CheckCircle, AlertCircle, Star, Rocket, Users, Award, TrendingUp, BadgeCheck, Zap } from "lucide-react";

const Register = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { loading, otpSent, otpVerified } = useSelector(
    (state) => state.auth
  );

  /* ================= FORM STATE ================= */

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    dialCode: "+91",
    mobile: "",
    password: "",
    password_confirmation: "",
    agree: false,
    referral_code: "",
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm: false,
  });

  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [toast, setToast] = useState("");

  /* ================= GET REF + COURSE ================= */

  useEffect(() => {
    const ref = searchParams.get("ref");
    const course = searchParams.get("course");

    if (course) {
      localStorage.setItem("referral_course", course);
    }

    if (ref) {
      setFormData((prev) => ({
        ...prev,
        referral_code: ref,
      }));
    }
  }, [searchParams]);

  /* ================= OTP EFFECT ================= */

  useEffect(() => {
    if (otpSent) {
      setToast("OTP sent to your email");
      setShowOtpInput(true);
    }
  }, [otpSent]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(""), 5000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  /* ================= PASSWORD VALIDATION ================= */

  const getPasswordError = () => {
    const p = formData.password;

    if (p.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(p)) return "Add at least 1 uppercase letter";
    if (!/[a-z]/.test(p)) return "Add at least 1 lowercase letter";
    if (!/[0-9]/.test(p)) return "Add at least 1 number";
    if (!/[^A-Za-z0-9]/.test(p))
      return "Add at least 1 special character";

    return "";
  };

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  /* ================= VALIDATION ================= */

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstname.trim())
      newErrors.firstname = "First name is required";

    if (!formData.lastname.trim())
      newErrors.lastname = "Last name is required";

    if (!formData.email)
      newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address";

    if (!formData.mobile)
      newErrors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Enter valid 10-digit mobile number";

    const passErr = getPasswordError();
    if (passErr) newErrors.password = passErr;

    if (formData.password !== formData.password_confirmation)
      newErrors.password_confirmation = "Passwords do not match";

    if (!formData.agree)
      newErrors.agree = "Please accept terms & conditions";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* ================= GOOGLE LOGIN/REGISTER ================= */
  const handleGoogleRegister = () => {
    dispatch(googleLogin());
  };

  /* ================= REGISTER ================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    dispatch(
      registerUser({
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        mobile: Number(formData.mobile),
        dial_code: formData.dialCode,
        password: formData.password,
        i_agree: true,
        referral_code: formData.referral_code,
      })
    );
  };

  /* ================= OTP VERIFY ================= */

  const verifyOtpFromBackend = () => {
    if (otp.length !== 6) {
      setOtpError("Enter valid 6-digit OTP");
      return;
    }

    setOtpError("");

    dispatch(verifyOTP(otp));
  };

  /* ================= REDIRECT AFTER VERIFY ================= */

  useEffect(() => {
    if (otpVerified) {
      const course = localStorage.getItem("referral_course");

      if (course) {
        navigate(`/course-info/${course}`);
        localStorage.removeItem("referral_course");
      } else {
        navigate("/");
      }
    }
  }, [otpVerified, navigate]);

  /* ================= UI ================= */
  return (
    <>
      <UserLayout>
        <main className="min-h-screen bg-gradient-to-br from-white via-blue-100 to-indigo-200 relative overflow-hidden">
          {/* Background Glow - Same as HeroSection */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-purple-200/30 blur-3xl rounded-full" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-200/30 blur-3xl rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-100/20 blur-3xl rounded-full" />

          <div className="relative z-10 min-h-screen grid lg:grid-cols-2">
            {/* LEFT SIDE - Normal White Background */}
            <div className="hidden lg:flex flex-col justify-center bg-gradient-to-r from-blue-100 to-indigo-100 text-gray-900 px-16 xl:px-24 relative overflow-hidden">
              <div className="relative z-10 max-w-xl">
                <div className="inline-flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full mb-6 border border-purple-100">
                  <Zap size={14} className="text-purple-600" />
                  <span className="text-xs font-semibold uppercase tracking-wide text-purple-700">
                    Join Maxify Academy
                  </span>
                </div>

                <h1 className="text-5xl font-bold leading-tight mb-6 text-gray-900">
                  Start Learning
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                    High Income Skills
                  </span>
                </h1>

                <p className="text-gray-600 text-lg leading-relaxed mb-10">
                  Build your future with premium courses, expert mentorship,
                  practical projects and real career opportunities.
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-5 mb-8">
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                    <div className="flex items-center gap-2 text-3xl font-bold mb-1 text-purple-600">
                      2500+ <Users size={24} />
                    </div>
                    <p className="text-gray-500 text-sm">Students Enrolled</p>
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

            {/* RIGHT SIDE - Gradient Background (moved from left) */}
            <div className="flex items-center justify-center px-1 py-10 bg-white">
              <div className="w-full max-w-2xl">
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
                  className="bg-white/95 backdrop-blur-2xl rounded-[36px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-6 sm:p-8 md:p-10"
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
                      Create Account
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      Start your journey and access premium learning resources
                    </p>
                  </div>

                  {/* Google Button */}
                  <button
                    type="button"
                    onClick={handleGoogleRegister}
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
                    {/* Name Fields */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          name="firstname"
                          placeholder="Enter first name"
                          onChange={handleChange}
                          className={`input ${errors.firstname && "border-red-500"}`}
                        />
                        {errors.firstname && <p className="error">{errors.firstname}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          name="lastname"
                          placeholder="Enter last name"
                          onChange={handleChange}
                          className={`input ${errors.lastname && "border-red-500"}`}
                        />
                        {errors.lastname && <p className="error">{errors.lastname}</p>}
                      </div>
                    </div>

                    {/* Email & Mobile */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter email"
                          onChange={handleChange}
                          className={`input ${errors.email && "border-red-500"}`}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Mobile Number
                        </label>
                        <input
                          name="mobile"
                          value={formData.mobile}
                          placeholder="10 digit mobile"
                          onChange={(e) =>
                            handleChange({
                              target: {
                                name: "mobile",
                                value: e.target.value.replace(/\D/g, ""),
                              },
                            })
                          }
                          maxLength="10"
                          className={`input ${errors.mobile && "border-red-500"}`}
                        />
                        {errors.mobile && <p className="error">{errors.mobile}</p>}
                      </div>
                    </div>

                    {/* Password Fields */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword.password ? "text" : "password"}
                            name="password"
                            placeholder="Enter password"
                            onChange={handleChange}
                            className={`input pr-12 ${errors.password && "border-red-500"}`}
                          />
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility("password")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors"
                          >
                            {showPassword.password ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                          </button>
                        </div>
                        {errors.password && <p className="error">{errors.password}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword.confirm ? "text" : "password"}
                            name="password_confirmation"
                            placeholder="Confirm password"
                            onChange={handleChange}
                            className={`input pr-12 ${errors.password_confirmation && "border-red-500"}`}
                          />
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility("confirm")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors"
                          >
                            {showPassword.confirm ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                          </button>
                        </div>
                        {errors.password_confirmation && <p className="error">{errors.password_confirmation}</p>}
                      </div>
                    </div>

                    {/* Terms */}
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="agree"
                        onChange={handleChange}
                        className="mt-1 accent-purple-600"
                      />
                      <span className="text-sm text-gray-600 leading-relaxed">
                        I agree to the
                        <span className="font-semibold text-purple-600"> Terms & Conditions</span>
                      </span>
                    </label>
                    {errors.agree && <p className="error">{errors.agree}</p>}

                    {/* OTP Section */}
                    <AnimatePresence mode="wait">
                      {!showOtpInput ? (
                        <motion.button
                          key="register-btn"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          disabled={loading}
                          className="w-full h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:scale-[1.01] hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                        >
                          {loading ? "Please wait..." : "Create Your Account"}
                        </motion.button>
                      ) : (
                        <motion.div
                          key="otp-section"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-4"
                        >
                          <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3"
                          >
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <Mail size={20} className="text-green-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-green-800 text-sm">OTP Sent Successfully!</p>
                              <p className="text-green-600 text-xs mt-0.5">
                                We've sent a 6-digit code to{" "}
                                <span className="font-medium">{formData.email}</span>
                              </p>
                            </div>
                            <CheckCircle size={18} className="text-green-500" />
                          </motion.div>

                          <div>
                            <input
                              value={otp}
                              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                              maxLength="6"
                              placeholder="Enter 6 Digit OTP"
                              className="input text-center tracking-[0.4em] text-lg font-semibold"
                            />
                            {otpError && (
                              <p className="error flex items-center gap-1 mt-2">
                                <AlertCircle size={12} />
                                {otpError}
                              </p>
                            )}
                          </div>

                          <div className="text-center">
                            <button
                              type="button"
                              onClick={() => {
                                setOtp("");
                                setOtpError("");
                                dispatch(
                                  registerUser({
                                    firstname: formData.firstname,
                                    lastname: formData.lastname,
                                    email: formData.email,
                                    mobile: Number(formData.mobile),
                                    dial_code: formData.dialCode,
                                    password: formData.password,
                                    i_agree: true,
                                    referral_code: formData.referral_code,
                                  })
                                );
                              }}
                              className="text-sm text-purple-600 font-semibold hover:underline"
                            >
                              Didn't receive OTP? Resend
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={verifyOtpFromBackend}
                            className="w-full h-14 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:scale-[1.01] transition-all duration-300"
                          >
                            Verify OTP
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>

                  {/* Login Link */}
                  <p className="text-center text-sm text-gray-600 mt-8">
                    Already have an account?{" "}
                    <Link to="/login" className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 hover:underline">
                      Login
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

            .error {
              color: #dc2626;
              font-size: 0.75rem;
              margin-top: 6px;
              display: flex;
              align-items: center;
              gap: 4px;
            }
          `}</style>
        </main>
      </UserLayout>
    </>
  );
};

export default Register;