import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

export default function CallToActionSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto bg-[#003867] pt-5 rounded-xl h-full px-10 lg:px-10 relative"
      >
        <div
          className="
            grid grid-cols-1 lg:grid-cols-2 
            items-center
          "
        >
          {/* ---------------- SHAPES ---------------- */}
          <img
            src="https://eduna-html.vercel.app/assets/images/call-action/call-action-1/shape-1.svg"
            className="hidden lg:block absolute top-10 z-1 left-10 w-34"
            alt="shape"
          />
          <img
            src="https://course.super-club.xyz/core/resources/views/templates/basic/images/shape-2_5.svg"
            className="hidden lg:block absolute left-100 z-1 top-15 w-16"
            alt="shape"
          />
          <img
            src="https://course.super-club.xyz/core/resources/views/templates/basic/images/shape-3_5.svg"
            className="hidden lg:block absolute -bottom-2 right-0 w-30"
            alt="shape"
          />

          {/* ================= IMAGE LEFT ================= */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 relative flex justify-center lg:justify-start lg:py-0"
          >
            {/* WHITE CIRCLE */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true }}
              className="
                absolute rounded-full bg-white/90
                w-[420px] h-[420px]
                sm:w-[280px] sm:h-[280px]
                md:w-[340px] md:h-[340px]
                lg:w-[580px] lg:h-[580px]
                left-1/2 -translate-x-1/2
                lg:left-[-65px] lg:translate-x-0
                px-4
                top-[90%] -translate-y-1/2
                lg:top-[75%]
              "
            ></motion.div>

            {/* PERSON IMAGE */}
            <motion.img
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              src="https://i.ibb.co/MyDzQkqJ/Untitled-1-1.png"
              alt="Instructor"
              className="
                relative z-10
                -bottom-0 sm:bottom-0
                max-w-[260px]
                sm:max-w-[200px]
                md:max-w-[260px]
                lg:max-w-[360px]
                sm:left-8
                md:left-12
                lg:left-10
              "
            />
          </motion.div>

          {/* ================= TEXT RIGHT ================= */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 text-white px-6 gap-3 lg:pr-16 lg:pl-0 pb-10 lg:pb-0 mt-6 lg:mt-0"
          >
            <span className="text-[#ffcd20] font-medium text-sm uppercase tracking-wide">
              GET STARTED NOW
            </span>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight mt-4">
              Affordable Your Online Courses <br />
              & Learning Opportunities
            </h2>

            <p className="mt-5 text-white/90 text-l leading-relaxed">
              Exceptur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit. Exceptur sint occaecat.
            </p>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              href="/user/course/all"
              className="
                inline-flex items-center px-5 py-2 
                bg-[#ffcd20] text-black font-semibold 
                rounded-full shadow-lg mt-8 
                transition-all
              "
            >
              Start Learning Today
              <span className="ml-4 w-10 h-10 flex items-center justify-center bg-black rounded-full text-[#ffcd20]">
                <FiArrowRight size={20} />
              </span>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
