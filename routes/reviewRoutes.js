const express = require("express");
const { createReview, getAllReviews, getReview, updateReview, deleteReview, getCourseReviews, getAllCourses, getCourseRatings, getCourseReviewData } = require("../controller/reviewController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();


router.post("/create", createReview);
router.get("/allreview", getCourseReviewData);
// router.get("/all", getAllReviews);
router.get("/:id", getReview);

router.get('/course/:id',getCourseReviews)
router.put("/update/:id", updateReview);
router.delete("/delete/:id", deleteReview);


module.exports = router;
