const express = require("express");
const router = express.Router();

const {
  createMeetingRequest,
  getRequestByCourse,
  getAllMeetingRequests,
  approveMeetingRequest,
  rejectMeetingRequest,
  getRequestByUser,
  updateStatusToCompleted,
} = require("../controllers/meetRequestController");

const { authMiddleware } = require("../middleware/authMiddleware");

// User Routes
router.post("/create", authMiddleware, createMeetingRequest);
router.get("/users", authMiddleware, getRequestByUser);
router.get("/course/:courseId", authMiddleware, getRequestByCourse);

router.put("/complete/:id", authMiddleware, updateStatusToCompleted);


// Admin Routes
router.get("/admin/all", authMiddleware, getAllMeetingRequests);
router.put("/approve/:id", authMiddleware, approveMeetingRequest);
router.put("/reject/:id", authMiddleware, rejectMeetingRequest);

// Meeting Status

module.exports = router;