
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";


// =====================================================
// ASYNC THUNK → CREATE SUBSCRIPTION
// =====================================================
export const subscribeUser = createAsyncThunk(
  "subscription/subscribeUser",
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/subscription/subscribe", { email });
      return data.message;  // success message
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Subscription failed"
      );
    }
  }
);

// =====================================================
// SUBSCRIPTION SLICE
// =====================================================
const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    loading: false,
    message: null,
    error: null,
  },

  reducers: {
    clearSubscriptionState: (state) => {
      state.message = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // REQUEST STARTED
      .addCase(subscribeUser.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })

      // REQUEST SUCCESS
      .addCase(subscribeUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })

      // REQUEST FAILED
      .addCase(subscribeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// EXPORT ACTION & REDUCER
export const { clearSubscriptionState } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
