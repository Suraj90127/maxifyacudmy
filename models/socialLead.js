const mongoose = require("mongoose");

const socialLeadSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  name:{
    type:String,
    required:true
  },
  phone: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    default: "",
  },
  page: {
    type: String,
    default: "",
  }
}, { timestamps: true });

module.exports = mongoose.model("SocialLead", socialLeadSchema);