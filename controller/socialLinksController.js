const SocialLinks = require("../models/SocialLinks");

/* ================================
   GET SOCIAL LINKS
================================ */
exports.getSocialLinks = async (req, res) => {
  try {
    let links = await SocialLinks.findOne();

    // Agar pehli baar hai → empty doc create
    if (!links) {
      links = await SocialLinks.create({});
    }

    res.status(200).json({
      success: true,
      data: links,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================================
   UPDATE SOCIAL LINKS (ADMIN)
================================ */
exports.updateSocialLinks = async (req, res) => {
  try {
    const { facebook, instagram, linkedin } = req.body;

    let links = await SocialLinks.findOne();

    if (!links) {
      links = await SocialLinks.create({
        facebook,
        instagram,
        linkedin,
      });
    } else {
      links.facebook = facebook ?? links.facebook;
      links.instagram = instagram ?? links.instagram;
      links.linkedin = linkedin ?? links.linkedin;
      await links.save();
    }

    res.status(200).json({
      success: true,
      message: "Social links updated successfully",
      data: links,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
