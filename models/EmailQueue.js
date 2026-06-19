const mongoose = require("mongoose");

const emailQueueSchema = new mongoose.Schema(
  {
    email: String,
    password: String,

    type: {
      type: String,
      default: "credentials",
    },

    status: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
    },

    retryCount: {
      type: Number,
      default: 0,
    },

    lastError: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "EmailQueue",
  emailQueueSchema
);