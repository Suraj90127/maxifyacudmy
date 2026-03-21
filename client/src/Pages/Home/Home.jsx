import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

import HeroSection from './components/HeroSection';
import HomeAbout from './components/HomeAbout';
import FeaturesSection from './components/FeaturedHome';
import CourseCategories from './components/CourseCategories';
import Courses from './components/Courses';
import WhyChooseUs from './components/WhyChooseUs';
import FunFact from './components/FunFact';
import PartnerSection from './components/PartnerSection';
import TestimonialSection from './components/Testmonial';
import CallToActionSection from './components/CalltoAction';
import UserLayout from '../../Layouts/UserLayout';
import Blog from './components/Blog';

const Home = () => {

  const navigate = useNavigate();
  const [colorWords, setColorWords] = useState([]);

  /* ================= SCROLL FIX ================= */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* ================= REFERRAL + COURSE REDIRECT ================= */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const ref = params.get("ref");
    const course = params.get("course");

    // ✅ Save referral
    if (ref) {
      localStorage.setItem("referralCode", ref);
    }

    // 🔥 Redirect to course page
    if (course) {
      navigate(`/course-info/${course}`);
    }
  }, [navigate]);

  /* ================= STAR RATING ================= */
  const StarRating = ({ rating }) => {
    const stars = [];
    const totalStars = 5;

    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`w-5 h-5 ${
            i <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
        />
      );
    }
    return <div className="flex space-x-1">{stars}</div>;
  };

  return (
    <UserLayout>
      <main className="main-wrapper overflow-x-hidden">

        <HeroSection />
        <HomeAbout />
        <CourseCategories />
        <FeaturesSection />
        <Courses />
        <WhyChooseUs />
        <FunFact />
        <PartnerSection />
        <TestimonialSection />
        <Blog />
        <CallToActionSection />

      </main>
    </UserLayout>
  );
};

export default Home;