const express = require("express");
const router = express.Router();

const { createSocialLead } = require("../controllers/socialLeadController");

router.post("/lead", createSocialLead);

module.exports = router;