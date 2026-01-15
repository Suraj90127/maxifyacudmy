const express = require("express");
const router = express.Router();

const {
  createOrder,
  verifyPayment,
  createPurchase,
} = require("../controller/amountcontroller");

const { authMiddleware } = require("../middleware/authMiddleware");


router.post(
  "/create-order",
  createOrder
);

router.post(
  "/verify-payment",
  verifyPayment
);


router.post(
  "/create-purchase",
  authMiddleware,
  createPurchase
);

module.exports = router;
