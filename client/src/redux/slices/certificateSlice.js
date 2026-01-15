import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

/* ================= DOWNLOAD CERTIFICATE ================= */
export const downloadCertificate = createAsyncThunk(
  "certificate/download",
  async (courseId, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `/certificate/download/${courseId}`,
        {
          responseType: "blob",
          withCredentials: true,
        }
      );

      return res.data;
    } catch (err) {
      if (err.response?.data instanceof Blob) {
        const text = await err.response.data.text();
        try {
          const json = JSON.parse(text);
          return rejectWithValue(json.message || "Certificate download failed");
        } catch {
          return rejectWithValue("Certificate download failed");
        }
      }

      return rejectWithValue(
        err.response?.data?.message || "Certificate download failed"
      );
    }
  }
);

const certificateSlice = createSlice({
  name: "certificate",
  initialState: {
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearCertificateState: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(downloadCertificate.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(downloadCertificate.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = "Certificate downloaded successfully 🎉";
      })
      .addCase(downloadCertificate.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Certificate download failed";
      });
  },
});

export const { clearCertificateState } = certificateSlice.actions;
export default certificateSlice.reducer;
