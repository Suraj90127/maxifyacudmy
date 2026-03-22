const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  ip: String,
  device: String,
  os: String,
  browser: String,
  ref: String,
  course: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Visitor", visitorSchema);