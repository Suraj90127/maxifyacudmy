import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import CourseCard from "../../../Components/CourseCard";

export default function HeroSection() {
    return (<>

   
        <section
            className="w-full overflow-hidden"
            style={{
                background: "linear-gradient(135deg, #e9f3ff 0%, #d8eaff 100%)"
            }}
        >
            <div className="container mx-auto px-6 ">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-14 max-w-7xl mx-auto">

                    {/* LEFT CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center lg:text-left"
                    >
                        {/* Stars */}
                        <motion.img
                            src="https://course.super-club.xyz/core/resources/views/templates/basic/images/shape-1_2.svg"
                            alt="stars"
                            className="w-10 mb-3 mx-auto lg:mx-0"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />

                        {/* Heading */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#0b1a33]">
                            Best{" "}
                            <span className="bg-[#ffd23d] px-3 py-1 rounded-md text-black inline-block">
                                Online
                            </span>{" "}
                            <br className="hidden lg:block" />
                            Platform to Learn <br className="hidden lg:block" />
                            Digital Skills
                        </h1>

                        {/* Sub text */}
                        <p className="text-gray-600 text-lg mt-6 max-w-md mx-auto lg:mx-0">
                            Maxify Academy empowers learners to master real-world digital
                            skills through practical, industry-focused courses.
                        </p>

                        {/* CTA */}
                        <a
                            href="/courses"
                            className="inline-flex items-center bg-[#003366] text-white px-4 w-42 py-3 rounded-full font-semibold shadow-md gap-4 mt-6 relative"
                        >
                            <span className="text-white font-semibold">Find Courses</span>

                            <span className="w-10 h-10 absolute right-1 top-1/2 transform -translate-y-1/2 z-10 flex items-center justify-center bg-white rounded-full text-[#003366] shadow-sm">
                                <FiArrowRight size={18} />
                            </span>
                        </a>
                    </motion.div>

                    {/* RIGHT IMAGE */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.9 }}
                        className="relative flex justify-center items-center w-full"
                    >
                        {/* Background Circle */}
                        <div
  className="
    absolute 
    w-[320px] h-[320px]
    sm:w-[420px] sm:h-[420px]
    md:w-[520px] md:h-[520px]
    lg:w-[660px] lg:h-[660px]
    rounded-full
    bg-gradient-to-r
    from-white
    via-[#ECF0ED]
    to-white
    -bottom-20
    sm:-bottom-28
    md:-bottom-36
    lg:-bottom-44
    right-1/2 translate-x-1/2 
    lg:right-5 lg:translate-x-0
    z-0 opacity-90
    lg:left-1
    
  "
></div>


                        {/* Main Image */}
                        <img
                            src="https://i.ibb.co/1GPf1SpN/Untitled-design-71.png"
                            alt="Hero Student"
                            className="relative z-10 w-[200px]  lg:-mr-14 sm:w-[350px] md:w-[420px] lg:w-[500px]"
                        />

                        {/* Dots Animation */}
                        <motion.div
  className="absolute -right-64 top-64 grid grid-cols-3 gap-2 opacity-60 z-20"
  animate={{ opacity: [0.6, 1, 0.6] }}
  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
>
  <img src="https://course.super-club.xyz/core/resources/views/templates/basic/images/shape-3_1.svg" alt="loading.." />
</motion.div>

                    </motion.div>

                </div>
            </div>
        </section>
        </>
    );
}
