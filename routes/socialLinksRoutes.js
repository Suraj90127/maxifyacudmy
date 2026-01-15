// routes/socialLinksRoutes.js
const express = require("express");
const { getSocialLinks, updateSocialLinks } = require("../controller/socialLinksController");
const router = express.Router();


router.get("/get", getSocialLinks);

router.put("/add", updateSocialLinks);

module.exports = router;
