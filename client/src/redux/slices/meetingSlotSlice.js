import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { api } from "./api";


// Create Slots
export const createMeetingSlots =
  createAsyncThunk(
    "meetingSlots/create",
    async (
      slotDates,
      { rejectWithValue }
    ) => {
      try {
        const { data } =
          await api.post(
            `/slots/bulk-create`,
            { slotDates }
          );

        return data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data ||
            error.message
        );
      }
    }
  );

// Get Slots
export const getMeetingSlots =
  createAsyncThunk(
    "meetingSlots/getAll",
    async (_, { rejectWithValue }) => {
      try {
        const { data } =
          await api.get(
            `/slots/all`
          );

        return data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data ||
            error.message
        );
      }
    }
  );

const meetingSlotSlice =
  createSlice({
    name: "meetingSlots",

    initialState: {
      loading: false,
      slots: [],
      success: false,
      error: null,
    },

    reducers: {
      resetMeetingSlotState: (
        state
      ) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      },
    },

    extraReducers: (builder) => {
      builder

        // CREATE
        .addCase(
          createMeetingSlots.pending,
          (state) => {
            state.loading = true;
            state.error = null;
          }
        )
        .addCase(
          createMeetingSlots.fulfilled,
          (
            state,
            action
          ) => {
            state.loading = false;
            state.success = true;
          }
        )
        .addCase(
          createMeetingSlots.rejected,
          (
            state,
            action
          ) => {
            state.loading = false;
            state.error =
              action.payload?.message ||
              "Failed";
          }
        )

        // GET ALL
        .addCase(
          getMeetingSlots.pending,
          (state) => {
            state.loading = true;
            state.error = null;
          }
        )
        .addCase(
          getMeetingSlots.fulfilled,
          (
            state,
            action
          ) => {
            state.loading = false;
            state.slots =
              action.payload.data;
          }
        )
        .addCase(
          getMeetingSlots.rejected,
          (
            state,
            action
          ) => {
            state.loading = false;
            state.error =
              action.payload?.message ||
              "Failed";
          }
        );
    },
  });

export const {
  resetMeetingSlotState,
} = meetingSlotSlice.actions;

export default meetingSlotSlice.reducer;