const Course = require("../models/Course");
const axios = require("axios");
const FormData = require("form-data");
const CourseContent = require("../models/CourseContent");
const crypto = require("crypto");
const Review = require("../models/reviewModel");

const { sendToSubscribers } = require("../utils/sendToSubscribers"); 


exports.createCourse = async (req, res) => {

  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const base64Image = req.file.buffer.toString("base64");

    const formData = new FormData();
    formData.append("image", base64Image);

    const upload = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      formData,
      {
        headers: formData.getHeaders(),
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    const imageUrl = upload.data.data.url;

    // ---------- META KEYWORDS ----------
    const metaKeyword = Array.isArray(req.body.meta_keyword)
      ? req.body.meta_keyword
      : req.body.meta_keyword
      ? req.body.meta_keyword.split(",")
      : [];

    // ---------- LEARNS ----------
    const learns = Array.isArray(req.body.learns)
      ? req.body.learns
      : req.body.learns
      ? [req.body.learns]
      : [];

    // ---------- INCLUDES OBJECT ARRAY ----------
    let includes = [];

    if (req.body.includes) {
      const icons = req.body.includes.icon || [];
      const texts = req.body.includes.text || [];

      for (let i = 0; i < icons.length; i++) {
        includes.push({
          icon: icons[i],
          text: texts[i],
        });
      }
    }

    // ---------- CREATE COURSE ----------
    const course = await Course.create({
      image: imageUrl,
      title: req.body.title,
      category_id: req.body.category_id,
      premium: req.body.premium === "1",
      price: req.body.price || 0,
      discount_price: req.body.discount_price || 0,
      meta_keyword: metaKeyword,
      short_description: req.body.short_description,
      description: req.body.description,
      language: req.body.language,
      learns: learns,
      includes: includes,
      status: true,
    });

    await sendToSubscribers({
      subject: "New Course Launched!",
      message: `
        A new course has been launched on Maxify Academy.<br><br>
        <strong>${course.title}</strong><br><br>
        
        <a href="${process.env.FRONTEND_URL}/courses"
           style="background:#003366;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none;">
           View Course
        </a>
      `
    });

    return res.status(200).json({
      message: "Course created successfully",
      course,
    });

  } catch (error) {
    console.error("Course creation error:", error.response?.data || error.message);

    return res.status(500).json({
      message: "Course creation failed",
      error: error.response?.data || error.message,
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // ---------- UPLOAD NEW IMAGE IF PROVIDED ----------
    let imageUrl = course.image; // keep old image

    if (req.file) {
      const base64Image = req.file.buffer.toString("base64");

      const formData = new FormData();
      formData.append("image", base64Image);

      const upload = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
        formData,
        {
          headers: formData.getHeaders(),
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        }
      );

      imageUrl = upload.data.data.url;
    }

    // ---------- META KEYWORDS ----------
    const metaKeyword = Array.isArray(req.body.meta_keyword)
      ? req.body.meta_keyword
      : req.body.meta_keyword
      ? req.body.meta_keyword.split(",")
      : [];

    // ---------- LEARNS ----------
    const learns = Array.isArray(req.body.learns)
      ? req.body.learns
      : req.body.learns
      ? [req.body.learns]
      : [];

    // ---------- INCLUDES ----------
    let includes = [];
    if (req.body.includes) {
      const icons = req.body.includes.icon || [];
      const texts = req.body.includes.text || [];

      for (let i = 0; i < icons.length; i++) {
        includes.push({
          icon: icons[i],
          text: texts[i],
        });
      }
    }

    // ---------- UPDATE DB ----------
    course.image = imageUrl;
    course.title = req.body.title;
    course.category_id = req.body.category_id;
    course.premium = req.body.premium === "1";
    course.price = req.body.price;
    course.discount_price = req.body.discount_price;
    course.meta_keyword = metaKeyword;
    course.short_description = req.body.short_description;
    course.description = req.body.description;
    course.language = req.body.language;
    course.learns = learns;
    course.includes = includes;

    await course.save();

    return res.status(200).json({
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    console.error("Update course error:", error.response?.data || error);
    return res.status(500).json({
      message: "Course update failed",
      error: error.response?.data || error.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Delete course error:", error);
    return res.status(500).json({
      message: "Failed to delete course",
      error: error.message,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({
      message: "Course fetched successfully",
      course,
    });
  } catch (error) {
    console.error("Get course error:", error);
    return res.status(500).json({
      message: "Failed to fetch course",
      error: error.message,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    // --- REVIEW AGGREGATION (COUNTS + AVG RATING) ---
    const reviewStats = await Review.aggregate([
      {
        $group: {
          _id: "$course_id",            // Review schema ka course_id
          review_count: { $sum: 1 },    // total reviews
          average_rating: { $avg: "$rating" } // <-- Yehi se avg rating nikal rahi hai
        }
      }
    ]);

    // Map ready for quick lookup
    const statsMap = {};
    reviewStats.forEach((item) => {
      statsMap[item._id.toString()] = {
        review_count: item.review_count,
        average_rating: item.average_rating
      };
    });

    // Merge stats with courses
    const finalCourses = courses.map((course) => {
      const stat = statsMap[course._id.toString()] || {
        review_count: 0,
        average_rating: 0,
      };

      return {
        ...course.toObject(),
        review_count: stat.review_count,
        average_rating: Number(stat.average_rating?.toFixed(1)) || 0
      };
    });

    res.status(200).json({
      success: true,
      courses: finalCourses,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCourseContentByCourseId = async (req, res) => {
  try {
    const { course_id } = req.params;

    if (!course_id) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    const contents = await CourseContent.find({ course_id }).sort({
      createdAt: 1,
    });

    if (!contents || contents.length === 0) {
      return res.status(200).json({
        message: "No course content available for this course.",
        contents: [],   // important → empty array return karo
      });
    }

    return res.status(200).json({
      message: "Course content fetched successfully",
      contents,
    });
  } catch (error) {
    console.error("Get Course Content Error:", error);
    return res.status(500).json({
      message: "Failed to fetch course content",
      error: error.message,
    });
  }
};


exports.getCourseBySlug = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug })
      .populate("category_id", "name");

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};