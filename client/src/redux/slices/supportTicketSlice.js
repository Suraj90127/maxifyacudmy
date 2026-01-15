// src/redux/slices/supportTicketSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";
import { toast } from "react-toastify";

api.defaults.withCredentials = true;

/* ==========================================================
   1. CREATE SUPPORT TICKET (WITH FILE UPLOAD)
========================================================== */
/* CREATE TICKET */
export const createTicket = createAsyncThunk(
  "support/createTicket",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/support/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.ticket;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

/* GET MY TICKETS */
export const getMyTickets = createAsyncThunk(
  "support/getMyTickets",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/support/my-tickets");
      return res.data.tickets;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

/* ADMIN - GET ALL TICKETS */
export const getAllTickets = createAsyncThunk(
  "support/getAllTickets",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/support/all");
      return res.data.tickets;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

/* GET TICKET BY ID */
export const getTicketById = createAsyncThunk(
  "support/getTicketById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/support/user/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

/* UPDATE TICKET */
export const updateTicket = createAsyncThunk(
  "support/updateTicket",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/support/update/${id}`, data);
      return res.data.ticket;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

/* DELETE TICKET */
export const deleteTicket = createAsyncThunk(
  "support/deleteTicket",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/support/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

/* ADD MESSAGE */
export const addMessage = createAsyncThunk(
  "support/addMessage",
  async ({ id, message }, { rejectWithValue }) => {
    try {
      const res = await api.post(`/support/${id}/message`, { message });
      return res.data.ticket;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);


/* ==========================================================
   SLICE
========================================================== */
const supportTicketSlice = createSlice({
  name: "support",
  initialState: {
    tickets: [],
    myTickets: [],
    ticketDetails: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      /* CREATE TICKET */
      .addCase(createTicket.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.myTickets.unshift(action.payload);
      })
      .addCase(createTicket.rejected, (state) => {
        state.loading = false;
      })

      /* GET MY TICKETS */
      .addCase(getMyTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.myTickets = action.payload;
      })
      .addCase(getMyTickets.rejected, (state) => {
        state.loading = false;
      })

      /* GET ALL TICKETS */
      .addCase(getAllTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(getAllTickets.rejected, (state) => {
        state.loading = false;
      })

      /* GET TICKET BY ID */
      .addCase(getTicketById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTicketById.fulfilled, (state, action) => {
        state.loading = false;
        state.ticketDetails = action.payload;
      })
      .addCase(getTicketById.rejected, (state) => {
        state.loading = false;
      })

      /* UPDATE TICKET */
      .addCase(updateTicket.fulfilled, (state, action) => {
        state.ticketDetails = action.payload;
      })

      /* DELETE TICKET */
      .addCase(deleteTicket.fulfilled, (state, action) => {
        state.myTickets = state.myTickets.filter((t) => t._id !== action.payload);
        state.tickets = state.tickets.filter((t) => t._id !== action.payload);
      })

      /* ADD MESSAGE */
      .addCase(addMessage.fulfilled, (state, action) => {
        state.ticketDetails = action.payload;
      });
  },
});

export default supportTicketSlice.reducer;
