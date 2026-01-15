const mongoose = require("mongoose");

const courseProgressSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },

    videos: [
      {
        video_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        progress_percent: {
          type: Number,
          default: 0,
          min: 0,
          max: 100,
        },
        is_completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

/* =====================================================
   🔒 ONE COURSE PROGRESS PER USER (IMPORTANT)
===================================================== */
courseProgressSchema.index(
  { user_id: 1, course_id: 1 },
  { unique: true }
);

/* =====================================================
   🔐 PREVENT DUPLICATE VIDEO IDS (SAFETY)
   (Controller already handles this, but DB-level safety)
===================================================== */
courseProgressSchema.index(
  { user_id: 1, course_id: 1, "videos.video_id": 1 },
  { unique: true, sparse: true }
);

/* =====================================================
   🧠 VIRTUALS (OPTIONAL BUT USEFUL)
===================================================== */
courseProgressSchema.virtual("completedVideosCount").get(function () {
  return this.videos.filter((v) => v.is_completed).length;
});

courseProgressSchema.virtual("totalVideosCount").get(function () {
  return this.videos.length;
});

courseProgressSchema.set("toJSON", { virtuals: true });
courseProgressSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("CourseProgress", courseProgressSchema);
