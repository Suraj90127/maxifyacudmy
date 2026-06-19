import React, { useEffect, useRef } from "react";
import {
    TrendingUp,
    CheckCircle2,
    Zap,
} from "lucide-react";

import AnimatedButton from "../../../Components/AnimatedButton";

/* REDUX */
import { useDispatch, useSelector } from "react-redux";
import {
    getAllCategories,
    getCoursesByCategoryId,
} from "../../../redux/slices/categoryCourseSlice";

import { Link } from "react-router-dom";

// Import Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Skills = () => {

    const dispatch = useDispatch();
    const swiperRef = useRef(null);

    // =========================================
    // REDUX STATE
    // =========================================

    const {
        categories = [],
        loadingCategories,
    } = useSelector(
        (state) => state.categoryCourse
    );

    // =========================================
    // FETCH CATEGORIES
    // =========================================

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    // =========================================
    // HANDLE CLICK
    // =========================================

    const handleCategoryClick = (id) => {
        dispatch(getCoursesByCategoryId(id));
    };

    // =========================================
    // FIXED CARD - NATURAL LOOKING
    // =========================================
    const CategoryCard = ({ category }) => (
        <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden h-full flex flex-col mb-4">
            {/* TOP BAR */}
            <div className="h-1.5 bg-gradient-to-r from-purple-600 to-blue-600 w-full flex-shrink-0" />

            {/* CONTENT */}
            <div className="p-5 md:p-6 flex flex-col flex-grow">
                
                {/* Image + Courses Count */}
                <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 shrink-0">
                        <img
                            src={category.image || "https://maxifyacademy.com/core/resources/views/templates/basic/images/3_2.svg"}
                            alt={category.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.src = "https://maxifyacademy.com/core/resources/views/templates/basic/images/3_2.svg";
                            }}
                        />
                    </div>

                    <div className="bg-gray-50 rounded-lg px-2.5 py-1.5 text-center">
                        <p className="text-xs text-gray-500">Courses</p>
                        <p className="text-sm font-bold text-gray-900">
                            {category.totalCourses > 0 ? `${category.totalCourses}+` : "Coming Soon"}
                        </p>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {category.name}
                </h3>

                {/* Short Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-2 line-clamp-2">
                    {category.desc || "Master industry-ready practical skills with real-world projects."}
                </p>

                {/* Full Description */}
                <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">
                    {category.fulldesc || "Premium learning experience designed for career growth."}
                </p>

                {/* Course Titles */}
                <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2">
                    {category?.courses?.length > 0
                        ? category.courses.slice(0, 2).map((course) => course.title).join(" • ")
                        : "Premium Courses Available"}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                    <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-md">
                        <CheckCircle2 size={12} />
                        Industry Ready
                    </span>
                    <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs px-2 py-1 rounded-md">
                        <TrendingUp size={12} />
                        High Demand
                    </span>
                </div>

                {/* Button - Always at bottom */}
                <div className="mt-auto">
                    <Link
                        to={`/courses/${category._id}`}
                        onClick={() => handleCategoryClick(category._id)}
                        className="block w-full"
                    >
                        <AnimatedButton text="Explore Program" />
                    </Link>
                </div>
            </div>
        </div>
    );

    return (
        <section className="w-full bg-gradient-to-b from-gray-50 to-white py-2 md:py-6">
            <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">

                {/* HEADER */}
                <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
                    <div className="inline-flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-full mb-4">
                        <Zap size={14} className="text-purple-600" />
                        <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                            CAREER-FOCUSED COURSES
                        </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                        Master Job-Ready {" "}
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Digital Skills
                        </span> {" "}
                        For The Future
                    </h2>

                    <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
                        Learn Web Development, Digital Marketing, Graphic Design, Video Editing, AI Tools, and other in-demand skills through practical projects and industry-focused training.
                        <span className="block text-sm text-purple-600 font-semibold mt-1">
                            100% Practical & Industry-Oriented Learning
                        </span>
                    </p>
                </div>

                {/* LOADER */}
                {loadingCategories && (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-10 h-10 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
                    </div>
                )}

                {/* EMPTY */}
                {!loadingCategories && categories?.length === 0 && (
                    <div className="text-center py-16">
                        <h3 className="text-2xl font-bold text-gray-800">No Categories Found</h3>
                        <p className="text-gray-500 mt-2">Please check back later.</p>
                    </div>
                )}

                {/* CARDS */}
                {!loadingCategories && categories?.length > 0 && (
                    <>
                        {/* Desktop Swiper */}
                        <div className="hidden md:block mt-8">
                            <Swiper
                                ref={swiperRef}
                                modules={[Navigation, Pagination]}
                                spaceBetween={24}
                                slidesPerView={1}
                                breakpoints={{
                                    768: {
                                        slidesPerView: 2,
                                        spaceBetween: 24,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                        spaceBetween: 24,
                                    },
                                }}
                                navigation={false}
                                pagination={{ clickable: true }}
                                className="skills-swiper"
                            >
                                {categories.map((category) => (
                                    <SwiperSlide key={category._id} className="mb-3">
                                        <CategoryCard category={category} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* Navigation Buttons */}
                            <div className="flex justify-center items-center gap-4 mt-8">
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

                        {/* Mobile Grid */}
                        <div className="block md:hidden mt-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {categories.map((category) => (
                                    <CategoryCard key={category._id} category={category} />
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>

            <style jsx>{`
                .skills-swiper {
                    padding-bottom: 0 !important;
                }
                .skills-swiper .swiper-pagination {
                    display: none;
                }
                .skills-swiper .swiper-slide {
                    height: auto !important;
                }
            `}</style>
        </section>
    );
};

export default Skills;