import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

export const createLead = createAsyncThunk(
  "lead/create",
  async (leadData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/social-lead/lead", leadData);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const socialLeadSlice = createSlice({
  name: "lead",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },

  reducers: {
    resetLead: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createLead.pending, (state) => {
        state.loading = true;
      })
      .addCase(createLead.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetLead } = socialLeadSlice.actions;
export default socialLeadSlice.reducer;

