import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import UserLayout from "../../Layouts/UserLayout";
import {
  getAllCategories,
  getCoursesByCategoryId,
} from "../../redux/slices/categoryCourseSlice";

export default function CategoryCourses() {
  const dispatch = useDispatch();
  const { categoryId } = useParams();

  /* ================= REDUX STATE ================= */
  const {
    categories,
    coursesByCategory,
    loadingCourses,
  } = useSelector((state) => state.categoryCourse || {});

  // ✅ HARD SAFETY — ALWAYS ARRAYS
  const safeCategories = Array.isArray(categories) ? categories : [];
  const safeCourses = Array.isArray(coursesByCategory)
    ? coursesByCategory
    : [];

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categoryId) {
      dispatch(getCoursesByCategoryId(categoryId));
    }
  }, [dispatch, categoryId]);

  /* ================= CURRENT CATEGORY ================= */
  const currentCategory = safeCategories.find(
    (c) => c?._id === categoryId
  );

  return (
    <UserLayout>
      <div className="min-h-screen bg-[#eaf5ff] px-6 md:px-20 py-16">
        {/* ================= HEADER ================= */}
        <div className="mb-10">
          <h2 className="text-[#003366] text-lg tracking-wide mb-2">
            CATEGORY COURSES
          </h2>
          <h1 className="text-3xl font-bold text-[#003366]">
            {currentCategory?.name || "Category"} Courses
          </h1>
        </div>

        {/* ================= LOADER ================= */}
        {loadingCourses && (
          <p className="text-center text-xl font-semibold py-10">
            Loading courses...
          </p>
        )}

        {/* ================= EMPTY STATE ================= */}
        {!loadingCourses && safeCourses.length === 0 && (
          <p className="text-center text-lg font-semibold py-10">
            No courses available in this category.
          </p>
        )}

        {/* ================= COURSES GRID ================= */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {!loadingCourses &&
            safeCourses.map((course) => (
              <Link
                to={`/course-info/${course?._id}`}
                key={course?._id}
                className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition"
              >
                {/* Image */}
                <img
                  src={
                    course?.image ||
                    "https://fastly.picsum.photos/id/56/600/400.jpg?hmac=1sl_D64H1Wj5F1OPjA6GuBlU4MPbb_OiNzl0xGpShO8"
                  }
                  alt={course?.title || "Course"}
                  className="h-48 w-full object-cover"
                />

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-[#003366] leading-tight">
                    {course?.title || "Untitled Course"}
                  </h3>

                  <p className="mt-2 text-gray-600 text-sm">
                    {typeof course?.short_description === "string"
                      ? course.short_description.slice(0, 80)
                      : "No description available"}
                    ...
                  </p>

                  {/* Price */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex flex-col">
                      {course?.discount_price ? (
                        <>
                          <span className="text-sm line-through text-red-500">
                            ₹{course?.price}
                          </span>
                          <span className="text-lg font-bold text-[#003366]">
                            ₹{course?.discount_price}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-[#003366]">
                          ₹{course?.price || 0}
                        </span>
                      )}
                    </div>

                    <div className="text-sm px-3 py-1 bg-[#003366] text-white rounded-full">
                      {course?.premium ? "Premium" : "Free"}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </UserLayout>
  );
}
