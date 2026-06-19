const express = require("express");
const router = express.Router();

const {
  createDiscussion,
  getMyDiscussions,
  getDiscussionById,
  getCourseDiscussions,
  getVideoDiscussions,
  addMessage,
} = require("../controller/courseDiscussionController");

const upload = require("../middleware/upload");
const { authMiddleware } = require("../middleware/authMiddleware");

// Create Discussion
router.post(
  "/",
  authMiddleware,
  upload.array("files", 10),
  createDiscussion
);

// My Discussions
router.get(
  "/my",
  authMiddleware,
  getMyDiscussions
);

// Course Discussions
router.get(
  "/course/:courseId",
  authMiddleware,
  getCourseDiscussions
);

// Video Discussions
router.get(
  "/video/:videoId",
  authMiddleware,
  getVideoDiscussions
);

// Discussion Details
router.get(
  "/:id",
  authMiddleware,
  getDiscussionById
);

// Add Message
router.post(
  "/:id/message",
  authMiddleware,
  addMessage
);

module.exports = router;