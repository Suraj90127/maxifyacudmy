import React, { useEffect, useRef } from "react";
import {
  Star,
  Play,
  Users,
  Clock,
  Award,
  Zap,
  BookOpen,
  CheckCircle,
  Flame,
  Gift,
} from "lucide-react";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/* REDUX */
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../../redux/slices/courseSlice";
import { getAllCategories } from "../../../redux/slices/categoryCourseSlice";
import { getPurchasesByUser } from "../../../redux/slices/purchaseSlice";

// Import Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Courses() {
  const dispatch = useDispatch();
  const swiperRef = useRef(null);

  // =========================================
  // REDUX STATE
  // =========================================

  const {
    courses = [],
    loading: coursesLoading,
    error,
  } = useSelector((state) => state.courses);

  const { categories = [] } = useSelector((state) => state.categoryCourse);

  // GET PURCHASES FROM PURCHASE SLICE
  const { 
    myPurchases = [], 
    loading: purchasesLoading 
  } = useSelector((state) => state.purchase || {});

  // Create a Set of purchased/enrolled course IDs
  const enrolledCourseIds = new Set(
    myPurchases
      .filter(purchase => purchase?.enrolled === true)
      .map(purchase => purchase?.course_id?._id)
      .filter(id => id)
  );

  // =========================================
  // FETCH DATA
  // =========================================

  useEffect(() => {
    dispatch(getAllCourses());
    dispatch(getAllCategories());
    dispatch(getPurchasesByUser());
  }, [dispatch]);

  // =========================================
  // FILTER COURSES
  // =========================================

  const filteredCourses = courses.filter((course) =>
    categories.some((cat) => cat._id === course.category_id)
  );

  // Course Card Component
  const CourseCard = ({ item, index }) => {
    const isPurchased = enrolledCourseIds.has(item._id);
    const categoryName = categories.find((cat) => cat._id === item.category_id)?.name || "Course";
    const rating = Number(item.average_rating) || 4.9;
    const reviewCount = item.review_count || 0;
    const students = item.review_count ? item.review_count * 5 : 1200;

    return (
      <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-premium transition-all duration-300 flex flex-col h-full border border-gray-100 hover:-translate-y-1 mb-10">
        
        {/* THUMBNAIL */}
        <div className="relative overflow-hidden h-52">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
          <img
            src={item.image || "https://via.placeholder.com/400x250"}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute top-4 left-4 bg-white/95 text-purple-600 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm z-20">
            {categoryName}
          </span>
          <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-2 py-1 rounded-lg flex items-center gap-1 z-20">
            <Clock size={12} />
            <span>Premium Course</span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-5 flex flex-col flex-grow">
          {/* TITLE */}
          <h3 className="text-base font-bold text-gray-900 leading-snug mb-2 line-clamp-2 min-h-[48px]">
            {item.title}
          </h3>

          {/* RATINGS */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold text-gray-900 ml-1">
                  {rating.toFixed(1)}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                ({reviewCount} reviews)
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={12} className="text-gray-400" />
              <span className="text-xs text-gray-600">
                {students.toLocaleString()} students
              </span>
            </div>
          </div>

          {/* EXTRA INFO */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-1">
              <Award size={12} className="text-purple-500" />
              <span className="text-xs text-gray-600">All Levels</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap size={12} className="text-yellow-500" />
              <span className="text-xs text-gray-600">Industry Ready</span>
            </div>
          </div>

          {/* FEATURES */}
          <div className="flex flex-wrap gap-2 mb-4">
            {["Certificate", "Lifetime Access", "Projects"].map((feature, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full"
              >
                <CheckCircle size={10} />
                {feature}
              </span>
            ))}
          </div>

          {/* FOOTER */}
          <div className="mt-auto pt-4 border-t border-gray-100">
            
            {/* PRICE SECTION - Show "Enrolled" badge if purchased, otherwise show price */}
            <div className="mb-4">
              {isPurchased ? (
                // Show "Enrolled" badge in place of price
                <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl py-3 px-4">
                  <CheckCircle size={20} className="text-green-600" />
                  <span className="text-lg font-bold text-green-700">Enrolled</span>
                </div>
              ) : (
                // Show price details
                <>
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    {Number(item.price) === 0 ? (
                      <p className="text-2xl font-bold text-purple-600">₹0</p>
                    ) : (
                      <>
                        <p className="text-2xl font-bold text-purple-600">
                          ₹{item.discount_price || item.price}
                        </p>
                        {item.discount_price && (
                          <p className="text-sm text-gray-400 line-through">
                            ₹{item.price}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
                      <Gift size={10} />
                      Save Big
                    </span>
                    {item.referral_commission > 0 && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-orange-700 bg-orange-50 px-2.5 py-1 rounded-full">
                        Refer & Earn {item.referral_commission}%
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* BUTTON */}
            {isPurchased ? (
              <Link to={`/course-info/${item._id}`}>
                <div className="w-full bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl py-3 px-4 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 group-hover:shadow-lg cursor-pointer">
                  Continue Learning
                  <Play size={14} />
                </div>
              </Link>
            ) : (
              <Link to={`/course-info/${item._id}`}>
                <div className="w-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl py-3 px-4 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 group-hover:shadow-lg cursor-pointer">
                  Enroll Now
                  <Play size={14} />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-6 md:py-8" id="courses">
      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-full mb-4">
            <BookOpen size={14} className="text-purple-600" />
            <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
              Start Learning Today
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Popular{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Courses
            </span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
            Choose from our most popular courses and start your learning journey today.
            <span className="block text-sm text-purple-600 font-semibold mt-1">
              {filteredCourses?.length || 0}+ premium courses available
            </span>
          </p>
        </motion.div>

        {/* LOADING STATES */}
        {(coursesLoading || purchasesLoading) && (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="text-center py-16">
            <p className="text-red-500 text-lg font-semibold">{error}</p>
          </div>
        )}

        {/* EMPTY */}
        {!coursesLoading && !purchasesLoading && filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-gray-800">No Courses Found</h3>
            <p className="text-gray-500 mt-2">Please check back later.</p>
          </div>
        )}

        {/* COURSES */}
        {!coursesLoading && !purchasesLoading && filteredCourses.length > 0 && (
          <>
            {/* Desktop Swiper View */}
            <div className="hidden md:block mt-12 md:mt-16 mb-3">
              <Swiper
                ref={swiperRef}
                spaceBetween={24}
                slidesPerView={1}
                breakpoints={{
                  768: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 4, spaceBetween: 20 },
                }}
                className="courses-swiper"
              >
                {filteredCourses.map((item, index) => (
                  <SwiperSlide key={item._id}>
                    <CourseCard item={item} index={index}/>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation Buttons */}
              <div className="flex justify-center items-center gap-4 -mt-3">
                <button
                  onClick={() => swiperRef.current?.swiper?.slidePrev()}
                  className="w-10 h-10 rounded-full bg-white shadow-md hover:bg-purple-600 hover:text-white transition-all duration-300 flex items-center justify-center text-purple-600 border border-gray-200"
                >
                  ←
                </button>
                <button
                  onClick={() => swiperRef.current?.swiper?.slideNext()}
                  className="w-10 h-10 rounded-full bg-white shadow-md hover:bg-purple-600 hover:text-white transition-all duration-300 flex items-center justify-center text-purple-600 border border-gray-200"
                >
                  →
                </button>
              </div>
            </div>

            {/* Mobile Grid View */}
            <div className="block md:hidden mt-12 grid gap-6 sm:gap-8 mb-4">
              {filteredCourses.map((item, index) => (
                <CourseCard key={item._id} item={item} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}