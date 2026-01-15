const mongoose = require("mongoose");

const paymentFailureSchema = new mongoose.Schema(
  {
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    mobile: {
      type: String,
      default: null, // 🔥 OPTIONAL
    },

    amount: {
      type: Number,
      default: 0, // 🔥 ADD THIS
    },

    razorpay_order_id: {
      type: String,
      required: true,
      index: true, // 🔥 IMPORTANT
    },

    error_code: String,
    error_description: String,
    error_source: String,
    error_step: String,
    error_reason: String,

    status: {
      type: String,
      enum: ["failed", "cancelled"],
      default: "failed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PaymentFailure", paymentFailureSchema);
