import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  Star,
  Rocket,
  Users,
  CheckCircle,
  Award,
  TrendingUp,
  Clock,
  Play,
  Crown,
  BadgeCheck,
  Eye,
} from "lucide-react";

import { FiArrowRight } from "react-icons/fi";

import AnimatedButton from "../../../Components/AnimatedButton";

const HeroSection = () => {
  const words = [
    "Get You Hired Faster",
    "Build Your Dream Career",
    "Grow Your Income Online",
    "Turn Skills Into Success",
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const [displayText, setDisplayText] = useState("");

  const [isDeleting, setIsDeleting] = useState(false);

  // =========================================
  // TYPING EFFECT
  // =========================================

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting
          ? currentWord.substring(0, prev.length - 1)
          : currentWord.substring(0, prev.length + 1),
      );

      if (!isDeleting && displayText === currentWord) {
        setTimeout(() => setIsDeleting(true), 1200);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);

        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWordIndex]);

  return (
    <section className="w-full bg-gradient-to-br from-white via-blue-50 to-indigo-50 py-8 md:py-6 lg:py-12 overflow-hidden -mt-3">
      <div className="max-w-[100rem] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:flex-row gap-8 lg:gap-12 items-center">
          {/* ========================================= */}
          {/* LEFT CONTENT */}
          {/* ========================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            viewport={{ once: true }}
            className="flex-1 space-y-5 md:space-y-6 md:w-[120%]"
          >
            {/* TRUST BADGE */}
            {/* <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-sm border border-gray-100 w-fit">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              <span className="text-xs md:text-sm font-semibold text-gray-700">
                Rated 4.9/5 by 2500+ Students
              </span>
            </div> */}

            {/* MAIN HEADING */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Master In-Demand Skills That <br className="" />
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {displayText}

                <span className="animate-pulse text-purple-600">|</span>
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-xl">
              <span className="font-bold text-gray-900">
                Learn from industry experts.
              </span>{" "}
              Master Web Development, Graphic Design, Digital Marketing, Video
              Editing, AI Tools, and other high-income skills through practical
              training and real-world projects.
            </p>

            {/* FEATURES */}
            <div className="md:grid grid-cols-2 sm:grid-cols-2 gap-3 hidden max-w-md">
              {[
                "Industry-focused learning",
                "Career support & guidance",
                "Expert mentor assistance",
                "Lifetime access & updates",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle
                    size={16}
                    className="text-green-500 flex-shrink-0"
                  />

                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            {/* MOBILE STATS */}
            <div className="grid grid-cols-3 gap-3 md:hidden">
              {[
                {
                  value: "5000+",
                  icon: Users,
                  label: "Active Students",
                },
                {
                  value: "92%",
                  icon: Award,
                  label: "Placement Rate",
                },
                {
                  value: "200+",
                  icon: Rocket,
                  label: "Hiring Partners",
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="text-center p-3 bg-white rounded-lg shadow-sm"
                >
                  <div className="flex items-center justify-center gap-1 text-xl font-bold text-purple-600">
                    {stat.value}

                    <stat.icon size={16} />
                  </div>

                  <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {/* REUSABLE BUTTON */}
              <Link to="/courses">
                <AnimatedButton
                  text="Explore Our courses"
                  className="w-full sm:w-auto px-6 py-4 min-h-[58px] rounded-xl text-lg"
                />
              </Link>

              {/* WATCH BUTTON */}
              <button
                onClick={() => {
                  document.getElementById("courses")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-purple-500 hover:text-purple-600 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <Eye
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
                Popular Course
              </button>
            </div>

            {/* SOCIAL PROOF */}
            <div className="md:pt-5 border-t border-gray-200 space-y-5">
              {/* STUDENT SECTION */}
              <div className="md:flex  items-center gap-4 flex-row justify-between hidden">
                <div className="flex md:flex-row items-center flex-row gap-3">
                  {/* AVATARS */}
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <img
                        key={i}
                        src={`https://i.pravatar.cc/40?img=${i}`}
                        className="w-9 h-9 rounded-full border-2 border-white shadow-sm"
                        alt={`Student ${i}`}
                      />
                    ))}

                    <div className="w-9 h-9 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center text-xs font-bold text-purple-600">
                      +50
                    </div>
                  </div>

                  {/* TEXT */}
                  <div className="text-center sm:text-left">
                    <p className="text-sm font-semibold text-gray-900">
                      Join 2500+ successful learners
                    </p>

                    <p className="text-xs text-gray-600">
                      From beginners to professionals
                    </p>
                  </div>
                </div>

                {/* SALARY HIKE */}
                <div className="flex items-center justify-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full w-full sm:w-auto">
                  <TrendingUp size={16} />
                  <span className="text-sm font-medium">
                    Avg career growth: 75%
                  </span>
                </div>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  {
                    value: "2500+",
                    icon: Users,
                    label: "Students",
                  },
                  {
                    value: "92%",
                    icon: Award,
                    label: "Completion",
                  },
                  {
                    value: "150+",
                    icon: Rocket,
                    label: "Partners",
                  },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-gray-200 rounded-xl p-3 text-center shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-center gap-1 text-purple-600 font-bold text-lg sm:text-xl">
                      {stat.value}
                      <stat.icon size={15} />
                    </div>

                    <p className="text-[10px] sm:text-xs text-gray-600 mt-1 leading-tight">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex md:hidden items-center gap-4 flex-col justify-between">
                <div className="flex md:flex-col items-center flex-row gap-3">
                  {/* AVATARS */}
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <img
                        key={i}
                        src={`https://i.pravatar.cc/40?img=${i}`}
                        className="w-9 h-9 rounded-full border-2 border-white shadow-sm"
                        alt={`Student ${i}`}
                      />
                    ))}

                    <div className="w-9 h-9 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center text-xs font-bold text-purple-600">
                      +50
                    </div>
                  </div>

                  {/* TEXT */}
                  <div className="text-center sm:text-left">
                    <p className="text-sm font-semibold text-gray-900">
                      Join 2500+ successful learners
                    </p>

                    <p className="text-xs text-gray-600">
                      From beginners to professionals
                    </p>
                  </div>
                </div>

                {/* SALARY HIKE */}
                <div className="flex items-center justify-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full w-full sm:w-auto">
                  <TrendingUp size={16} />
                  <span className="text-sm font-medium">
                    Avg career growth: 75%
                  </span>
                </div>
              </div>

              {/* TRUST BADGES */}
              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-3">
                {[
                  {
                    icon: BadgeCheck,
                    text: "Industry Recognized",
                    color: "text-green-500",
                  },
                  {
                    icon: Clock,
                    text: "Self-Paced Learning",
                    color: "text-blue-500",
                  },
                  {
                    icon: Crown,
                    text: "Certification Included",
                    color: "text-yellow-500",
                  },
                  {
                    icon: BadgeCheck,
                    text: "Expert Mentors",
                    color: "text-green-500",
                  },
                ].map((badge, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white p-3 text-center shadow-sm"
                  >
                    <badge.icon size={18} className={badge.color} />

                    <span className="text-[11px] sm:text-sm font-medium text-gray-700 leading-tight">
                      {badge.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ========================================= */}
          {/* RIGHT CONTENT */}
          {/* ========================================= */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.9,
            }}
            viewport={{ once: true }}
            className="flex-1 flex justify-center mt-8 lg:mt-0 hidden md:block ml-[12.5rem]"
          >
            <div className="relative w-full max-w-xl">
              {/* CARD */}
              <div className="bg-white rounded-2xl shadow-xl p-5">
                {/* CARD HEADER */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>

                    <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>

                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                  </div>

                  <span className="text-xs text-gray-500">
                    dashboard.academy
                  </span>
                </div>

                {/* IMAGE */}
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                  alt="Learning Dashboard Preview"
                  className="rounded-xl object-cover w-full h-48 sm:h-56 shadow-md"
                />

                {/* PROGRESS */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-1.5">
                    <span>Your Progress</span>

                    <span className="font-semibold text-purple-600">
                      68% Complete
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-full rounded-full w-[68%]"></div>
                  </div>
                </div>

                {/* STATUS */}
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-gray-500" />

                    <span className="text-gray-700">
                      Live Cohort: 124 learners
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-green-600">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>

                    <span className="text-xs">24 online now</span>
                  </div>
                </div>

                {/* CTA */}
                <button className="mt-4 w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow flex items-center justify-center gap-2">
                  <Play size={16} />
                  Continue Learning Journey
                </button>
              </div>

              {/* FLOATING BADGE */}
              <div className="absolute -top-3 -left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5">
                <Star size={14} className="fill-white" />

                <span className="font-bold text-sm">4.9 ★</span>
              </div>

              {/* PARTNER BADGE */}
              <div className="absolute -bottom-3 -right-3 bg-white shadow-lg px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-gray-200">
                <Rocket size={14} className="text-purple-600" />

                <span className="font-semibold text-gray-800 text-sm">
                  200+ Partners
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
