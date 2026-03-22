const UAParser = require("ua-parser-js");
const Visitor = require("../models/Visitor");

const trackVisitor = async (req, res, next) => {
  try {
    const parser = new UAParser(req.headers["user-agent"]);
    const result = parser.getResult();

    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress;

    const ref = req.query.ref || null;
    const course = req.query.course || null;

    // 👉 sirf jab ref ya course ho tab save karo
    if (!ref && !course) return next();

    await Visitor.create({
      ip,
      device: result.device.type || "Desktop",
      os: result.os.name || "Unknown",
      browser: result.browser.name || "Unknown",
      ref,
      course,
    });

  } catch (error) {
    console.log("Tracking Error:", error.message);
  }

  next();
};

module.exports = trackVisitor;