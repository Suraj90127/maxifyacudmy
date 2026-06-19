const mongoose = require("mongoose");

const meetRequestSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    slot_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MeetingSlot",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      default: "",
    },

    mobile: {
      type: String,
      default: "",
    },

    meetingDate: {
      type: Date,
      required: true,
    },

    // meetingTime: {
    //   type: String,
    //   required: true,
    // },

    meetLink: {
      type: String,
      default: "",
    },

    meetPassword: {
      type: String,
      default: "",
    },

    adminRemark: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "rejected",
        "completed",
      ],
      default: "pending",
    },

    approvedAt: Date,
    rejectedAt: Date,
    completedAt: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "MeetRequest",
  meetRequestSchema
); 