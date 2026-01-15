import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, logoutUser } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  /* =========================
     PASSWORD VALIDATION
  ========================= */
  const isStrongPassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#_])[A-Za-z\d@$!%*?&^#_]{8,}$/;
    return regex.test(password);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ❌ Password mismatch
    if (form.password !== form.password_confirmation) {
      toast.error("New password and confirm password do not match!");
      return;
    }

    // ❌ Weak password
    if (!isStrongPassword(form.password)) {
      toast.error(
        "Password must be at least 8 characters and include uppercase, lowercase, number & special character."
      );
      return;
    }

    dispatch(
      changePassword({
        oldPassword: form.current_password,
        newPassword: form.password,
      })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success(
          "Password changed successfully. Please login again."
        );

        // ✅ AUTO LOGOUT
        dispatch(logoutUser());

        // ✅ REDIRECT TO LOGIN
        setTimeout(() => {
          navigate("/login");
        }, 1200);
      } else {
        toast.error(res.payload || "Failed to change password!");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 flex justify-center items-start pt-16">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border p-6 sm:p-8">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#336699]">
            Change Password
          </h1>
          <p className="text-gray-500 mt-1">
            Update your account security
          </p>
        </div>

        {/* Icon */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <Lock className="w-5 h-5 text-indigo-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">
            Password Details
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <Field
            label="Current Password"
            name="current_password"
            value={form.current_password}
            onChange={handleChange}
          />

          <Field
            label="New Password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          {/* Helper text */}
          <p className="text-xs text-gray-500">
            Password must be at least 8 characters long and include
            uppercase, lowercase, number, and special character.
          </p>

          <Field
            label="Confirm Password"
            name="password_confirmation"
            value={form.password_confirmation}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5d45fd] text-white py-3 rounded-xl font-semibold hover:bg-[#4a37d9] transition disabled:opacity-50"
          >
            {loading ? "Changing Password..." : "Save Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

/* ======================
   INPUT FIELD
====================== */
const Field = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type="password"
      required
      {...props}
      className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
    />
  </div>
);

export default ChangePassword;
