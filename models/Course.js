const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    /* ================= IMAGE ================= */
    image: {
      type: String,
      required: true,
    },

    /* ================= TITLE ================= */
    title: {
      type: String,
      required: true,
      trim: true,
    },

    /* ================= SLUG ================= */
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    /* ================= CATEGORY ================= */
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    /* ================= PREMIUM ================= */
    premium: {
      type: Boolean,
      default: true, // true = paid, false = free
    },

    /* ================= PRICE ================= */
    price: {
      type: Number,
      default: 0,
    },

    discount_price: {
      type: Number,
      default: 0,
    },

    /* ================= SEO ================= */
    meta_keyword: {
      type: [String],
      default: [],
    },

    /* ================= DESCRIPTION ================= */
    short_description: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    /* ================= LANGUAGE ================= */
    language: {
      type: String,
      enum: ["English", "Hindi"],
      required: true,
    },

    /* ================= LEARNS ================= */
    learns: {
      type: [String],
      default: [],
    },

    /* ================= INCLUDES ================= */
    includes: [
      {
        icon: { type: String },
        text: { type: String, required: true },
      },
    ],

    /* ================= STATUS ================= */
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

/* ======================================================
   🔥 AUTO SLUG GENERATOR (UNIQUE)
====================================================== */
courseSchema.pre("validate", async function (next) {
  if (!this.isModified("title")) return next();

  const baseSlug = this.title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  let slug = baseSlug;
  let counter = 1;

  while (await mongoose.models.Course.findOne({ slug })) {
    slug = `${baseSlug}-${counter++}`;
  }

  this.slug = slug;
});

module.exports = mongoose.model("Course", courseSchema);
