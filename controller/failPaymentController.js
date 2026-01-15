const PaymentFailure = require("../models/PaymentFailure");

exports.saveFailedPayment = async (req, res) => {
  try {
    const {
      course_id,
      email,
      mobile,
      amount,
      order_id,
      reason,
      error,
      status,
    } = req.body;

    if (!course_id || !email || !mobile || !order_id) {
      return res.status(400).json({
        success: false,
        message: "course_id, email, mobile and order_id are required",
      });
    }

    const failedPayment = await PaymentFailure.findOneAndUpdate(
      { razorpay_order_id: order_id },
      {
        course_id,
        email,
        mobile,
        amount,
        razorpay_order_id: order_id,

        error_code: error?.code || null,
        error_description:
          error?.description || reason || "Payment failed",
        error_source: error?.source || null,
        error_step: error?.step || null,
        error_reason: error?.reason || reason || null,

        status:
          status ||
          (reason?.toLowerCase().includes("cancel")
            ? "cancelled"
            : "failed"),
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Payment failure saved",
      failedPayment,
    });
  } catch (err) {
    console.error("SAVE FAILED PAYMENT ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to save payment failure",
    });
  }
};

