// models/Career.js

const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    income: {
      type: String,
      required: true,
    },

    startingIncome: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      required: true,
    },

    fullDesc: {
      type: String,
      required: true,
    },

    icon: {
      type: String,
      default: "",
    },

    color: {
      type: String,
      default: "",
    },

    bgColor: {
      type: String,
      default: "",
    },

    iconColor: {
      type: String,
      default: "",
    },

    jobs: {
      type: String,
      default: "",
    },

    growth: {
      type: String,
      default: "",
    },

    duration: {
      type: String,
      default: "",
    },

    companies: [
      {
        type: String,
      },
    ],

    skills: [
      {
        type: String,
      },
    ],

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Career",
  careerSchema
);