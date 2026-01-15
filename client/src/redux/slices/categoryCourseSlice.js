import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

/* ---------------------------------------------
   1) GET ALL CATEGORIES
------------------------------------------------*/
export const getAllCategories = createAsyncThunk(
  "categoryCourse/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/category/all");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error loading categories");
    }
  }
);

/* ---------------------------------------------
   2) GET COURSES BY CATEGORY ID
------------------------------------------------*/
export const getCoursesByCategoryId = createAsyncThunk(
  "categoryCourse/getCoursesByCategoryId",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/category/${id}/courses`);
      return res.data; // { courses: [...], category_name, category_id }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error fetching courses");
    }
  }
);

/* ---------------------------------------------
   SLICE
------------------------------------------------*/
const categoryCourseSlice = createSlice({
  name: "categoryCourse",
  initialState: {
    categories: [],
    totalCategories: 0,

    coursesByCategory: [],   // FIXED
    selectedCategoryId: null,
    selectedCategoryName: "",

    loadingCategories: false,
    loadingCourses: false,

    errorCategories: null,
    errorCourses: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    /* ----------------------------
       GET ALL CATEGORIES
    -----------------------------*/
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.loadingCategories = true;
        state.errorCategories = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loadingCategories = false;
        state.categories = action.payload.categories;
        state.totalCategories = action.payload.total;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loadingCategories = false;
        state.errorCategories = action.payload;
      });

    /* ----------------------------
       GET COURSES BY CATEGORY
    -----------------------------*/
    builder
      .addCase(getCoursesByCategoryId.pending, (state) => {
        state.loadingCourses = true;
        state.errorCourses = null;
      })
      .addCase(getCoursesByCategoryId.fulfilled, (state, action) => {
        state.loadingCourses = false;

        // FIXED — API response format
        state.coursesByCategory = action.payload.courses;
        state.selectedCategoryId = action.payload.category_id;
        state.selectedCategoryName = action.payload.category_name;
      })
      .addCase(getCoursesByCategoryId.rejected, (state, action) => {
        state.loadingCourses = false;
        state.errorCourses = action.payload;
      });
  },
});

export default categoryCourseSlice.reducer;
