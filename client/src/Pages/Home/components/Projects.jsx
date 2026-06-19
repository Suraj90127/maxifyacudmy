import React, { useState, useRef, useEffect } from 'react'
import { ExternalLink, Eye, Briefcase, Award, TrendingUp, Star, User, Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const Projects = () => {
    const projects = [
        {
            title: "Travel Website Development",
            desc: "Modern responsive frontend interfaces with premium UI/UX experience.",
            image: "https://i.ibb.co/DP1rk7KR/img1-jpg.jpg",
            category: "Full Stack",
            link: "https://www.yorkerindia.com/",
            tech: ["React", "Tailwind CSS", "JavaScript"],
            outcome: "Boosted travel inquiries & online bookings 180%",
            student: {
                name: "Anil Yadav",
                image: "https://i.ibb.co/dJDW12Hs/anil-jpg.jpg",
                role: "Frontend Developer",
                daysToComplete: 45,
                rating: 5,
                enrolledDate: "2024-01-15"
            }
        },
        {
            title: "Backend Oriented Devtool",
            desc: "A backend-oriented developer tool that streamlines API management, automation, data processing, and system monitoring for efficient development workflows.",
            image: "https://i.ibb.co/SwPkGJ2m/image-2-jpg.jpg",
            category: "Backend",
            tech: ["Node.js", "PostgreSQL", "Express.js"],
            link: "https://www.devxnexus.com/",
            outcome: "Accelerating API testing by 76%",
            student: {
                name: "Aalok Kumar",
                image: "https://i.ibb.co/RGg6Pg3J/alok-jpg.jpg",
                role: "Backend Engineer",
                daysToComplete: 60,
                rating: 5,
                enrolledDate: "2024-01-10"
            }
        },
        {
            title: "Flights Booking Website With Real API",
            desc: "A flight booking platform integrated with real-time APIs for searching, comparing, and booking flights with live pricing and availability.",
            image: "https://i.ibb.co/Hf254hq7/image-3-jpg.jpg",
            category: "API Handling",
            tech: ["React.js", "Amadeus API", "Duffel API", "Razorpay", "Node Js", "Tailwind"],
            link: "https://chipo.air.allindemo.site/",
            outcome: "Generated 3x ROI within 90 days",
            student: {
                name: "Vikram Thakur",
                image: "https://i.ibb.co/3yv9p7Ty/vikram-jpg.jpg",
                role: "Full Stack Developer",
                daysToComplete: 75,
                rating: 5,
                enrolledDate: "2024-01-05"
            }
        },
        {
            title: "Real Estate Full Stack Project",
            desc: "A full-stack real estate platform for listing, searching, managing, and connecting buyers, sellers, and agents through a seamless property marketplace.",
            image: "https://i.ibb.co/PzC9vQ8w/image-4-jpg.jpg",
            category: "Design & Development",
            tech: ["React", "CSS", "Node.js", "MongoDB"],
            link: "https://mninfratech.com/",
            outcome: "Increased Client engagement by 120%",
            student: {
                name: "Aayush Kumar",
                image: "https://i.ibb.co/zhNJRXGB/IMG-20260613-180630-jpg.jpg",
                role: "UI/UX Developer",
                daysToComplete: 30,
                rating: 5,
                enrolledDate: "2024-02-01"
            }
        },
        {
            title: "Healthcare Portal",
            desc: "A modern hospital management website that enables patients to book appointments, access healthcare services, and connect with medical professionals seamlessly.",
            image: "https://i.ibb.co/cSwjG7pv/Screenshot-2026-06-12-at-2-13-43-PM.png",
            category: "Full Stack",
            tech: ["MERN", "Socket.io", "JWT", "Tailwind"],
            link: "https://example.com/learning-platform",
            outcome: "Seamless appointment booking and patient management",
            student: {
                name: "Taushif Raza",
                image: "https://i.ibb.co/W4yrGQH7/tausif-jpg.jpg",
                role: "MERN Stack Developer",
                daysToComplete: 90,
                rating: 5,
                enrolledDate: "2024-01-20"
            }
        },
        {
            title: "QUICKBITE food delivery",
            desc: "A fast and user-friendly food delivery platform for discovering restaurants, ordering meals, and tracking deliveries in real time.",
            image: "https://i.ibb.co/wrPY9rZB/image-5-jpg.jpg",
            category: "Frontend",
            tech: ["React", "Tailwind", "CSS",],
            link: "https://quickbite.allindemo.site/",
            outcome: "30+ restaurants onboarded",
            student: {
                name: "Sangeeta Kashyap",
                image: "https://i.ibb.co/yn5bW4N5/sangeeta-jpg.jpg",
                role: "Frontend Developer",
                daysToComplete: 85,
                rating: 5,
                enrolledDate: "2024-01-12"
            }
        },
        {
            title: "Data Scrapping Tool",
            desc: "A powerful data scraping platform that extracts, filters, and exports business data from multiple sources with automated processing and Google Sheets integration.",
            image: "https://i.ibb.co/LXw40YsZ/image-6-jpg.jpg",
            category: "Data Mining",
            tech: ["Google Map API", "N8N", "Node.js", "MongoDB", "Razorpay"],
            link: "https://scrapper.allindemo.site/",
            outcome: "Reduced manual lead generation time by 90%",
            student: {
                name: "Naushad",
                image: "https://randomuser.me/api/portraits/men/67.jpg",
                role: "React Native Developer",
                daysToComplete: 70,
                rating: 5,
                enrolledDate: "2024-01-25"
            }
        },
        {
            title: "Delhi Metro Route Planner",
            desc: "Travel Delhi Seamlessly with Smart Route Planning",
            image: "https://i.ibb.co/8nf6g6BQ/image-7-jpg.jpg",
            category: "Web Application",
            tech: ["React.js", "Node.js", "MongoDB", "Google Maps API", "Tailwind CSS"],
            link: "https://mydelhimetro.in/",
            outcome: "Find optimal routes with fare Faster and Smoother",
            student: {
                name: "Vishal Rai",
                image: "https://i.ibb.co/4ZZDWsQM/visal-jpg.jpg",
                role: "Frontend Developer",
                daysToComplete: 40,
                rating: 5,
                enrolledDate: "2024-02-10"
            }
        }
    ]

    const [hoveredIndex, setHoveredIndex] = useState(null)
    const swiperRef = useRef(null)

    // Function to format days
    const formatDays = (days) => {
        if (days === 1) return `${days} day`
        return `${days} days`
    }

    // Function to get completion badge color based on days
    const getCompletionColor = (days) => {
        if (days <= 30) return 'bg-green-100 text-green-700'
        if (days <= 60) return 'bg-blue-100 text-blue-700'
        if (days <= 90) return 'bg-purple-100 text-purple-700'
        return 'bg-orange-100 text-orange-700'
    }

    // Function to get completion icon based on days
    const getCompletionIcon = (days) => {
        if (days <= 30) return <Award size={12} />
        if (days <= 60) return <TrendingUp size={12} />
        if (days <= 90) return <Clock size={12} />
        return <Calendar size={12} />
    }

    const handlePrev = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slidePrev()
        }
    }

    const handleNext = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext()
        }
    }

    return (
        <section className="w-full bg-gradient-to-b from-gray-50 to-white py-4 md:py-6 overflow-hidden">
            <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-2">
                    {/* Mini badge */}
                    <div className="inline-flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-full mb-4">
                        <Briefcase size={14} className="text-purple-600" />
                        <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">STUDENT SUCCESS SHOWCASE</span>
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                        Projects Created By{' '}
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Our Students
                        </span>
                    </h2>

                    <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                        Explore professional websites designed and developed by Maxify Academy students as part of their hands-on training, real-world projects, and portfolio-building journey.
                        <span className="block text-sm text-purple-600 font-semibold mt-1">92% students complete first project within 90 days</span>
                    </p>
                </div>

                {/* Projects Swiper Carousel */}
                <div className="relative px-0 md:px-12">
                    {/* Custom Navigation Buttons */}
                    <button
                        onClick={handlePrev}
                        className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-purple-600 group border border-gray-200 cursor-pointer"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={22} className="text-gray-600 group-hover:text-white transition-colors" />
                    </button>

                    <button
                        onClick={handleNext}
                        className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-purple-600 group border border-gray-200 cursor-pointer"
                        aria-label="Next slide"
                    >
                        <ChevronRight size={22} className="text-gray-600 group-hover:text-white transition-colors" />
                    </button>

                    <Swiper
                        ref={swiperRef}
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={24}
                        slidesPerView={1}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                            el: '.swiper-pagination-custom'
                        }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 24,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 24,
                            },
                            1280: {
                                slidesPerView: 3,
                                spaceBetween: 24,
                            },
                        }}
                        className="projects-swiper"
                    >
                        {projects.map((project, index) => (
                            <SwiperSlide key={index}>
                                <div
                                    className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100"
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-purple-600 shadow-md">
                                        {project.category}
                                    </div>

                                    {/* Image Container */}
                                    <div className="relative overflow-hidden h-56 md:h-52 bg-gray-100 flex-shrink-0">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 flex flex-col flex-grow">
                                        {/* Student Info Section */}
                                        <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
                                            <img
                                                src={project.student.image}
                                                alt={project.student.name}
                                                className="w-11 h-11 rounded-full object-cover border-2 border-purple-200 flex-shrink-0"
                                                loading="lazy"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-gray-900 text-sm truncate">
                                                    {project.student.name}
                                                </h4>
                                                <p className="text-xs text-gray-500 truncate">{project.student.role}</p>
                                            </div>
                                            <div className="flex gap-0.5 flex-shrink-0">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                                                ))}
                                            </div>
                                        </div>

                                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                                            {project.title}
                                        </h3>

                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                            {project.desc}
                                        </p>

                                        {/* Tech Stack Tags */}
                                        <div className="flex flex-wrap gap-1.5 mb-3">
                                            {project.tech.slice(0, 4).map((tech, i) => (
                                                <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.tech.length > 4 && (
                                                <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                                    +{project.tech.length - 4}
                                                </span>
                                            )}
                                        </div>

                                        {/* Result Badge */}
                                        <div className='flex flex-col mb-3 gap-2'>
                                            <div className="flex items-center gap-1.5 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1.5 rounded-lg w-fit">
                                                <TrendingUp size={12} />
                                                <span>{project.outcome}</span>
                                            </div>

                                            <div className={`${getCompletionColor(project.student.daysToComplete)} px-2 py-1.5 rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1 w-fit`}>
                                                {getCompletionIcon(project.student.daysToComplete)}
                                                <span>Completed in {formatDays(project.student.daysToComplete)}</span>
                                            </div>
                                        </div>

                                        {/* CTA Button */}
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-auto">
                                            <button className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm group cursor-pointer">
                                                <Eye size={16} />
                                                <span>View Project</span>
                                                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Pagination */}
                    <div className="swiper-pagination-custom flex justify-center gap-2 mt-8"></div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-2 text-center">
                    <p className="text-gray-600 mb-4 text-sm md:text-base">
                        Want to build projects like these and showcase in your portfolio?
                    </p>
                    <Link to="/courses">
                        <button className="inline-flex items-center gap-2 px-8 py-3 bg-white border-2 border-purple-600 text-purple-600 font-semibold rounded-xl hover:bg-purple-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg cursor-pointer">
                            Start Your First Project Today
                            <ExternalLink size={16} />
                        </button>
                    </Link>
                </div>

            </div>

            {/* Custom CSS for Swiper */}
            <style jsx>{`
                .projects-swiper {
                    padding: 10px 0 !important;
                }
                
                .projects-swiper .swiper-slide {
                    height: auto;
                }
                
                .swiper-pagination-custom .swiper-pagination-bullet {
                    width: 8px;
                    height: 8px;
                    background: #d1d5db;
 opacity: 1;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                
                .swiper-pagination-custom .swiper-pagination-bullet-active {
                    background: #7c3aeb;
                    width: 24px;
                    border-radius: 4px;
                }
                
                @media (max-width: 768px) {
                    .projects-swiper {
                        padding: 5px 0 !important;
                    }
                }
            `}</style>
        </section>
    )
}

export default Projects