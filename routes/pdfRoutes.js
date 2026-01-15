const express = require("express");
const path = require("path");

// Both Models
const CourseContent = require("../models/CourseContent");
const Product = require("../models/productModel");

const router = express.Router();

// SECURE PDF HANDLER for both Course & Product
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check in CourseContent first
    let pdfItem = await CourseContent.findById(id);

    // If not found, check in Product
    if (!pdfItem) {
      pdfItem = await Product.findById(id);
    }

    // If still not found → Invalid ID
    if (!pdfItem) {
      return res.status(404).json({ message: "Record not found" });
    }

    // Validate PDF path exists
    if (!pdfItem.pdf_path) {
      return res.status(404).json({ message: "PDF not found in this record" });
    }

    // Build correct file path
    const fileLocation = path.join(__dirname, "..", pdfItem.pdf_path);

    return res.sendFile(fileLocation);
  } catch (error) {
    return res.status(500).json({
      message: "Error loading PDF",
      error: error.message,
    });
  }
});

module.exports = router;
