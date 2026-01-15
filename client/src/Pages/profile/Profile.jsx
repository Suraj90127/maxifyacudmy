import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { completeProfile, getProfile } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { User } from "lucide-react";

const countries = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Saudi Arabia",
  "UAE",
  "Pakistan",
  "Bangladesh",
];

const Profile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    address: "",
    state: "",
    zip: "",
    city: "",
    country_name: "",
  });

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (!user) return;
    setFormData({
      address: user.address || user.profile?.address || "",
      state: user.state || user.profile?.state || "",
      zip: user.zip || user.profile?.zip || "",
      city: user.city || user.profile?.city || "",
      country_name:
        user.country_name || user.profile?.country_name || "",
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = new FormData();
    Object.entries(formData).forEach(([k, v]) =>
      submitData.append(k, v)
    );

    if (profileImage) {
      submitData.append("profile_image", profileImage);
    }

    dispatch(completeProfile(submitData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Profile updated successfully");
        dispatch(getProfile());
      } else {
        toast.error(res.payload || "Profile update failed");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 pb-24">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-indigo-700">
          Profile Settings
        </h1>
        <p className="text-gray-500 mt-1">
          Manage and update your personal details
        </p>
      </div>

      {/* Profile Card */}
      <div className="max-w-5xl bg-white rounded-2xl shadow-sm border p-6 sm:p-8">

        {/* Avatar */}
        <div className="flex items-center gap-5 mb-8">
          {/* <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center">
            <User className="text-indigo-600 w-8 h-8" />
          </div> */}
          <div>
            <h3 className="font-semibold text-lg text-gray-800">
              {user?.firstname} {user?.lastname}
            </h3>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <Section title="Basic Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input label="First Name" value={user?.firstname || ""} disabled />
              <Input label="Last Name" value={user?.lastname || ""} disabled />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              <Input label="Email" value={user?.email || ""} disabled />
              <Input label="Mobile" value={user?.mobile || ""} disabled />
            </div>
          </Section>

          {/* Address */}
          <Section title="Address Information">
            <Select
              label="Country"
              name="country_name"
              value={formData.country_name}
              onChange={handleChange}
              options={countries}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              <Input
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              <Input
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              <Input
                label="Zip Code"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
              />
              <Input
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </Section>

          {/* Submit */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-10 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

/* ======================
   REUSABLE COMPONENTS
====================== */

const Section = ({ title, children }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-800 mb-4">
      {title}
    </h3>
    {children}
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      {...props}
      readOnly={props.disabled}
      className={`w-full rounded-xl px-4 py-3 border focus:ring-2 focus:ring-indigo-400 focus:outline-none ${
        props.disabled
          ? "bg-gray-100 cursor-not-allowed"
          : "bg-white"
      }`}
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select
      {...props}
      className="w-full rounded-xl px-4 py-3 border bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
    >
      <option value="">Select Country</option>
      {options.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  </div>
);

export default Profile;
