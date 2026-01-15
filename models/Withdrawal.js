const mongoose = require("mongoose");
const { encrypt } = require("../utils/encryption");

const WithdrawalSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    account_name: {
      type: String,
      required: true,
      trim: true,
    },

    account_number: {
      type: String,
      required: true,
      select: false, // hidden by default
    },

    // AUTO-GENERATED
    account_last4: {
      type: String,
      default: "",
      match: [/^\d{4}$/, "Last 4 digits required"],
    },

    bank_name: {
      type: String,
      required: true,
      trim: true,
    },

    ifsc_code: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      match: [/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code"],
    },

    withdraw_amount: {
      type: Number,
      required: true,
      min: 1,
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
