import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

/* ------------------ Redux ------------------ */
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const Login = () => {
  useEffect(() => {
    window.scroll(0, 0)
  })

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: false
  });

  const [showPassword, setShowPassword] = useState(false);

  // Static content data
  const loginContent = {
    title: 'Welcome Back!',
    subtitle: 'Login to your account to continue learning'
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  /* ------------------ LOGIN SUBMIT ------------------ */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      login: formData.username, // backend accepts: mobile OR email
      password: formData.password,
    };

    const res = await dispatch(loginUser(payload));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/"); // route change if needed
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <div className="container mx-auto px-4">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7 col-sm-10">
            <div className="bg-white max-w-xl mx-auto shadow-sm rounded-2xl p-6 md:p-8 relative border border-gray-200 transition-all duration-300">

              {/* Logo */}
              <div className="text-center mb-6">
                <a href="/" className="inline-block">
                  <img
                    src="https://i.ibb.co/5X9Fm9mc/logo-2.png"
                    alt="Logo"
                    className="h-15"
                  />
                </a>
              </div>

              {/* Title */}
              <div className="text-center mb-6">
                <h4 className="font-bold text-gray-900 text-xl mb-2">
                  {loginContent.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {loginContent.subtitle}
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Email */}
                <div>
                  <label className="block font-semibold text-gray-700 mb-2 text-sm">
                    Email or Mobile
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#063d67] focus:border-[#063d67] outline-none transition-colors text-sm"
                    placeholder="Enter email or mobile"
                    required
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="block font-semibold text-gray-700 mb-2 text-sm">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#063d67] focus:border-[#063d67] outline-none transition-colors pr-12 text-sm"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Remember + Forgot */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="remember"
                      id="remember"
                      checked={formData.remember}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#063d67] border-gray-300 rounded focus:ring-[#063d67]"
                    />
                    <label htmlFor="remember" className="text-sm text-gray-700 cursor-pointer">
                      Remember Me
                    </label>
                  </div>

                  <a
                    href="/forgetpassword"
                    className="text-[#063d67] hover:text-[#063d67] text-sm font-semibold transition-colors"
                  >
                    Forget password?
                  </a>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#063d67] hover:bg-[#063d67] text-white py-3 px-4 rounded-xl shadow-sm transition-all duration-250 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </span>
                  ) : (
                    'Login'
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              {/* Register Link */}
              <div className="text-center">
                <p className="text-gray-600 text-sm">
                  Don't have an account?{' '}
                  <a
                    href="/register"
                    className="font-semibold text-[#063d67] hover:text-[#063d67] transition-colors"
                  >
                    Sign Up
                  </a>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
