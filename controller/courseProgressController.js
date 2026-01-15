const CourseProgress = require("../models/CourseProgress");

/* =====================================================
   SAVE VIDEO PROGRESS
===================================================== */
exports.saveProgress = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { course_id, video_id, progress_percent } = req.body;

    if (!course_id || !video_id) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // 🔒 Clamp progress (0–100 safety)
    const safeProgress = Math.min(100, Math.max(0, Number(progress_percent)));

    // ✅ STRICT COMPLETION RULE (MATCH CERTIFICATE LOGIC)
    const isCompleted = safeProgress >= 100;

    // 🔍 Find existing course progress
    let progressDoc = await CourseProgress.findOne({
      user_id,
      course_id,
    });

    /* ================= CREATE NEW COURSE PROGRESS ================= */
    if (!progressDoc) {
      progressDoc = await CourseProgress.create({
        user_id,
        course_id,
        videos: [
          {
            video_id,
            progress_percent: safeProgress,
            is_completed: isCompleted,
          },
        ],
      });

      return res.json({
        success: true,
        message: "Progress created",
        data: {
          course_id,
          videos: progressDoc.videos,
        },
      });
    }

    /* ================= UPDATE / ADD VIDEO ================= */
    const videoIndex = progressDoc.videos.findIndex(
      (v) => v.video_id.toString() === video_id.toString()
    );

    if (videoIndex !== -1) {
      // 🔄 Update existing video
      progressDoc.videos[videoIndex].progress_percent = safeProgress;
      progressDoc.videos[videoIndex].is_completed = isCompleted;
    } else {
      // ➕ Add new video progress
      progressDoc.videos.push({
        video_id,
        progress_percent: safeProgress,
        is_completed: isCompleted,
      });
    }

    await progressDoc.save();

    return res.json({
      success: true,
      message: "Progress updated",
      data: {
        course_id,
        videos: progressDoc.videos,
      },
    });
  } catch (error) {
    console.error("SAVE PROGRESS ERROR:", error);
    return res.status(500).json({
      message: "Error saving progress",
    });
  }
};

/* =====================================================
   GET COURSE PROGRESS (PAGE VISIT)
===================================================== */
exports.getCourseProgress = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { courseId } = req.params;

    const progress = await CourseProgress.findOne({
      user_id,
      course_id: courseId,
    });

    /* ---------- NO PROGRESS YET ---------- */
    if (!progress) {
      return res.json({
        course_id: courseId,
        videos: [],
        completedVideos: 0,
        totalVideos: 0,
        course_percent: 0,
      });
    }

    const totalVideos = progress.videos.length;
    const completedVideos = progress.videos.filter(
      (v) => v.is_completed
    ).length;

    const course_percent =
      totalVideos === 0
        ? 0
        : Math.round((completedVideos / totalVideos) * 100);

    res.json({
      course_id: courseId,
      videos: progress.videos, // ✅ MOST IMPORTANT
      completedVideos,
      totalVideos,
      course_percent,
    });
  } catch (error) {
    console.error("GET PROGRESS ERROR:", error);
    res.status(500).json({ message: "Error fetching progress" });
  }
};
