const express = require("express");
const router = express.Router();
const { saveProgress, getCourseProgress } = require("../controller/courseProgressController");
const { authMiddleware } = require("../middleware/authMiddleware");



router.put("/save", authMiddleware, saveProgress);

router.get("/course/:courseId", authMiddleware, getCourseProgress);

module.exports = router;
