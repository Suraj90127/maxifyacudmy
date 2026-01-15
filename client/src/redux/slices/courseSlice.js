// src/redux/slices/courseSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";




export const getAllCourses = createAsyncThunk(
  "courses/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`/course/all`);
      return res.data.courses;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load courses");
    }
  }
);

export const getCourseBySlug = createAsyncThunk(
  "course/getCourseBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const res = await api.get(`/course/getcourse/${slug}`);
      return res.data.course;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch course"
      );
    }
  }
);

export const getCourse = createAsyncThunk(
  "courses/getOne",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/course/${id}`);
      return res.data.course;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load course");
    }
  }
);

export const getCourseContentByCourseId = createAsyncThunk(
  "courses/getContent",
  async (course_id, { rejectWithValue }) => {
    try {
      const res = await api.get(`course/cour/${course_id}`);
      return res.data.contents;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch course content");
    }
  }
);


const courseSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    courseBySlug: null,
    singleCourse: null,
    courseContent: [],
    loading: false,
    error: null,
  },

  reducers: {
    resetCourse: (state) => {
      state.singleCourse = null;
      state.courseBySlug = null;
      state.courseContent = [];
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.singleCourse = action.payload;
      })
      .addCase(getCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getCourseContentByCourseId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCourseContentByCourseId.fulfilled, (state, action) => {
        state.loading = false;
        state.courseContent = action.payload;
      })
      .addCase(getCourseContentByCourseId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getCourseBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCourseBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.courseBySlug = action.payload;
      })
      .addCase(getCourseBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCourse } = courseSlice.actions;
export default courseSlice.reducer;
