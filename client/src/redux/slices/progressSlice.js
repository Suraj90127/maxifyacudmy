import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api.js";

/* ================= SAVE VIDEO PROGRESS ================= */
export const saveVideoProgress = createAsyncThunk(
  "progress/saveVideo",
  async (body, { rejectWithValue }) => {
    try {
      const res = await api.put("/progress/save", body);
      return res.data.data;
      /*
        {
          course_id,
          videos: [{ video_id, watchedDuration, completed }]
        }
      */
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to save progress"
      );
    }
  }
);

/* ================= GET USER COURSE PROGRESS ================= */
export const getUserCourseProgress = createAsyncThunk(
  "progress/getUserCourseProgress",
  async (courseId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/progress/course/${courseId}`);
      return res.data;
      /*
        {
          course_id,
          videos: [],
          completedVideos,
          totalVideos,
          course_percent
        }
      */
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load progress"
      );
    }
  }
);

/* ================= SLICE ================= */
const progressSlice = createSlice({
  name: "progress",
  initialState: {
    course_id: null,

    // 🔥 video-wise progress
    videos: [],

    // 🔥 course summary
    completedVideos: 0,
    totalVideos: 0,
    course_percent: 0,

    loading: false,
    error: null,
  },

  reducers: {
    clearProgress: (state) => {
      state.course_id = null;
      state.videos = [];
      state.completedVideos = 0;
      state.totalVideos = 0;
      state.course_percent = 0;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ---------- SAVE VIDEO PROGRESS ---------- */
      .addCase(saveVideoProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveVideoProgress.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload) return;

        state.course_id = action.payload.course_id;

        // ✅ MERGE videos (overwrite mat karo)
        action.payload.videos?.forEach((incoming) => {
          const index = state.videos.findIndex(
            (v) => v.video_id === incoming.video_id
          );

          if (index !== -1) {
            state.videos[index] = incoming;
          } else {
            state.videos.push(incoming);
          }
        });
      })
      .addCase(saveVideoProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- GET COURSE PROGRESS (PAGE VISIT) ---------- */
      .addCase(getUserCourseProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserCourseProgress.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload) return;

        state.course_id = action.payload.course_id;
        state.videos = action.payload.videos || [];

        state.completedVideos = action.payload.completedVideos || 0;
        state.totalVideos = action.payload.totalVideos || 0;
        state.course_percent = action.payload.course_percent || 0;
      })
      .addCase(getUserCourseProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProgress } = progressSlice.actions;
export default progressSlice.reducer;
