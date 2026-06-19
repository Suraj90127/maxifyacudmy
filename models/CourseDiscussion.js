const mongoose = require("mongoose");

const attachmentSchema = new mongoose.Schema({
  fileName: String,
  fileUrl: String,
  fileType: String,
});

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ["student", "admin"],
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const courseDiscussionSchema = new mongoose.Schema(
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

    video_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    attachments: {
      type: [attachmentSchema],
      default: [],
    },

    status: {
      type: String,
      enum: ["Open", "Answered", "Closed"],
      default: "Open",
    },

    messages: {
      type: [messageSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "CourseDiscussion",
  courseDiscussionSchema
);