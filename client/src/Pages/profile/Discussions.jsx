import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
} from "lucide-react";
import { getMyDiscussions } from "../../redux/slices/courseDiscussionSlice";

const MyDiscussions = () => {
  const dispatch = useDispatch();

  const { discussions, loading, error } = useSelector(
    (state) => state.courseDiscussion,
  );

  useEffect(() => {
    dispatch(getMyDiscussions());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading discussions...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Discussions</h1>
        <p className="text-gray-500 mt-2">Track all your course discussions</p>
      </div>

      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {discussions?.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          <h3 className="text-xl font-semibold">No Discussions Found</h3>
        </div>
      ) : (
        <div className="grid gap-6">
          {discussions?.map((discussion) => (
            <Link
              key={discussion._id}
              to={`/discussion/${discussion._id}`}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-3 items-center mb-3">
                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                      <BookOpen size={14} className="inline mr-1" />
                      {discussion?.course_id?.title}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        discussion.status === "Closed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {discussion.status === "Closed" ? (
                        <>
                          <CheckCircle size={14} className="inline mr-1" />
                          Closed
                        </>
                      ) : (
                        <>
                          <Clock size={14} className="inline mr-1" />
                          Open
                        </>
                      )}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {discussion.title}
                  </h2>

                  <p className="text-gray-600 line-clamp-2">
                    {discussion.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-5 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <MessageCircle size={16} />
                    {discussion.messages?.length || 0} Messages
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {new Date(discussion.createdAt).toLocaleDateString()}
                  </div>

                  <div className="flex items-center gap-2">
                    📎 {discussion.attachments?.length || 0} Files
                  </div>
                </div>
              </div>

              {discussion.attachments?.length > 0 && (
                <div className="flex gap-2 mt-4 overflow-x-auto">
                  {discussion.attachments.slice(0, 4).map((file) => (
                    <img
                      key={file._id}
                      src={file.fileUrl}
                      alt=""
                      className="w-16 h-16 rounded-lg object-cover border"
                    />
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDiscussions;
