const SocialLead = require("../models/socialLead");

const createSocialLead = async (req, res) => {
  try {
    const { email, phone, page } = req.body;

    if (!email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Email & phone required",
      });
    }

    // 🔥 AUTO IP (user se nahi lena)
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket?.remoteAddress ||
      req.ip;

    const lead = await SocialLead.create({
      email,
      phone,
      page,
      ip,
    });

    res.status(201).json({
      success: true,
      lead,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

module.exports = {
  createSocialLead,
};