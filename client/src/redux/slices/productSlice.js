import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "./api";


// ------------------------------------------------------------------
// GET ALL PRODUCTS
// ------------------------------------------------------------------
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`/products/all`);
      return res.data; // { count, products }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ------------------------------------------------------------------
// GET SINGLE PRODUCT
// ------------------------------------------------------------------
export const getSingleProduct = createAsyncThunk(
  "products/getSingleProduct",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/products/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ------------------------------------------------------------------
// SLICE
// ------------------------------------------------------------------
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: null,
    count: 0,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    // ---------------- GET ALL PRODUCTS ----------------
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.count = action.payload.count;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ---------------- GET SINGLE PRODUCT ----------------
    builder
      .addCase(getSingleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
