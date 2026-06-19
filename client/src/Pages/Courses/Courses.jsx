import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";

import UserLayout from "../../Layouts/UserLayout";

import {
  Link,
} from "react-router-dom";

/* REDUX */
import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getAllCourses,
  resetCourse,
} from "../../redux/slices/courseSlice";

import {
  getAllCategories,
} from "../../redux/slices/categoryCourseSlice";

import { getPurchasesByUser } from "../../redux/slices/purchaseSlice";

/* ICONS */
import {
  Search,
  Filter,
  Star,
  Users,
  Clock,
  BookOpen,
  Play,
  TrendingUp,
  Award,
  FileText,
  ChevronRight,
  X,
  CheckCircle,
  Zap,
  Gift,
  Flame,
} from "lucide-react";

/* Framer Motion */
import { motion } from "framer-motion";

export default function Courses() {
  const dispatch = useDispatch();

  // =========================================
  // REDUX
  // =========================================

  const {
    courses = [],
    loading,
  } = useSelector(
    (state) =>
      state.courses
  );

  const {
    categories = [],
  } = useSelector(
    (state) =>
      state.categoryCourse
  );

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
  // STATES
  // =========================================

  const [
    searchTerm,
    setSearchTerm,
  ] = useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("all");

  const [
    isFilterOpen,
    setIsFilterOpen,
  ] = useState(false);

  const [
    visibleCourses,
    setVisibleCourses,
  ] = useState([]);

  const [page, setPage] =
    useState(1);

  const [loadingMore, setLoadingMore] =
    useState(false);

  const loaderRef =
    useRef(null);

  // =========================================
  // FETCH DATA
  // =========================================

  useEffect(() => {
    dispatch(
      resetCourse()
    );

    dispatch(
      getAllCourses()
    );

    dispatch(
      getAllCategories()
    );

    dispatch(getPurchasesByUser());
  }, [dispatch]);

  // =========================================
  // FILTER COURSES
  // =========================================

  const filteredCourses =
    useMemo(() => {
      if (
        !courses.length ||
        !categories.length
      )
        return [];

      return courses
        .filter((course) =>
          categories.some(
            (cat) =>
              cat._id ===
              course.category_id
          )
        )
        .filter((course) => {
          const category =
            categories.find(
              (cat) =>
                cat._id ===
                course.category_id
            );

          const matchesSearch =
            course.title
              ?.toLowerCase()
              .includes(
                searchTerm.toLowerCase()
              );

          const matchesCategory =
            selectedCategory ===
            "all" ||
            category?._id ===
            selectedCategory;

          return (
            matchesSearch &&
            matchesCategory
          );
        });
    }, [
      courses,
      categories,
      searchTerm,
      selectedCategory,
    ]);

  // =========================================
  // LOAD MORE
  // =========================================

  useEffect(() => {
    setVisibleCourses(
      filteredCourses.slice(
        0,
        page * 6
      )
    );
  }, [
    filteredCourses,
    page,
  ]);

  // =========================================
  // RESET PAGINATION
  // =========================================

  useEffect(() => {
    setPage(1);
  }, [
    searchTerm,
    selectedCategory,
  ]);

  // =========================================
  // INFINITE SCROLL
  // =========================================

  useEffect(() => {
    const observer =
      new IntersectionObserver(
        (entries) => {
          if (
            entries[0]
              .isIntersecting &&
            !loadingMore &&
            visibleCourses.length <
            filteredCourses.length
          ) {
            setLoadingMore(
              true
            );

            setTimeout(() => {
              setPage(
                (prev) =>
                  prev + 1
              );

              setLoadingMore(
                false
              );
            }, 500);
          }
        },
        {
          threshold: 0.1,
        }
      );

    if (
      loaderRef.current
    ) {
      observer.observe(
        loaderRef.current
      );
    }

    return () =>
      observer.disconnect();
  }, [
    visibleCourses.length,
    filteredCourses.length,
    loadingMore,
  ]);

  return (
    <UserLayout>
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50">

        {/* ========================================= */}
        {/* HERO SECTION */}
        {/* ========================================= */}

        <div className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-indigo-50 py-12 md:py-16">

          <div className="max-w-[100rem] mx-auto px-5 sm:px-6 lg:px-8">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center"
            >
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-gray-100 mb-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-xs md:text-sm font-semibold text-gray-700">
                  Rated 4.9/5 by 2500+ Students
                </span>
              </div>

              {/* Heading with Gradient */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
                Explore Our{" "}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Premium Courses
                </span>
              </h1>

              <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
                Discover industry-ready courses and upgrade your skills with practical learning.
                <span className="block text-sm text-purple-600 font-semibold mt-1">
                  {filteredCourses.length}+ premium courses available
                </span>
              </p>
            </motion.div>
          </div>
        </div>

        {/* ========================================= */}
        {/* MAIN CONTENT */}
        {/* ========================================= */}

        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

          {/* ========================================= */}
          {/* SEARCH + FILTER */}
          {/* ========================================= */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:block bg-white rounded-2xl shadow-md border border-gray-100 p-4 md:p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">

              {/* SEARCH */}
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              {/* CATEGORY FILTER */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${selectedCategory === "all"
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  All Courses
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => setSelectedCategory(cat._id)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${selectedCategory === cat._id
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ========================================= */}
          {/* MOBILE SEARCH */}
          {/* ========================================= */}

          <div className="md:hidden mb-6 space-y-3">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              onClick={() => setIsFilterOpen(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-semibold"
            >
              <Filter size={18} /> Filter Courses
            </button>
          </div>

          {/* ========================================= */}
          {/* MOBILE FILTER MODAL */}
          {/* ========================================= */}

          {isFilterOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setIsFilterOpen(false)}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Filter Courses</h3>
                  <button onClick={() => setIsFilterOpen(false)}>
                    <X size={24} />
                  </button>
                </div>
                <div className="p-4 space-y-3">
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl font-semibold ${selectedCategory === "all"
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                        : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    All Courses
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat._id}
                      onClick={() => {
                        setSelectedCategory(cat._id);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl font-semibold ${selectedCategory === cat._id
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                          : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================= */}
          {/* RESULT COUNT */}
          {/* ========================================= */}

          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600 text-sm">
              Showing{" "}
              <span className="font-semibold text-purple-600">
                {visibleCourses.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold">
                {filteredCourses.length}
              </span>{" "}
              courses
            </p>
          </div>

          {/* ========================================= */}
          {/* LOADING */}
          {/* ========================================= */}

          {(loading || purchasesLoading) && (
            <div className="flex flex-col items-center py-20">
              <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-500">Loading courses...</p>
            </div>
          )}

          {/* ========================================= */}
          {/* NO COURSES */}
          {/* ========================================= */}

          {!loading && !purchasesLoading &&
            filteredCourses.length === 0 && (
              <div className="text-center py-20">
                <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No courses found
                </h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            )}

          {/* ========================================= */}
          {/* COURSES GRID */}
          {/* ========================================= */}

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleCourses.map((item, index) => {
              const categoryName =
                categories.find((cat) => cat._id === item.category_id)?.name || "Course";
              const rating = Number(item.average_rating) || 4.6;
              const reviewCount = item.review_count || 152;
              const students = item.review_count ? item.review_count * 5 : 760;
              const isPurchased = enrolledCourseIds.has(item._id);

              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="h-full"
                >
                  <Link
                    to={isPurchased ? `/course-info/${item._id}` : `/course-info/${item._id}`}
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-premium transition-all duration-300 flex flex-col h-full border border-gray-100 hover:-translate-y-1"
                  >
                    {/* Best Seller Badge - Only show if not purchased */}
                    {index < 2 && !isPurchased && (
                      <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-lg">
                        <Flame size={12} /> Best Seller
                      </div>
                    )}

                    {/* Image Section */}
                    <div className="relative overflow-hidden flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10"></div>
                      <img
                        src={item.image || "https://via.placeholder.com/400x250"}
                        alt={item.title}
                        className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-purple-600 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm z-20">
                        {categoryName}
                      </span>
                      <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg flex items-center gap-1 z-20">
                        <Clock size={12} /> <span>Premium Course</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-grow">

                      {/* Title */}
                      <h3 className="text-base font-bold text-gray-900 leading-snug mb-2 line-clamp-2 min-h-[2.5rem]">
                        {item.title}
                      </h3>

                      {/* Ratings */}
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

                      {/* Extra Info */}
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

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-4 min-h-[2rem]">
                        {["Certificate", "Lifetime Access", "Projects"].map((feature, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full"
                          >
                            <CheckCircle size={10} /> {feature}
                          </span>
                        ))}
                      </div>

                      {/* Footer - Fixed height section */}
                      <div className="pt-4 border-t border-gray-100 mt-auto">
                        <div className="flex flex-col gap-4">
                          
                          {/* Price Section - Fixed height container */}
                          <div className="min-h-[4rem]">
                            {isPurchased ? (
                              <div className="flex items-center justify-center gap-2 bg-green-50 border border-green-200 rounded-xl py-3 px-4 w-full">
                                <CheckCircle size={20} className="text-green-600" />
                                <span className="text-lg font-bold text-green-700">Enrolled</span>
                              </div>
                            ) : (
                              <div>
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
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

                                <div className="flex flex-wrap items-center gap-2 min-h-[1.75rem]">
                                  <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                    <Gift size={10} /> Save Big
                                  </span>

                                  {item.referral_commission > 0 && (
                                    <span className="inline-flex text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                                      Refer & Earn {item.referral_commission}%
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* CTA Button - Fixed height */}
                          <div className="min-h-[3rem]">
                            {isPurchased ? (
                              <button className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 text-sm flex items-center justify-center gap-2">
                                Continue Learning <Play size={14} />
                              </button>
                            ) : (
                              <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 text-sm flex items-center justify-center gap-2">
                                Enroll Now <Play size={14} />
                              </button>
                            )}
                          </div>

                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* ========================================= */}
          {/* LOAD MORE */}
          {/* ========================================= */}

          {loadingMore && (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            </div>
          )}

          {/* Observer */}
          {visibleCourses.length < filteredCourses.length && !loadingMore && (
            <div ref={loaderRef} className="h-10"></div>
          )}

          {/* ========================================= */}
          {/* WHY US SECTION */}
          {/* ========================================= */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative mt-16 overflow-hidden rounded-3xl border border-purple-100 bg-gradient-to-br from-purple-200 to-blue-200 p-6 md:p-8 shadow-xl shadow-purple-100/50"
          >
            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-purple-100 mb-4">
                  <Award size={14} className="text-purple-600" />
                  <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                    Why Choose Us
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Why Learn{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    With Us?
                  </span>
                </h3>

                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                  Join thousands of students building successful careers.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {[
                  { icon: Award, title: "Expert Mentors", desc: "Industry professionals" },
                  { icon: Play, title: "Live Projects", desc: "Practical experience" },
                  { icon: FileText, title: "Certificate", desc: "Industry recognized" },
                  { icon: TrendingUp, title: "Placement Support", desc: "Hiring assistance" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 md:flex gap-3"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center mb-3">
                      <item.icon size={22} className="text-purple-600" />
                    </div>
                    <span>
                      <p className="font-semibold text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* FAQ Link */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Have questions about our courses?</p>
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:gap-3 transition-all duration-300"
            >
              Visit FAQ Page <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}