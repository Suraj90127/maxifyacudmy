// controllers/careerController.js

const Career = require("../models/Career");
const axios = require("axios");
const FormData = require("form-data");

// ========================
// CREATE CAREER
// ========================
exports.createCareer = async (
  req,
  res
) => {
  try {
    const {
      title,
      income,
      startingIncome,
      desc,
      fullDesc,
      icon,
      color,
      bgColor,
      iconColor,
      jobs,
      growth,
      duration,
      companies,
      skills,
    } = req.body;

    let image = "";

    // IMAGE UPLOAD
    if (req.file) {
      const formData = new FormData();

      formData.append(
        "image",
        req.file.buffer.toString(
          "base64"
        )
      );

      const upload = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
        formData,
        {
          headers:
            formData.getHeaders(),
        }
      );

      image =
        upload.data.data.url;
    }

    const career =
      await Career.create({
        title,
        income,
        startingIncome,
        desc,
        fullDesc,
        icon,
        color,
        bgColor,
        iconColor,
        jobs,
        growth,
        duration,
        companies:
          typeof companies ===
          "string"
            ? JSON.parse(companies)
            : companies,
        skills:
          typeof skills ===
          "string"
            ? JSON.parse(skills)
            : skills,
        image,
      });

    res.status(201).json({
      success: true,
      message:
        "Career created successfully",
      career,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================
// GET ALL CAREERS
// ========================
exports.getAllCareers =
  async (req, res) => {
    try {
      const careers =
        await Career.find().sort({
          createdAt: -1,
        }).lean();

      res.status(200).json({
        success: true,
        careers,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// ========================
// GET SINGLE CAREER
// ========================
exports.getCareerById =
  async (req, res) => {
    try {
      const career =
        await Career.findById(
          req.params.id
        );

      if (!career) {
        return res.status(404).json({
          success: false,
          message:
            "Career not found",
        });
      }

      res.status(200).json({
        success: true,
        career,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// ========================
// UPDATE CAREER
// ========================
exports.updateCareer =
  async (req, res) => {
    try {
      const career =
        await Career.findById(
          req.params.id
        );

      if (!career) {
        return res.status(404).json({
          success: false,
          message:
            "Career not found",
        });
      }

      let image = career.image;

      // IMAGE UPDATE
      if (req.file) {
        const formData =
          new FormData();

        formData.append(
          "image",
          req.file.buffer.toString(
            "base64"
          )
        );

        const upload =
          await axios.post(
            `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
            formData,
            {
              headers:
                formData.getHeaders(),
            }
          );

        image =
          upload.data.data.url;
      }

      // HAR FIELD ALAG UPDATE HO SAKE
      const updatedData = {
        ...req.body,
        image,
      };

      // ARRAY HANDLE
      if (req.body.companies) {
        updatedData.companies =
          typeof req.body
            .companies ===
          "string"
            ? JSON.parse(
                req.body.companies
              )
            : req.body.companies;
      }

      if (req.body.skills) {
        updatedData.skills =
          typeof req.body.skills ===
          "string"
            ? JSON.parse(
                req.body.skills
              )
            : req.body.skills;
      }

      const updatedCareer =
        await Career.findByIdAndUpdate(
          req.params.id,
          updatedData,
          {
            new: true,
          }
        );

      res.status(200).json({
        success: true,
        message:
          "Career updated successfully",
        career: updatedCareer,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// ========================
// DELETE CAREER
// ========================
exports.deleteCareer =
  async (req, res) => {
    try {
      const career =
        await Career.findById(
          req.params.id
        );

      if (!career) {
        return res.status(404).json({
          success: false,
          message:
            "Career not found",
        });
      }

      await career.deleteOne();

      res.status(200).json({
        success: true,
        message:
          "Career deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };