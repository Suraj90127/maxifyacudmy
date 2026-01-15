const express = require("express");
const upload = require("../middleware/upload");
const { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct } = require("../controller/productController");
const router = express.Router();
const uploadProduct = require("../middleware/uploadProduct");
const { authMiddleware,  } = require("../middleware/authMiddleware");


router.post("/create", uploadProduct, createProduct);
router.put("/update/:id", uploadProduct, updateProduct);
router.get("/all", getAllProducts);
router.get("/:id", getSingleProduct);
router.delete("/delete/:id", deleteProduct);
module.exports = router;
