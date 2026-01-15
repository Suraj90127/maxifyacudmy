const express = require("express");
const { createMessage, getAllMessages, getSingleMessage } = require("../controller/contactController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

// User sends message
router.post("/create",  createMessage);

router.get("/all", authMiddleware, getAllMessages);

router.get("/:id", authMiddleware, getSingleMessage);

module.exports = router;
