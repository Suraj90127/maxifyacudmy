const MeetingSlot = require("../models/MeetingSlot");

exports.createMeetingSlots =
  async (req, res) => {
    try {
      const { slotDates } = req.body;

      if (
        !Array.isArray(slotDates) ||
        slotDates.length === 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "slotDates array is required",
        });
      }

      const existingSlots =
        await MeetingSlot.find({
          slotDate: {
            $in: slotDates,
          },
        });

      const existingDates =
        existingSlots.map((slot) =>
          new Date(
            slot.slotDate
          ).toISOString()
        );

      const newSlots =
        slotDates
          .filter(
            (date) =>
              !existingDates.includes(
                new Date(
                  date
                ).toISOString()
              )
          )
          .map((date) => ({
            slotDate: date,
          }));

      const createdSlots =
        await MeetingSlot.insertMany(
          newSlots
        );

      return res.status(201).json({
        success: true,
        message:
          "Meeting slots created successfully",
        totalCreated:
          createdSlots.length,
        data: createdSlots,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  exports.getMeetingSlots = async (
  req,
  res
) => {
  try {
    const slots =
      await MeetingSlot.find({
        isBooked: false,
      }).sort({
        slotDate: 1,
      });

    return res.status(200).json({
      success: true,
      count: slots.length,
      data: slots,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMeetingSlotById =
  async (req, res) => {
    try {
      const slot =
        await MeetingSlot.findById(
          req.params.id
        );

      if (!slot) {
        return res.status(404).json({
          success: false,
          message:
            "Meeting slot not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: slot,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };