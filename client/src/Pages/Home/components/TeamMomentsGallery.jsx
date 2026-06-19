import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    FiArrowUpRight,
    FiUsers,
} from "react-icons/fi";

const TeamMomentsGallery = () => {

    const galleryImages = [
        {
            image: "https://i.ibb.co/r2V9VP9g/main-jpg.jpg",
            title: "The Maxify Team",
            desc: "A united team of creators, developers and strategists driving innovation and growth every day."
        },
        {
            image: "https://i.ibb.co/DPdd4NVz/ghff-jpg.jpg",
            title: "Turning Ideas Into Reality",
            desc: "Every line of code, every design and every strategy is crafted with passion, precision and purpose.",
        },
        {
            image: "https://i.ibb.co/Z1p4j1ML/party-jpg.jpg",
            title: "Rooftop Conversations",
            desc: "An evening of meaningful connections, fresh ideas and shared moments that strengthen the Maxify culture."
        },
        {
            image: "https://i.ibb.co/mrxLDMMB/dance-jpg.jpg",
            title: "Dance. Celebrate. Repeat.",
            desc: "A night filled with music, energy and unforgettable memories."
        },
        {
            image: "https://i.ibb.co/YFn125Sn/2-1-jpg.jpg",
            title: "Passionate Creators",
            desc: "Empowering learners with practical skills, real-world projects, and career-focused education."
        },
        {
            image: "https://i.ibb.co/nMBbznF7/dinner-jpg.jpg",
            title: "Dinner & Connections",
            desc: "Great food, meaningful conversations and unforgettable moments.",
        },
    ];

    // Component for expandable description
    const ExpandableDescription = ({ text, maxLength = 50 }) => {
        const [isExpanded, setIsExpanded] = useState(false);
        
        if (!text) return null;
        
        const needsExpand = text.length > maxLength;
        const displayText = needsExpand && !isExpanded 
            ? text.substring(0, maxLength) + "..." 
            : text;
        
        return (
            <div className="mt-1.5 flex">
                <p className="text-gray-200 text-sm leading-relaxed">
                    {displayText}
                </p>
                {needsExpand && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsExpanded(!isExpanded);
                        }}
                        className="text-purple-300 text-xs font-semibold mt-1 hover:text-purple-200 transition-colors duration-200 inline-flex items-center gap-0.5"
                    >
                        {isExpanded ? "Show Less ↑" : "Show More ↓"}
                    </button>
                )}
            </div>
        );
    };

    return (
        <section className="bg-[#f8fbff] py-4 md:py-6 overflow-hidden">
            <div className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-8">

                {/* HEADER */}
                <div className="max-w-5xl mx-auto mb-12 md:mb-16 md:flex flex-col md:justify-center md:items-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#eef4ff] border border-[#dbe7ff] mb-5">
                        <FiUsers className="text-[#063d67]" size={15} />
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#063d67]">
                            MEET THE MAXIFY TEAM
                        </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                        Meet The Experts Behind {" "}
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Maxify Academy
                        </span>
                    </h2>

                    <p className="mt-4 max-w-5xl md:text-center md:mt-5 text-gray-600 text-base md:text-lg leading-relaxed">
                        A dedicated team of mentors, developers, designers, and digital professionals committed to helping students build valuable skills and achieve career success.
                    </p>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 auto-rows-[260px] md:auto-rows-[280px]">
                    {galleryImages.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.35,
                                delay: index * 0.04,
                            }}
                            className={`
                                group relative overflow-hidden rounded-[28px]
                                bg-white border border-gray-100
                                shadow-md hover:shadow-xl
                                transition-all duration-300
                                cursor-pointer
                                ${index === 0 ? "lg:col-span-7 lg:row-span-2" : ""}
                                ${index === 1 ? "lg:col-span-5" : ""}
                                ${index === 2 ? "lg:col-span-5" : ""}
                                ${index === 3 ? "lg:col-span-4" : ""}
                                ${index === 4 ? "lg:col-span-4" : ""}
                                ${index === 5 ? "lg:col-span-4" : ""}
                            `}
                        >
                            {/* IMAGE */}
                            <img
                                src={`${item.image}?auto=format&fit=crop&w=1200&q=80`}
                                alt={item.title}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* OVERLAY - Better gradient for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                            {/* CONTENT */}
                            <div className="absolute bottom-0 left-0 right-0 w-full p-4 sm:p-5 md:p-6">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                        <h3 className={`
                                            text-white font-bold leading-tight mb-1
                                            ${index === 0 ? "text-2xl sm:text-3xl md:text-4xl" : "text-xl sm:text-2xl"}
                                        `}>
                                            {item.title}
                                        </h3>

                                        {/* Expandable Description - Only 1 line initially */}
                                        <ExpandableDescription 
                                            text={item.desc} 
                                            maxLength={32}
                                        />
                                    </div>

                                    <button 
                                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/20 backdrop-blur-sm text-white flex items-center justify-center shrink-0 hover:bg-white hover:text-[#063d67] transition-all duration-300 group/btn"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // Add your click handler here
                                        }}
                                    >
                                        <FiArrowUpRight
                                            size={18}
                                            className="sm:w-5 sm:h-5 group-hover/btn:rotate-45 transition duration-300"
                                        />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamMomentsGallery;