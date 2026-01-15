// controllers/blogController.js
const Blog = require("../models/Blog");
const axios = require("axios");
const FormData = require("form-data");
const { sendToSubscribers } = require("../utils/sendToSubscribers");

// Upload to ImgBB Function
const uploadToImgBB = async (fileBuffer) => {
  const base64Image = fileBuffer.toString("base64");

  const formData = new FormData();
  formData.append("image", base64Image);

  const upload = await axios.post(
    `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
    formData,
    { headers: formData.getHeaders() }
  );

  return upload.data.data.url;
};

// ================================
// CREATE BLOG + SEND EMAIL TO SUBSCRIBERS
// ================================
exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const imageUrl = await uploadToImgBB(req.file.buffer);

    const blog = await Blog.create({
      title,
      content,
      image: imageUrl,
    });

    // -------------------------------
    // SEND EMAIL TO ALL SUBSCRIBERS
    // -------------------------------
    await sendToSubscribers({
      subject: "New Blog Published!",
      message: `
        A new blog has been published on Maxify Academy.<br><br>
        <strong>${title}</strong><br><br>
        <a href="${process.env.FRONTEND_URL}/blog/${blog._id}" 
           style="background:#003366;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none;">
           Read Now
        </a>
      `
    });

    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    res.status(500).json({ message: "Error creating blog", error });
  }
};


// ================================
// GET ALL BLOGS
// ================================
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
};

// ================================
// GET SINGLE BLOG
// ================================
exports.getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error });
  }
};

// ================================
// UPDATE BLOG (OPTIONAL IMAGE)
// ================================
exports.updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    let updatedData = { title, content };

    if (req.file) {
      const imageUrl = await uploadToImgBB(req.file.buffer);
      updatedData.image = imageUrl;
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json({ message: "Blog updated successfully!", blog });
  } catch (error) {
    res.status(500).json({ message: "Error updating blog", error });
  }
};

// ================================
// DELETE BLOG
// ================================
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json({ message: "Blog deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error });
  }
};
