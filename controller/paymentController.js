const Razorpay = require("razorpay");
const crypto = require("crypto");

// Create Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ----------------------------
// CREATE ORDER
// ----------------------------
exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, 
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ----------------------------
// VERIFY PAYMENT
// ----------------------------
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign === razorpay_signature) {
      res.json({
        success: true,
        message: "Payment Verified Successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid Signature",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* ======================
   CREATE PURCHASE
====================== */
// exports.createPurchase = async (req, res) => {
//   try {
//     let {
//       course_id,
//       is_buy = true,
//       purchased_amount = 0,
//       coupon_amount = 0,
//       email,
//       razorpay_payment_id,
//       razorpay_order_id,
//     } = req.body;

//     let user_id;

//     /* =====================
//        USER IDENTIFICATION
//     ===================== */
//     if (req.user?.id) {
//       user_id = req.user.id;
//     } else if (email) {
//       const user = await User.findOne({ email: normalizeEmail(email) });
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
//       user_id = user._id;
//     } else {
//       return res.status(400).json({
//         message: "User authentication or email is required",
//       });
//     }

//     /* =====================
//        VALIDATIONS
//     ===================== */
//     if (!course_id) {
//       return res.status(400).json({ message: "Course ID is required" });
//     }

//     const course = await Course.findById(course_id);
//     if (!course) {
//       return res.status(404).json({ message: "Course does not exist" });
//     }

//     if (!razorpay_payment_id || !razorpay_order_id) {
//       return res.status(400).json({
//         message: "Payment not verified",
//       });
//     }

//     /* =====================
//        DUPLICATE CHECK
//     ===================== */
//     const alreadyPurchased = await CoursePurchase.findOne({
//       user_id,
//       course_id,
//     });

//     if (alreadyPurchased) {
//       return res.status(400).json({
//         message: "You have already purchased this course",
//       });
//     }

//     /* =====================
//        CREATE PURCHASE
//     ===================== */
//     const purchase = await CoursePurchase.create({
//       user_id,
//       course_id,
//       is_buy,
//       enrolled: true,
//       purchased_amount: Number(purchased_amount),
//       coupon_amount: Number(coupon_amount),

//       payment_gateway: "razorpay",
//       payment_id: razorpay_payment_id,
//       order_id: razorpay_order_id,
//       payment_status: "paid",
//     });

//     /* =====================
//        SEND EMAIL AFTER SUCCESS
//     ===================== */
//     const user = await User.findById(user_id);

//     if (user?.temporary_password) {
//       await sendLoginCredentials(
//         user.email,
//         user.temporary_password
//       );

//       user.temporary_password = null;
//       await user.save();
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Course purchased successfully",
//       purchase,
//     });

//   } catch (error) {
//     console.error("❌ CREATE PURCHASE ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to create purchase",
//       error: error.message,
//     });
//   }
// };
