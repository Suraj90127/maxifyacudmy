const express = require("express");

const router = express.Router();

const {
  createMeetingSlots,
  getMeetingSlots,
  getMeetingSlotById,
} = require("../controller/meetingSlotController");

router.post(
  "/bulk-create",
  createMeetingSlots
);

router.get(
  "/all",
  getMeetingSlots
);

router.get(
  "/:id",
  getMeetingSlotById
);

module.exports = router;