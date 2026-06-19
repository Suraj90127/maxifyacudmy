import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./api";

const initialState = {
    loading: false,
    success: false,
    submission: null,
    submissions: [],
    submitted: false,
    error: null,
};

// =========================
// SUBMIT ASSIGNMENT
// =========================
export const submitAssignment = createAsyncThunk(
    "assignmentSubmission/submitAssignment",
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await api.post(
                "/assignment-submission/submit",
                payload
            );

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// =========================
// GET SINGLE SUBMISSION
// =========================
export const getAssignmentSubmission = createAsyncThunk(
    "assignmentSubmission/getAssignmentSubmission",
    async (assignmentId, { rejectWithValue }) => {
        try {
            const { data } = await api.get(
                `/assignment-submission/submission/${assignmentId}`
            );

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// =========================
// GET MY SUBMISSIONS
// =========================
export const getMySubmissions = createAsyncThunk(
    "assignmentSubmission/getMySubmissions",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get(
                "/assignment-submission/my-submissions"
            );

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// =========================
// CHECK SUBMISSION STATUS
// =========================
export const checkAssignmentSubmission = createAsyncThunk(
    "assignmentSubmission/checkAssignmentSubmission",
    async (assignmentId, { rejectWithValue }) => {
        try {
            const { data } = await api.get(
                `/assignment-submission/check/${assignmentId}`
            );

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

const assignmentSubmissionSlice = createSlice({
    name: "assignmentSubmission",
    initialState,

    reducers: {
        resetAssignmentSubmissionState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        },

        clearSubmission: (state) => {
            state.submission = null;
            state.submitted = false;
            state.success = false;
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder

            // =========================
            // SUBMIT ASSIGNMENT
            // =========================
            .addCase(submitAssignment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitAssignment.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.submission = action.payload.data;
                state.submitted = true;
                state.error = null;
            })
            .addCase(submitAssignment.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })

            // =========================
            // GET SINGLE SUBMISSION
            // =========================
            .addCase(getAssignmentSubmission.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAssignmentSubmission.fulfilled, (state, action) => {
                state.loading = false;
                state.submission = action.payload.data;
                state.error = null;
            })
            .addCase(getAssignmentSubmission.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // =========================
            // GET MY SUBMISSIONS
            // =========================
            .addCase(getMySubmissions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMySubmissions.fulfilled, (state, action) => {
                state.loading = false;
                state.submissions = action.payload.data || [];
                state.error = null;
            })
            .addCase(getMySubmissions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // =========================
            // CHECK SUBMISSION
            // =========================
            .addCase(checkAssignmentSubmission.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkAssignmentSubmission.fulfilled, (state, action) => {
                state.loading = false;
                state.submitted = action.payload.submitted;
                state.error = null;
            })
            .addCase(checkAssignmentSubmission.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    resetAssignmentSubmissionState,
    clearSubmission,
} = assignmentSubmissionSlice.actions;

export default assignmentSubmissionSlice.reducer;