// models/SocialLinks.js
const mongoose = require("mongoose");

const socialLinksSchema = new mongoose.Schema(
  {
    facebook: {
      type: String,
      default: "",
    },
    instagram: {
      type: String,
      default: "",
    },
    linkedin: {
      type: String,
      default: "",
    },
    youtube: {
      type: String,
      default: ""
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("SocialLinks", socialLinksSchema);
