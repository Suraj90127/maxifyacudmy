import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

/* ================= GET PROGRESS ================= */
export const getCourseProgress = createAsyncThunk(
  "progress/get",
  async (courseId) => {
    const { data } = await api.get(`/progress/${courseId}`);
    return data.data;
  }
);

/* ================= MARK LECTURE COMPLETE ================= */
export const markLectureCompleted = createAsyncThunk(
  "progress/complete",
  async ({ courseId, lectureId }) => {
    const { data } = await api.put("/progress/complete", {
      courseId,
      lectureId,
    });
    return data.data;
  }
);

const courseProgressSlice = createSlice({
  name: "courseProgress",
  initialState: {
    progress: null,
    loading: false,
  },

  reducers: {
    resetProgress: (state) => {
      state.progress = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCourseProgress.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCourseProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = action.payload;
      })
      .addCase(markLectureCompleted.fulfilled, (state, action) => {
        state.progress = action.payload;
      });
  },
});

export const { resetProgress } = courseProgressSlice.actions;
export default courseProgressSlice.reducer;
