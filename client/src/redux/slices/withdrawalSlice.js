import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

// ---------------------------------------------
// CREATE WITHDRAWAL
// ---------------------------------------------
export const createWithdrawal = createAsyncThunk(
  "withdrawal/createWithdrawal",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/withdrawal/create", formData);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Request failed");
    }
  }
);

// ---------------------------------------------
// GET MY WITHDRAWALS
// ---------------------------------------------
export const getMyWithdrawals = createAsyncThunk(
  "withdrawal/getMyWithdrawals",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/withdrawal/my");
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch");
    }
  }
);

// ---------------------------------------------
// ADMIN - GET ALL WITHDRAWALS
// ---------------------------------------------
export const getAllWithdrawals = createAsyncThunk(
  "withdrawal/getAllWithdrawals",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/withdrawal/admin/all");
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch");
    }
  }
);

// ---------------------------------------------
// ADMIN - UPDATE STATUS
// ---------------------------------------------
export const updateWithdrawalStatus = createAsyncThunk(
  "withdrawal/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/withdrawal/admin/update-status/${id}`, { status });
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update");
    }
  }
);

// ---------------------------------------------
// ADMIN - GET FULL ACCOUNT NUMBER (DECRYPTED)
// ---------------------------------------------
export const getFullAccountNumber = createAsyncThunk(
  "withdrawal/getFullAccount",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/withdrawal/admin/full-account/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch account number");
    }
  }
);

// =================================================================
// SLICE
// =================================================================
const withdrawalSlice = createSlice({
  name: "withdrawal",
  initialState: {
    myWithdrawals: [],
    allWithdrawals: [],
    fullAccountInfo: null,
    loading: false,
    error: null,
    successMessage: null,
  },

  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // CREATE WITHDRAWAL
      .addCase(createWithdrawal.pending, (state) => {
        state.loading = true;
      })
      .addCase(createWithdrawal.fulfilled, (state, action) => {
        state.loading = false;
        state.myWithdrawals.unshift(action.payload);
        state.successMessage = "Withdrawal request submitted successfully";
      })
      .addCase(createWithdrawal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET MY WITHDRAWALS
      .addCase(getMyWithdrawals.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyWithdrawals.fulfilled, (state, action) => {
        state.loading = false;
        state.myWithdrawals = action.payload;
      })
      .addCase(getMyWithdrawals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADMIN GET ALL WITHDRAWALS
      .addCase(getAllWithdrawals.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllWithdrawals.fulfilled, (state, action) => {
        state.loading = false;
        state.allWithdrawals = action.payload;
      })
      .addCase(getAllWithdrawals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADMIN UPDATE STATUS
      .addCase(updateWithdrawalStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateWithdrawalStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Status updated successfully";

        // update inside allWithdrawals list
        state.allWithdrawals = state.allWithdrawals.map((w) =>
          w._id === action.payload._id ? action.payload : w
        );
      })
      .addCase(updateWithdrawalStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADMIN GET FULL ACCOUNT NUMBER
      .addCase(getFullAccountNumber.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFullAccountNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.fullAccountInfo = action.payload;
      })
      .addCase(getFullAccountNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = withdrawalSlice.actions;
export default withdrawalSlice.reducer;
