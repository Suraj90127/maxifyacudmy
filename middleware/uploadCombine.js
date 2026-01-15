const upload = require("./upload");
const uploadDisk = require("./uploadDisk");

module.exports = (req, res, next) => {
  upload.fields([{ name: "video_images", maxCount: 20 }])(req, res, (err) => {
    if (err) return next(err);

    uploadDisk.fields([
      { name: "videos", maxCount: 20 },
      { name: "video_pdfs", maxCount: 20 },
    ])(req, res, next);
  });
};
