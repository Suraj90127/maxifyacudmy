import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaChevronRight,
  FaClock,
} from "react-icons/fa";
import UserLayout from "../../Layouts/UserLayout";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../../redux/slices/blogSlice";
import {
  subscribeUser,
  clearSubscriptionState,
} from "../../redux/slices/subscriptionSlice";

// Toast
import { toast } from "react-toastify";

const BlogPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* ================= BLOG STATE ================= */
  const { blogs, loading } = useSelector((state) => state.blogs);

  // ✅ HARD SAFETY: blogs will ALWAYS be array
  const safeBlogs = Array.isArray(blogs) ? blogs : [];

  /* ================= SUBSCRIBE STATE ================= */
  const [email, setEmail] = useState("");

  const {
    loading: subLoading,
    message,
    error: subError,
  } = useSelector((state) => state.subscription);

  /* ================= FETCH BLOGS ================= */
  useEffect(() => {
    dispatch(getBlogs());
    window.scrollTo(0, 0);
  }, [dispatch]);

  /* ================= TOAST HANDLING ================= */
  useEffect(() => {
    if (message) {
      toast.success(message);
      setEmail("");
      dispatch(clearSubscriptionState());
    }

    if (subError) {
      toast.error(subError);
      dispatch(clearSubscriptionState());
    }
  }, [message, subError, dispatch]);

  /* ================= HELPERS ================= */
  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleBlogClick = (id) => {
    if (!id) return;
    navigate(`/blogs/${id}`);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }

    dispatch(subscribeUser(email));
  };

  /* ================= RECENT POSTS (SAFE) ================= */
  const recentPosts = useMemo(() => {
    if (!safeBlogs.length) return [];

    return [...safeBlogs]
      .filter((b) => b?.createdAt)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
      .slice(0, 4);
  }, [safeBlogs]);

  return (
    <UserLayout>
      <div className="min-h-screen bg-white text-[#1c1d1f]">
        {/* HEADER */}
        <div className="bg-gray-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto py-16 px-4 md:px-6">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900">
              Our <span className="text-cyan-500">Insights</span> & Blog
            </h1>
            <p className="text-gray-500 mt-4 text-lg max-w-2xl font-medium">
              Expert tips, industry trends, and deep dives into technology and education.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-12 px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* ================= BLOG LIST ================= */}
            <div className="lg:w-2/3">
              {loading ? (
                <div className="flex flex-col items-center py-20">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cyan-500"></div>
                  <p className="mt-4 text-gray-400 font-bold uppercase tracking-widest text-sm">
                    Loading Articles...
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {safeBlogs.length ? (
                    safeBlogs.map((blog) => (
                      <div
                        key={blog?._id}
                        onClick={() => handleBlogClick(blog?._id)}
                        className="group flex flex-col bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-2xl transition-all cursor-pointer"
                      >
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={blog?.image || "/placeholder.jpg"}
                            alt={blog?.title || "Blog"}
                            className="w-full h-full object-cover group-hover:scale-110 transition"
                          />
                        </div>

                        <div className="p-6 flex flex-col flex-1">
                          <div className="flex items-center gap-3 text-gray-400 text-xs font-bold mb-3 uppercase">
                            <span className="flex items-center gap-1.5">
                              <FaCalendarAlt className="text-cyan-500" />
                              {formatDate(blog?.createdAt)}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <FaClock className="text-cyan-500" />5 min read
                            </span>
                          </div>

                          <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-500 transition">
                            {blog?.title || "Untitled Blog"}
                          </h3>

                          <p className="text-gray-500 text-sm mb-6 line-clamp-3">
                            {typeof blog?.content === "string"
                              ? blog.content
                              : "Read our latest article for insights."}
                          </p>

                          <div className="mt-auto pt-5 border-t border-gray-50">
                            <span className="text-cyan-500 font-black text-xs uppercase flex items-center gap-2">
                              Read Full Article <FaChevronRight />
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                      <p className="text-gray-400 font-bold uppercase">
                        No Articles Found
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ================= SIDEBAR ================= */}
            <div className="lg:w-1/3">
              <div className="lg:sticky lg:top-24 space-y-8">
                {/* SUBSCRIBE */}
                <div className="bg-gray-900 rounded-3xl p-8 text-white">
                  <form onSubmit={handleSubscribe}>
                    <h4 className="text-2xl font-black mb-2">
                      Join our Newsletter
                    </h4>
                    <p className="text-gray-400 text-sm mb-6">
                      Get the latest articles delivered to your inbox.
                    </p>

                    <div className="flex bg-white/10 rounded-xl p-1">
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-transparent flex-1 px-4 text-sm outline-none text-white"
                      />
                      <button
                        type="submit"
                        disabled={subLoading}
                        className="bg-cyan-500 text-gray-900 font-bold px-4 py-2 rounded-lg text-sm"
                      >
                        {subLoading ? "Joining..." : "Join"}
                      </button>
                    </div>
                  </form>
                </div>

                {/* RECENT POSTS */}
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                  <h5 className="text-lg font-black mb-6 uppercase">
                    Recent Posts
                  </h5>

                  {recentPosts.length ? (
                    <div className="space-y-6">
                      {recentPosts.map((post) => (
                        <div
                          key={post._id}
                          onClick={() => handleBlogClick(post._id)}
                          className="flex items-center gap-4 cursor-pointer"
                        >
                          <div className="w-20 h-20 rounded-2xl overflow-hidden">
                            <img
                              src={post.image || "/placeholder.jpg"}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h6 className="font-bold text-sm">
                              {post.title}
                            </h6>
                            <p className="text-xs text-gray-400">
                              {formatDate(post.createdAt)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 italic">
                      No recent posts
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default BlogPage;
