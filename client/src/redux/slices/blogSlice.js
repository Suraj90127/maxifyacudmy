import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api"; 

// ================================
// GET ALL BLOGS
// ================================
export const getBlogs = createAsyncThunk(
  "blogs/getBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/blogs/blogs");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error fetching blogs");
    }
  }
);

// ================================
// GET SINGLE BLOG
// ================================
export const getSingleBlog = createAsyncThunk(
  "blogs/getSingleBlog",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/blogs/getsingleblog/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error fetching blog");
    }
  }
);

// ================================
// SLICE
// ================================
const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    singleBlog: null,
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // GET BLOGS
      .addCase(getBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET SINGLE BLOG
      .addCase(getSingleBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.singleBlog = action.payload;
      })
      .addCase(getSingleBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default blogSlice.reducer;
