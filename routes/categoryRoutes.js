const express = require("express");
const { createCategory, getAllCategories, getCategoryBySlug, updateCategory, deleteCategory, getCategoryById, getCoursesByCategorySlug, getCoursesByCategoryId } = require("../controller/categoryController");
const upload = require("../middleware/upload");
const router = express.Router();


router.post("/create",upload.single("image"), createCategory);
router.get("/all", getAllCategories);
router.get("/slug/:slug", getCategoryBySlug);
router.get("/:id", getCategoryById);
router.put("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);
router.get("/:id/courses", getCoursesByCategoryId);
router.get("/:slug/courses", getCoursesByCategorySlug);


module.exports = router;
