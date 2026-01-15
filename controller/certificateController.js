const PDFDocument = require("pdfkit");
const path = require("path");

const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const CourseContent = require("../models/CourseContent");
const User = require("../models/UserModel");

const downloadCertificate = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    /* ===== COURSE ===== */
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    /* ===== USER ===== */
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    /* ===== PROGRESS CHECK ===== */
    const modules = await CourseContent.find({ course_id: courseId });
    const totalVideos = modules.reduce(
      (sum, m) => sum + (m.videos?.length || 0),
      0
    );

    const progress = await CourseProgress.findOne({
      user_id: userId,
      course_id: courseId,
    });

    const completedVideos =
      progress?.videos?.filter(v => v.is_completed).length || 0;

    if (completedVideos !== totalVideos) {
      return res.status(403).json({
        message: "Complete the course to download certificate",
      });
    }

    /* ===== PDF INIT ===== */
    const doc = new PDFDocument({
      size: "A4",
      layout: "landscape",
      margin: 0,
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=certificate-${course.title}.pdf`
    );

    doc.pipe(res);

    /* ===== BACKGROUND ===== */
    const bgPath = path.join(__dirname, "../assets/certificate-bg.png");
    doc.image(bgPath, 0, 0, { width: 842, height: 595 });

    /* ===== FONTS ===== */
    const fontDir = path.join(__dirname, "../assets/fonts");

    doc.registerFont(
      "Poppins",
      path.join(fontDir, "Poppins-Regular.ttf")
    );

    doc.registerFont(
      "Montserrat",
      path.join(fontDir, "Montserrat-Italic-VariableFont_wght.ttf")
    );

    const pageWidth = doc.page.width;

    /* ===== USER NAME ===== */
    const userName =
      `${user.firstname || ""} ${user.lastname || ""}`.trim() || user.email;

    doc
      .font("Times-Bold")
      .fontSize(40)
      .fillColor("#000")
      .text(userName, 0, 255, {
        width: pageWidth,
        align: "center",
      });

    /* ===== COURSE NAME ===== */
    doc
      .font("Times-Roman")
      .fontSize(30)
      .fillColor("#000")
      .text(course.title, 0, 355, {
        width: pageWidth,
        align: "center",
      });

    /* ===== DATE FORMAT (DD-MM-YYYY) ===== */
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, "0")}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${today.getFullYear()}`;

    doc
      .font("Poppins") // change to "Montserrat" if you want
      .fontSize(18)
      .fillColor("#000")
      .text(formattedDate, 0, 385, {
        width: pageWidth,
        align: "center",
      });

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Certificate generation failed" });
  }
};

module.exports = downloadCertificate;
