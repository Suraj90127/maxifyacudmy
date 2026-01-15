import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourseReviewData } from "../../../redux/slices/courseReviewSlice";
import { motion } from "framer-motion";
import pattern1 from "../../../assets/pattern-1 (1).svg";
import shape1 from "../../../assets/shape-1_5.svg";
import { TbSchool, TbQuote } from "react-icons/tb";

export default function TestimonialSection() {
  const dispatch = useDispatch();
  const { reviewData, loading } = useSelector((s) => s.courseReview);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = 1050;
    const duration = 2000;
    const timer = setInterval(() => {
      start += Math.ceil(end / 100);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 20);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    dispatch(getCourseReviewData());
  }, [dispatch]);

const testimonials = Array.isArray(reviewData)
  ? reviewData.flatMap(course =>
      Array.isArray(course?.reviews)
        ? course.reviews.map(r => ({
            reviewer_name: r?.reviewer_name,
            review: r?.review,
            rating: r?.rating,
            course: course?.course_title,
          }))
        : []
    )
  : [];


  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    // Fix: Ensure dots stay within container
    appendDots: (dots) => (
      <div className="mt-6 flex justify-center">
        <ul className="custom-dots flex gap-2"> {dots} </ul>
      </div>
    ),
  };

  return (
    <section className="relative py-12 md:py-24 overflow-hidden bg-gray-50">
      <div className="container mx-auto px-4 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-16">
          
          {/* LEFT SIDE: Content */}
          <div className="order-2 lg:order-1">
            <div className="text-center lg:text-left mb-6">
              <span className="text-cyan-600 font-bold uppercase tracking-widest text-xs">Testimonials</span>
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mt-2">
                What Students Say About Our <span className="text-cyan-600">Online Courses</span>
              </h3>
            </div>

            {/* Slider Container - Fixed Mobile Gaps */}
            <div className="relative bg-white p-6 md:p-10 rounded-2xl shadow-xl">
              <TbQuote className="hidden sm:block absolute top-6 right-8 text-5xl text-cyan-100" />
              
              {loading ? (
                <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div></div>
              ) : (
                <Slider {...settings}>
                  {testimonials.map((review, i) => (
                    <div key={i} className="outline-none">
                      <div className="flex justify-center lg:justify-start text-yellow-400 mb-3">
                        {[...Array(5)].map((_, idx) => (
                          <span key={idx}>{idx < review.rating ? "★" : "☆"}</span>
                        ))}
                      </div>

                      <p className="text-gray-600 text-base md:text-lg italic mb-6 text-center lg:text-left leading-relaxed">
                        "{review.review}"
                      </p>

                      <div className="flex items-center justify-center lg:justify-start gap-4 border-t border-gray-100 pt-5">
                        <img
                          src="https://course.super-club.xyz/core/resources/views/templates/basic/images/author-1.png"
                          className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                          alt={review.reviewer_name}
                        />
                        <div className="text-left">
                          <h5 className="font-bold text-gray-900 text-base">{review.reviewer_name}</h5>
                          <p className="text-cyan-600 text-xs font-medium uppercase tracking-tight">{review.course}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: Visuals */}
          <div className="order-1 lg:order-2 relative flex flex-col items-center">
            <div className="relative w-full max-w-[320px] md:max-w-[420px]">
              {/* Image Frame */}
              <div className="rounded-[30px] rounded-br-[80px] overflow-hidden border-8 border-white shadow-2xl">
                <img
                  src="https://i.ibb.co/d0kCzytp/Untitled-design-68.png"
                  className="w-full h-auto"
                  alt="Student"
                />
              </div>

              {/* Stats Badge - Fully Responsive Positioning */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 lg:left-0 lg:-translate-x-10 bg-white p-3 md:p-4 rounded-xl shadow-lg flex items-center gap-3 w-[85%] sm:w-auto">
                <div className="bg-red-50 p-2 rounded-lg text-red-600">
                  <TbSchool className="text-2xl md:text-3xl" />
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-bold text-gray-900 leading-none">{count}+</h4>
                  <p className="text-gray-500 text-xs font-medium">Enrolled Learners</p>
                </div>
              </div>
            </div>

            {/* Decorative Shapes - Hidden on Mobile to avoid overflow */}
            <motion.img
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute -top-6 right-0 w-16 opacity-20 hidden md:block"
              src={shape1}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-dots li {
          margin: 0;
        }
        .custom-dots li button {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #cbd5e1;
          transition: all 0.3s ease;
        }
        .custom-dots li button:before { display: none; }
        .custom-dots li.slick-active button {
          background: #ef4444;
          width: 20px;
          border-radius: 4px;
        }
        /* Removes bottom padding created by Slick */
        .slick-dotted.slick-slider {
          margin-bottom: 0px;
        }
      `}</style>
    </section>
  );
}