import React, { useEffect, useMemo } from "react";
import UserLayout from "../../Layouts/UserLayout";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaStar, FaRegStar, FaPlayCircle } from 'react-icons/fa';

import {
  getAllCourses,
  resetCourse,
} from "../../redux/slices/courseSlice";
import { getAllCategories } from "../../redux/slices/categoryCourseSlice";

export default function Courses() {
  const dispatch = useDispatch();

  const { courses = [], loading } = useSelector((state) => state.courses);
  const { categories = [] } = useSelector((state) => state.categoryCourse);

  useEffect(() => {
    dispatch(resetCourse());
    dispatch(getAllCourses());
    dispatch(getAllCategories());
  }, [dispatch]);

  const filteredCourses = useMemo(() => {
    if (!courses.length || !categories.length) return [];
    return courses.filter((course) =>
      categories.some((cat) => cat._id === course.category_id)
    );
  }, [courses, categories]);

  return (
    <UserLayout>
      <div className="w-full py-8  bg-white ">
        <div className="max-w-7xl mx-auto px-4 lg:px-0">
          {/* HEADER */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-2">
              All Courses
            </h1>
            <p className="text-gray-600">
              Discover professional courses to enhance your career skills.
            </p>
          </div>

          {/* LOADING STATE */}
          {loading && (
            <div className="flex flex-col items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
              <p className="mt-4 text-gray-500">Loading courses...</p>
            </div>
          )}

          {/* NO COURSES */}
          {!loading && filteredCourses.length === 0 && (
            <p className="text-center text-xl py-20 text-gray-500 bg-white rounded-xl shadow-sm">
              No courses found in this category.
            </p>
          )}

          {/* COURSES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((item) => {
              const categoryName = categories.find((cat) => cat._id === item.category_id)?.name || "Course";
              const ratingCount = Math.round(item.average_rating || 0);

              return (
                <Link 
                        to={`/course-info/${item._id}`}>
                <div key={item._id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col hover:shadow-xl transition-shadow duration-300">
                  
                  {/* Thumbnail Section */}
                  <div className="relative group overflow-hidden">
                    <img 
                      src={item.image || "https://via.placeholder.com/400x250"} 
                      alt={item.title} 
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Premium/Category Badge */}
                    <div className="absolute top-4 left-4 bg-[#FF4D4D] text-white text-[10px] font-bold px-3 py-1 rounded flex items-center gap-1 uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                      {categoryName}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-xl font-bold text-gray-800 leading-snug mb-3 line-clamp-2 h-14">
                      {item.title}
                    </h2>

                    <div className="flex justify-between items-center mb-6">
                      <p className="text-gray-500 text-sm font-medium">
                        {item.review_count || 0} Students Rated
                      </p>
                      
                      {/* Rating Stars */}
                      <div className="flex text-[#FFD700] space-x-0.5">
                        {[...Array(5)].map((_, i) => (
                          i < ratingCount ? <FaStar key={i} size={16} /> : <FaRegStar key={i} size={16} className="text-gray-300" />
                        ))}
                      </div>
                    </div>

                    <hr className="border-gray-50 mb-6" />

                    {/* Footer Section: Pricing and CTA */}
                    <div className="mt-auto flex items-center justify-between gap-2">
                      <div className="flex flex-col">
                        {item.discount_price && (
                          <span className="text-gray-400 line-through text-sm font-medium">
                             ₹{item.price}
                          </span>
                        )}
                        <span className="text-xl font-black text-gray-900">
                          ₹{item.discount_price || item.price}
                        </span>
                      </div>

                      <Link 
                        to={`/course-info/${item._id}`}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-2.5 px-5 rounded-full flex items-center gap-2 transition-all text-sm whitespace-nowrap"
                      >
                        <FaPlayCircle size={18} className="text-gray-700" />
                        Enroll Now
                      </Link>
                    </div>
                  </div>
                </div>
                </Link>
              );
            })}
          </div>


        </div>
      </div>
    </UserLayout>
  );
}