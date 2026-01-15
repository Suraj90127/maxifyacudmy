const express = require("express");
const upload = require("../middleware/upload");
const { createCourse, getAllCourses, getCourse, updateCourse, deleteCourse, getCourseContentByCourseId, getCourseBySlug } = require("../controller/courseController");
const router = express.Router();

router.post("/create-course", upload.single("image"), createCourse);


router.get("/all", getAllCourses);

router.get("/:id", getCourse);

router.put("/update/:id", upload.single("image"), updateCourse);

// DELETE
router.delete("/delete/:id", deleteCourse);
router.get("/cour/:course_id", getCourseContentByCourseId);

router.get("/getcourse/:slug", getCourseBySlug);




module.exports = router;
