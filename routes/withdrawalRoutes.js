const express = require("express");
const router = express.Router();



const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");
const { getMyWithdrawals, createWithdrawal, getAllWithdrawals, updateWithdrawalStatus, getFullAccountNumber } = require("../controller/withdrawalController");

// User requests withdrawal
router.post("/create", authMiddleware, createWithdrawal);

// User sees his withdrawals
router.get("/my", authMiddleware, getMyWithdrawals);

// Admin: all withdrawals
router.get("/admin/all", authMiddleware,  getAllWithdrawals);

// Admin: update status
router.put("/admin/update/:id", adminMiddleware,  updateWithdrawalStatus);

// Admin: decrypt full account number
router.get("/admin/account/:id", adminMiddleware,  getFullAccountNumber);

module.exports = router;
