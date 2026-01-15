const express = require("express");
const router = express.Router();
const {authMiddleware} = require('../middleware/authMiddleware')
const { registerUser, verifyOTP, loginUser, forgotPassword, verifyOTPAndReset, getProfile, completeProfile, logoutUser, changePassword } = require("../controller/usercontroller");

// -------------------------------------------
// 🚀 PUBLIC ROUTES
// -------------------------------------------
router.post("/register", registerUser);          // Step 1: Register (Basic Info)
router.post("/verify-otp", verifyOTP);          // Step 2: Verify Mobile OTP
router.post("/login", loginUser);               // Login
router.post("/forgot-password", forgotPassword); // Forgot Password → email OTP
router.post("/reset-password", verifyOTPAndReset); // Verify OTP & reset password

// -------------------------------------------
// 🔐 PROTECTED ROUTES (Login Required)
// -------------------------------------------
router.get("/me", authMiddleware, getProfile);        
router.post("/complete-profile", authMiddleware, completeProfile); 
router.post("/change-password", authMiddleware, changePassword); 
router.post("/logout", authMiddleware, logoutUser);    // Logout



module.exports = router;
