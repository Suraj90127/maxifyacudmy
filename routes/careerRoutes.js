// routes/careerRoutes.js

const express = require("express");

const router = express.Router();

const multer = require("multer");

const storage =
  multer.memoryStorage();

const upload = multer({
  storage,
});

const {
  createCareer,
  getAllCareers,
  getCareerById,
  updateCareer,
  deleteCareer,
} = require("../controller/careerController");

// CREATE
router.post(
  "/create",
  upload.single("image"),
  createCareer
);

// GET ALL
router.get(
  "/all",
  getAllCareers
);

// GET SINGLE
router.get(
  "/:id",
  getCareerById
);

// UPDATE
router.put(
  "/update/:id",
  upload.single("image"),
  updateCareer
);

// DELETE
router.delete(
  "/delete/:id",
  deleteCareer
);

module.exports = router;