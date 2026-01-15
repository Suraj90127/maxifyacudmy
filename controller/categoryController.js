const axios = require("axios");
const FormData = require("form-data");
const Category = require("../models/Category");
const slugify = require("slugify");
const Course = require("../models/Course"); 


exports.createCategory = async (req, res) => {
  try {

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Convert buffer to base64
    const base64Image = req.file.buffer.toString("base64");

    const formData = new FormData();
    formData.append("image", base64Image);

    const upload = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      formData,
      { headers: formData.getHeaders() }
    );

    const imageUrl = upload.data.data.url;

    // ---- Create Slug HERE ----
    const slug = slugify(name, { lower: true, strict: true });

    // ---- Save to DB ----
    const category = await Category.create({
      name,
      slug,
      image: imageUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });

  } catch (error) {
    console.log(error.response?.data || error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ======================= GET ALL CATEGORIES =======================
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: "courses",            // course collection name
          localField: "_id",          // Category _id
          foreignField: "category_id", // mapping with Course.category_id
          as: "courses"
        }
      },
      {
        $addFields: {
          totalCourses: { $size: "$courses" }
        }
      },
      {
        $sort: { createdAt: -1 }
      }
    ]);

    return res.status(200).json({
      success: true,
      total: categories.length,
      categories
    });

  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};




// ======================= GET CATEGORY BY SLUG =======================
exports.getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await Category.findOne({ slug });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


// ======================= GET CATEGORY BY ID =======================
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


// ======================= UPDATE CATEGORY =======================
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, imageBase64 } = req.body;

    let category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    let imageUrl = category.image;

    // ---------- If new image uploaded → send to ImgBB ----------
    if (imageBase64) {
      const upload = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
        { image: imageBase64 }
      );

      imageUrl = upload.data.data.url;
    }

    // Update fields
    if (name) category.name = name;
    category.image = imageUrl;

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log(error.response?.data || error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// ======================= DELETE CATEGORY =======================
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
// ======================= GET COURSES BY CATEGORY SLUG =======================
exports.getCoursesByCategorySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // 1. Find category
    const category = await Category.findOne({ slug });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // 2. Fetch courses linked to this category
    const courses = await Course.find({ category: category._id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      category: category.name,
      total: courses.length,
      courses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// ======================= GET COURSES BY CATEGORY ID =======================
exports.getCoursesByCategoryId = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Validate category exists
    const category = await Category.findById(id).lean();
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // 2. Fetch courses from that category
    const courses = await Course.find({ category_id: id })
      .sort({ createdAt: -1 })
      .lean();

    // 3. Response
    return res.status(200).json({
      success: true,
      category_name: category.name,
      category_id: id,
      total_courses: courses.length,
      courses,
    });

  } catch (error) {
    console.error("Error getting courses by category:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


