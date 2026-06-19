const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    questionText: {
      type: String,
      default: "",
    },

    selectedAnswer: {
      type: String,
      required: true,
      trim: true,
    },

    correctAnswer: {
      type: String,
      default: "",
    },

    isCorrect: {
      type: Boolean,
      default: false,
    },

    marksObtained: {
      type: Number,
      default: 0,
    },

    maxMarks: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const AssignmentSubmissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },

    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      ref: "Video",
    },

    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    totalMarks: {
      type: Number,
      default: 0,
    },

    obtainedMarks: {
      type: Number,
      default: 0,
    },

    percentage: {
      type: Number,
      default: 0,
    },

    answers: {
      type: [AnswerSchema],
      default: [],
    },

    status: {
      type: String,
      enum: ["draft", "submitted", "graded", "expired"],
      default: "draft",
    },

    submittedAt: {
      type: Date,
      default: null,
    },

    gradedAt: {
      type: Date,
      default: null,
    },

    gradedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    feedback: {
      type: String,
      default: "",
    },

    attemptNumber: {
      type: Number,
      default: 1,
    },

    timeSpent: {
      type: Number, // in seconds
      default: 0,
    },

    ipAddress: {
      type: String,
      default: "",
    },

    userAgent: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for better query performance
AssignmentSubmissionSchema.index({ userId: 1, assignmentId: 1 }, { unique: true });
AssignmentSubmissionSchema.index({ courseId: 1, userId: 1 });
AssignmentSubmissionSchema.index({ assignmentId: 1, status: 1 });
AssignmentSubmissionSchema.index({ videoId: 1, userId: 1 }); // For querying by video

// Virtual to check if submission is editable
AssignmentSubmissionSchema.virtual("isEditable").get(function () {
  return this.status === "draft";
});

// Virtual to check if submission is completed
AssignmentSubmissionSchema.virtual("isCompleted").get(function () {
  return this.status === "submitted" || this.status === "graded";
});

// Method to calculate percentage
AssignmentSubmissionSchema.methods.calculatePercentage = function () {
  if (this.totalMarks > 0) {
    this.percentage = (this.obtainedMarks / this.totalMarks) * 100;
  } else {
    this.percentage = 0;
  }
  return this.percentage;
};

// Method to calculate total marks from answers
AssignmentSubmissionSchema.methods.calculateTotalMarks = function () {
  let total = 0;
  let obtained = 0;
  
  this.answers.forEach((answer) => {
    total += answer.maxMarks || 0;
    obtained += answer.marksObtained || 0;
  });
  
  this.totalMarks = total;
  this.obtainedMarks = obtained;
  this.calculatePercentage();
  
  return { totalMarks: total, obtainedMarks: obtained, percentage: this.percentage };
};

// Pre-save middleware to calculate marks
AssignmentSubmissionSchema.pre("save", function (next) {
  if (this.answers && this.answers.length > 0) {
    this.calculateTotalMarks();
  }
});

module.exports = mongoose.model("AssignmentSubmission", AssignmentSubmissionSchema);