const mongoose = require("mongoose");

const meetingSlotSchema = new mongoose.Schema(
  {
    slotDate: {
      type: Date,
      required: true,
    },

    isBooked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "MeetingSlot",
  meetingSlotSchema
);