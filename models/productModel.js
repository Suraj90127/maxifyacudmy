const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    premium: {
      type: Boolean,
      default: false,
    },

    price: {
      type: Number,
      default: 0,
    },

    discount_price: {
      type: Number,
      default: 0,
    },

    pdf_file: {
      type: String,
      default: null,
    },

    image_file: {
      type: String,
      default: null,
    },

    meta_keyword: {
      type: [String],
      default: [],
    },

    short_description: {
      type: String,
      default: "",
    },

    description: {
      type: String,
    },

    learns: {
      type: [String],
      default: [],
    },

    includes: [
      {
        icon: { type: String, required: false },
        text: { type: String, required: false },
      }
    ],

    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
