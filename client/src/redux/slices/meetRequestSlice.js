// src/redux/slices/meetRequestSlice.js

import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { api } from "./api";

// Create Meeting Request
export const createMeetingRequest = createAsyncThunk(
  "meet/createMeetingRequest",
  async ({ courseId, slotId }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(
        "/meet-request/create",
        { courseId, slotId },
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Get Requests By Course
export const getRequestByCourse = createAsyncThunk(
  "meet/getRequestByCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/meet-request/course/${courseId}`,
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Get Requests By User (Fixed)
export const getRequestByUser = createAsyncThunk(
  "meet/getRequestByUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        '/meet-request/users',
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Get Single Request By ID
export const getSingleMeetingRequest = createAsyncThunk(
  "meet/getSingleMeetingRequest",
  async (requestId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/meet-request/${requestId}`,
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Get All Requests (Admin)
export const getAllMeetingRequests = createAsyncThunk(
  "meet/getAllMeetingRequests",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        "/meet-request/all",
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Approve Request
export const approveMeetingRequest = createAsyncThunk(
  "meet/approveMeetingRequest",
  async ({ id, meetLink, meetPassword }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(
        `/meet-request/approve/${id}`,
        { meetLink, meetPassword },
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Reject Request
export const rejectMeetingRequest = createAsyncThunk(
  "meet/rejectMeetingRequest",
  async ({ id, rejectionReason }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(
        `/meet-request/reject/${id}`,
        { rejectionReason },
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Cancel Request (User can cancel their own pending request)
export const cancelMeetingRequest = createAsyncThunk(
  "meet/cancelMeetingRequest",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(
        `/meet-request/cancel/${id}`,
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Update Request Status (For admin bulk operations)
export const updateRequestStatus = createAsyncThunk(
  "meet/updateRequestStatus",
  async ({ id, status, notes }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(
        `/meet-request/status/${id}`,
        { status, notes },
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Complete Meeting Request (FIXED - Changed from PATCH to PUT to match backend)
export const completeMeetingRequest = createAsyncThunk(
  "meet/completeMeetingRequest",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.put(
        `/meet-request/complete/${id}`,
        {},
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const meetRequestSlice = createSlice({
  name: "meetRequest",

  initialState: {
    loading: false,
    success: false,
    request: null,
    requests: [],
    userRequests: [],
    totalCount: 0,
    currentPage: 1,
    totalPages: 1,
    error: null,
    // Complete operation state
    completeStatus: {
      loading: false,
      success: false,
      error: null,
    },
  },

  reducers: {
    resetMeetRequestState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    
    clearRequests: (state) => {
      state.requests = [];
      state.userRequests = [];
      state.request = null;
    },
    
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    
    clearError: (state) => {
      state.error = null;
    },
    
    // Reset complete status
    resetCompleteStatus: (state) => {
      state.completeStatus = {
        loading: false,
        success: false,
        error: null,
      };
    },
    
    // Update single request in state (utility reducer)
    updateRequestInState: (state, action) => {
      const updatedRequest = action.payload;
      
      // Update in requests array
      if (state.requests && state.requests.length) {
        state.requests = state.requests.map((item) =>
          item._id === updatedRequest._id ? updatedRequest : item
        );
      }
      
      // Update in userRequests array
      if (state.userRequests && state.userRequests.length) {
        state.userRequests = state.userRequests.map((item) =>
          item._id === updatedRequest._id ? updatedRequest : item
        );
      }
      
      // Update current request if it matches
      if (state.request && state.request._id === updatedRequest._id) {
        state.request = updatedRequest;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // Create Meeting Request
      .addCase(createMeetingRequest.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createMeetingRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.request = action.payload.request;
        // Add to requests list if it exists
        if (state.requests) {
          state.requests.unshift(action.payload.request);
        }
        if (state.userRequests) {
          state.userRequests.unshift(action.payload.request);
        }
      })
      .addCase(createMeetingRequest.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // Get Requests By Course
      .addCase(getRequestByCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRequestByCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload.requests || [];
        state.totalCount = action.payload.totalCount || state.requests.length;
        state.totalPages = action.payload.totalPages || 1;
      })
      .addCase(getRequestByCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.requests = [];
      })

      // Get Requests By User (Fixed)
      .addCase(getRequestByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRequestByUser.fulfilled, (state, action) => {
        state.loading = false;
        // Handle different response structures
        state.userRequests = action.payload.requests || action.payload.data || [];
        state.totalCount = action.payload.totalCount || state.userRequests.length;
      })
      .addCase(getRequestByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.userRequests = [];
      })

      // Get Single Meeting Request
      .addCase(getSingleMeetingRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleMeetingRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.request = action.payload.request || action.payload.data;
      })
      .addCase(getSingleMeetingRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.request = null;
      })

      // Get All Requests (Admin)
      .addCase(getAllMeetingRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMeetingRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload.requests || [];
        state.totalCount = action.payload.totalCount || state.requests.length;
        state.totalPages = action.payload.totalPages || 1;
      })
      .addCase(getAllMeetingRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.requests = [];
      })

      // Approve Request
      .addCase(approveMeetingRequest.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(approveMeetingRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        
        const updatedRequest = action.payload.request || action.payload.data;
        
        // Update in requests array
        if (state.requests && state.requests.length) {
          state.requests = state.requests.map((item) =>
            item._id === updatedRequest._id ? updatedRequest : item
          );
        }
        
        // Update in userRequests array
        if (state.userRequests && state.userRequests.length) {
          state.userRequests = state.userRequests.map((item) =>
            item._id === updatedRequest._id ? updatedRequest : item
          );
        }
        
        // Update current request if it matches
        if (state.request && state.request._id === updatedRequest._id) {
          state.request = updatedRequest;
        }
      })
      .addCase(approveMeetingRequest.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // Reject Request
      .addCase(rejectMeetingRequest.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(rejectMeetingRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        
        const updatedRequest = action.payload.request || action.payload.data;
        
        // Update in requests array
        if (state.requests && state.requests.length) {
          state.requests = state.requests.map((item) =>
            item._id === updatedRequest._id ? updatedRequest : item
          );
        }
        
        // Update in userRequests array
        if (state.userRequests && state.userRequests.length) {
          state.userRequests = state.userRequests.map((item) =>
            item._id === updatedRequest._id ? updatedRequest : item
          );
        }
        
        // Update current request if it matches
        if (state.request && state.request._id === updatedRequest._id) {
          state.request = updatedRequest;
        }
      })
      .addCase(rejectMeetingRequest.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // Cancel Request
      .addCase(cancelMeetingRequest.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(cancelMeetingRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        
        const cancelledId = action.payload.request?._id || action.payload.data?._id;
        
        // Remove the cancelled request from arrays
        state.requests = state.requests?.filter(item => item._id !== cancelledId) || [];
        state.userRequests = state.userRequests?.filter(item => item._id !== cancelledId) || [];
        
        if (state.request?._id === cancelledId) {
          state.request = null;
        }
      })
      .addCase(cancelMeetingRequest.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // Update Request Status
      .addCase(updateRequestStatus.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateRequestStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        
        const updatedRequest = action.payload.request || action.payload.data;
        
        // Update in all request arrays
        const updateArray = (arr) => 
          arr?.map(item => item._id === updatedRequest._id ? updatedRequest : item) || arr;
        
        state.requests = updateArray(state.requests);
        state.userRequests = updateArray(state.userRequests);
        
        if (state.request?._id === updatedRequest._id) {
          state.request = updatedRequest;
        }
      })
      .addCase(updateRequestStatus.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // Complete Meeting Request (FIXED)
      .addCase(completeMeetingRequest.pending, (state) => {
        state.completeStatus.loading = true;
        state.completeStatus.success = false;
        state.completeStatus.error = null;
      })
      .addCase(completeMeetingRequest.fulfilled, (state, action) => {
        state.completeStatus.loading = false;
        state.completeStatus.success = true;
        state.completeStatus.error = null;
        
        // Get the completed request from response
        const completedRequest = action.payload.request || action.payload.data;
        
        if (completedRequest) {
          // Update in requests array
          if (state.requests && state.requests.length) {
            state.requests = state.requests.map((item) =>
              item._id === completedRequest._id ? completedRequest : item
            );
          }
          
          // Update in userRequests array
          if (state.userRequests && state.userRequests.length) {
            state.userRequests = state.userRequests.map((item) =>
              item._id === completedRequest._id ? completedRequest : item
            );
          }
          
          // Update current request if it matches
          if (state.request && state.request._id === completedRequest._id) {
            state.request = completedRequest;
          }
        }
      })
      .addCase(completeMeetingRequest.rejected, (state, action) => {
        state.completeStatus.loading = false;
        state.completeStatus.success = false;
        state.completeStatus.error = action.payload;
      });
  },
});

// Export all actions
export const {
  resetMeetRequestState,
  clearRequests,
  setCurrentPage,
  clearError,
  resetCompleteStatus,
  updateRequestInState,
} = meetRequestSlice.actions;

// Selectors for better state management
export const selectMeetRequestLoading = (state) => state.meetRequest.loading;
export const selectMeetRequestSuccess = (state) => state.meetRequest.success;
export const selectMeetRequestError = (state) => state.meetRequest.error;
export const selectAllRequests = (state) => state.meetRequest.requests;
export const selectUserRequests = (state) => state.meetRequest.userRequests;
export const selectSingleRequest = (state) => state.meetRequest.request;
export const selectRequestsCount = (state) => state.meetRequest.totalCount;
export const selectCurrentPage = (state) => state.meetRequest.currentPage;
export const selectTotalPages = (state) => state.meetRequest.totalPages;

// Selectors for complete status (FIXED)
export const selectCompleteStatus = (state) => state.meetRequest.completeStatus;
export const selectCompleteLoading = (state) => state.meetRequest.completeStatus?.loading || false;
export const selectCompleteSuccess = (state) => state.meetRequest.completeStatus?.success || false;
export const selectCompleteError = (state) => state.meetRequest.completeStatus?.error || null;

export default meetRequestSlice.reducer;