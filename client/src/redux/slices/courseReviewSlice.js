import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api"; // <-- your axios instance

// -----------------------------------------------------
// 🔥 1) Fetch All Course Review Stats (Homepage Testimonials)
// -----------------------------------------------------
export const getCourseReviewData = createAsyncThunk(
  "courseReview/getCourseReviewData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/review/allreview");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch review data"
      );
    }
  }
);

// -----------------------------------------------------
// 🔥 2) Fetch Reviews of ONE Course
// -----------------------------------------------------
export const getReviewByCourseId = createAsyncThunk(
  "courseReview/getReviewByCourseId",
  async (courseId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/review/course/${courseId}`);
      return res.data.reviews; // returns array of reviews
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load course reviews"
      );
    }
  }
);

// -----------------------------------------------------
// 🔥 3) Create Review
// -----------------------------------------------------
export const createReview = createAsyncThunk(
  "courseReview/createReview",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/review/create", payload);
      return res.data.review; // created review
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add review"
      );
    }
  }
);

// -----------------------------------------------------
// 🔥 Slice
// -----------------------------------------------------
const courseReviewSlice = createSlice({
  name: "courseReview",
  initialState: {
    reviewData: [],   // for home testimonial
    reviews: [],      // for single course page
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // -----------------------------------------------------
      // ⭐ Get All Course Review Stats (Home Page)
      // -----------------------------------------------------
      .addCase(getCourseReviewData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCourseReviewData.fulfilled, (state, action) => {
        state.loading = false;
        state.reviewData = action.payload;
      })
      .addCase(getCourseReviewData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -----------------------------------------------------
      // ⭐ Get Reviews of ONE Course
      // -----------------------------------------------------
      .addCase(getReviewByCourseId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReviewByCourseId.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload; // overwrite reviews
      })
      .addCase(getReviewByCourseId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -----------------------------------------------------
      // ⭐ Create Review (add to frontend list instantly)
      // -----------------------------------------------------
      .addCase(createReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.unshift(action.payload); // latest review at top
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default courseReviewSlice.reducer;
