import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { FaCheck } from "react-icons/fa";
import { TbSchool } from "react-icons/tb";
import shape2 from '../../../assets/shape-2.svg'


export default function HomeAbout() {
  const [count, setCount] = useState(0);


  useEffect(() => {
    let start = 0;
    const end = 1525;
    const duration = 1500; // 1.5 second
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
    <section className="py-10 bg-[#EEF6FF] relative overflow-hidden">

      {/* LEFT DOTTED SHAPE */}
      {/* <motion.img
        src="https://course.super-club.xyz/core/resources/views/templates/basic/images/shape-1.svg"
        alt="shape-1"
        className="absolute left-10 top-1/3 w-24 opacity-80"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      /> */}

      {/* RIGHT YELLOW SHAPE */}
      <motion.img
        src={shape2}
        alt="shape-2"
        className="absolute right-60 bottom-20 w-40"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* BLACK CURVED SHAPE */}
      {/* <motion.img
        src="https://course.super-club.xyz/core/resources/views/templates/basic/images/shape-3.svg"
        alt="shape-3"
        className="absolute right-208 z-10 bottom-25 w-25 rotate-ani"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      /> */}

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative order-2 lg:order-1"
        >
          <div className="relative w-full overflow-hidden rounded-br-[90px] rounded-xl">
            <img
              src="https://i.ibb.co/KxJssjch/Untitled-design-69.png"
              className="w-full h-[270px] sm:h-[600px] object-cover"
              alt=""
            />
          </div>

          {/* FLOATING BADGE */}
          <div className="absolute bottom-1/8 transform translate-y-1/2 left-1/4 
            -translate-x-1/2 md:left-[-15%] md:translate-x-0 
            bg-white shadow-xl p-3 rounded-xl w-[70%] sm:w-auto">
            <div className="flex items-center gap-3">
              <span className="p-2 h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center rounded-md">
                <TbSchool className="text-red-500 text-3xl sm:text-4xl" />
              </span>
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-red-500">
                {count}+
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Enrolled Learners
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="font-poppins order-1 lg:order-2"
        >
          <h5 className="text-gray-600 tracking-wide mb-3">
            WELCOME TO MAXIFY ACADEMY
          </h5>

          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-snug">
            Digital Learning Platform: Your
            <br /> Path to Professional Growth
          </h2>

          <p className="text-gray-700 mt-5 leading-relaxed text-lg">
            Learn in-demand skills like Meta Ads and Graphic Design from
            industry experts — and get ready to explore many more powerful
            skills launching soon!
          </p>

          <ul className="mt-8 space-y-5 text-lg text-gray-900">
            {[
              "Our Expert Trainers",
              "Online Remote Learning",
              "Easy to follow curriculum",
              "Lifetime Access",
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="text-indigo-600 text-xl">
                  <FaCheck />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

      </div>
    </section>
  );
}
