import React, { useState, useEffect } from "react";
import {
  Plus,
  Maximize2,
  X,
  Paperclip,
  Send,
  MessageSquare,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyTickets,
  createTicket,
  getTicketById,
  addMessage,
} from "../../redux/slices/supportTicketSlice";

/* =========================================================
   VIEW TICKET
========================================================= */
const ViewTicket = ({ ticketId, setCurrentView }) => {
  const dispatch = useDispatch();
  const { ticketDetails } = useSelector((state) => state.support);
  const [reply, setReply] = useState("");

  useEffect(() => {
    dispatch(getTicketById(ticketId));
  }, [dispatch, ticketId]);

  const handleSend = () => {
    if (!reply.trim()) return;
    dispatch(addMessage({ id: ticketId, message: reply }));
    setReply("");
  };

  if (!ticketDetails) {
    return (
      <p className="text-center text-gray-500 mt-20">
        Loading ticket...
      </p>
    );
  }

  const isOpen = ticketDetails.status === "Open";

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 pb-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#336699]">
          Ticket Details
        </h1>
        <button
          onClick={() => setCurrentView("list")}
          className="p-2 rounded-full hover:bg-red-100 text-red-500"
        >
          <X />
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              isOpen
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {ticketDetails.status}
          </span>

          <h2 className="text-lg font-semibold text-[#336699]">
            #{ticketDetails._id} — {ticketDetails.subject}
          </h2>
        </div>

        {/* Messages */}
        <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1">
          {ticketDetails.messages?.map((msg, i) => (
            <div
              key={i}
              className={`p-4 rounded-xl border-l-4 ${
                msg.sender === "admin"
                  ? "bg-purple-50 border-purple-400"
                  : "bg-blue-50 border-blue-400"
              }`}
            >
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span className="font-semibold capitalize">
                  {msg.sender}
                </span>
                <span>
                  {new Date(msg.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-700">{msg.message}</p>
            </div>
          ))}
        </div>

        {/* Reply Section (ONLY IF OPEN) */}
        {isOpen ? (
          <div className="mt-6">
            <textarea
              rows={3}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Type your reply..."
              className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <button
              onClick={handleSend}
              className="mt-3 inline-flex items-center gap-2 bg-[#5d45fd] text-white px-6 py-3 rounded-xl hover:bg-[#4a37d9] transition"
            >
              <Send className="w-4 h-4" /> Send Reply
            </button>
          </div>
        ) : (
          <p className="mt-6 text-sm text-gray-500 italic">
            This ticket is closed. You can no longer reply.
          </p>
        )}
      </div>
    </div>
  );
};

/* =========================================================
   NEW TICKET
========================================================= */
const NewTicket = ({ setCurrentView }) => {
  const dispatch = useDispatch();
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState("High");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("subject", subject);
    formData.append("priority", priority);
    formData.append("message", message);

    for (let f of files) formData.append("attachments", f);

    dispatch(createTicket(formData));
    setCurrentView("list");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 pb-24">
      <h1 className="text-3xl font-bold text-[#336699] mb-6">
        Open Support Ticket
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm border p-6 max-w-3xl"
      >
        <label className="block font-semibold mb-1">
          Subject
        </label>
        <input
          className="w-full border rounded-xl p-3 mb-4"
          required
          onChange={(e) => setSubject(e.target.value)}
        />

        <label className="block font-semibold mb-1">
          Priority
        </label>
        <select
          className="w-full border rounded-xl p-3 mb-4"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <label className="block font-semibold mb-1">
          Message
        </label>
        <textarea
          rows={5}
          className="w-full border rounded-xl p-3 mb-4"
          required
          onChange={(e) => setMessage(e.target.value)}
        />

        <input
          type="file"
          id="attachmentsInput"
          multiple
          hidden
          onChange={(e) => setFiles(e.target.files)}
        />

        <button
          type="button"
          onClick={() =>
            document.getElementById("attachmentsInput").click()
          }
          className="flex items-center gap-2 px-4 py-2 border rounded-xl hover:bg-gray-50 mb-4"
        >
          <Paperclip className="w-4 h-4" />
          Add Attachments
        </button>

        {files.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-4">
            {Array.from(files).map((file, i) => (
              <img
                key={i}
                src={URL.createObjectURL(file)}
                alt="preview"
                className="h-20 w-20 object-cover rounded-lg border"
              />
            ))}
          </div>
        )}

        <button className="bg-[#5d45fd] text-white px-6 py-3 rounded-xl hover:bg-[#4a37d9]">
          Submit Ticket
        </button>
      </form>
    </div>
  );
};

/* =========================================================
   MAIN SUPPORT
========================================================= */
const Support = () => {
  const dispatch = useDispatch();
  const { myTickets } = useSelector((state) => state.support);

  const [currentView, setCurrentView] = useState("list");
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getMyTickets());
  }, [dispatch]);

  if (currentView === "new")
    return <NewTicket setCurrentView={setCurrentView} />;

  if (currentView === "view")
    return (
      <ViewTicket
        ticketId={selectedTicketId}
        setCurrentView={setCurrentView}
      />
    );

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 pb-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#336699]">
          Support Tickets
        </h1>
        <button
          onClick={() => setCurrentView("new")}
          className="bg-[#5d45fd] text-white px-5 py-3 rounded-xl hover:bg-[#4a37d9] flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Ticket
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-left">Subject</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Priority</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {myTickets.map((ticket) => (
              <tr
                key={ticket._id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-4 font-semibold text-[#336699]">
                  {ticket.subject}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      ticket.status === "Open"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </td>
                <td className="p-4">{ticket.priority}</td>
                <td className="p-4">
                  <button
                    onClick={() => {
                      setSelectedTicketId(ticket._id);
                      setCurrentView("view");
                    }}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-4">
        {myTickets.map((ticket) => (
          <div
            key={ticket._id}
            className="bg-white p-5 rounded-2xl shadow-sm border"
          >
            <p className="font-semibold text-[#336699] text-lg">
              {ticket.subject}
            </p>

            <div className="flex justify-between items-center mt-2">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  ticket.status === "Open"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {ticket.status}
              </span>
              <span className="font-medium">
                {ticket.priority}
              </span>
            </div>

            <button
              onClick={() => {
                setSelectedTicketId(ticket._id);
                setCurrentView("view");
              }}
              className="mt-4 w-full bg-[#5d45fd] text-white py-2 rounded-xl"
            >
              View Ticket
            </button>
          </div>
        ))}
      </div>

      {myTickets.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          <MessageSquare className="w-10 h-10 mx-auto mb-2" />
          No support tickets found.
        </div>
      )}
    </div>
  );
};

export default Support;
