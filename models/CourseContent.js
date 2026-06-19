const mongoose = require("mongoose");

// =========================
// ASSIGNMENT QUESTION (MCQ)
// =========================
const AssignmentQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },

  options: {
    type: [String],
    required: true,
    validate: {
      validator: (v) => v.length >= 2,
      message: "At least 2 options are required",
    },
  },

  correctAnswer: {
    type: String,
    required: true,
    trim: true,
  },

  marks: {
    type: Number,
    default: 1,
  },
});

// =========================
// ASSIGNMENT
// =========================
const AssignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    default: "",
    trim: true,
  },

  dueDate: {
    type: Date,
    default: null,
  },

  totalMarks: {
    type: Number,
    default: 0,
  },

  questions: {
    type: [AssignmentQuestionSchema],
    default: [],
  },
});

// =========================
// VIDEO
// =========================
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

  git_link: {
    type: String,
    default: null,
    trim: true,
    validate: {
      validator: (v) => {
        if (!v) return true;
        const urlPattern = /^(https?:\/\/)?(www\.)?(github\.com|gitlab\.com|bitbucket\.org)\/[\w.-]+\/[\w.-]+(\/)?$/i;
        return urlPattern.test(v);
      },
      message: "Please provide a valid Git repository URL (GitHub, GitLab, or Bitbucket)",
    },
  },

  // Assignment attached to this video
  assignments: {
    type: [AssignmentSchema],
    default: [],
  },
});

// =========================
// COURSE CONTENT
// =========================
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
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "CourseContent",
  CourseContentSchema
);