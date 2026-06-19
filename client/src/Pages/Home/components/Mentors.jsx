import React, { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Check, ChevronLeft, ChevronRight, Star, Award, Users, Play, GraduationCap } from "lucide-react"

const Mentors = () => {
    const scrollRef = useRef(null)
    const navigate = useNavigate()
    const [activeIndex, setActiveIndex] = useState(0)

    const handleLearnClick = () => {
        navigate("/courses")
    }

    const mentors = [
        {
            name: "Shahid Raza",
            role: "Co-Founder & CEO ",
            company: "Maxify Web Solution",
            experience: "5+ years",
            students: "1700+ Students Trained",
            rating: 4.9,
            title: "Learn Digital Marketing & Business Growth with Shahid Raza",
            desc: "Master Digital Marketing, Performance Marketing, Meta Ads, Google Ads, Lead Generation, Sales Funnels, AI Tools, and Client Acquisition Strategies with practical, real-world training.",
            fullDesc: "Build high-income skills that help you grow your business, get freelance clients, start your agency, or advance your career with step-by-step guidance and live implementation.",
            image: "https://i.ibb.co/218pWDxG/shahid.jpg",
            expertise: ["Digital Marketing", "Meta Ads", "Google Ads", "Lead Generation", "Sales Funnels", "AI Automation"],
            features: ["Live Campaign Setup", "Real Client Projects", "Growth Strategies", "Career Guidance", "Lifetime Support"]
        },
        {
            name: "Juli Thakur",
            role: "Full Stack Developer",
            company: "Maxify",
            experience: "4+ years",
            students: "1200+ student Trained",
            rating: 4.9,
            title: "Master Full Stack Development with Juli Thakur",
            desc: "Learn modern Full Stack Development from frontend to backend, including responsive website development, APIs, databases, authentication systems, and deployment strategies used by professional developers",
            fullDesc: "Build real-world web applications using industry-standard technologies and gain practical experience through hands-on projects that prepare you for freelance, startup, and corporate opportunities. Whether you're a beginner or aspiring developer, this course will help you develop the skills needed to create scalable and high-performing web applications.",
            image: "https://i.ibb.co/6RMVhNfT/Juli-1.jpg",
            expertise: ["Full Stack Development", "Node.js", "React.js", "MongoDB", "REST APIs", "Web App Development"],
            features: ["Live Sessions", "Real-world Projects", "Career Guidance", "Portfolio Development", "Reviews & Mentorship"],
            button: "Learn with Juli"
        },
        {
            name: "Sonam Misra",
            role: "Senior Graphic Designer & Video Editor",
            company: "Maxify",
            experience: "4+ years",
            students: "5000+ Creative Projects Completed",
            rating: 4.8,
            title: "Master Graphic Design & Video Editing with Sonam Mishra",
            desc: "Learn professional Graphic Design, Branding, Social Media Creatives, YouTube Thumbnails, Motion Graphics, and Video Editing through practical projects and industry-standard workflows.",
            fullDesc: "Whether you want to become a freelancer, content creator, designer, or agency professional, this course will help you build creative skills that clients and businesses actually need. Build stunning visuals, engaging videos, and a professional portfolio with hands-on training and real-world assignments.",
            image: "https://i.ibb.co/v4BjXHBm/sonam.jpg",
            expertise: ["Graphic Design", "Video Editing", "Branding Design", "Social Media Creatives", "YouTube Thumbnails", "Motion Graphics"],
            features: ["Live Sessions", "Real Client Projects", "Portfolio Building", "Industry-Standard Training"],
            button: "Learn with Sonam"
        },
        {
            name: "Saqlain Malik",
            role: "MERN Stack Developer",
            company: "Maxify",
            experience: "2+ years",
            students: "100+ Web Projects Built",
            rating: 4.8,
            title: "Master MERN Stack Development with Saqlain Mallik",
            desc: "Learn modern web development using the MERN Stack (MongoDB, Express.js, React.js, and Node.js) and build powerful, scalable web applications from scratch.",
            fullDesc: "Gain hands-on experience in frontend development, backend APIs, database management, authentication systems, and full-stack project deployment through practical, project-based learning. Whether you want to become a web developer, freelancer, or software engineer, this course will help you build industry-relevant skills and real-world projects. ",
            image: "https://i.ibb.co/LhJq55rn/saqlain.jpg",
            expertise: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "Full Stack Development"],
            features: ["Live Sessions", "Hands-on Projects", "portfolio Building", "Development Practices", "Career Guidance"]
        },
        {
            name: "Suraj Gautam",
            role: "Senior Full Stack Developer",
            company: "Maxify",
            experience: "6+ years",
            students: "500+ Web Solutions Delivered",
            rating: 4.8,
            title: "Master Full Stack Development with Suraj Gautam",
            desc: "Learn Full Stack Development from industry experts and build modern, scalable web applications using the latest technologies and best development practices.",
            fullDesc: "From responsive frontend interfaces to powerful backend systems and database management, this course provides hands-on training that prepares you for real-world development projects, freelancing, startups, and tech careers. Gain practical experience by building complete applications and understanding the full development lifecycle from planning to deployment.",
            image: "https://i.ibb.co/ZpVCsG8h/suraj.jpg",
            expertise: ["Full Stack Development", "React.js", "React Native", "Node.js", "JavaScript", "MongoDB", "API Development"],
            features: ["Live Sessions", "Real-World Projects", "Portfolio Building", "Industry Best Practices", "Career Guidance"],
            badge: " 500+ Web Solutions Delivered",
            buttonText: " Learn with Suraj"
        },
        {
            name: "Fazal Ahmad",
            role: "SEO & Google Ads Specialist",
            company: "Maxify",
            experience: "8+ years",
            students: "10000+ Campaigns Optimized",
            rating: 4.9,
            title: "Master SEO & Google Ads with Fazal Ahmad",
            desc: "Learn Search Engine Optimization (SEO), Google Ads, Keyword Research, Technical SEO, Local SEO, Performance Marketing, and Lead Generation from industry-proven strategies and real-world campaigns.",
            fullDesc: "Gain practical skills to rank websites on Google, generate qualified leads, increase website traffic, and maximize ROI through data-driven marketing techniques. Whether you're a business owner, freelancer, marketer, or aspiring digital professional, this course will help you build expertise that delivers measurable results.",
            image: "https://i.ibb.co/4ZPQ0Z2d/Fazal-Ahmad.jpg",
            expertise: ["Search Engine Optimization (SEO)", "Google Ads", "Technical SEO", "Local SEO", "Keyword Research", "Performance Marketing"],
            features: ["Live Sessions", "Real Case Studies", "Hands-on Training", "Audit Techniques", "Lead Strategies"],
            badge: "10,000+ Campaigns Optimized",
            buttonText: "Learn with Fazal"
        }
    ]

    const scroll = (direction) => {
        const container = scrollRef.current
        const scrollAmount = container.offsetWidth
        container.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        })
    }

    const handleScroll = () => {
        const container = scrollRef.current
        const index = Math.round(container.scrollLeft / container.offsetWidth)
        setActiveIndex(index)
    }

    useEffect(() => {
        const container = scrollRef.current
        if (container) {
            container.addEventListener('scroll', handleScroll)
            return () => container.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        const container = scrollRef.current
        if (!container) return
        const interval = setInterval(() => {
            const nextIndex = activeIndex === mentors.length - 1 ? 0 : activeIndex + 1
            container.scrollTo({
                left: nextIndex * container.offsetWidth,
                behavior: "smooth",
            })
            setActiveIndex(nextIndex)
        }, 5000)
        return () => clearInterval(interval)
    }, [activeIndex, mentors.length])

    const currentMentor = mentors[activeIndex]

    return (
        <section className="w-full bg-gradient-to-b from-gray-50 to-white py-7 md:py-6 overflow-hidden">
            {/* Section Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:mb-5">
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-full mb-4">
                        <GraduationCap size={14} className="text-purple-600" />
                        <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">Learn from Industry Experts</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                        Meet Your{' '}
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Expert Mentors
                        </span>
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
                        Learn from professionals who have worked at top companies and trained thousands of successful students.
                    </p>
                </div>
            </div>

            {/* SCROLL CONTAINER */}
            <div className="relative">
                <div
                    ref={scrollRef}
                    className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {mentors.map((mentor, index) => (
                        <div
                            key={index}
                            className="min-w-full flex items-center justify-center snap-start px-4 sm:px-6 lg:px-8 py-6 md:py-4"
                        >
                            <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center max-w-6xl w-full">

                                {/* IMAGE SECTION */}
                                <div className="w-full lg:w-5/12 order-1 lg:order-1">
                                    <div className="relative flex justify-center">
                                        {/* Decorative blur backgrounds */}
                                        <div className="absolute -top-4 -left-4 w-40 h-40 bg-purple-200 rounded-full blur-2xl opacity-50"></div>
                                        <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-blue-200 rounded-full blur-2xl opacity-50"></div>

                                        {/* Main Image Container */}
                                        <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-full">
                                            <div className="relative rounded-2xl shadow-xl overflow-hidden bg-gray-100">
                                                <div className="aspect-[3/3] md:aspect-[4/3.2] lg:aspect-[4/3.5]">
                                                    <img
                                                        src={mentor.image}
                                                        alt={mentor.name}
                                                        className="w-full h-full object-cover object-center"
                                                    />
                                                </div>
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                                            </div>

                                            {/* Mentor Info Badge */}
                                            <div className="absolute bottom-4 left-4 right-4 bg-white/95 rounded-xl p-3 shadow-lg">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 text-sm md:text-base">{mentor.name}</h4>
                                                        <p className="text-xs text-gray-600">{mentor.role} at {mentor.company}</p>
                                                    </div>
                                                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                                                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                                        <span className="text-sm font-bold text-gray-900">{mentor.rating}</span>
                                                    </div>
                                                </div>
                                                <div className="inline-flex items-center gap-2 bg-purple-50 py-1.5 rounded-full">
                                                    <Award size={14} className="text-purple-600" />
                                                    <span className="text-xs font-semibold text-purple-600">{mentor.experience} Experience</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Floating Stats Badge */}
                                        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1.5 rounded-xl shadow-lg">
                                            <div className="flex items-center gap-1 text-xs">
                                                <Users size={12} />
                                                <span className="font-semibold">{mentor.students}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* CONTENT SECTION */}
                                <div className="w-full lg:w-7/12 order-2 lg:order-2  lg:text-left">
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight -mt-4 mb-4">
                                        {mentor.title}
                                    </h3>

                                    <p className="text-gray-600 text-sm md:text-base mb-1 leading-relaxed">
                                        {mentor.desc}
                                    </p>

                                    <p className="text-gray-500 text-sm mb-6 leading-relaxed hidden md:block">
                                        {mentor.fullDesc}
                                    </p>

                                    {/* Expertise Tags - Now showing current mentor's expertise */}
                                    <div className="mb-6">
                                        <p className="text-xs font-semibold text-gray-700 mb-2 text-center lg:text-left">Expertise Areas:</p>
                                        <div className="flex flex-wrap  gap-2 sm:gap-2 justify-start">
                                            {mentor.expertise.map((skill, i) => (
                                                <span key={i} className="text-[11px] sm:text-xs px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full whitespace-wrap">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Key Features - Now showing current mentor's features */}
                                    <div className="grid grid-cols-2 gap-3 mb-6">
                                        {(mentor.features || mentor.expertise).slice(0, 6).map((feature, i) => (
                                            <div key={i} className="flex  gap-1 text-gray-600 text-xs sm:text-sm">

                                                <Check size={14} className="text-green-500 flex-shrink-0" />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA Button - Purple to Blue Gradient */}
                                    <button onClick={handleLearnClick} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 text-sm md:text-base">
                                        <Play size={16} />
                                        {mentor.button || "Learn with " + (mentor.name)}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <div className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 gap-2">
                    <button
                        onClick={() => scroll("left")}
                        className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all hover:scale-105"
                    >
                        <ChevronLeft size={20} className="text-gray-700" />
                    </button>
                </div>

                <div className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 gap-2">
                    <button
                        onClick={() => scroll("right")}
                        className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all hover:scale-105"
                    >
                        <ChevronRight size={20} className="text-gray-700" />
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className="flex md:hidden justify-center items-center gap-4 -mt-6">
                <button
                    onClick={() => scroll("left")}
                    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg transition"
                >
                    <ChevronLeft size={18} className="text-gray-700" />
                </button>

                <div className="flex items-center gap-2">
                    {mentors.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                const container = scrollRef.current
                                container.scrollTo({
                                    left: container.offsetWidth * idx,
                                    behavior: "smooth"
                                })
                            }}
                            className={`h-2 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-8 bg-purple-600' : 'w-2 bg-gray-300'
                                }`}
                        />
                    ))}
                </div>

                <button
                    onClick={() => scroll("right")}
                    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg transition"
                >
                    <ChevronRight size={18} className="text-gray-700" />
                </button>
            </div>

            <p className="text-center text-xs text-gray-400 mt-4 md:hidden">
                Swipe or use arrows to see more mentors →
            </p>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    )
}

export default Mentors