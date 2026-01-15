const axios = require("axios");
const FormData = require("form-data");
const Product = require("../models/productModel");
const path = require("path");
const fs = require("fs");
const { sendToSubscribers } = require("../utils/sendToSubscribers");  // 👈 ADD THIS

// --------------------------------------------------
// CREATE PRODUCT
// --------------------------------------------------
exports.createProduct = async (req, res) => {
  try {
    const {
      title,
      category_id,
      premium,
      price,
      discount_price,
      meta_keyword,
      short_description,
      description,
      learns,
      includes,
      status,
    } = req.body;

    //--------------------------------------
    // IMAGE UPLOAD TO IMGBB
    //--------------------------------------
    let imageUrl = null;

    if (req.files?.image_file) {
      const imgFile = req.files.image_file[0];
      const base64Image = imgFile.buffer.toString("base64");

      const formData = new FormData();
      formData.append("image", base64Image);

      const upload = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
        formData,
        { headers: formData.getHeaders() }
      );

      imageUrl = upload.data.data.url;
    }

    //--------------------------------------
    // PDF LOCAL SAVE
    //--------------------------------------
    let pdfPath = null;

    if (req.files?.pdf_file) {
      const pdfFile = req.files.pdf_file[0];
      pdfPath = `/uploads/pdf/${pdfFile.filename}`;
    }

    //--------------------------------------
    // PARSE INCLUDES JSON SAFELY
    //--------------------------------------
    let includesParsed = [];

    if (includes) {
      try {
        includesParsed = JSON.parse(includes);
      } catch (err) {
        return res.status(400).json({
          message: "Invalid JSON format in includes field",
        });
      }
    }

    //--------------------------------------
    // CREATE PRODUCT
    //--------------------------------------
    const newProduct = new Product({
      title,
      category_id,
      premium,
      price,
      discount_price,
      meta_keyword: meta_keyword ? meta_keyword.split(",") : [],
      short_description,
      description,
      learns: learns ? learns.split(",") : [],
      includes: includesParsed,
      status: status ?? true,
      image_file: imageUrl,
      pdf_file: pdfPath,
    });

    await newProduct.save();

    // ------------------------------------------------------
    // SEND EMAIL TO ALL SUBSCRIBERS ABOUT NEW PRODUCT
    // ------------------------------------------------------
    await sendToSubscribers({
      subject: "New Digital Product Added!",
      message: `
        A new digital product has been added on Maxify Academy.<br><br>
        <strong>${newProduct.title}</strong><br><br>

        <a href="${process.env.FRONTEND_URL}/product/${newProduct._id}"
           style="background:#003366;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none;">
           View Product
        </a>
      `
    });

    return res.status(201).json({
      message: "Product created successfully!",
      product: newProduct,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// --------------------------------------------------
// GET ALL PRODUCTS
// --------------------------------------------------
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category_id");

    res.json({
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// --------------------------------------------------
// GET SINGLE PRODUCT
// --------------------------------------------------
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category_id");

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// --------------------------------------------------
// UPDATE PRODUCT
// --------------------------------------------------
exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    let product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let imageUrl = product.image_file;
    let pdfPath = product.pdf_file;

    // Upload new image (if provided)
    if (req.files?.image_file) {
      const imgFile = req.files.image_file[0];
      const base64Image = imgFile.buffer.toString("base64");

      const formData = new FormData();
      formData.append("image", base64Image);

      const upload = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
        formData,
        { headers: formData.getHeaders() }
      );

      imageUrl = upload.data.data.url;
    }

    // Update PDF (if provided)
    if (req.files?.pdf_file) {
      const pdfFile = req.files.pdf_file[0];

      const newPdfPath = `/uploads/pdf/${pdfFile.filename}`;

      if (product.pdf_file) {
        const oldPath = path.join(__dirname, "..", product.pdf_file);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      pdfPath = newPdfPath;
    }

    // Parse includes JSON
    let includesParsed = product.includes;
    if (req.body.includes) {
      try {
        includesParsed = JSON.parse(req.body.includes);
      } catch (err) {
        return res.status(400).json({
          message: "Invalid JSON in includes field",
        });
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        ...req.body,
        meta_keyword: req.body.meta_keyword?.split(",") || product.meta_keyword,
        learns: req.body.learns?.split(",") || product.learns,
        includes: includesParsed,
        image_file: imageUrl,
        pdf_file: pdfPath,
      },
      { new: true }
    );

    res.json({
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Delete local PDF
    if (product.pdf_file) {
      const oldPath = path.join(__dirname, "..", product.pdf_file);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    await Product.findByIdAndDelete(id);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
