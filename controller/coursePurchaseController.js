const CoursePurchase = require("../models/coursePurchaseModel");
const User = require("../models/UserModel");
const Course = require("../models/Course");



exports.createPurchase = async (req, res) => {
  try {
    let {
      course_id,
      is_buy = true,
      purchased_amount = 0,
      coupon_amount = 0,
      email,
      razorpay_payment_id,
      razorpay_order_id,
    } = req.body;
    const user_id = req.user.id;

    if (!course_id) {
      return res.status(400).json({ message: "Course ID is required." });
    }

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User does not exist." });
    }

    const course = await Course.findById(course_id);
    if (!course) {
      return res.status(404).json({ message: "Course does not exist." });
    }

    // Check duplicate purchase
    const alreadyPurchased = await CoursePurchase.findOne({
      course_id,
      user_id,
    });

    if (alreadyPurchased) {
      return res
        .status(400)
        .json({ message: "You have already purchased this course." });
    }

    const purchase = await CoursePurchase.create({
      user_id,
      course_id,
      is_buy,
      enrolled: true,
      purchased_amount: Number(purchased_amount),
      coupon_amount: Number(coupon_amount),

      payment_gateway: "razorpay",
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      payment_status: "paid",
    });

    return res.status(200).json({
      message: "Course purchased successfully.",
      purchase,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create purchase.",
      error: error.message,
    });
  }
};

// ======================================================================
// GET ALL PURCHASES
// ======================================================================
exports.getAllPurchases = async (req, res) => {
  try {
    const purchases = await CoursePurchase.find()
      .populate("course_id")
      .populate("user_id")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "All purchases fetched",
      purchases,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching purchases",
      error: error.message,
    });
  }
};

// ======================================================================
// GET SINGLE PURCHASE
// ======================================================================
exports.getPurchase = async (req, res) => {
  try {
    const purchase = await CoursePurchase.findById(req.params.id)
      .populate("course_id")
      .populate("user_id");

    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    return res.status(200).json({
      message: "Purchase fetched successfully",
      purchase,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching purchase",
      error: error.message,
    });
  }
};

// ======================================================================
// UPDATE PURCHASE
// ======================================================================
exports.updatePurchase = async (req, res) => {
  try {
    const purchase = await CoursePurchase.findById(req.params.id);

    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    purchase.course_id = req.body.course_id || purchase.course_id;
    purchase.user_id = req.body.user_id || purchase.user_id;
    purchase.is_buy = req.body.is_buy ?? purchase.is_buy;
    purchase.enrolled = req.body.enrolled ?? purchase.enrolled;
    purchase.purchased_amount =
      req.body.purchased_amount ?? purchase.purchased_amount;
    purchase.coupon_amount = req.body.coupon_amount ?? purchase.coupon_amount;

    await purchase.save();

    return res.status(200).json({
      message: "Purchase updated successfully",
      purchase,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating purchase",
      error: error.message,
    });
  }
};

// ======================================================================
// DELETE PURCHASE
// ======================================================================
exports.deletePurchase = async (req, res) => {
  try {
    const purchase = await CoursePurchase.findByIdAndDelete(req.params.id);

    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    return res.status(200).json({
      message: "Purchase deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting purchase",
      error: error.message,
    });
  }
};

// ======================================================================
// GET PURCHASES BY USER (req.user.id)
// ======================================================================
exports.getPurchasesByUser = async (req, res) => {
  try {
    const user_id = req.user.id;

    if (!user_id) {
      return res.status(401).json({ message: "Unauthorized: User ID missing" });
    }

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const purchases = await CoursePurchase.find({ user_id })
      .populate("course_id")
      .populate("user_id")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "User purchases fetched successfully",
      purchases,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching user purchases",
      error: error.message,
    });
  }
};

// ======================================================================
// ENROLL COURSE CONTROLLER (NEW)
// ======================================================================
exports.enrollCourse = async (req, res) => {
  try {
    const { course_id } = req.body;
    const user_id = req.user.id;

    // Check User
    const user = await User.findById(user_id);
    if (!user)
      return res.status(404).json({ message: "User does not exist" });

    // Check Course
    const course = await Course.findById(course_id);
    if (!course)
      return res.status(404).json({ message: "Course does not exist" });

    // Find purchase
    let purchase = await CoursePurchase.findOne({ course_id, user_id });

    /* ================= FREE COURSE ================= */
    if (!purchase && Number(course.price) === 0) {
      purchase = await CoursePurchase.create({
        course_id,
        user_id,
        is_buy: false,          // 🔥 IMPORTANT
        enrolled: true,         // 🔥 Direct enroll
        purchased_amount: 0,
        coupon_amount: 0,
        // ❌ payment_id NOT PRESENT
      });

      return res.status(200).json({
        message: "You have successfully enrolled in this free course",
        purchase,
      });
    }

    /* ================= PAID COURSE ================= */
    if (!purchase) {
      return res.status(400).json({
        message: "You must purchase this course before enrolling",
      });
    }

    if (purchase.enrolled === true) {
      return res.status(400).json({
        message: "You are already enrolled in this course",
      });
    }

    purchase.enrolled = true;
    await purchase.save();

    return res.status(200).json({
      message: "You have successfully enrolled in this course",
      purchase,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error enrolling user",
      error: error.message,
    });
  }
};