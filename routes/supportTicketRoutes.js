const express = require("express");
const router = express.Router();

const upload = require("../middleware/ticketUpload");
const { authMiddleware, } = require("../middleware/authMiddleware");
 const {createTicket,getMyTickets,getAllTickets,getTicketById,updateTicket,deleteTicket,addMessage} = require('../controller/supportTicketController')

router.post("/create", authMiddleware, upload, createTicket);

router.get("/my-tickets", authMiddleware, getMyTickets);

router.get("/all", authMiddleware,  getAllTickets);

router.get("/user/:id", authMiddleware, getTicketById);

router.put("/update/:id", authMiddleware, updateTicket);

router.delete("/delete/:id", authMiddleware, deleteTicket);


router.post("/:id/message", authMiddleware, addMessage);

module.exports = router;
