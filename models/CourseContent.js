const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  video_title: {
    type: String,
    required: true,
    trim: true,
  },

  video_path: {
    type: String,
    default: null, 
  },

  video_description: {
    type: String,
    default: "",
    trim: true,
  },

  video_duration: {
    type: String,
    default: "00:00:00", 
  },

  pdf_path: {
    type: String,
    default: null, 
  },

  image_path: {
    type: String,
    default: null, 
  },
});

const CourseContentSchema = new mongoose.Schema(
  {
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    videos: {
      type: [VideoSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CourseContent", CourseContentSchema);
