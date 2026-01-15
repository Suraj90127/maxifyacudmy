const multer = require("multer");

// ============================
// IMAGE → MEMORY (IMGBB)
// ============================
const imageStorage = multer.memoryStorage();

// ============================
// PDF → DISK STORAGE
// ============================
const pdfStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/pdf");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// ============================
// COMBINED STORAGE ENGINE
// ============================
const storage = {
  _handleFile(req, file, cb) {
    if (file.fieldname === "image_file") {
      imageStorage._handleFile(req, file, cb);
    } else if (file.fieldname === "pdf_file") {
      pdfStorage._handleFile(req, file, cb);
    } else {
      cb(new Error("Unexpected field: " + file.fieldname));
    }
  },

  _removeFile(req, file, cb) {
    if (file.fieldname === "image_file") {
      imageStorage._removeFile(req, file, cb);
    } else if (file.fieldname === "pdf_file") {
      pdfStorage._removeFile(req, file, cb);
    } else {
      cb(null);
    }
  },
};

// ============================
// FINAL MULTER INSTANCE
// ============================
module.exports = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
}).fields([
  { name: "image_file", maxCount: 1 },
  { name: "pdf_file", maxCount: 1 },
]);
