const Withdrawal = require("../models/Withdrawal");
const User = require("../models/UserModel"); // <-- Import User model
const { decrypt } = require("../utils/encryption");

// ----------------------------------------------------
// CREATE WITHDRAWAL REQUEST
// ----------------------------------------------------
exports.createWithdrawal = async (req, res) => {
  try {
    const { 
      account_name, 
      account_number, 
      bank_name, 
      ifsc_code, 
      withdraw_amount 
    } = req.body;

    // Convert amount to number
    const amount = Number(withdraw_amount);

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid withdrawal amount." });
    }

    // ----------------------------------------------------
    // 1️⃣ Fetch user wallet balance
    // ----------------------------------------------------
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // ----------------------------------------------------
    // 2️⃣ Check if user has enough balance
    // ----------------------------------------------------
    if (user.credit < amount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient wallet balance."
      });
    }

    // ----------------------------------------------------
    // 3️⃣ Deduct balance from user
    // ----------------------------------------------------
    user.credit -= amount;
    await user.save();

    // ----------------------------------------------------
    // 4️⃣ Create withdrawal request
    // ----------------------------------------------------
    const withdrawal = await Withdrawal.create({
      user_id: req.user.id,
      account_name,
      account_number,
      bank_name,
      ifsc_code,
      withdraw_amount: amount,
    });

    // ----------------------------------------------------
    // 5️⃣ Response
    // ----------------------------------------------------
    res.status(201).json({
      success: true,
      message: "Withdrawal request submitted successfully.",
      data: withdrawal,
      new_balance: user.wallet_balance
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ----------------------------------------------------
// USER - GET MY WITHDRAWALS
// ----------------------------------------------------
exports.getMyWithdrawals = async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find({ user_id: req.user.id })
      .sort({ createdAt: -1 })
      .select("-account_number"); // never expose encrypted number to user

    res.status(200).json({ success: true, data: withdrawals });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ----------------------------------------------------
// ADMIN - GET ALL WITHDRAWALS
// ----------------------------------------------------
exports.getAllWithdrawals = async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find()
      .populate("user_id", "name email")
      .sort({ createdAt: -1 })
      .select("-account_number");

    res.status(200).json({ success: true, data: withdrawals });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ----------------------------------------------------
// ADMIN - UPDATE STATUS
// ----------------------------------------------------
exports.updateWithdrawalStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const withdrawal = await Withdrawal.findById(req.params.id);

    if (!withdrawal) {
      return res.status(404).json({ success: false, message: "Withdrawal not found" });
    }

    // Already processed? Prevent double refund or double completion
    if (withdrawal.status === "completed" || withdrawal.status === "rejected") {
      return res.status(400).json({
        success: false,
        message: "This withdrawal is already processed."
      });
    }

    // Update status
    withdrawal.status = status;

    if (status === "completed" || status === "failed" || status === "rejected") {
      withdrawal.processed_at = new Date();
    }

    // ----------------------------------------------------
    // 1️⃣ REFUND WALLET IF REJECTED
    // ----------------------------------------------------
    if (status === "rejected") {
      const user = await User.findById(withdrawal.user_id);

      if (!user) {
        return res.status(404).json({ success: false, message: "User not found for refund." });
      }

      // add money back
      user.wallet_balance += withdrawal.withdraw_amount;
      await user.save();
    }

    await withdrawal.save();

    res.json({
      success: true,
      message: "Status updated successfully",
      data: withdrawal
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ----------------------------------------------------
// ADMIN - GET FULL DECRYPTED ACCOUNT NUMBER
// ----------------------------------------------------
exports.getFullAccountNumber = async (req, res) => {
  try {
    const withdrawal = await Withdrawal.findById(req.params.id).select("+account_number");

    if (!withdrawal) {
      return res.status(404).json({ success: false, message: "Withdrawal not found" });
    }

    const fullAccount = decrypt(withdrawal.account_number);

    res.json({
      success: true,
      full_account_number: fullAccount,
      last4: withdrawal.account_last4,
      bank_name: withdrawal.bank_name,
      account_name: withdrawal.account_name
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
