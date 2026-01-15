const multer = require("multer");
const path = require("path");
const fs = require("fs");

const videoDir = "uploads/videos";
const pdfDir = "uploads/pdfs";

if (!fs.existsSync(videoDir)) fs.mkdirSync(videoDir, { recursive: true });
if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "videos") cb(null, videoDir);
    else if (file.fieldname === "video_pdfs") cb(null, pdfDir);
    else cb(new Error("Invalid file field"), null);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = Date.now() + "-" + Math.round(Math.random() * 1e6) + ext;
    cb(null, name);
  },
});

module.exports = multer({ storage });
