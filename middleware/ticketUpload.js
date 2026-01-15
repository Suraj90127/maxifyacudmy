const multer = require("multer");
const path = require("path");

const allowed = [".jpg", ".jpeg", ".png", ".pdf", ".doc", ".docx"];

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowed.includes(ext)) {
      return cb(new Error("Invalid file type"), false);
    }
    cb(null, true);
  },
}).array("attachments", 5);

module.exports = upload;
