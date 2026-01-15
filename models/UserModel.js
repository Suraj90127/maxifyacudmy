const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,

    username: { type: String },

    email: { type: String, unique: true, sparse: true },

    dial_code: String,

    temporary_password: {
      type: String,
      default: null,
    },

    // 🔥 MOBILE AS NUMBER
    mobile: {
      type: String,
      unique: true,
      sparse: true,
    },

    i_agree: { type: Boolean, required: false },

    otp: String,
    otp_expiry: Date,
    is_verified: { type: Boolean, default: false },

    reset_otp: String,
    reset_otp_expiry: Date,

    password: String,

    ref_by: String,
    referral_code: { type: String, unique: true, sparse: true },
    referrals_count: { type: Number, default: 0 },
    credit: { type: Number, default: 0 },

    referral_link: { type: String, default: "" },

    country_name: String,
    country_code: String,
    city: String,
    state: String,
    zip: String,
    address: String,

    profile_complete: { type: Boolean, default: false },
    profile_image: { type: String, default: "" },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
