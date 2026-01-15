import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaArrowLeft,
  FaClock,
  FaShareAlt,
  FaLayerGroup,
} from "react-icons/fa";
import UserLayout from "../../Layouts/UserLayout";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../../redux/slices/blogSlice";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { blogs, loading } = useSelector((state) => state.blogs);

  // ✅ FORCE blogs to always be an array
  const safeBlogs = Array.isArray(blogs) ? blogs : [];

  useEffect(() => {
    dispatch(getBlogs());
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  // ✅ Safe single blog find
  const blog = safeBlogs.find((b) => b._id === id);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <UserLayout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center">
          <div className="animate-spin h-10 w-10 rounded-full border-t-2 border-cyan-500"></div>
          <p className="mt-4 text-gray-400 font-bold uppercase tracking-widest text-xs">
            Loading Article...
          </p>
        </div>
      </UserLayout>
    );
  }

  /* ================= NOT FOUND ================= */
  if (!blog) {
    return (
      <UserLayout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 mb-2">
              Blog Post Not Found
            </h2>
            <p className="text-gray-500 mb-6">
              The article you are looking for might have been moved.
            </p>
            <button
              onClick={() => navigate("/blogs")}
              className="px-8 py-3 bg-cyan-500 text-white font-black rounded-xl hover:bg-cyan-600 transition-all shadow-lg shadow-cyan-100 uppercase tracking-widest text-sm"
            >
              Return to Feed
            </button>
          </div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="min-h-screen bg-white font-sans text-[#1c1d1f]">
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-100 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
            <button
              onClick={() => navigate("/blogs")}
              className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-500 hover:text-cyan-500"
            >
              <FaArrowLeft /> Back to Blogs
            </button>
            <FaShareAlt className="text-gray-400 hover:text-cyan-500 cursor-pointer" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-16">
          <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
            {/* ================= LEFT ================= */}
            <div className="w-full lg:w-[65%]">
              <div className="flex items-center gap-4 text-cyan-600 mb-6">
                <span className="bg-cyan-50 text-[10px] md:text-xs font-black px-3 py-1 rounded-full uppercase">
                  {blog.category || "Inspiration"}
                </span>
                <span className="text-gray-300">•</span>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 font-bold">
                  <FaClock /> 5 Min Read
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-8">
                {blog.title}
              </h1>

              <div className="rounded-[3rem] overflow-hidden shadow-2xl mb-10">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-[300px] md:h-[500px] object-cover"
                />
              </div>

              <div className="flex items-center gap-3 mb-10 border-y py-6">
                <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold">
                  {blog.author?.charAt(0) || "M"}
                </div>
                <div>
                  <p className="text-sm font-black">{blog.author || "Maxify Team"}</p>
                  <p className="text-xs text-gray-400 font-bold">
                    {formatDate(blog.createdAt)}
                  </p>
                </div>
              </div>

              <article className="prose prose-lg max-w-none">
                <div className="text-gray-700 whitespace-pre-line">
                  {blog.content}
                </div>
              </article>
            </div>

            {/* ================= RIGHT ================= */}
            <div className="w-full lg:w-[35%]">
              <div className="lg:sticky lg:top-8 space-y-8">
                <div className="bg-white rounded-[2rem] border shadow-xl p-8">
                  <h3 className="text-xl font-black mb-8 flex items-center gap-2">
                    <span className="w-2 h-6 bg-cyan-500 rounded-full"></span>
                    Recent Blogs
                  </h3>

                  {safeBlogs.length <= 1 ? (
                    <p className="text-gray-400 italic text-sm">
                      No other articles available.
                    </p>
                  ) : (
                    <div className="space-y-8">
                      {safeBlogs
                        .filter((b) => b._id !== blog._id)
                        .slice(0, 5)
                        .map((recent) => (
                          <div
                            key={recent._id}
                            onClick={() =>
                              navigate(`/blogs/${recent._id}`)
                            }
                            className="flex gap-4 cursor-pointer group"
                          >
                            <div className="w-20 h-20 rounded-2xl overflow-hidden">
                              <img
                                src={recent.image}
                                alt={recent.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition"
                              />
                            </div>
                            <div>
                              <h6 className="font-bold text-[13px] group-hover:text-cyan-500">
                                {recent.title}
                              </h6>
                              <div className="flex items-center text-[10px] text-gray-400 font-bold uppercase">
                                <FaCalendarAlt className="mr-1 text-cyan-500" />
                                {formatDate(recent.createdAt)}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}

                  <button
                    onClick={() => navigate("/blogs")}
                    className="w-full mt-10 py-4 bg-gray-50 text-gray-500 font-black text-xs rounded-xl uppercase hover:bg-cyan-500 hover:text-white"
                  >
                    View All Articles
                  </button>
                </div>

                <div className="bg-gray-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
                  <h4 className="text-xl font-black mb-2">Ready to Learn?</h4>
                  <p className="text-gray-400 text-sm mb-6">
                    Explore our premium courses and start your journey today.
                  </p>
                  <button
                    onClick={() => navigate("/courses")}
                    className="bg-cyan-500 px-6 py-3 rounded-xl font-black text-xs uppercase"
                  >
                    Browse Courses
                  </button>
                  <FaLayerGroup
                    size={120}
                    className="absolute -right-8 -bottom-8 text-white/5"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default BlogDetail;
