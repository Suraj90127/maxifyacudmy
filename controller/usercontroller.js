const User = require("../models/UserModel");
const TempUser = require("../models/TempUser");
const bcrypt = require("bcrypt");
const createToken = require("../utils/createToken");
const {
  sendResetPasswordOTP,
  sendAccountVerificationOTP,
} = require("../utils/emailService");

/* =========================
   HELPERS
========================= */

// Normalize email
function normalizeEmail(email) {
  if (!email) return null;
  return email.trim().toLowerCase();
}

// Generate UNIQUE numeric referral code (8 digits)
const generateNumericReferralCode = async () => {
  let code;
  let exists = true;

  while (exists) {
    code = Math.floor(10000000 + Math.random() * 90000000).toString();
    exists = await User.findOne({ referral_code: code });
  }
  return code;
};

/* ======================================================
   REGISTER USER → SAVE TEMP + SEND OTP
====================================================== */
exports.registerUser = async (req, res) => {
  try {
    let {
      firstname,
      lastname,
      email,
      mobile,
      password,
      i_agree,
      referral_code,
    } = req.body;

    email = normalizeEmail(email);

    if (!firstname || !lastname || !email || !mobile || !password)
      return res.status(400).json({ message: "All fields required." });

    if (!i_agree)
      return res.status(400).json({ message: "You must agree." });

    if (await User.findOne({ email }))
      return res.status(400).json({ message: "Email already exists." });

    if (await User.findOne({ mobile }))
      return res.status(400).json({ message: "Mobile already exists." });

    // Validate referral code if provided
    if (referral_code) {
      referral_code = referral_code.trim();
      const isValid = await User.findOne({ referral_code });
      if (!isValid)
        return res.status(400).json({ message: "Invalid referral code." });
    } else {
      referral_code = "";
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await TempUser.findOneAndUpdate(
      { email },
      {
        firstname,
        lastname,
        email,
        mobile,
        password,
        referral_code,
        otp,
        otp_expires: Date.now() + 5 * 60 * 1000,
      },
      { upsert: true, new: true }
    );

    await sendAccountVerificationOTP(email, otp);

    return res.status(200).json({ message: "OTP sent to mail successfully." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/* ======================================================
   VERIFY OTP → CREATE FINAL USER → AUTO LOGIN
====================================================== */
exports.verifyOTP = async (req, res) => {
  try {
    const { otp } = req.body;

    const tempUser = await TempUser.findOne({ otp });
    if (!tempUser)
      return res.status(400).json({ message: "Invalid OTP." });

    if (Date.now() > tempUser.otp_expires)
      return res.status(400).json({ message: "OTP expired." });

    const hashedPassword = await bcrypt.hash(tempUser.password, 10);

    // 🔥 NUMERIC REFERRAL CODE
    const myReferralCode = await generateNumericReferralCode();

    const FRONTEND = process.env.FRONTEND_URL || "http://localhost:5173";
    const referralLink = `${FRONTEND}/register?ref=${myReferralCode}`;

    const user = await User.create({
      firstname: tempUser.firstname,
      lastname: tempUser.lastname,
      email: tempUser.email,
      mobile: tempUser.mobile,
      password: hashedPassword,
      referral_code: myReferralCode,
      referral_link: referralLink,
      ref_by: tempUser.referral_code,
      credit: 0,
      referrals_count: 0,
      role: "user",
      is_verified: true,
      i_agree: true,
    });

    // Referral credit
    if (tempUser.referral_code) {
      const referrer = await User.findOne({
        referral_code: tempUser.referral_code,
      });
      if (referrer) {
        await User.findByIdAndUpdate(referrer._id, {
          $inc: { credit: 50, referrals_count: 1 },
        });
      }
    }

    await TempUser.deleteOne({ email: tempUser.email });

    // AUTO LOGIN
    const token = createToken({ id: user._id, role: user.role });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false, // true in production (HTTPS)
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "OTP verified & logged in successfully",
      user: {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/* ======================================================
   LOGIN USER
====================================================== */
exports.loginUser = async (req, res) => {
  try {
    let { login, password } = req.body;
    login = normalizeEmail(login) || login.trim();

    const user = await User.findOne({
      $or: [{ email: login }, { mobile: login }],
    });

    if (!user)
      return res.status(400).json({ message: "Invalid login." });

    if (!user.is_verified)
      return res.status(403).json({ message: "Please verify OTP first." });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid credentials." });

    const token = createToken({ id: user._id, role: user.role });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/* ======================================================
   LOGOUT
====================================================== */
exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out successfully." });
};

/* ======================================================
   GET PROFILE
====================================================== */
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ======================================================
   COMPLETE PROFILE
====================================================== */
exports.completeProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      dial_code,
      country_name,
      country_code,
      city,
      state,
      zip,
      address,
    } = req.body;

    const profile_image = req.file ? `/uploads/${req.file.filename}` : "";

    const forbidden = ["email", "mobile", "password", "role"];
    for (let f of forbidden) {
      if (req.body[f])
        return res.status(400).json({ message: `${f} cannot be updated.` });
    }

    const update = {
      dial_code,
      country_name,
      country_code,
      city,
      state,
      zip,
      address,
      profile_complete: true,
    };

    if (profile_image) update.profile_image = profile_image;

    const updatedUser = await User.findByIdAndUpdate(userId, update, {
      new: true,
    }).select("-password");

    res.status(200).json({
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ======================================================
   FORGOT PASSWORD → SEND OTP
====================================================== */
exports.forgotPassword = async (req, res) => {
  try {
    let { email } = req.body;
    email = normalizeEmail(email);

    if (!email)
      return res.status(400).json({ message: "Email required." });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Email not found." });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.reset_otp = otp;
    user.reset_otp_expiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    await sendResetPasswordOTP(email, otp);
    res.status(200).json({ message: "OTP sent." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ======================================================
   RESET PASSWORD AFTER OTP
====================================================== */
exports.verifyOTPAndReset = async (req, res) => {
  try {
    let { email, otp, newPassword } = req.body;
    email = normalizeEmail(email);
    otp = otp?.toString();

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found." });

    if (otp !== user.reset_otp)
      return res.status(400).json({ message: "Invalid OTP." });

    if (Date.now() > user.reset_otp_expiry)
      return res.status(400).json({ message: "OTP expired." });

    user.password = await bcrypt.hash(newPassword, 10);
    user.reset_otp = null;
    user.reset_otp_expiry = null;
    await user.save();

    res.status(200).json({ message: "Password reset successful." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ======================================================
   CHANGE PASSWORD (LOGGED-IN USER)
====================================================== */
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword)
      return res.status(400).json({ message: "Both passwords required." });

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "User not found." });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Old password incorrect." });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Password changed successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
