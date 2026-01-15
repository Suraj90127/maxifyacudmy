// redux/slices/socialLinksSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

/* ===============================
   GET SOCIAL LINKS
================================ */
export const fetchSocialLinks = createAsyncThunk(
  "socialLinks/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/social-links/get");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const socialLinksSlice = createSlice({
  name: "socialLinks",
  initialState: {
    links: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSocialLinks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSocialLinks.fulfilled, (state, action) => {
        state.loading = false;
        state.links = action.payload;
      })
      .addCase(fetchSocialLinks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default socialLinksSlice.reducer;
