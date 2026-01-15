
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../../redux/slices/courseSlice";
import { getAllCategories } from "../../../redux/slices/categoryCourseSlice";
import { Link } from "react-router-dom";
import { FaStar, FaRegStar, FaPlayCircle } from "react-icons/fa";

export default function Courses() {
  const dispatch = useDispatch();

  // ✅ Safe defaults to avoid undefined errors
  const { courses = [], loading, error } = useSelector(
    (state) => state.courses
  );
  const { categories = [] } = useSelector(
    (state) => state.categoryCourse
  );

  useEffect(() => {
    dispatch(getAllCourses());
    dispatch(getAllCategories());
  }, [dispatch]);

  // ✅ Safe filtering
  const filteredCourses = courses.filter((course) =>
    categories.some((cat) => cat._id === course.category_id)
  );

  return (
    <div className="w-full py-10 bg-white">
      {/* Section Title */}
      <h2 className="text-center text-sm font-semibold text-gray-500 tracking-wide">
        ONLINE COURSES
      </h2>
      <h1 className="text-center text-4xl font-semibold mt-2 mb-10">
        Get Your Course With Us
      </h1>

      {/* Loading */}
      {loading && (
        <p className="text-center text-lg text-gray-600">
          Loading courses...
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-red-600 text-lg">
          {error}
        </p>
      )}

      {/* No Courses */}
      {!loading && filteredCourses.length === 0 && (
        <p className="text-center text-gray-600 text-lg">
          No courses found.
        </p>
      )}

      {/* GRID */}
      <div className="w-full py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-0">
          

          {/* COURSES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((item) => {
              const categoryName =
                categories.find((cat) => cat._id === item.category_id)
                  ?.name || "Course";

              const ratingCount = Math.round(item.average_rating || 0);

              return (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Clickable Area */}
                  <Link to={`/course-info/${item._id}`} className="block">
                    {/* Thumbnail */}
                    <div className="relative group overflow-hidden">
                      <img
                        src={item.image || "https://via.placeholder.com/400x250"}
                        alt={item.title}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 bg-[#FF4D4D] text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-widest">
                        {categoryName}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h2 className="text-xl font-bold text-gray-800 leading-snug mb-3 line-clamp-2 h-14">
                        {item.title}
                      </h2>

                      <div className="flex justify-between items-center mb-6">
                        <p className="text-gray-500 text-sm font-medium">
                          {item.review_count || 0} Students Rated
                        </p>

                        {/* Rating Stars */}
                        <div className="flex space-x-0.5">
                          {[...Array(5)].map((_, i) =>
                            i < ratingCount ? (
                              <FaStar
                                key={i}
                                size={16}
                                className="text-yellow-400"
                              />
                            ) : (
                              <FaRegStar
                                key={i}
                                size={16}
                                className="text-gray-300"
                              />
                            )
                          )}
                        </div>
                      </div>

                      <hr className="border-gray-50 mb-6" />

                      {/* Footer */}
                      <div className="mt-auto flex items-center justify-between gap-2">
                        <div className="flex flex-col">
                          {item.discount_price && (
                            <span className="text-gray-400 line-through text-sm">
                              ₹{item.price}
                            </span>
                          )}
                          <span className="text-xl font-black text-gray-900">
                            ₹{item.discount_price || item.price}
                          </span>
                        </div>

                        <span className="bg-gray-100 text-gray-900 font-bold py-2.5 px-5 rounded-full flex items-center gap-2 text-sm">
                          <FaPlayCircle size={18} />
                          Enroll Now
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
