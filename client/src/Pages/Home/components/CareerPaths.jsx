import React, { useEffect } from "react";
import {
    Briefcase,
    Palette,
    BarChart3,
    TrendingUp,
    Users,
    Award,
    Rocket,
    Clock,
    Target,
    Zap,
    BookOpen,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCareers } from "../../../redux/slices/careerSlice";

/* ======================================================
   ICON MAPPER
====================================================== */
const iconMap = { Briefcase, Palette, BarChart3 };

/* ======================================================
   COLOR ARRAYS (Same as Courses Component)
====================================================== */
const topBarColors = [
    "bg-blue-500", "bg-purple-500", "bg-pink-500",
    "bg-green-500", "bg-orange-500", "bg-cyan-500"
];
const iconBgColors = [
    "bg-blue-100", "bg-purple-100", "bg-pink-100",
    "bg-green-100", "bg-orange-100", "bg-cyan-100"
];
const iconTextColors = [
    "text-blue-600", "text-purple-600", "text-pink-600",
    "text-green-600", "text-orange-600", "text-cyan-600"
];

/* ======================================================
   COMPONENT
====================================================== */
const CareerPaths = () => {
    const dispatch = useDispatch();
    const { careers, loading } = useSelector((state) => state.career);

    useEffect(() => {
        dispatch(getAllCareers());
    }, [dispatch]);

    return (
        <section className="w-full bg-gradient-to-b from-gray-50 to-white py-6 md:py-6 overflow-hidden">
            <div className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-8">

                {/* ========== HEADER ========== */}
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-full mb-4">
                        <Target size={14} className="text-purple-600" />
                        <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                            Your Future Starts Here
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                        Choose Your{" "}
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Career Path
                        </span>
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
                        Start from zero and build a high-income career with in-demand digital skills.
                        <span className="block text-sm text-purple-600 font-semibold mt-1">
                            No degree required. Just skills that pay.
                        </span>
                    </p>
                </div>

                {/* ========== LOADING ========== */}
                {loading && (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
                    </div>
                )}

                {/* ========== CARDS GRID ========== */}
                {!loading && careers?.length > 0 && (
                    <div className="mt-12 md:mt-16 grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {careers.map((career, index) => {
                            const Icon = iconMap[career?.icon] || Briefcase;
                            const colorIndex = index % topBarColors.length;

                            return (
                                <div
                                    key={career?._id || index}
                                    className="group relative bg-white rounded-2xl shadow-md hover:shadow-premium transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1"
                                >
                                    {/* Top Bar - Dynamic Color */}
                                    <div className={`absolute top-0 left-0 w-full h-1 ${topBarColors[colorIndex]}`}></div>

                                    <div className="p-6">
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`w-14 h-14 rounded-xl ${iconBgColors[colorIndex]} flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
                                                <Icon size={28} className={iconTextColors[colorIndex]} />
                                            </div>
                                            <div className="flex items-center gap-1 bg-green-50 px-2.5 py-1 rounded-lg border border-green-100">
                                                <TrendingUp size={12} className="text-green-600" />
                                                <span className="text-xs font-semibold text-green-600">{career?.growth}</span>
                                            </div>
                                        </div>

                                        {/* Title & Description */}
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{career?.title}</h3>
                                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{career?.desc}</p>

                                        {/* Income */}
                                        <div className="mb-4">
                                            <div className="text-2xl font-bold text-purple-600 mb-0.5">{career?.income}</div>
                                            <p className="text-xs text-gray-500">Starting from {career?.startingIncome}</p>
                                        </div>

                                        {/* Skills */}
                                        <div className="mb-4">
                                            <p className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Skills you'll learn</p>
                                            <div className="flex flex-wrap gap-2">
                                                {career?.skills?.slice(0, 3).map((skill, i) => (
                                                    <span key={i} className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className="flex items-center justify-between mb-4 pt-3 border-t border-gray-100">
                                            <div className="flex items-center gap-2">
                                                <Briefcase size={14} className="text-gray-400" />
                                                <span className="text-xs text-gray-600">{career?.jobs}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock size={14} className="text-gray-400" />
                                                <span className="text-xs text-gray-600">{career?.duration}</span>
                                            </div>
                                        </div>

                                        {/* Companies */}
                                        <div className="mb-5">
                                            <p className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Companies hiring</p>
                                            <div className="flex flex-wrap gap-2">
                                                {career?.companies?.slice(0, 3).map((company, i) => (
                                                    <span key={i} className="text-xs text-gray-600 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg">
                                                        {company}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Button - Same as Courses Component */}
                                        <button className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-md hover:shadow-premium">
                                            <span>Explore Career Roadmap</span>
                                            <Rocket size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* ========== STATS SECTION ========== */}
                <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="bg-white rounded-2xl shadow-md hover:shadow-premium transition-all duration-300 hover:-translate-y-1 text-center p-6 border border-gray-100">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-100 rounded-full mb-3">
                            <Users size={26} className="text-purple-600" />
                        </div>
                        <h4 className="text-2xl font-bold text-gray-900">2500+</h4>
                        <p className="text-sm text-gray-600 mt-1">Successfull Students  </p>
                        <p className="text-xs text-gray-400">In last 2 years</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md hover:shadow-premium transition-all duration-300 hover:-translate-y-1 text-center p-6 border border-gray-100">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mb-3">
                            <Award size={26} className="text-green-600" />
                        </div>
                        <h4 className="text-2xl font-bold text-gray-900">92%</h4>
                        <p className="text-sm text-gray-600 mt-1">Success rate</p>
                        <p className="text-xs text-gray-400">Job within 6 months</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md hover:shadow-premium transition-all duration-300 hover:-translate-y-1 text-center p-6 border border-gray-100">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full mb-3">
                            <Zap size={26} className="text-blue-600" />
                        </div>
                        <h4 className="text-2xl font-bold text-gray-900">75%</h4>
                        <p className="text-sm text-gray-600 mt-1">Avg salary hike</p>
                        <p className="text-xs text-gray-400">After completion</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md hover:shadow-premium transition-all duration-300 hover:-translate-y-1 text-center p-6 border border-gray-100">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-100 rounded-full mb-3">
                            <BookOpen size={26} className="text-orange-600" />
                        </div>
                        <h4 className="text-2xl font-bold text-gray-900">12+</h4>
                        <p className="text-sm text-gray-600 mt-1">Premium courses</p>
                        <p className="text-xs text-gray-400">Industry focused</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CareerPaths;