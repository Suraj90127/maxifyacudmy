import React from "react"
import { Laptop, Headphones, GraduationCap, Users, Award, Clock, Star, Shield, Zap, BookOpen, Briefcase, MessageCircle, BadgeCheck, Crown } from "lucide-react"

const WhyChooseUs = () => {
    const features = [
        {
            icon: Laptop,
            title: "Hands-On Learning Experience",
            desc: "Learn through practical projects, assignments, and real-world scenarios that build job-ready skills.",
            color: "from-green-500 to-green-600",
            bgColor: "bg-green-50",
            iconColor: "text-green-600"
        },
        {
            icon: Headphones,
            title: "Dedicated Student Support",
            desc: " Get guidance and assistance from our team throughout your learning journey.",
            color: "from-red-500 to-red-600",
            bgColor: "bg-red-50",
            iconColor: "text-red-500"
        },
        {
            icon: GraduationCap,
            title: "Expert Mentorship",
            desc: "Learn directly from experienced professionals working in the digital industry.",
            color: "from-blue-500 to-blue-600",
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600"
        },
        {
            icon: Briefcase,
            title: "Career & Placement Assistance",
            desc: "Receive support with resume building, interview preparation, and career growth.",
            color: "from-purple-500 to-purple-600",
            bgColor: "bg-purple-50",
            iconColor: "text-purple-600"
        },
        {
            icon: Clock,
            title: "Lifetime Course Access",
            desc: "Access course materials, updates, and learning resources anytime, anywhere.",
            color: "from-orange-500 to-orange-600",
            bgColor: "bg-orange-50",
            iconColor: "text-orange-600"
        },
        {
            icon: Award,
            title: "Professional Certification",
            desc: " Earn a recognized certificate that validates your skills and project experience.",
            color: "from-teal-500 to-teal-600",
            bgColor: "bg-teal-50",
            iconColor: "text-teal-600"
        }
    ]

    return (
        <section className="w-full bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50/20 py-6 md:py-6 overflow-hidden relative">

            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-1 relative z-10">

                <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">

                    {/* LEFT CONTENT */}
                    <div>
                        {/* Mini badge */}
                        <div className="inline-flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full mb-4">
                            <Star size={14} className="text-purple-600 fill-purple-600" />
                            <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">WHY STUDENTS CHOOSE MAXIFY</span>
                        </div>

                        {/* Heading */}
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                            Transform Your Career With{' '}
                            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                Maxify Academy
                            </span>
                        </h2>

                        <p className="mt-5 text-gray-600 text-base md:text-lg leading-relaxed">
                            Master high-demand digital skills through practical training, real-world projects, expert mentorship, and career-focused learning designed for long-term success.
                        </p>

                        {/* Stats Row */}
                        <div className="mt-8 grid grid-cols-3 gap-4">
                            <div className="text-center p-3 bg-white rounded-xl shadow-sm">
                                <div className="text-2xl font-bold text-purple-600">2500+</div>
                                <div className="text-xs text-gray-600 mt-1">Students</div>
                            </div>
                            <div className="text-center p-3 bg-white rounded-xl shadow-sm">
                                <div className="text-2xl font-bold text-purple-600">92%</div>
                                <div className="text-xs text-gray-600 mt-1">Success Rate</div>
                            </div>
                            <div className="text-center p-3 bg-white rounded-xl shadow-sm">
                                <div className="text-2xl font-bold text-purple-600">4.9</div>
                                <div className="text-xs text-gray-600 mt-1">Rating</div>
                            </div>
                        </div>

                        {/* Features Grid - 2 columns */}
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {features.map((feature, index) => {
                                const Icon = feature.icon
                                return (
                                    <div
                                        key={index}
                                        className="flex gap-3 items-start group hover:bg-white p-3 rounded-xl transition-all duration-300 cursor-pointer"
                                    >
                                        <div className={`w-10 h-10 rounded-xl ${feature.bgColor} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 duration-300`}>
                                            <Icon size={20} className={feature.iconColor} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 text-sm">
                                                {feature.title}
                                            </h4>
                                            <p className="text-xs text-gray-600 mt-1 leading-relaxed line-clamp-2">
                                                {feature.desc}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 pt-1">
                            {[
                                {
                                    icon: BadgeCheck,
                                    text: "Lifetime Access",
                                    color: "text-green-500",
                                },
                                {
                                    icon: Clock,
                                    text: "Instant Access",
                                    color: "text-blue-500",
                                },
                                {
                                    icon: Crown,
                                    text: "Certificate Included",
                                    color: "text-yellow-500",
                                },
                                {
                                    icon: BadgeCheck,
                                    text: "Doubt Resolution",
                                    color: "text-green-500",
                                },
                            ].map((badge, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-center gap-2 sm:justify-start rounded-lg border border-gray-200 bg-white px-2 py-2 font-medium"
                                >
                                    <badge.icon size={16} className={badge.color} />
                                    <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                                        {badge.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT SIDE - Enhanced Visual */}
                    <div className="relative flex justify-center">
                        {/* Main Image Card */}
                        <div className="relative group">
                            {/* Decorative gradient rings */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>

                            {/* Image Circle */}
                            <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full overflow-hidden shadow-2xl ring-4 ring-white">

                                <img
                                    src="https://i.ibb.co/C5wv2GdW/Untitled-2-jpg.jpg"
                                    alt="Student learning with mentor"
                                    className="w-full h-full object-cover scale-110 transition-transform duration-700 group-hover:scale-125"
                                />
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                            </div>

                            {/* Floating Badge 1 - Top Right */}
                            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3 animate-bounce-slow">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                                        <Star size={16} className="fill-yellow-400 text-yellow-400" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm">4.9 ★</p>
                                        <p className="text-xs text-gray-500">5,000+ reviews</p>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Badge 2 - Bottom Left */}
                            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 animate-pulse-slow">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                        <Users size={16} className="text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm">2500+</p>
                                        <p className="text-xs text-gray-500">Happy Students</p>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Badge 3 - Bottom Right (Desktop) */}
                            <div className="absolute bottom-2 right-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg p-3 hidden lg:block">
                                <div className="flex items-center gap-2">
                                    <Zap size={16} className="text-white" />
                                    <div>
                                        <p className="font-bold text-white text-sm">92%</p>
                                        <p className="text-xs text-white/80">Success Rate</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        </section>
    )
}

export default WhyChooseUs