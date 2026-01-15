const axios = require("axios");
const FormData = require("form-data");
const SupportTicket = require("../models/SupportTicket");

// -------------------------------------------------------
// CREATE TICKET (WITH ATTACHMENTS)
// -------------------------------------------------------
exports.createTicket = async (req, res) => {
  try {
    const { subject, priority, message } = req.body;
    const user_id = req.user.id;

    let attachments = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const base64 = file.buffer.toString("base64");
        const formData = new FormData();
        formData.append("image", base64);

        const upload = await axios.post(
          `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
          formData,
          { headers: formData.getHeaders() }
        );

        attachments.push({
          fileName: file.originalname,
          fileUrl: upload.data.data.url,
          fileType: file.mimetype,
        });
      }
    }

    const ticket = await SupportTicket.create({
      user_id,
      subject,
      priority,
      message,
      attachments,
      messages: [
        {
          sender: "user",
          message,
          timestamp: new Date(),
        },
      ],
    });

    return res.status(201).json({
      message: "Support ticket created successfully",
      ticket,
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// -------------------------------------------------------
// USER: GET MY TICKETS
// -------------------------------------------------------
exports.getMyTickets = async (req, res) => {
  try {
    const tickets = await SupportTicket.find({ user_id: req.user.id })
      .sort({ createdAt: -1 });

    return res.status(200).json({ tickets });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// -------------------------------------------------------
// ADMIN: GET ALL TICKETS
// -------------------------------------------------------
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await SupportTicket.find()
      .populate("user_id", "firstname lastname email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ tickets });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// -------------------------------------------------------
// GET TICKET BY ID (USER/ADMIN)
// -------------------------------------------------------
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id)
      .populate("user_id", "firstname lastname email");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    return res.status(200).json(ticket);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// -------------------------------------------------------
// UPDATE TICKET (ADMIN)
// -------------------------------------------------------
exports.updateTicket = async (req, res) => {
  try {
    const { subject, priority, message, status } = req.body;

    const ticket = await SupportTicket.findById(req.params.id);
    if (!ticket)
      return res.status(404).json({ message: "Ticket not found" });

    ticket.subject = subject || ticket.subject;
    ticket.priority = priority || ticket.priority;
    ticket.message = message || ticket.message;
    ticket.status = status || ticket.status;

    await ticket.save();

    return res.status(200).json({
      message: "Ticket updated successfully",
      ticket,
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// -------------------------------------------------------
// DELETE TICKET
// -------------------------------------------------------
exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await SupportTicket.findByIdAndDelete(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    return res.status(200).json({ message: "Ticket deleted successfully" });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// -------------------------------------------------------
// ADD MESSAGE TO TICKET (CHAT SYSTEM)
// -------------------------------------------------------
exports.addMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const ticketId = req.params.id;

    const ticket = await SupportTicket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    const sender = req.user.role === "admin" ? "admin" : "user";

    ticket.messages.push({
      sender,
      message,
      timestamp: new Date(),
    });

    await ticket.save();

    return res.status(200).json({
      message: "Message added successfully",
      ticket,
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
