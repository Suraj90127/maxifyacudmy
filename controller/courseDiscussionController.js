const axios = require("axios");
const FormData = require("form-data");
const sharp = require("sharp");
const CourseDiscussion = require("../models/CourseDiscussion");

/* =====================================================
   IMAGE / FILE UPLOAD TO IMGBB
===================================================== */
const uploadToImgBB = async (
  buffer,
  originalname,
  mimetype
) => {
  try {
    let uploadBuffer = buffer;
    let contentType = mimetype;

    if (mimetype.startsWith("image/")) {
      uploadBuffer = await sharp(buffer)
        .resize(800)
        .jpeg({ quality: 70 })
        .toBuffer();

      contentType = "image/jpeg";
    }

    const formData = new FormData();

    formData.append("image", uploadBuffer, {
      filename: originalname,
      contentType,
    });

    const upload = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      formData,
      {
        headers: formData.getHeaders(),
        timeout: 10000,
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      }
    );

    return upload.data.data.url;
  } catch (error) {
    console.error(
      "ImgBB Upload Error:",
      error.response?.data || error.message
    );

    return null;
  }
};

/* =====================================================
   CREATE DISCUSSION
===================================================== */
exports.createDiscussion = async (req, res) => {
  try {
    const {
      course_id,
      video_id,
      title,
      description,
    } = req.body;

    const user_id = req.user.id;

    let attachments = [];

    if (req.files && req.files.length > 0) {
      attachments = await Promise.all(
        req.files.map(async (file) => {
          const fileUrl = await uploadToImgBB(
            file.buffer,
            file.originalname,
            file.mimetype
          );

          return {
            fileName: file.originalname,
            fileUrl,
            fileType: file.mimetype,
          };
        })
      );
    }

    const discussion =
      await CourseDiscussion.create({
        user_id,
        course_id,
        video_id,
        title,
        description,
        attachments,

        messages: [
          {
            sender: "student",
            message: description,
            timestamp: new Date(),
          },
        ],
      });

    return res.status(201).json({
      success: true,
      message: "Discussion created successfully",
      discussion,
    });
  } catch (error) {
    console.error(
      "CREATE DISCUSSION ERROR =>",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
   GET MY DISCUSSIONS
===================================================== */
exports.getMyDiscussions = async (
  req,
  res
) => {
  try {
    const discussions =
      await CourseDiscussion.find({
        user_id: req.user.id,
      })
        .populate("course_id", "title")
        .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      discussions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
   GET ALL DISCUSSIONS (ADMIN)
===================================================== */
exports.getAllDiscussions = async (
  req,
  res
) => {
  try {
    const discussions =
      await CourseDiscussion.find()
        .populate(
          "user_id",
          "firstname lastname email"
        )
        .populate("course_id", "title")
        .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      discussions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
   GET DISCUSSION BY ID
===================================================== */
exports.getDiscussionById = async (
  req,
  res
) => {
  try {
    const discussion =
      await CourseDiscussion.findById(
        req.params.id
      )
        .populate(
          "user_id",
          "firstname lastname email"
        )
        .populate("course_id", "title");

    if (!discussion) {
      return res.status(404).json({
        success: false,
        message: "Discussion not found",
      });
    }

    return res.status(200).json({
      success: true,
      discussion,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
   GET DISCUSSIONS BY COURSE
===================================================== */
exports.getCourseDiscussions = async (
  req,
  res
) => {
  try {
    const discussions =
      await CourseDiscussion.find({
        course_id: req.params.courseId,
      })
        .populate(
          "user_id",
          "firstname lastname"
        )
        .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      discussions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
   GET DISCUSSIONS BY VIDEO
===================================================== */
exports.getVideoDiscussions = async (
  req,
  res
) => {
  try {
    const discussions =
      await CourseDiscussion.find({
        video_id: req.params.videoId,
      })
        .populate(
          "user_id",
          "firstname lastname"
        )
        .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      discussions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
   ADD MESSAGE
===================================================== */
exports.addMessage = async (
  req,
  res
) => {
  try {
    const { message } = req.body;

    const discussion =
      await CourseDiscussion.findById(
        req.params.id
      );

    if (!discussion) {
      return res.status(404).json({
        success: false,
        message: "Discussion not found",
      });
    }

    discussion.messages.push({
      sender:
        req.user.role === "admin"
          ? "admin"
          : "student",
      message,
      timestamp: new Date(),
    });

    await discussion.save();

    return res.status(200).json({
      success: true,
      message: "Reply added successfully",
      discussion,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
   UPDATE STATUS
===================================================== */
exports.updateStatus = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    const discussion =
      await CourseDiscussion.findById(
        req.params.id
      );

    if (!discussion) {
      return res.status(404).json({
        success: false,
        message: "Discussion not found",
      });
    }

    discussion.status = status;

    await discussion.save();

    return res.status(200).json({
      success: true,
      message:
        "Discussion status updated",
      discussion,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
   DELETE DISCUSSION
===================================================== */
exports.deleteDiscussion = async (
  req,
  res
) => {
  try {
    const discussion =
      await CourseDiscussion.findByIdAndDelete(
        req.params.id
      );

    if (!discussion) {
      return res.status(404).json({
        success: false,
        message: "Discussion not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Discussion deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};