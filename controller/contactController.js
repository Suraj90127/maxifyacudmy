const Contact = require("../models/Contact");

// ================================
// CREATE CONTACT MESSAGE
// ================================
exports.createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newMessage = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    res.json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ================================
// GET ALL MESSAGES (ADMIN)
// ================================
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages" });
  }
};

// ================================
// GET SINGLE MESSAGE
// ================================
exports.getSingleMessage = async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: "Error fetching message" });
  }
};
