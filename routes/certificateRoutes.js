const express = require("express");
const router = express.Router();

const downloadCertificate = require('../controller/certificateController')

const {authMiddleware} = require("../middleware/authMiddleware");

router.get("/download/:courseId",authMiddleware,downloadCertificate);

module.exports = router;