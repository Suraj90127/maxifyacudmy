const multer = require("multer");
const fs = require("fs");

// VIDEO & IMAGES → MEMORY STORAGE
const memoryStorage = multer.memoryStorage();

// PDF → DISK STORAGE
const pdfStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/pdfs");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// COMBINED STORAGE
const storage = {
  _handleFile(req, file, cb) {
    if (file.fieldname === "video_pdfs") {
      pdfStorage._handleFile(req, file, cb);
    } else {
      memoryStorage._handleFile(req, file, cb);
    }
  },

  _removeFile(req, file, cb) {
    if (file.fieldname === "video_pdfs") {
      fs.unlink(file.path, cb);
    } else {
      memoryStorage._removeFile(req, file, cb);
    }
  },
};

module.exports = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 1024 }, // 1GB max
}).fields([
  { name: "videos", maxCount: 50 },
  { name: "video_images", maxCount: 50 },
  { name: "video_pdfs", maxCount: 50 },
]);
