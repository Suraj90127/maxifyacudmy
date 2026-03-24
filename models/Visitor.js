const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  ip: String,
  device: String,
  os: String,
  browser: String,
  ref: String,
  course: String,
  count: {
    type: Number,
    default: 1
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Visitor", visitorSchema);