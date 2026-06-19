const express = require("express");
const router = express.Router();

const {
  submitAssignment,
  getMySubmissions,
  getAssignmentSubmission,
  checkAssignmentSubmission,
} = require("../controller/assignmentSubmissionController");

const {
  authMiddleware,
} = require("../middleware/authMiddleware");

// Submit Assignment
router.post(
  "/submit",
  authMiddleware,
  submitAssignment
);

// Get All Submitted Assignments of Logged User
router.get(
  "/my-submissions",
  authMiddleware,
  getMySubmissions
);

// Get Particular Assignment Submission
router.get(
  "/submission/:assignmentId",
  authMiddleware,
  getAssignmentSubmission
);

// Check Assignment Submitted or Not
router.get(
  "/check/:assignmentId",
  authMiddleware,
  checkAssignmentSubmission
);

module.exports = router;