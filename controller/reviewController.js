const Review = require("../models/reviewModel");
const User = require("../models/UserModel");
const Course = require("../models/Course");

// ---------------- CREATE REVIEW ----------------
exports.createReview = async (req, res) => {
  try {
    const { user_id, course_id, rating, review, is_admin_review, reviewer_name } = req.body;

    const adminReview = is_admin_review === true || is_admin_review === "true";

    const course = await Course.findById(course_id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    let finalReviewerName;

    if (!adminReview) {
      if (!user_id) {
        return res.status(400).json({ message: "user_id is required for user review" });
      }

      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }


      // Auto reviewer name
      finalReviewerName = user.firstname;

      // Prevent duplicate review
      // const already = await Review.findOne({ user_id, course_id });
      // if (already) {
      //   return res.status(400).json({ message: "You have already reviewed this course" });
      // }
    }

    // ----------- ADMIN REVIEW -----------
    if (adminReview) {
      if (!reviewer_name) {
        return res.status(400).json({ message: "Admin must provide reviewer_name" });
      }
      finalReviewerName = reviewer_name;
    }

    // ----------- CREATE -----------
    const newReview = await Review.create({
      user_id: adminReview ? null : user_id,
      course_id,
      rating,
      review,
      is_admin_review: adminReview,
      reviewer_name: finalReviewerName,
    });

    return res.status(200).json({
      message: "Review added successfully",
      review: newReview,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create review",
      error: error.message,
    });
  }
};


// ---------------- GET ALL REVIEWS ----------------
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user_id", "name email")
      .populate("course_id", "title");

    return res.status(200).json({ reviews });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};

// ---------------- GET SINGLE REVIEW ----------------
exports.getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate("user_id", "firstname" ," email")
      .populate("course_id", "title");

    if (!review) return res.status(404).json({ message: "Review not found" });

    return res.status(200).json({ review });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch review",
      error: error.message,
    });
  }
};

// ---------------- UPDATE REVIEW ----------------
exports.updateReview = async (req, res) => {
  try {
    const updated = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Review not found" });
    }

    return res.status(200).json({
      message: "Review updated successfully",
      review: updated,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update review",
      error: error.message,
    });
  }
};

// ---------------- DELETE REVIEW ----------------
exports.deleteReview = async (req, res) => {
  try {
    const deleted = await Review.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Review not found" });
    }

    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete review",
      error: error.message,
    });
  }
};

exports.getCourseReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ course_id: req.params.id });

    return res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ message: "Failed", error: error.message });
  }
};


exports.getCourseReviewData = async (req, res) => {
  try {
    const courses = await Course.find({}, "title");

    const reviewStats = await Review.aggregate([
      {
        $group: {
          _id: "$course_id",
          review_count: { $sum: 1 },
          average_rating: { $avg: "$rating" },
          reviews: {
            $push: {
              user_id: "$user_id",
              reviewer_name: "$reviewer_name",
              rating: "$rating",
              review: "$review",
              is_admin_review: "$is_admin_review",
              createdAt: "$createdAt"
            }
          }
        }
      }
    ]);

    const statsMap = {};
    reviewStats.forEach((item) => {
      statsMap[item._id.toString()] = {
        review_count: item.review_count,
        average_rating: Number(item.average_rating?.toFixed(1)) || 0,
        reviews: item.reviews
      };
    });

    // 🔥 FIX: reviewer_name fallback → user.firstname
    for (const key in statsMap) {
      const reviewList = statsMap[key].reviews;

      for (let i = 0; i < reviewList.length; i++) {
        const r = reviewList[i];

        // If reviewer_name missing: use User.firstname
        if (!r.reviewer_name && r.user_id) {

          // Fetch user firstname only
          const user = await User.findById(r.user_id, "firstname");

          if (user && user.firstname) {
            r.reviewer_name = user.firstname;
          } else {
            r.reviewer_name = "Unknown User";
          }
        }

        // Still no name? (Neither reviewer_name nor user.firstname)
        if (!r.reviewer_name) {
          r.reviewer_name = "Unknown User";
        }
      }
    }

    const finalResponse = courses.map((course) => {
      const stat = statsMap[course._id.toString()] || {
        review_count: 0,
        average_rating: 0,
        reviews: []
      };

      return {
        course_id: course._id,
        course_title: course.title,
        review_count: stat.review_count,
        average_rating: stat.average_rating,
        reviews: stat.reviews
      };
    });

    return res.status(200).json({
      success: true,
      data: finalResponse
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};