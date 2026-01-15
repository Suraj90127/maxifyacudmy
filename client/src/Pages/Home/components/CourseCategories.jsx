import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

/* Redux */
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  getCoursesByCategoryId,
} from "../../../redux/slices/categoryCourseSlice";
import { Link } from "react-router-dom";

export default function CourseCategories() {
  const dispatch = useDispatch();

  const { categories, loadingCategories } = useSelector(
    (state) => state.categoryCourse
  );

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleCategoryClick = (id) => {
    // fetch courses for the clicked category (optional: you can also fetch on the category page)
    dispatch(getCoursesByCategoryId(id));
  };

  return (
    <div className="w-full bg-[#eaf5ff] py-4  px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-start mb-8">
        <div>
          <h2 className="text-[#1a1a1a] text-lg tracking-wide mb-3">
            COURSE CATEGORIES
          </h2>
          <h1 className="text-2xl md:text-3xl font-semibold text-[#1a1a1a]">
            Top Categories You Want to Learn
          </h1>
        </div>

        {/* Button - use motion Link so navigation stays client-side */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="inline-flex items-center bg-[#003366] text-white px-4 w-42 py-3 rounded-full font-semibold shadow-md gap-4 relative mb-4 cursor-pointer"
        >
          <Link
            to="/courses"
            className="flex items-center gap-4 text-white"
            aria-label="Find all courses"
          >
            <span className="text-white font-semibold">Find Courses</span>

            <span className="w-10 h-10 absolute right-1 top-1/2 transform -translate-y-1/2 z-10 flex items-center justify-center bg-white rounded-full text-[#003366] shadow-sm">
              <FiArrowRight size={18} />
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Loader */}
      {loadingCategories && (
        <p className="text-center text-lg font-semibold py-10">
          Loading categories...
        </p>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {!loadingCategories && categories?.length === 0 && (
          <p className="text-center col-span-full py-6">No categories found.</p>
        )}

        {!loadingCategories &&
          categories?.map((cat) => (
            // Key should be on the root element returned by map
            <Link
              to={`/courses/${cat._id}`} // change this route to match your router if needed
              key={cat._id}
              onClick={() => handleCategoryClick(cat._id)}
              aria-label={`Open ${cat.name} category`}
              className="w-full sm:w-auto flex items-center gap-4 bg-white shadow-md rounded-full py-3 px-6 hover:shadow-lg transition cursor-pointer"
            >
              <img
                src={
                  cat.image ||
                  "https://maxifyacademy.com/core/resources/views/templates/basic/images/3_2.svg"
                }
                alt={cat.name || "category image"}
                className="w-16 h-16 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://maxifyacademy.com/core/resources/views/templates/basic/images/3_2.svg";
                }}
              />

              <div className="space-y-2">
                <p className="text-lg font-semibold text-gray-900 leading-tight">
                  {cat.name}
                </p>

                <p className="text-sm text-gray-600">
                  {cat.totalCourses
                    ? `${cat.totalCourses} Courses Available`
                    : "Coming Soon"}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
