const mongoose = require("mongoose");
const CourseContent = require("../models/CourseContent");
const AssignmentSubmission = require("../models/AssignmentSubmission");

exports.submitAssignment = async (req, res) => {
  try {
    const {
      courseId,
      videoId,
      assignmentId,
      answers,
    } = req.body;

    const userId = req.user.id;

    console.log("BODY =>", req.body);

    if (
      !courseId ||
      !videoId ||
      !assignmentId ||
      !Array.isArray(answers)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "courseId, videoId, assignmentId and answers are required",
      });
    }

    // =========================
    // DUPLICATE CHECK
    // =========================

    const existingSubmission =
      await AssignmentSubmission.findOne({
        userId,
        assignmentId,
      });

    if (existingSubmission) {
      return res.status(400).json({
        success: false,
        message: "Assignment already submitted",
      });
    }

    // =========================
    // FIND COURSE CONTENT
    // =========================

    const courseContent = await CourseContent.findOne({
      course_id: courseId,
      "videos._id": videoId,
      "videos.assignments._id": assignmentId,
    });

    if (!courseContent) {
      return res.status(404).json({
        success: false,
        message: "Course content not found",
      });
    }

    console.log(
      "AVAILABLE VIDEOS =>",
      courseContent.videos.map((v) => ({
        id: v._id.toString(),
        title: v.video_title,
      }))
    );

    console.log(
      "RECEIVED VIDEO ID =>",
      videoId
    );

    // =========================
    // FIND VIDEO
    // =========================

    const video =
      courseContent.videos.id(videoId);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
        receivedVideoId: videoId,
        availableVideos:
          courseContent.videos.map((v) => ({
            id: v._id,
            title: v.video_title,
          })),
      });
    }

    console.log(
      "FOUND VIDEO =>",
      video.video_title
    );

    // =========================
    // FIND ASSIGNMENT
    // =========================

    const assignment =
      video.assignments.id(assignmentId);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
        receivedAssignmentId:
          assignmentId,
        availableAssignments:
          video.assignments.map((a) => ({
            id: a._id,
            title: a.title,
          })),
      });
    }

    console.log(
      "FOUND ASSIGNMENT =>",
      assignment.title
    );

    // =========================
    // EVALUATE ANSWERS
    // =========================

    let obtainedMarks = 0;

    const evaluatedAnswers = [];

    for (const submitted of answers) {
      const question =
        assignment.questions.id(
          submitted.questionId
        );

      if (!question) {
        console.log(
          "QUESTION NOT FOUND =>",
          submitted.questionId
        );
        continue;
      }

      const selectedAnswer =
        String(
          submitted.selectedAnswer || ""
        ).trim();

      const correctAnswer =
        String(
          question.correctAnswer || ""
        ).trim();

      const isCorrect =
        selectedAnswer.toLowerCase() ===
        correctAnswer.toLowerCase();

      const marksObtained = isCorrect
        ? Number(question.marks || 0)
        : 0;

      obtainedMarks += marksObtained;

      evaluatedAnswers.push({
        questionId: question._id,
        questionText:
          question.question,
        selectedAnswer,
        correctAnswer,
        isCorrect,
        marksObtained,
        maxMarks:
          Number(question.marks || 0),
      });
    }

    const totalMarks =
      assignment.questions.reduce(
        (sum, q) =>
          sum + Number(q.marks || 0),
        0
      );

    const percentage =
      totalMarks > 0
        ? Number(
          (
            (obtainedMarks /
              totalMarks) *
            100
          ).toFixed(2)
        )
        : 0;

    // =========================
    // SAVE SUBMISSION
    // =========================

    const submission =
      await AssignmentSubmission.create({
        userId,
        courseId,
        videoId,
        assignmentId,

        totalMarks,
        obtainedMarks,
        percentage,

        answers:
          evaluatedAnswers,

        status: "submitted",

        submittedAt:
          new Date(),

        ipAddress:
          req.headers[
          "x-forwarded-for"
          ] ||
          req.socket
            .remoteAddress ||
          "",

        userAgent:
          req.headers[
          "user-agent"
          ] || "",
      });

    return res.status(201).json({
      success: true,
      message:
        "Assignment submitted successfully",
      result: {
        totalMarks,
        obtainedMarks,
        percentage,
      },
      data: submission,
    });
  } catch (error) {
    console.error(
      "SUBMIT ASSIGNMENT ERROR =>",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMySubmissions = async (req, res) => {
  try {
    const userId = req.user.id;

    const submissions = await AssignmentSubmission.find({
      userId,
    })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions,
    });
  } catch (error) {
    console.error("GET SUBMISSIONS ERROR =>", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAssignmentSubmission = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const userId = req.user.id;

    const submission =
      await AssignmentSubmission.findOne({
        userId,
        assignmentId,
      });

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: submission,
    });
  } catch (error) {
    console.error(
      "GET ASSIGNMENT SUBMISSION ERROR =>",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.checkAssignmentSubmission = async (
  req,
  res
) => {
  try {
    const { assignmentId } = req.params;
    const userId = req.user.id;

    const submission =
      await AssignmentSubmission.findOne({
        userId,
        assignmentId,
      });

    return res.status(200).json({
      success: true,
      submitted: !!submission,
      data: submission || null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};