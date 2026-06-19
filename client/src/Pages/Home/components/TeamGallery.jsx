import React from "react";
import { motion } from "framer-motion";
import {
    FiInstagram,
    FiLinkedin,
    FiMail,
} from "react-icons/fi";

const TeamGallery = () => {
    const employees = [
        {
            name: "Saqlain Malik",
            role: "Backend Developer",
            image:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
        },
        {
            name: "Ayesha Khan",
            role: "UI/UX Designer",
            image:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        },
        {
            name: "Rahul Sharma",
            role: "Frontend Developer",
            image:
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
        },
        {
            name: "Sana Ali",
            role: "Graphic Designer",
            image:
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
        },
        {
            name: "Armaan Siddiqui",
            role: "Marketing Expert",
            image:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        },
        {
            name: "Neha Kapoor",
            role: "Social Media Manager",
            image:
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
        },
    ];

    return (
        <section className="relative overflow-hidden bg-[#f7fbff] py-20 md:py-28">

            {/* Glow */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/20 blur-3xl rounded-full" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-200/20 blur-3xl rounded-full" />

            <div className="relative z-10 max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">

                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-semibold text-[#063d67] mb-5">
                        OUR CREATIVE TEAM
                    </span>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                        Meet The People Behind <br />
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Maxify Academy
                        </span>
                    </h2>

                    <p className="mt-5 text-gray-600 text-lg leading-relaxed">
                        Passionate mentors, developers, designers and marketers
                        working together to build an amazing learning experience.
                    </p>

                </div>

                {/* Gallery */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5">

                    {employees.map((employee, index) => (

                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.45,
                                delay: index * 0.08,
                            }}
                            className="group relative"
                        >

                            {/* Card */}
                            <div className="relative overflow-hidden rounded-[28px] bg-white border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-500">

                                {/* Image */}
                                <div className="relative overflow-hidden aspect-[3/4]">

                                    <img
                                        src={`${employee.image}?auto=format&fit=crop&w=700&q=80`}
                                        alt={employee.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90" />

                                    {/* Hover Social */}
                                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">

                                        <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#063d67] hover:bg-[#063d67] hover:text-white transition">
                                            <FiInstagram size={16} />
                                        </button>

                                        <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#063d67] hover:bg-[#063d67] hover:text-white transition">
                                            <FiLinkedin size={16} />
                                        </button>

                                        <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#063d67] hover:bg-[#063d67] hover:text-white transition">
                                            <FiMail size={16} />
                                        </button>

                                    </div>

                                    {/* Bottom Content */}
                                    <div className="absolute bottom-0 left-0 w-full p-5">

                                        <h3 className="text-white text-lg font-bold leading-tight">
                                            {employee.name}
                                        </h3>

                                        <p className="text-gray-200 text-sm mt-1">
                                            {employee.role}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </motion.div>

                    ))}

                </div>
            </div>
        </section>
    );
};

export default TeamGallery;