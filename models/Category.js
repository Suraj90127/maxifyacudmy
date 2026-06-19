const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    desc:{type:String ,required:true,unique:true},
    fulldesc:{type:String ,required:true,unique:true},
    slug: { type: String, unique: true },
    image: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
