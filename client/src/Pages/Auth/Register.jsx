import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, verifyOTP } from "../../redux/slices/authSlice";
import { useNavigate, useSearchParams } from "react-router-dom";

const Register = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { loading, otpSent, otpVerified } = useSelector(
    (state) => state.auth
  );

  const refFromURL = searchParams.get("ref") || "";

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
    referral_code: refFromURL,
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

  /* ================= OTP EFFECT ================= */
  useEffect(() => {
    if (otpSent) {
      setToast("OTP sent to your email");
      setShowOtpInput(true);
    }
  }, [otpSent]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(""), 3000);
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

  /* ================= SUBMIT ================= */
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

  useEffect(() => {
    if (otpVerified) navigate("/");
  }, [otpVerified, navigate]);

  /* ================= UI ================= */
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-8">

        {/* LOGO */}
        <div className="text-center mb-4">
          <a href="/">
            <img
              src="https://i.ibb.co/5X9Fm9mc/logo-2.png"
              alt="Logo"
              className="h-14 mx-auto"
            /></a>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <input
                name="firstname"
                placeholder="First Name"
                onChange={handleChange}
                className={`input ${errors.firstname && "border-red-500"}`}
              />
              {errors.firstname && <p className="error">{errors.firstname}</p>}
            </div>

            <div>
              <input
                name="lastname"
                placeholder="Last Name"
                onChange={handleChange}
                className={`input ${errors.lastname && "border-red-500"}`}
              />
              {errors.lastname && <p className="error">{errors.lastname}</p>}
            </div>
          </div>

          {/* EMAIL / MOBILE */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className={`input ${errors.email && "border-red-500"}`}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div>
              <input
                name="mobile"
                value={formData.mobile}
                placeholder="Mobile (10 digits)"
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

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword.password ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className={`input pr-12 ${errors.password && "border-red-500"}`}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("password")}
              className="absolute right-4 top-3"
            >
              {showPassword.password ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <input
              type={showPassword.confirm ? "text" : "password"}
              name="password_confirmation"
              placeholder="Confirm Password"
              onChange={handleChange}
              className={`input ${errors.password_confirmation && "border-red-500"
                }`}
            />
            {errors.password_confirmation && (
              <p className="error">{errors.password_confirmation}</p>
            )}
          </div>

          {/* TERMS */}
          <div>
            <label className="flex gap-2 text-sm">
              <input type="checkbox" name="agree" onChange={handleChange} />
              I agree to Terms & Conditions
            </label>
            {errors.agree && <p className="error">{errors.agree}</p>}
          </div>

          {/* BUTTON / OTP */}
          {!showOtpInput ? (
            <button
              disabled={loading}
              className="w-full bg-[#063d67] text-white py-3 rounded-xl"
            >
              {loading ? "Please wait..." : "Create Account"}
            </button>
          ) : (
            <div>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                maxLength="6"
                placeholder="Enter OTP"
                className="input text-center tracking-widest"
              />
              {otpError && <p className="error">{otpError}</p>}
              <button
                type="button"
                onClick={verifyOtpFromBackend}
                className="w-full bg-[#063d67] text-white py-3 rounded-xl mt-3"
              >
                Verify OTP
              </button>
            </div>
          )}
        </form>
      </div>

      {/* TOAST */}
      {toast && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-green-600 text-white px-6 py-4 rounded-xl">
            {toast}
          </div>
        </div>
      )}

      <style>{`
        .input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #d1d5db;
          border-radius: 12px;
        }
        .input:focus {
          border-color: #063d67;
          box-shadow: 0 0 0 2px rgba(6,61,103,0.2);
          outline: none;
        }
        .error {
          color: #dc2626;
          font-size: 0.875rem;
          margin-top: 4px;
        }
      `}</style>
    </main>
  );
};

export default Register;
