const Razorpay = require("razorpay");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const User = require("../models/UserModel");
const TempUser = require("../models/TempUser");
const Course = require("../models/Course");
const CoursePurchase = require("../models/coursePurchaseModel");

const generateRandomPassword = require("../utils/generatePassword");
const { sendLoginCredentials } = require("../utils/emailService");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const normalizeEmail = (email) =>
  email ? email.trim().toLowerCase() : null;


/* ===================================================
   1️⃣ CREATE ORDER
=================================================== */

exports.createOrder = async (req, res) => {
  try {
    let { amount, email, phone } = req.body;

    amount = Number(amount);

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid amount required",
      });
    }

    email = normalizeEmail(email);

    if (!email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Email & phone required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      let tempUser = await TempUser.findOne({ email });

      if (!tempUser) {
        const plainPassword = generateRandomPassword(8);
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        await TempUser.create({
          firstname: email.split("@")[0],
          email,
          mobile: phone,
          password: hashedPassword,
          plain_password: plainPassword,
        });
      }
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


/* ===================================================
   2️⃣ VERIFY PAYMENT
=================================================== */

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

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
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
    console.error("VERIFY PAYMENT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};


/* ===================================================
   3️⃣ CREATE PURCHASE (MAIN LOGIC)
=================================================== */

exports.createPurchase = async (req, res) => {
  try {
    const {
      course_id,
      email,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      purchased_amount = 0,
      coupon_amount = 0,
    } = req.body;

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

    /* Verify Signature Again */
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    /* Prevent Duplicate Payment */
    const existingPayment = await CoursePurchase.findOne({
      payment_id: razorpay_payment_id,
    });

    if (existingPayment) {
      return res.status(200).json({
        success: true,
        message: "Payment already processed",
      });
    }

    /* Check Course */
    const course = await Course.findById(course_id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const normalizedEmail = normalizeEmail(email);

    let user = await User.findOne({ email: normalizedEmail });

    /* Convert Temp → Real */
    if (!user) {
      const tempUser = await TempUser.findOne({ email: normalizedEmail });

      if (!tempUser) {
        return res.status(404).json({
          success: false,
          message: "Temp user not found",
        });
      }

      user = await User.create({
        firstname: tempUser.firstname,
        lastname: tempUser.lastname,
        email: tempUser.email,
        mobile: tempUser.mobile,
        password: tempUser.password, // hashed
        role: "user",
        is_verified: true,
      });

      await sendLoginCredentials(
        user.email,
        tempUser.plain_password // send correct password
      );

      await TempUser.deleteOne({ _id: tempUser._id });
    }

    /* Prevent Duplicate Course */
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

    /* Create Purchase */
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