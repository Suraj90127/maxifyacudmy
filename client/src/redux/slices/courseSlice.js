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

export const downloadVideoPdf = createAsyncThunk(
  "course/downloadVideoPdf",
  async ({ contentId, videoId }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/course-content/download-pdf/${contentId}/${videoId}`,
        {
          responseType: "blob",
        }
      );

      let fileName = "lecture.pdf";

      const disposition = response.headers["content-disposition"];

      if (disposition) {
        // filename*=UTF-8''
        const utf8Match = disposition.match(/filename\*=UTF-8''([^;]+)/);

        if (utf8Match) {
          fileName = decodeURIComponent(utf8Match[1]);
        } else {
          const normalMatch = disposition.match(/filename="?([^"]+)"?/);

          if (normalMatch) {
            fileName = normalMatch[1];
          }
        }
      }

      console.log("Downloaded filename:", fileName);

      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      return fileName;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Download failed"
      );
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
    downloadLoading: false,
    downloadError: null,
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
      })
      .addCase(downloadVideoPdf.pending, (state) => {
        state.downloadLoading = true;
        state.downloadError = null;
      })
      .addCase(downloadVideoPdf.fulfilled, (state) => {
        state.downloadLoading = false;
      })
      .addCase(downloadVideoPdf.rejected, (state, action) => {
        state.downloadLoading = false;
        state.downloadError = action.payload;
      });

  },
});

export const { resetCourse } = courseSlice.actions;
export default courseSlice.reducer;
