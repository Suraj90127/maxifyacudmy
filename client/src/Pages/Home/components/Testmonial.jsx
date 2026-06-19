import React, { useEffect, useState } from "react";
import {
  Star,
  Quote,
  Users,
  TrendingUp,
  Award,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getCourseReviewData } from "../../../redux/slices/courseReviewSlice";

const Testimonials = () => {
  const dispatch = useDispatch();
  const [startIndex, setStartIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [expandedReviews, setExpandedReviews] = useState({});

  const { reviewData, loading } = useSelector((s) => s.courseReview);

  // Convert data
  const testimonials = Array.isArray(reviewData)
    ? reviewData.flatMap((course) =>
        Array.isArray(course?.reviews)
          ? course.reviews.map((r) => ({
              name: r?.reviewer_name || "Student",
              role: course?.course_title || "Learner",
              company: "Maxify Academy",
              income: "Success Story",
              image: "https://i.ibb.co/HfSZgpRc/avatr.avif",
              review: r?.review || "Amazing course experience.",
              rating: r?.rating || 5,
              hike: "100%",
            }))
          : [],
      )
    : [];

  const [itemsToShow, setItemsToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [startIndex, isAutoPlaying, testimonials.length]);

  const nextSlide = () => {
    if (startIndex + 1 <= testimonials.length - itemsToShow) {
      setStartIndex(startIndex + 1);
    } else {
      setStartIndex(0);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    } else {
      setStartIndex(testimonials.length - itemsToShow);
    }
  };

  const toggleReviewExpand = (index) => {
    setExpandedReviews(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Get current visible testimonials
  const visibleTestimonials = testimonials.slice(
    startIndex,
    startIndex + itemsToShow,
  );

  useEffect(() => {
    dispatch(getCourseReviewData());
  }, [dispatch]);

  // Compact Review Card Component
  const CompactReviewCard = ({ t, cardIndex }) => {
    const isExpanded = expandedReviews[cardIndex];
    const maxLength = 80;
    const needsExpand = t.review.length > maxLength;
    
    const displayText = needsExpand && !isExpanded 
      ? t.review.substring(0, maxLength) + "..."
      : t.review;

    return (
      <div className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
        {/* Top Gradient Border */}
        <div className="h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"></div>

        {/* Content - Compact */}
        <div className="p-4 flex flex-col flex-grow">
          
          {/* User Info Section - Name on Top */}
          <div className="flex items-center gap-2.5 mb-3">
            {/* Avatar - Small */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-[2px] opacity-50"></div>
              <img
                src={t.image}
                alt={t.name}
                className="relative w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
              />
            </div>

            {/* Name and Role */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-gray-900 truncate">
                {t.name}
              </h4>
              <div className="flex items-center gap-1 flex-wrap">
                {/* <p className="text-[10px] text-purple-600 font-medium truncate">
                  {t.role}
                </p> */}
                <p className="text-[10px] text-gray-500 truncate">
                  {t.company}
                </p>
              </div>
            </div>
          </div>

          {/* Rating Stars - Compact */}
          <div className="flex gap-0.5 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={`${
                  i < t.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-200"
                }`}
              />
            ))}
          </div>

          {/* Review Text with Show More/Show Less */}
          <div className="mb-2">
            <p className="text-gray-600 text-xs leading-relaxed">
              "{displayText}"
            </p>
            {needsExpand && (
              <button
                onClick={() => toggleReviewExpand(cardIndex)}
                className="text-purple-500 text-[10px] font-semibold mt-1 hover:text-purple-600 transition-colors inline-flex items-center gap-0.5"
              >
                {isExpanded ? (
                  <>Show Less <ChevronUp size={10} /></>
                ) : (
                  <>Show More <ChevronDown size={10} /></>
                )}
              </button>
            )}
          </div>

          {/* Growth Badge - Compact */}
          <div className="inline-flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full w-fit mb-2">
            <TrendingUp size={10} className="text-green-600" />
            <span className="text-[10px] font-semibold text-green-700">
              +{t.hike} Growth
            </span>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <section className="w-full bg-gradient-to-br from-gray-50 via-white to-purple-50/20 py-16">
        <div className="flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  if (!testimonials.length) {
    return (
      <section className="w-full bg-gradient-to-br from-gray-50 via-white to-purple-50/20 py-16">
        <div className="text-center">
          <p className="text-gray-500">No testimonials yet</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-gradient-to-br from-gray-50 via-white to-purple-50/20 py-4 md:py-4 overflow-hidden">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-8 md:mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-purple-100 px-3 py-1.5 rounded-full mb-3">
            <Award size={14} className="text-purple-600" />
            <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider">
              Success Stories
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            What Our{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Students Say
            </span>
          </h2>

          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            Real stories from students who transformed their careers
          </p>

          <div className="inline-flex items-center gap-1.5 bg-purple-50 px-3 py-1 rounded-full mt-3">
            <Users size={12} className="text-purple-600" />
            <span className="text-[11px] font-semibold text-purple-700">
              {testimonials.length}+ Success Stories
            </span>
          </div>
        </motion.div>

        {/* Custom Slider - Centered Buttons */}
        <div className="relative">
          {/* Navigation Arrows - Perfectly Centered */}
          {testimonials.length > itemsToShow && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 md:p-2.5 shadow-md hover:shadow-lg transition-all duration-300 hover:bg-purple-50 group border border-gray-200"
                style={{ transform: 'translateY(-50%)' }}
              >
                <ChevronLeft size={18} className="text-gray-600 group-hover:text-purple-600" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 md:p-2.5 shadow-md hover:shadow-lg transition-all duration-300 hover:bg-purple-50 group border border-gray-200"
                style={{ transform: 'translateY(-50%)' }}
              >
                <ChevronRight size={18} className="text-gray-600 group-hover:text-purple-600" />
              </button>
            </>
          )}

          {/* Cards Container */}
          <div className="overflow-hidden mb-5 px-6 md:px-8">
            <motion.div
              className={`grid gap-4 transition-all duration-500 ease-in-out ${
                itemsToShow === 4
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                  : itemsToShow === 2
                    ? "grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1"
              }`}
            >
              <AnimatePresence mode="wait">
                {visibleTestimonials.map((t, idx) => {
                  const globalIndex = startIndex + idx;
                  return (
                    <motion.div
                      key={`${startIndex}-${idx}`}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className="h-full pb-4"
                    >
                      <CompactReviewCard t={t} cardIndex={globalIndex} />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Progress Indicator - Compact */}
          {testimonials.length > itemsToShow && (
            <div className="text-center mt-5">
              <p className="text-[10px] text-gray-400">
                {startIndex + 1} - {Math.min(startIndex + itemsToShow, testimonials.length)} of {testimonials.length}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;