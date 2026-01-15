const mongoose = require("mongoose");

const TempUserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  mobile: String,
  password: String,
  referral_code: String,
  referrer_id: String,
  otp: String,
  otp_expires: Date,
});

module.exports = mongoose.model("TempUser", TempUserSchema);
