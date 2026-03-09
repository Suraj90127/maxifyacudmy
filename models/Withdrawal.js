const mongoose = require("mongoose");
const { encrypt } = require("../utils/encryption");

const WithdrawalSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true
    },

    payment_method: {
      type: String,
      enum: ["bank", "upi"],
      required: true
    },

    account_name: {
      type: String,
      trim: true,
      required: function () {
        return this.payment_method === "bank";
      },
    },

    account_number: {
      type: String,
      select: false,
      required: function () {
        return this.payment_method === "bank";
      },
    },

    account_last4: {
      type: String,
      default: "",
      match: [/^\d{4}$/, "Last 4 digits required"],
    },

    bank_name: {
      type: String,
      trim: true,
      required: function () {
        return this.payment_method === "bank";
      },
    },

    ifsc_code: {
      type: String,
      uppercase: true,
      trim: true,
      match: [/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code"],
      required: function () {
        return this.payment_method === "bank";
      },
    },

    withdraw_amount: {
      type: Number,
      min: 1,
      required: true
    },

    // ---------------- UPI DETAILS ----------------

    upi_id: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^[\w.-]+@[\w.-]+$/, "Invalid UPI ID"],
      required: function () {
        return this.payment_method === "upi";
      },
    },

    upi_name: {
      type: String,
      trim: true,
      required: function () {
        return this.payment_method === "upi";
      },
    },
    
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
      index: true,
    },

    requested_at: {
      type: Date,
      default: Date.now,
    },

    processed_at: Date,
  },
  { timestamps: true }
);

// Auto encrypt and save last4
WithdrawalSchema.pre("save", function (next) {
  if (this.isModified("account_number")) {
    const full = this.account_number.toString();

    this.account_last4 = full.slice(-4);
    this.account_number = encrypt(full);
  }

});

module.exports = mongoose.model("Withdrawal", WithdrawalSchema);
