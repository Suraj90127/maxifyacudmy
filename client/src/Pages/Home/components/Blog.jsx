import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../../../redux/slices/blogSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";

export default function Blog() {
  const dispatch = useDispatch();

  /* ================= REDUX STATE ================= */
  const { blogs, loading, error } = useSelector(
    (state) => state.blogs || {}
  );

  // ✅ HARD SAFETY — ALWAYS ARRAY
  const safeBlogs = Array.isArray(blogs) ? blogs : [];

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  /* ================= TOP BLOGS ================= */
  const topBlogs = useMemo(() => {
    if (!safeBlogs.length) return [];

    return [...safeBlogs]
      .filter((b) => b && b._id)
      .slice(0, 3);
  }, [safeBlogs]);

  const formatDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="w-full bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-cyan-600 font-bold uppercase tracking-[0.2em] text-xs md:text-sm">
            Our Insights
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-3">
            Read Our Latest <span className="text-cyan-600">Articles</span>
          </h2>
          <div className="w-20 h-1.5 bg-cyan-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* ================= LOADING ================= */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-96 bg-gray-200 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        )}

        {/* ================= ERROR ================= */}
        {!loading && error && (
          <div className="bg-cyan-50 text-cyan-600 p-6 rounded-xl text-center border border-cyan-100">
            {error}
          </div>
        )}

        {/* ================= EMPTY ================= */}
        {!loading && !error && topBlogs.length === 0 && (
          <p className="text-center text-gray-500 italic py-10">
            No articles available at the moment.
          </p>
        )}

        {/* ================= BLOG GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {!loading &&
            topBlogs.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to={`/blogs/${item._id}`}
                  className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={
                        item.image ||
                        "https://fastly.picsum.photos/id/56/600/400.jpg?hmac=1sl_D64H1Wj5F1OPjA6GuBlU4MPbb_OiNzl0xGpShO8"
                      }
                      alt={item.title || "Blog"}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-cyan-600 text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg uppercase tracking-wider">
                        {item.category || "General"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <div className="flex items-center text-gray-400 text-xs mb-4 gap-4">
                      <span className="flex items-center gap-1.5">
                        <FaCalendarAlt className="text-cyan-600" />
                        {formatDate(item.createdAt)}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-cyan-600 transition-colors duration-300 mb-3 line-clamp-2 capitalize">
                      {item.title || "Untitled Article"}
                    </h3>

                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
                      {item.short_description ||
                        "Check out our latest blog post for more details and insights on this topic..."}
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center text-cyan-600 font-bold text-sm">
                      <span className="mr-2">Read Article</span>
                      <FaArrowRight className="transform transition-transform group-hover:translate-x-2" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
        </div>

        {/* ================= VIEW ALL ================= */}
        <div className="mt-16 text-center">
          <Link
            to="/blogs"
            className="inline-block px-10 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-cyan-600 transition-all duration-300 shadow-lg"
          >
            View All News
          </Link>
        </div>
      </div>
    </section>
  );
}
