import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCalendarAlt, FaVideo, FaLock, FaCheckCircle, FaClock, FaTimesCircle, FaSpinner, FaUserCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

import {
  createMeetingRequest,
  getRequestByCourse,
  resetMeetRequestState,
} from "../redux/slices/meetRequestSlice";

import { getMeetingSlots } from "../redux/slices/meetingSlotSlice";

const MeetingRequest = ({ courseId, onClose }) => {
  const dispatch = useDispatch();
  const [slotId, setSlotId] = useState("");

  const { loading, requests, error, success } = useSelector((state) => state.meetRequest);
  const { slots } = useSelector((state) => state.meetingSlots);

  const getMostRecentRequest = () => {
    if (!requests || requests.length === 0) return null;
    return [...requests].sort((a, b) => 
      new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
    )[0];
  };

  const currentRequest = getMostRecentRequest();

  const getSlotDetails = (slotId) => {
    if (!slotId) return null;
    if (typeof slotId === 'object' && slotId.slotDate) return slotId;
    if (typeof slotId === 'string' && slots && slots.length > 0) {
      return slots.find(slot => slot._id === slotId);
    }
    return null;
  };

  const requestSlot = currentRequest ? getSlotDetails(currentRequest.slot_id) : null;
  
  const hasActiveRequest = currentRequest && 
    (currentRequest.status === "pending" || currentRequest.status === "approved");
  
  const hasCompletedMeeting = currentRequest && 
    currentRequest.status === "approved" && 
    (() => {
      const meetingDate = requestSlot?.slotDate || currentRequest.meetingDate;
      if (meetingDate && new Date(meetingDate) < new Date()) return true;
      return false;
    })();

  const isCompleted = currentRequest?.status === "completed";
  const isApprovedAndCompleted = hasCompletedMeeting || isCompleted;
  
  const canCreateRequest = (!hasActiveRequest && !isApprovedAndCompleted) || 
    currentRequest?.status === "rejected";

  useEffect(() => {
    if (courseId) {
      dispatch(getRequestByCourse(courseId));
    }
    dispatch(getMeetingSlots());
  }, [dispatch, courseId]);

  useEffect(() => {
    if (error) {
      toast.error(error || "Something went wrong!");
      dispatch(resetMeetRequestState());
    }

    if (success) {
      toast.success("Meeting request submitted successfully!");
      dispatch(getRequestByCourse(courseId));
      dispatch(getMeetingSlots());
      dispatch(resetMeetRequestState());
      setSlotId("");
    }
  }, [error, success, dispatch, courseId]);

  const formatDateTime = (dateString) => {
    if (!dateString) return { date: "-", time: "-" };
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  const submitHandler = () => {
    if (!slotId) {
      toast.warning("Please select a meeting date and time");
      return;
    }
    dispatch(createMeetingRequest({ courseId, slotId }));
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Loading state
  if (loading && !requests) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl p-8 text-center">
          <FaSpinner className="animate-spin text-5xl text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading meeting details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>

        <div className="p-6">
          {/* Header - Full original design */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 -mx-6 -mt-6 px-8 py-6 mb-6 rounded-t-2xl">
            <div className="flex items-center justify-center gap-3 mb-2">
              <FaVideo className="text-4xl text-white" />
              <h1 className="text-3xl font-bold text-white">
                Live Meeting Request
              </h1>
            </div>
            <p className="text-blue-100 text-center">
              Request a 1-on-1 meeting with your instructor
            </p>
          </div>

          {/* Show completed meeting message - FULL CONTENT */}
          {isApprovedAndCompleted && (
            <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-5 rounded-lg">
              <div className="flex items-start gap-3">
                <FaUserCheck className="text-green-500 text-xl mt-0.5" />
                <div>
                  <h3 className="font-bold text-green-800 text-lg">
                    Meeting Completed! ✅
                  </h3>
                  <p className="mt-1 text-green-600">
                    You've already had your meeting with the mentor. Multiple meeting requests are not allowed.
                  </p>
                  <div className="mt-3 p-3 bg-green-100 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>📅 Meeting Date:</strong>{" "}
                      {requestSlot?.slotDate
                        ? formatDateTime(requestSlot.slotDate).date + " at " + formatDateTime(requestSlot.slotDate).time
                        : currentRequest.meetingDate 
                          ? formatDateTime(currentRequest.meetingDate).date + " at " + formatDateTime(currentRequest.meetingDate).time
                          : "N/A"}
                    </p>
                    {currentRequest.meetLink && (
                      <p className="text-sm text-green-800 mt-2">
                        <strong>🔗 Meeting Link:</strong>{" "}
                        <a 
                          href={currentRequest.meetLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {currentRequest.meetLink}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Show existing request details - FULL CONTENT */}
          {hasActiveRequest && !isApprovedAndCompleted && (
            <div className="space-y-5">
              {/* Pending State - FULL */}
              {currentRequest?.status === "pending" && (
                <>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-4">
                    <div className="flex items-center gap-3 text-blue-800 mb-3">
                      <FaClock className="text-2xl" />
                      <h3 className="font-bold text-xl">Meeting Request Submitted!</h3>
                    </div>
                    <p className="text-blue-700">
                      Your meeting request has been successfully submitted and is pending approval from the admin.
                    </p>
                    <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>📌 Requested Date:</strong>{" "}
                        {requestSlot?.slotDate
                          ? formatDateTime(requestSlot.slotDate).date + " at " + formatDateTime(requestSlot.slotDate).time
                          : currentRequest.meetingDate 
                            ? formatDateTime(currentRequest.meetingDate).date + " at " + formatDateTime(currentRequest.meetingDate).time
                            : "Loading slot details..."}
                      </p>
                      <p className="text-sm text-blue-800 mt-2">
                        <strong>Request ID:</strong> {currentRequest._id}
                      </p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                    <div className="flex items-center gap-3 text-yellow-800 mb-3">
                      <FaClock className="text-2xl animate-pulse" />
                      <h3 className="font-bold text-xl">Waiting for Admin Approval</h3>
                    </div>
                    <p className="text-yellow-700">
                      Your meeting request has been sent to the admin. You will receive the meeting link once approved.
                    </p>
                    <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>⏰ Note:</strong> You cannot create another request until this one is approved or rejected.
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Approved State - FULL (meeting date in future) */}
              {currentRequest?.status === "approved" && !isApprovedAndCompleted && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 text-green-800 mb-4">
                    <FaCheckCircle className="text-3xl" />
                    <h3 className="font-bold text-2xl">Meeting Approved! 🎉</h3>
                  </div>

                  <div className="bg-white rounded-lg p-4 mb-4 border border-green-200">
                    <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <FaCalendarAlt className="text-green-600" />
                      Meeting Schedule
                    </h4>
                    <div className="space-y-2">
                      <p className="text-gray-800">
                        <strong>📅 Date:</strong>{" "}
                        {requestSlot?.slotDate
                          ? formatDateTime(requestSlot.slotDate).date
                          : currentRequest.meetingDate
                            ? formatDateTime(currentRequest.meetingDate).date
                            : "-"}
                      </p>
                      <p className="text-gray-800">
                        <strong>⏰ Time:</strong>{" "}
                        {requestSlot?.slotDate
                          ? formatDateTime(requestSlot.slotDate).time
                          : currentRequest.meetingTime || 
                            (currentRequest.meetingDate 
                              ? formatDateTime(currentRequest.meetingDate).time 
                              : "-")}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <strong className="block mb-2 text-gray-700">Meeting Link:</strong>
                      <a
                        href={currentRequest.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 break-all flex items-center gap-2"
                      >
                        <FaVideo />
                        {currentRequest.meetLink || "Link will be available soon"}
                      </a>
                    </div>

                    {currentRequest.meetPassword && (
                      <div className="bg-white rounded-lg p-4">
                        <div className="flex items-center gap-2">
                          <FaLock className="text-gray-600" />
                          <strong>Password:</strong>
                          <code className="bg-gray-100 px-3 py-1 rounded font-mono">
                            {currentRequest.meetPassword}
                          </code>
                        </div>
                      </div>
                    )}

                    {currentRequest.meetLink && (
                      <a
                        href={currentRequest.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02]"
                      >
                        🚀 Join Meeting Now
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Show rejected alert and create form - FULL CONTENT */}
          {currentRequest?.status === "rejected" && (
            <>
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-5 rounded-lg">
                <div className="flex items-start gap-3">
                  <FaTimesCircle className="text-red-500 text-xl mt-0.5" />
                  <div>
                    <h3 className="font-bold text-red-800 text-lg">
                      Previous Meeting Request Rejected
                    </h3>
                    <p className="mt-1 text-red-600">
                      Your previous request was rejected. Please select a new date and time below.
                    </p>
                    {currentRequest.adminRemark && (
                      <p className="mt-2 text-sm text-red-600 bg-red-100 p-2 rounded">
                        <strong>Reason:</strong> {currentRequest.adminRemark}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="font-semibold block mb-3 text-gray-700 text-lg">
                    Select New Meeting Date & Time
                  </label>
                  <select
                    value={slotId}
                    onChange={(e) => setSlotId(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-xl p-4 focus:border-blue-500 focus:outline-none transition-colors"
                  >
                    <option value="">
                      -- Choose an available slot --
                    </option>
                    {slots?.map((slot) => {
                      const { date, time } = formatDateTime(slot.slotDate);
                      return (
                        <option key={slot._id} value={slot._id}>
                          {date} at {time}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <button
                  onClick={submitHandler}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <FaSpinner className="animate-spin" />
                      Submitting Request...
                    </span>
                  ) : (
                    "Submit New Meeting Request"
                  )}
                </button>
              </div>
            </>
          )}

          {/* Show form if no request exists - FULL CONTENT */}
          {!currentRequest && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                <p className="text-blue-800">
                  You haven't requested any meeting yet. Fill out the form below to request a meeting.
                </p>
              </div>
              
              <div>
                <label className="font-semibold block mb-3 text-gray-700 text-lg">
                  Select Meeting Date & Time
                </label>
                <select
                  value={slotId}
                  onChange={(e) => setSlotId(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-xl p-4 focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="">
                    -- Choose an available slot --
                  </option>
                  {slots?.map((slot) => {
                    const { date, time } = formatDateTime(slot.slotDate);
                    return (
                      <option key={slot._id} value={slot._id}>
                        {date} at {time}
                      </option>
                    );
                  })}
                </select>
              </div>

              <button
                onClick={submitHandler}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <FaSpinner className="animate-spin" />
                    Submitting Request...
                  </span>
                ) : (
                  "Submit Meeting Request"
                )}
              </button>
            </div>
          )}

          {/* Optional: Show info message when no action possible */}
          {hasActiveRequest && !isApprovedAndCompleted && currentRequest?.status !== "pending" && currentRequest?.status !== "rejected" && (
            <div className="text-center py-8 text-gray-500">
              <FaClock className="text-4xl mx-auto mb-3 text-gray-400" />
              <p>You have an existing meeting request that is being processed.</p>
              <p className="text-sm mt-2">Please wait for admin approval or rejection.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingRequest;