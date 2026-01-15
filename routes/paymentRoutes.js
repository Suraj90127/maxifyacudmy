const express = require("express");
const { createOrder, verifyPayment } = require("../controller/paymentController");
const { saveFailedPayment } = require("../controller/failPaymentController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create-order",authMiddleware,createOrder);
router.post("/verify-payment", verifyPayment);
router.post("/failure", saveFailedPayment);


module.exports = router;
