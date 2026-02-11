import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

/* =====================================================
   1️⃣ CREATE ORDER (LOGIN + GUEST SUPPORT)
===================================================== */
export const createOrder = createAsyncThunk(
  "amount/createOrder",
  async ({ amount, email, phone }, { rejectWithValue }) => {
    try {
      const payload = { amount };

      if (email && phone) {
        payload.email = email;
        payload.phone = phone;
      }

      const res = await api.post("/amount/create-order", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Order creation failed"
      );
    }
  }
);

/* =====================================================
   2️⃣ VERIFY PAYMENT
===================================================== */
export const verifyPayment = createAsyncThunk(
  "amount/verifyPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const res = await api.post("/amount/verify-payment", paymentData);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Payment verification failed"
      );
    }
  }
);

/* =====================================================
   3️⃣ CREATE PURCHASE
===================================================== */
export const createPurchase = createAsyncThunk(
  "amount/createPurchase",
  async (
    {
      course_id,
      purchased_amount,
      coupon_amount = 0,
      is_buy = true,
      email,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature, // ✅ ADD THIS
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post("/amount/create-purchase", {
        course_id,
        is_buy,
        purchased_amount,
        coupon_amount,
        email,
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature, // ✅ ADD THIS
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Purchase failed"
      );
    }
  }
);

/* =====================================================
   4️⃣ SAVE FAILED PAYMENT
===================================================== */
export const saveFailedPayment = createAsyncThunk(
  "amount/saveFailedPayment",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/payment/failure", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to save payment failure"
      );
    }
  }
);

/* =====================================================
   5️⃣ ENROLL COURSE (FREE)
===================================================== */
export const enrollCourse = createAsyncThunk(
  "amount/enrollCourse",
  async ({ course_id }, { rejectWithValue }) => {
    try {
      const res = await api.post("/purchase/enroll", { course_id });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Enroll failed"
      );
    }
  }
);

/* =====================================================
   6️⃣ GET USER PURCHASES
===================================================== */
export const getPurchasesByUser = createAsyncThunk(
  "amount/getPurchasesByUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/purchase/user/my-purchases");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch purchases"
      );
    }
  }
);

/* =====================================================
   SLICE (RENAMED)
===================================================== */
const amountSlice = createSlice({
  name: "amount",
  initialState: {
    loading: false,

    order: null,
    verify: null,
    purchase: null,
    enroll: null,

    myPurchases: [],
    failedPayment: null,

    error: null,
  },

  reducers: {
    resetPurchase: (state) => {
      state.loading = false;
      state.order = null;
      state.verify = null;
      state.purchase = null;
      state.enroll = null;
      state.failedPayment = null;
      state.myPurchases = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.verify = action.payload;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createPurchase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPurchase.fulfilled, (state, action) => {
        state.loading = false;
        state.purchase = action.payload.purchase;
      })
      .addCase(createPurchase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(saveFailedPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveFailedPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.failedPayment = action.payload.failedPayment;
      })
      .addCase(saveFailedPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(enrollCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(enrollCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.enroll = action.payload.purchase;
      })
      .addCase(enrollCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getPurchasesByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPurchasesByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.myPurchases = action.payload.purchases;
      })
      .addCase(getPurchasesByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPurchase } = amountSlice.actions;
export default amountSlice.reducer;
