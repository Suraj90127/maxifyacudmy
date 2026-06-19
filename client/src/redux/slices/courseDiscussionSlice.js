import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

/* =========================
   CREATE DISCUSSION
========================= */
export const createDiscussion = createAsyncThunk(
    "courseDiscussion/createDiscussion",
    async (formData, { rejectWithValue }) => {
        try {
            const { data } = await api.post(
                "/course-discussions/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || {
                    message: error.message,
                }
            );
        }
    }
);

/* =========================
   GET MY DISCUSSIONS
========================= */
export const getMyDiscussions = createAsyncThunk(
    "courseDiscussion/getMyDiscussions",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get(
                "/course-discussions/my"
            );

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || {
                    message: error.message,
                }
            );
        }
    }
);

/* =========================
   GET DISCUSSION BY ID
========================= */
export const getDiscussionById = createAsyncThunk(
    "courseDiscussion/getDiscussionById",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await api.get(
                `/course-discussions/${id}`
            );

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || {
                    message: error.message,
                }
            );
        }
    }
);

/* =========================
   GET COURSE DISCUSSIONS
========================= */
export const getCourseDiscussions = createAsyncThunk(
    "courseDiscussion/getCourseDiscussions",
    async (courseId, { rejectWithValue }) => {
        try {
            const { data } = await api.get(
                `/course-discussions/course/${courseId}`
            );

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || {
                    message: error.message,
                }
            );
        }
    }
);

/* =========================
   GET VIDEO DISCUSSIONS
========================= */
export const getVideoDiscussions = createAsyncThunk(
    "courseDiscussion/getVideoDiscussions",
    async (videoId, { rejectWithValue }) => {
        try {
            const { data } = await api.get(
                `/course-discussions/video/${videoId}`
            );

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || {
                    message: error.message,
                }
            );
        }
    }
);

/* =========================
   ADD MESSAGE
========================= */
export const addDiscussionMessage = createAsyncThunk(
    "courseDiscussion/addDiscussionMessage",
    async ({ id, message }, { rejectWithValue }) => {
        try {
            const { data } = await api.post(
                `/course-discussions/${id}/message`,
                { message }
            );

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || {
                    message: error.message,
                }
            );
        }
    }
);

const initialState = {
    loading: false,
    success: false,
    error: null,
    message: "",

    discussions: [],
    discussion: null,
};

const courseDiscussionSlice = createSlice({
    name: "courseDiscussion",
    initialState,

    reducers: {
        clearDiscussionState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
            state.message = "";
        },

        clearDiscussionDetails: (state) => {
            state.discussion = null;
        },
    },

    extraReducers: (builder) => {
        builder

            /* CREATE */
            .addCase(createDiscussion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createDiscussion.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;

                if (action.payload.discussion) {
                    state.discussions.unshift(
                        action.payload.discussion
                    );
                }
            })
            .addCase(createDiscussion.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error =
                    action.payload?.message ||
                    "Failed to create discussion";
            })

            /* MY DISCUSSIONS */
            .addCase(getMyDiscussions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMyDiscussions.fulfilled, (state, action) => {
                state.loading = false;
                state.discussions =
                    action.payload.discussions || [];
            })
            .addCase(getMyDiscussions.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.message ||
                    "Failed to fetch discussions";
            })

            /* COURSE DISCUSSIONS */
            .addCase(getCourseDiscussions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCourseDiscussions.fulfilled, (state, action) => {
                state.loading = false;
                state.discussions =
                    action.payload.discussions || [];
            })
            .addCase(getCourseDiscussions.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.message ||
                    "Failed to fetch course discussions";
            })

            /* VIDEO DISCUSSIONS */
            .addCase(getVideoDiscussions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getVideoDiscussions.fulfilled, (state, action) => {
                state.loading = false;
                state.discussions =
                    action.payload.discussions || [];
            })
            .addCase(getVideoDiscussions.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.message ||
                    "Failed to fetch video discussions";
            })

            /* DETAILS */
            .addCase(getDiscussionById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDiscussionById.fulfilled, (state, action) => {
                state.loading = false;
                state.discussion =
                    action.payload.discussion;
            })
            .addCase(getDiscussionById.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.message ||
                    "Failed to fetch discussion";
            })

            /* MESSAGE */
            .addCase(addDiscussionMessage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addDiscussionMessage.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;

                if (action.payload.discussion) {
                    state.discussion =
                        action.payload.discussion;
                }
            })
            .addCase(addDiscussionMessage.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.message ||
                    "Failed to send reply";
            });
    },
});

export const {
    clearDiscussionState,
    clearDiscussionDetails,
} = courseDiscussionSlice.actions;

export default courseDiscussionSlice.reducer;