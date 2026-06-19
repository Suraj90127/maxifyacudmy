import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import { api } from "./api";

/* =========================================================
   GET ALL CAREERS
========================================================= */

export const getAllCareers =
    createAsyncThunk(
        "career/getAllCareers",

        async (
            _,
            { rejectWithValue }
        ) => {
            try {
                const res = await api.get(
                    "/career/all"
                );

                return res.data.careers;
            } catch (err) {
                return rejectWithValue(
                    err.response?.data ||
                    err.message
                );
            }
        }
    );

/* =========================================================
   GET SINGLE CAREER
========================================================= */

export const getCareerById =
    createAsyncThunk(
        "career/getCareerById",

        async (
            id,
            { rejectWithValue }
        ) => {
            try {
                const res = await api.get(
                    `/career/${id}`
                );

                return res.data.career;
            } catch (err) {
                return rejectWithValue(
                    err.response?.data ||
                    err.message
                );
            }
        }
    );

/* =========================================================
   SLICE
========================================================= */

const careerSlice = createSlice({
    name: "career",

    initialState: {
        careers: [],
        singleCareer: null,

        loading: false,
        error: null,
    },

    reducers: {
        clearCareerError: (
            state
        ) => {
            state.error = null;
        },
    },

    extraReducers: (
        builder
    ) => {
        builder

            /* =========================================
               GET ALL CAREERS
            ========================================= */

            .addCase(
                getAllCareers.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                getAllCareers.fulfilled,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.careers =
                        action.payload;
                }
            )

            .addCase(
                getAllCareers.rejected,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.error =
                        action.payload;
                }
            )

            /* =========================================
               GET SINGLE CAREER
            ========================================= */

            .addCase(
                getCareerById.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                getCareerById.fulfilled,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.singleCareer =
                        action.payload;
                }
            )

            .addCase(
                getCareerById.rejected,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.error =
                        action.payload;
                }
            );
    },
});

export const {
    clearCareerError,
} = careerSlice.actions;

export default careerSlice.reducer;