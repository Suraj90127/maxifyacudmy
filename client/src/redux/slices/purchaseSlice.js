import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api.js";

// ----------------------------------------------------
// 1️⃣ CREATE ORDER (Razorpay)
// ----------------------------------------------------
export const createOrder = createAsyncThunk(
  "purchase/createOrder",
  async ({ amount }, { rejectWithValue }) => {
    try {
      const res = await api.post("/payment/create-order", { amount });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Order creation failed");
    }
  }
);

// ----------------------------------------------------
// 2️⃣ VERIFY PAYMENT
// ----------------------------------------------------
export const verifyPayment = createAsyncThunk(
  "purchase/verifyPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const res = await api.post("/payment/verify-payment", paymentData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Payment verification failed");
    }
  }
);

// ----------------------------------------------------
// 3️⃣ CREATE PURCHASE
// ----------------------------------------------------
export const createPurchase = createAsyncThunk(
  "purchase/createPurchase",
  async ({ course_id,
    purchased_amount,
    coupon_amount = 0,
    is_buy = true,
    email,
    razorpay_payment_id,
    razorpay_order_id,
  }, { rejectWithValue }) => {
    try {
      const res = await api.post("/purchase/create", {
        course_id,
        is_buy,
        purchased_amount,
        coupon_amount,
        email,
        razorpay_payment_id,
        razorpay_order_id,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Purchase failed");
    }
  }
);

// ----------------------------------------------------
// 4️⃣ ENROLL COURSE
// ----------------------------------------------------
export const enrollCourse = createAsyncThunk(
  "purchase/enrollCourse",
  async ({ course_id }, { rejectWithValue }) => {
    try {
      const res = await api.post("/purchase/enroll", { course_id });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Enroll failed");
    }
  }
);

// ----------------------------------------------------
// 5️⃣ GET ALL USER PURCHASES
// ----------------------------------------------------
export const getPurchasesByUser = createAsyncThunk(
  "purchase/getPurchasesByUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/purchase/user/my-purchases");
      return res.data; // contains { message, purchases }
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch purchases");
    }
  }
);

// ----------------------------------------------------
// SLICE
// ----------------------------------------------------
const purchaseSlice = createSlice({
  name: "purchase",
  initialState: {
    loading: false,
    order: null,
    verify: null,
    purchase: null,
    enroll: null,
    myPurchases: [],
    error: null,
  },

  reducers: {
    resetPurchase: (state) => {
      state.loading = false;
      state.order = null;
      state.verify = null;
      state.purchase = null;
      state.enroll = null;
      state.myPurchases = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ---------------------------
      // CREATE ORDER
      // ---------------------------
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------------------------
      // VERIFY PAYMENT
      // ---------------------------
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.verify = action.payload;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------------------------
      // CREATE PURCHASE
      // ---------------------------
      .addCase(createPurchase.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPurchase.fulfilled, (state, action) => {
        state.loading = false;
        state.purchase = action.payload.purchase; // backend returns purchase inside .purchase
      })
      .addCase(createPurchase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------------------------
      // ENROLL COURSE
      // ---------------------------
      .addCase(enrollCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(enrollCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.enroll = action.payload.purchase;
      })
      .addCase(enrollCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------------------------
      // GET USER PURCHASES
      // ---------------------------
      .addCase(getPurchasesByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPurchasesByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.myPurchases = action.payload.purchases; // from backend
      })
      .addCase(getPurchasesByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPurchase } = purchaseSlice.actions;
export default purchaseSlice.reducer;
