import { motion } from "framer-motion";
import icon1 from "../../../assets/icon-1.svg";
import icon2 from "../../../assets/icon-2.svg";
import pattern1 from "../../../assets/pattern-1 (1).svg";
import pattern2 from "../../../assets/pattern-2.svg";
import shape1 from "../../../assets/shape-1_5.svg";
import { TbSchool } from "react-icons/tb";
import { useEffect, useState } from "react";

export default function WhyChooseUs() {

  const [count, setCount] = useState(0);


  useEffect(() => {
    let start = 0;
    const end = 1050;
    const duration = 2000; // 2 second
    const incrementTime = 20;
  
    const increment = Math.ceil(end / (duration / incrementTime));
  
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, incrementTime);
  
    return () => clearInterval(timer);
  }, []);
  
  return (
    <section
      className="relative bg-cover bg-center pt-20 md:pb-60"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/4n3wmV3d/Whats-App-Image-2025-11-06-at-5-18-43-PM.jpg')",
      }}
    >
      {/* Pattern Top Left (Mobile Hide) */}
      <img
        className="hidden md:block absolute top-10 left-20 w-16 opacity-80"
        src={pattern1}
        alt="pattern"
      />

      <div className="max-w-7xl mx-auto px-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">

          {/* Left Content */}
          <div>
            <span className="text-gray-600  font-semibold tracking-wide">
              WHY CHOOSE US
            </span>

            <div className="mb-6">
              <h3 className="text-3xl lg:text-4xl font-bold leading-snug mt-2">
                Transform Your Skills with <br /> Maxify Academy’s Expert-Led
                Courses
              </h3>
              <p className="mt-4 text-gray-700 text-lg max-w-lg">
                Unlock your potential through structured online learning
                designed to make you job-ready and confident in the digital
                world.
              </p>
            </div>

            {/* Info Boxes */}
            <div className="space-y-6">

              {/* Single Info */}
              <div className="p-5 flex gap-4">
                <div>
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-4 rounded-full">
                      <img src={icon1} alt="icon" className="w-8" />
                    </div>
                    <h5 className="font-bold text-lg">
                      Interactive Learning Experience
                    </h5>
                  </div>

                  <p className="text-gray-600 mt-1">
                    Engage in real-time sessions, hands-on projects, and
                    practical assignments that bring concepts to life.
                  </p>
                </div>
              </div>

              {/* Single Info */}
              <div className="p-5 flex gap-4">
                <div>
                  <div className="flex items-center gap-4">
                    <div className="bg-red-100 p-4 rounded-full">
                      <img src={icon2} alt="icon" className="w-8" />
                    </div>
                    <h5 className="font-bold text-lg">24/7 Support Available</h5>
                  </div>

                  <p className="text-gray-600 mt-1">
                    Our dedicated support team and instructors are always ready
                    to help you at every step of your learning journey.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Image & Animated Counter */}
          <div className="relative flex justify-center">
            <div className="rounded-3xl overflow-hidden">
              <img
                src="https://i.ibb.co/twyd1hNy/Untitled-design-70.png"
                alt="why choose"
                className="w-full max-w-lg"
              />
            </div>

            {/* Animated Counter */}
            <div
              className="absolute bottom-6 left-6 bg-white shadow-lg p-4 rounded-l flex items-center gap-3"
            >
              <TbSchool className="text-red-500 text-5xl" />

              <div className="flex flex-col leading-tight">
                <h4 className="text-2xl font-bold">{count}+</h4>
                <p className="text-gray-600 text-sm">Satisfied Students</p>
              </div>
            </div>

            {/* Shapes (HIDE ON MOBILE) */}
            <img
              className="hidden md:block absolute top-30 left-10 w-20 animate-spin-slow"
              src={shape1}
              alt="shape"
            />

            <img
              className="hidden md:block absolute rotate-90 bottom-10 right-5 w-16"
              src={pattern1}
              alt="pattern"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
