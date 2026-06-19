const MeetingSlot = require("../models/MeetingSlot");
const mongoose = require("mongoose");
const MeetRequest = require("../models/MeetRequest"); // Adjust path as needed


exports.createMeetingRequest = async (req, res) => {
  try {
    const { courseId, slotId } = req.body;


    const slot = await MeetingSlot.findById(slotId);

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: "Meeting slot not found",
      });
    }

    const meetingRequest = await MeetRequest.create({
      user_id: req.user.id,
      course_id: courseId,
      slot_id: slot._id,
      meetingDate: slot.slotDate, // slot ki date save hogi
      name: req.user.name,
      email: req.user.email,
      mobile: req.user.mobile,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Meeting request created",
      meetingRequest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateStatusToCompleted = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid meet request ID format",
      });
    }

    // Find and update the meet request
    const meetRequest = await MeetRequest.findByIdAndUpdate(
      id,
      {
        $set: {
          status: "completed",
          completedAt: new Date(),
        },
      },
      { new: true } // Return updated document
    );

    // Check if meet request exists
    if (!meetRequest) {
      return res.status(404).json({
        success: false,
        message: "Meet request not found",
      });
    }

    // Check if current status is approved
    if (meetRequest.status !== "approved") {
      return res.status(400).json({
        success: false,
        message: `Cannot update status from ${meetRequest.status} to completed. Status must be 'approved' first.`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Meet request status updated to completed successfully",
      data: meetRequest,
    });
  } catch (error) {
    console.error("Error updating meet request status:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


exports.getRequestByCourse = async (req, res) => {
  try {
    const requests = await MeetRequest.find({
      user_id: req.user.id,
      course_id: req.params.courseId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getRequestByUser = async (req, res) => {
  try {
    const requests = await MeetRequest.find({
      user_id: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getAllMeetingRequests =
  async (req, res) => {
    try {
      const requests =
        await MeetRequest.find()
          .populate(
            "user_id",
            "name email"
          )
          .populate(
            "course_id",
            "title"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        requests,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

exports.approveMeetingRequest =
  async (req, res) => {
    try {
      const {
        meetLink,
        meetPassword,
      } = req.body;

      const request =
        await MeetRequest.findByIdAndUpdate(
          req.params.id,
          {
            status: "approved",
            meetLink,
            meetPassword,
          },
          { new: true }
        );

      if (!request) {
        return res.status(404).json({
          success: false,
          message:
            "Request not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Meeting approved successfully",
        request,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

exports.rejectMeetingRequest =
  async (req, res) => {
    try {
      const request =
        await MeetRequest.findByIdAndUpdate(
          req.params.id,
          {
            status: "rejected",
          },
          { new: true }
        );

      if (!request) {
        return res.status(404).json({
          success: false,
          message:
            "Request not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Meeting request rejected",
        request,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };