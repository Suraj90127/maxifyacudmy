const mongoose = require("mongoose");

const coursePurchaseSchema = new mongoose.Schema(
  {
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    is_buy: {
      type: Boolean,
      default: false, // 🔥 safer default
    },

    enrolled: {
      type: Boolean,
      default: true,
    },

    purchased_amount: {
      type: Number,
      required: true,
    },

    coupon_amount: {
      type: Number,
      default: 0,
    },

    payment_gateway: {
      type: String,
      enum: ["razorpay"],
      default: "razorpay",
    },

    payment_id: {
      type: String,
      unique: true,
      sparse: true, // ⭐
    },

    order_id: {
      type: String,
      unique: true,
      sparse: true, // ⭐
    },

    payment_status: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded", "free"],
      default: "free",
    },
  },
  { timestamps: true }
);

/* 🔒 One user – one course */
coursePurchaseSchema.index(
  { user_id: 1, course_id: 1 },
  { unique: true }
);

module.exports = mongoose.model("CoursePurchase", coursePurchaseSchema);
