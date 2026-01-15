const express = require("express");
const {
  
  getAllPurchases,
  getPurchase,
  updatePurchase,
  deletePurchase,
  getPurchasesByUser,
  enrollCourse,
  createPurchase,
} = require("../controller/coursePurchaseController");

const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/create",authMiddleware, createPurchase);

router.get("/", getAllPurchases);

router.get("/user/my-purchases", authMiddleware, getPurchasesByUser);


router.post("/enroll", authMiddleware, enrollCourse);


router.put("/update/:id", updatePurchase);
router.delete("/delete/:id", deletePurchase);


router.get("/:id", getPurchase);

module.exports = router;
