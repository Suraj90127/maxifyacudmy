const express = require("express");
const router = express.Router();

const {
  createCourseContent,
  getAllCourseContent,
  getSingleCourseContent,
  deleteCourseContent,
  updateCourseContent,
  downloadPDF,
  downloadVideoPdf,
} = require("../controller/courseContentController");
const uploadCourseContent = require("../middleware/uploadCourseContent");

router.post("/create", uploadCourseContent, createCourseContent);
router.get("/all", getAllCourseContent);
router.get("/single/:id", getSingleCourseContent);
router.delete("/delete/:id", deleteCourseContent);
router.put("/update/:id", uploadCourseContent, updateCourseContent);
router.get(
  "/download-pdf/:contentId/:videoId",
  downloadVideoPdf
);


module.exports = router;
