import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";


// ================================
// SEND MESSAGE
// ================================
export const sendMessage = createAsyncThunk(
  "contact/sendMessage",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/contact/create`, formData, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// ================================
// GET ALL MESSAGES (ADMIN)
// ================================
export const getAllMessages = createAsyncThunk(
  "contact/getAllMessages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/contact/all`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    loading: false,
    messages: [],
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // SEND MESSAGE
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ALL MESSAGES
      .addCase(getAllMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(getAllMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default contactSlice.reducer;
