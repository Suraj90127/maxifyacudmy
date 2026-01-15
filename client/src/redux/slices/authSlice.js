// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { api } from "./api";

api.defaults.withCredentials = true;

const userData = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

/* ============================================================
   1. REGISTER → SEND OTP
============================================================ */
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post(`user/register`, formData);
      toast.success("OTP Sent to Your Email!");
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message);
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* ============================================================
   2. VERIFY OTP → CREATE ACCOUNT
============================================================ */
export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (otp, { rejectWithValue }) => {
    try {
      const res = await api.post(`user/verify-otp`, { otp });
      toast.success("Account Created Successfully!");
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message);
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* ============================================================
   3. LOGIN USER
============================================================ */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post(`user/login`, formData);
      toast.success("Login Successful!");
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message);
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* ============================================================
   4. LOGOUT USER
============================================================ */
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await api.post(`user/logout`);
      toast.success("Logged out!");
      return true;
    } catch (err) {
      toast.error("Logout failed.");
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* ============================================================
   5. GET USER PROFILE
============================================================ */
export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`user/me`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* ============================================================
   6. COMPLETE PROFILE
============================================================ */
export const completeProfile = createAsyncThunk(
  "auth/completeProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post(`user/complete-profile`, formData);
      return res.data.user;
    } catch (err) {
      toast.error(err.response?.data?.message);
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* ============================================================
   7. FORGOT PASSWORD → SEND EMAIL OTP
============================================================ */
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const res = await api.post(`user/forgot-password`, { email });
      toast.success("OTP Sent to Email!");
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message);
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* ============================================================
   8. VERIFY OTP + RESET PASSWORD
============================================================ */
export const verifyOTPAndReset = createAsyncThunk(
  "auth/verifyOTPAndReset",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post(`user/reset-password`, payload);
      toast.success(res.data.message);
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message);
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* ============================================================
   9. CHANGE PASSWORD
============================================================ */
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post(`user/change-password`, payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* ============================================================
   INITIAL STATE
============================================================ */
const initialState = {
  user: userData,
  loading: false,
  otpSent: false,
  otpVerified: false,
};

/* ============================================================
   SLICE
============================================================ */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetOTPState: (state) => {
      state.otpSent = false;
      state.otpVerified = false;
    },
  },
  extraReducers: (builder) => {
    builder

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
      })

      // VERIFY OTP
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.otpVerified = true;

        // 🔥 DIRECT LOGIN
        state.user = action.payload.user;

        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.user)
        );

        // optional (if backend sends token)
        if (action.payload.token) {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(verifyOTP.rejected, (state) => {
        state.loading = false;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;

        localStorage.removeItem("user");
        localStorage.removeItem("token"); // safety
      })

      // GET PROFILE
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })

      // COMPLETE PROFILE
      .addCase(completeProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      });
  },
});

export const { resetOTPState } = authSlice.actions;
export default authSlice.reducer;
