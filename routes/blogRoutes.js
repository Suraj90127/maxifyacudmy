// routes/blogRoutes.js
const express = require("express");
const upload = require("../middleware/upload");
const { createBlog, getBlogs, getSingleBlog, updateBlog, deleteBlog } = require("../controller/blogController");
const router = express.Router();

// router.post("/create", upload.single("image"), createBlog);
router.get("/blogs", getBlogs);
router.get("/getsingleblog/:id", getSingleBlog);
// router.put("/update/:id", upload.single("image"), updateBlog);
// router.delete("/delete/:id", deleteBlog);

module.exports = router;
