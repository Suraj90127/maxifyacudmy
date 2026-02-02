const Razorpay = require("razorpay");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const User = require("../models/UserModel");
const Course = require("../models/Course");
const CoursePurchase = require("../models/coursePurchaseModel");

const generateRandomPassword = require("../utils/generatePassword");
const { sendLoginCredentials } = require("../utils/emailService");
const createToken = require("../utils/createToken");


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


const normalizeEmail = (email) =>
  email ? email.trim().toLowerCase() : null;

const generateNumericReferralCode = async () => {
  let code, exists = true;

  while (exists) {
    code = Math.floor(10000000 + Math.random() * 90000000).toString();
    exists = await User.findOne({ referral_code: code });
  }
  return code;
};


exports.createOrder = async (req, res) => {
  try {
    let { amount, email, phone } = req.body;

    /* =====================
       AMOUNT VALIDATION
    ===================== */
    amount = Number(amount);
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid amount is required",
      });
    }

    let user = null;

    /* =====================
       LOGGED-IN USER
    ===================== */
    if (req.user?.id) {
      user = await User.findById(req.user.id);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid user session",
        });
      }
    }

    /* =====================
       GUEST USER
    ===================== */
    if (!user) {
      email = normalizeEmail(email);

      if (!email || !phone) {
        return res.status(400).json({
          success: false,
          message: "Email & phone required for guest checkout",
        });
      }

      user = await User.findOne({ email });

      if (!user) {
        const plainPassword = generateRandomPassword(8);
        const hashedPassword = await bcrypt.hash(plainPassword, 10);
        const referralCode = await generateNumericReferralCode();
        const FRONTEND =
          process.env.FRONTEND_URL || "http://localhost:5173";

        user = await User.create({
          firstname: email.split("@")[0],
          lastname: "",
          email,
          mobile: phone,
          password: hashedPassword,
          temporary_password: plainPassword,
          referral_code: referralCode,
          referral_link: `${FRONTEND}/register?ref=${referralCode}`,
          role: "user",
          i_agree: true,
          is_verified: true,
        });
      }
    }

    /* =====================
       JWT COOKIE SET
    ===================== */
    const token = createToken({
      id: user._id,
      role: user.role,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS required in live
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    /* =====================
       RAZORPAY ORDER
    ===================== */
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // INR → paisa
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: {
        userId: user._id.toString(),
        email: user.email,
      },
    });

    return res.status(200).json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      user_id: user._id,
      email: user.email,
    });
  } catch (error) {
    console.error("❌ CREATE ORDER ERROR:", error?.error || error);

    return res.status(500).json({
      success: false,
      message:
        error?.error?.description ||
        error?.message ||
        "Order creation failed",
    });
  }
};


exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Incomplete payment data",
      });
    }

    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });

  } catch (error) {
    console.error("❌ Verify Payment Error:", error);
    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};


exports.createPurchase = async (req, res) => {
  try {
    const {
      course_id,
      is_buy = true,
      purchased_amount = 0,
      coupon_amount = 0,
      email,
      razorpay_payment_id,
      razorpay_order_id,
    } = req.body;

    let user_id;

    /* ===== USER IDENTIFY ===== */
    if (req.user?.id) {
      user_id = req.user.id;
    } else if (email) {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user_id = user._id;
    } else {
      return res.status(400).json({ message: "User info missing" });
    }

    /* ===== VALIDATIONS ===== */
    if (!course_id) {
      return res.status(400).json({ message: "Course ID required" });
    }

    if (!razorpay_payment_id || !razorpay_order_id) {
      return res.status(400).json({ message: "Payment not verified" });
    }

    const course = await Course.findById(course_id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    /* ===== DUPLICATE CHECK ===== */
    const alreadyPurchased = await CoursePurchase.findOne({
      user_id,
      course_id,
    });

    if (alreadyPurchased) {
      return res.status(400).json({
        message: "Course already purchased",
      });
    }

    /* ===== CREATE PURCHASE ===== */
    const purchase = await CoursePurchase.create({
      user_id,
      course_id,
      email,
      is_buy,
      enrolled: true,
      purchased_amount: Number(purchased_amount),
      coupon_amount: Number(coupon_amount),
      payment_gateway: "razorpay",
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      payment_status: "paid",
    });

    /* ===== SEND LOGIN CREDENTIALS (GUEST) ===== */
    const user = await User.findById(user_id);

    if (user?.temporary_password) {
      await sendLoginCredentials(
        user.email,
        user.temporary_password
      );
      user.temporary_password = null;
      await user.save();
    }

    return res.status(200).json({
      success: true,
      message: "Course purchased successfully",
      purchase,
    });

  } catch (error) {
    console.error("❌ CREATE PURCHASE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create purchase",
      error: error.message,
    });
  }
};