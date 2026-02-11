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
    let { amount } = req.body;

    amount = Number(amount);

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid amount required",
      });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });

    return res.status(200).json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });

  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Order creation failed",
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
      purchased_amount,
      coupon_amount = 0,
      email,
      phone,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = req.body;

    /* =========================
       BASIC VALIDATION
    ========================= */

    if (
      !course_id ||
      !razorpay_payment_id ||
      !razorpay_order_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Incomplete payment data",
      });
    }

    /* =========================
       VERIFY SIGNATURE (AGAIN)
    ========================= */

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    /* =========================
       CHECK COURSE
    ========================= */

    const course = await Course.findById(course_id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    /* =========================
       PREVENT DUPLICATE PAYMENT
    ========================= */

    const existingPayment = await CoursePurchase.findOne({
      payment_id: razorpay_payment_id,
    });

    if (existingPayment) {
      return res.status(200).json({
        success: true,
        message: "Payment already processed",
      });
    }

    /* =========================
       FIND OR CREATE USER
    ========================= */

    let user;

    if (req.user?.id) {
      user = await User.findById(req.user.id);
    } else {
      const normalizedEmail = email?.trim().toLowerCase();

      if (!normalizedEmail || !phone) {
        return res.status(400).json({
          success: false,
          message: "Email & phone required",
        });
      }

      user = await User.findOne({ email: normalizedEmail });

      if (!user) {
        const plainPassword = generateRandomPassword(8);
        const hashedPassword = await bcrypt.hash(plainPassword, 10);
        const referralCode = await generateNumericReferralCode();

        user = await User.create({
          firstname: normalizedEmail.split("@")[0],
          email: normalizedEmail,
          mobile: phone,
          password: hashedPassword,
          temporary_password: plainPassword,
          referral_code: referralCode,
          role: "user",
          is_verified: true,
        });
      }
    }

    /* =========================
       CHECK DUPLICATE COURSE
    ========================= */

    const alreadyPurchased = await CoursePurchase.findOne({
      user_id: user._id,
      course_id,
    });

    if (alreadyPurchased) {
      return res.status(400).json({
        success: false,
        message: "Course already purchased",
      });
    }

    /* =========================
       CREATE PURCHASE
    ========================= */

    const purchase = await CoursePurchase.create({
      user_id: user._id,
      course_id,
      email: user.email,
      enrolled: true,
      purchased_amount: Number(purchased_amount),
      coupon_amount: Number(coupon_amount),
      payment_gateway: "razorpay",
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      payment_status: "paid",
    });

    /* =========================
       SEND LOGIN MAIL (GUEST)
    ========================= */

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
    console.error("CREATE PURCHASE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Purchase failed",
    });
  }
};