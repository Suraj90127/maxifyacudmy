// src/components/MeetingRequestsPopupInline.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getRequestByUser,
    resetCompleteStatus
} from "../redux/slices/meetRequestSlice";
import { Calendar, Mail, Phone, Clock, CheckCircle, XCircle, Link as LinkIcon, Lock, User, Calendar as CalendarIcon, MessageCircle, Clock as PendingIcon } from 'lucide-react';

const RequestCard = ({ request, type, index }) => {
    const isApproved = type === 'approved';
    const isRejected = type === 'rejected';
    const isPending = type === 'pending';
    const isCompleted = type === 'completed';

    const getCardBorder = () => {
        if (isApproved) return 'border-l-4 border-l-green-500 border border-gray-200';
        if (isRejected) return 'border-l-4 border-l-red-500 border border-gray-200';
        if (isPending) return 'border-l-4 border-l-amber-500 border border-gray-200';
        return 'border-l-4 border-l-purple-500 border border-gray-200';
    };

    const getBadgeColor = () => {
        if (isApproved) return 'bg-green-100 text-green-700';
        if (isRejected) return 'bg-red-100 text-red-700';
        if (isPending) return 'bg-amber-100 text-amber-700';
        return 'bg-purple-100 text-purple-700';
    };

    const getBadgeIcon = () => {
        if (isApproved) return <CheckCircle size={14} className="inline mr-1" />;
        if (isRejected) return <XCircle size={14} className="inline mr-1" />;
        if (isPending) return <PendingIcon size={14} className="inline mr-1" />;
        return <CheckCircle size={14} className="inline mr-1" />;
    };

    const handleJoinMeeting = (e) => {
        e.preventDefault();
        if (request.meetLink) {
            window.open(request.meetLink, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div className={`rounded-xl p-5 mb-4 ${getCardBorder()} bg-white hover:shadow-lg transition-all duration-300`}>
            <div className="flex justify-end mb-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getBadgeColor()}`}>
                    {getBadgeIcon()}
                    {request.status.toUpperCase()}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-600">
                        <User size={18} className="text-gray-400" />
                        <span className="text-sm">
                            <strong className="text-gray-700">Name:</strong> {request.student?.name || request.name || 'N/A'}
                        </span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600">
                        <Mail size={18} className="text-gray-400" />
                        <span className="text-sm">
                            <strong className="text-gray-700">Email:</strong> {request.student?.email || request.email || 'N/A'}
                        </span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600">
                        <Phone size={18} className="text-gray-400" />
                        <span className="text-sm">
                            <strong className="text-gray-700">Mobile:</strong> {request.student?.mobile || request.mobile || 'N/A'}
                        </span>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-600">
                        <Calendar size={18} className="text-gray-400" />
                        <span className="text-sm">
                            <strong className="text-gray-700">Course:</strong> {request.course?.title || request.course?.name || 'Course details not available'}
                        </span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600">
                        <Clock size={18} className="text-gray-400" />
                        <span className="text-sm">
                            <strong className="text-gray-700">Slot Time:</strong> {request.slot?.time || request.meetingTime || 'Not specified'}
                        </span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600">
                        <CalendarIcon size={18} className="text-gray-400" />
                        <span className="text-sm">
                            <strong className="text-gray-700">Requested On:</strong> {new Date(request.createdAt).toLocaleString()}
                        </span>
                    </div>
                </div>

                <div className="space-y-3">
                    {(isApproved || isPending || isCompleted) && (request.meetLink || request.meetPassword) && (
                        <>
                            {request.meetLink && (
                                <div className="flex items-center gap-3">
                                    <LinkIcon size={18} className="text-blue-500" />
                                    <div className="flex-1">
                                        <button
                                            onClick={handleJoinMeeting}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-all duration-300"
                                        >
                                            <LinkIcon size={14} />
                                            Join Meeting
                                        </button>
                                    </div>
                                </div>
                            )}
                            {request.meetPassword && (
                                <div className="flex items-center gap-3">
                                    <Lock size={18} className="text-amber-600" />
                                    <span className="text-sm">
                                        <strong className="text-gray-700">Password:</strong> 
                                        <code className="ml-2 px-2 py-1 bg-gray-100 rounded-md text-amber-600">{request.meetPassword}</code>
                                    </span>
                                </div>
                            )}
                        </>
                    )}

                    {isRejected && (request.adminRemark || request.rejectionReason) && (
                        <div className="flex items-start gap-3">
                            <MessageCircle size={18} className="text-red-500 mt-0.5" />
                            <span className="text-sm">
                                <strong className="text-gray-700">Admin Remark:</strong>
                                <p className="text-gray-600 mt-1">{request.adminRemark || request.rejectionReason}</p>
                            </span>
                        </div>
                    )}

                    {isPending && (
                        <div className="flex items-center gap-3">
                            <PendingIcon size={18} className="text-amber-500" />
                            <span className="text-sm text-amber-600">Waiting for admin approval</span>
                        </div>
                    )}

                    {isCompleted && (
                        <div className="flex items-center gap-3">
                            <CheckCircle size={18} className="text-green-500" />
                            <span className="text-sm text-green-600">Meeting Completed</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const MeetingRequestsPopup = () => {
    const dispatch = useDispatch();
    const { userRequests, loading, error } = useSelector((state) => state.meetRequest);

    const [activeTab, setActiveTab] = useState('pending');
    const [searchTerm, setSearchTerm] = useState('');

    const pendingRequests = userRequests?.filter(req => req.status === 'pending') || [];
    const approvedRequests = userRequests?.filter(req => req.status === 'approved') || [];
    const rejectedRequests = userRequests?.filter(req => req.status === 'rejected') || [];
    const completedRequests = userRequests?.filter(req => req.status === 'completed') || [];

    useEffect(() => {
        dispatch(getRequestByUser());
    }, [dispatch]);

    useEffect(() => {
        return () => {
            dispatch(resetCompleteStatus());
        };
    }, [dispatch]);

    const filterRequests = (requests) => {
        if (!searchTerm) return requests;
        return requests.filter(req => {
            const studentName = req.student?.name || req.name || '';
            const studentEmail = req.student?.email || req.email || '';
            const studentMobile = req.student?.mobile || req.mobile || '';
            const courseTitle = req.course?.title || req.course?.name || '';
            return studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                studentMobile.includes(searchTerm) ||
                courseTitle.toLowerCase().includes(searchTerm.toLowerCase());
        });
    };

    const getCurrentRequests = () => {
        if (activeTab === 'pending') return filterRequests(pendingRequests);
        if (activeTab === 'approved') return filterRequests(approvedRequests);
        if (activeTab === 'rejected') return filterRequests(rejectedRequests);
        return filterRequests(completedRequests);
    };

    const getTabColor = (tab) => {
        if (tab === 'pending') return 'border-amber-500 text-amber-600';
        if (tab === 'approved') return 'border-green-500 text-green-600';
        if (tab === 'rejected') return 'border-red-500 text-red-600';
        return 'border-purple-500 text-purple-600';
    };

    const currentRequests = getCurrentRequests();

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your meeting requests...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-5">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-5">
                        <strong>Error:</strong> {error}
                    </div>
                </div>
            </div>
        );
    }

    if (!userRequests || userRequests.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-16 px-5">
                <div className="max-w-2xl mx-auto text-center bg-white rounded-2xl p-12 shadow-sm border border-gray-100">
                    <div className="text-6xl mb-4">📅</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No Meeting Requests</h2>
                    <p className="text-gray-500">You haven't made any meeting requests yet.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                                My Meeting Requests
                            </h1>
                            <p className="text-gray-500 text-sm">Track and manage all your meeting requests in one place</p>
                        </div>

                        <div className="flex gap-4 bg-gray-50 px-5 py-3 rounded-xl">
                            <div className="text-center">
                                <div className="text-xl font-bold text-amber-600">{pendingRequests.length}</div>
                                <div className="text-xs text-gray-500">Pending</div>
                            </div>
                            <div className="w-px bg-gray-200"></div>
                            <div className="text-center">
                                <div className="text-xl font-bold text-green-600">{approvedRequests.length}</div>
                                <div className="text-xs text-gray-500">Approved</div>
                            </div>
                            <div className="w-px bg-gray-200"></div>
                            <div className="text-center">
                                <div className="text-xl font-bold text-purple-600">{completedRequests.length}</div>
                                <div className="text-xs text-gray-500">Completed</div>
                            </div>
                            <div className="w-px bg-gray-200"></div>
                            <div className="text-center">
                                <div className="text-xl font-bold text-red-600">{rejectedRequests.length}</div>
                                <div className="text-xs text-gray-500">Rejected</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100">
                    <div className="relative">
                        <svg
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search by name, email, course..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full py-3 pl-12 pr-4 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="bg-white rounded-t-xl border-b border-gray-200 overflow-x-auto">
                    <div className="flex px-4">
                        <button
                            onClick={() => setActiveTab('pending')}
                            className={`px-6 py-3 text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                                activeTab === 'pending' 
                                    ? `border-b-2 ${getTabColor('pending').split(' ')[0]} ${getTabColor('pending').split(' ')[1]}`
                                    : 'text-gray-500 border-b-2 border-transparent hover:text-gray-700'
                            }`}
                        >
                            <PendingIcon size={16} className="inline mr-2" />
                            Pending ({pendingRequests.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('approved')}
                            className={`px-6 py-3 text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                                activeTab === 'approved' 
                                    ? `border-b-2 ${getTabColor('approved').split(' ')[0]} ${getTabColor('approved').split(' ')[1]}`
                                    : 'text-gray-500 border-b-2 border-transparent hover:text-gray-700'
                            }`}
                        >
                            <CheckCircle size={16} className="inline mr-2" />
                            Approved ({approvedRequests.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('completed')}
                            className={`px-6 py-3 text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                                activeTab === 'completed' 
                                    ? `border-b-2 ${getTabColor('completed').split(' ')[0]} ${getTabColor('completed').split(' ')[1]}`
                                    : 'text-gray-500 border-b-2 border-transparent hover:text-gray-700'
                            }`}
                        >
                            <CheckCircle size={16} className="inline mr-2" />
                            Completed ({completedRequests.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('rejected')}
                            className={`px-6 py-3 text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                                activeTab === 'rejected' 
                                    ? `border-b-2 ${getTabColor('rejected').split(' ')[0]} ${getTabColor('rejected').split(' ')[1]}`
                                    : 'text-gray-500 border-b-2 border-transparent hover:text-gray-700'
                            }`}
                        >
                            <XCircle size={16} className="inline mr-2" />
                            Rejected ({rejectedRequests.length})
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="bg-white rounded-b-xl p-6 shadow-sm border border-t-0 border-gray-200 min-h-[400px]">
                    {currentRequests.length === 0 ? (
                        <div className="text-center py-16 px-5">
                            <div className="text-5xl mb-4">🔍</div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">No {activeTab} requests found</h3>
                            <p className="text-gray-500 text-sm">
                                {searchTerm ? 'Try adjusting your search terms' : `You don't have any ${activeTab} meeting requests`}
                            </p>
                        </div>
                    ) : (
                        <div>
                            {currentRequests.map((request, index) => (
                                <RequestCard
                                    key={request._id}
                                    request={request}
                                    type={activeTab}
                                    index={index}
                                />
                            ))}

                            {/* Summary Stats */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Total <span className="font-semibold text-gray-800">{currentRequests.length}</span> {activeTab} meeting request{currentRequests.length !== 1 ? 's' : ''}
                                        </p>
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        Last updated: {new Date().toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MeetingRequestsPopup;