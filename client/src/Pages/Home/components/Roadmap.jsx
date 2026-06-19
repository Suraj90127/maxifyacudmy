import React from 'react'
import { BookOpen, Code2, FolderKanban, Rocket, CheckCircle2, Target, Zap, Award, TrendingUp, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

const Roadmap = () => {
    const steps = [
        {
            title: "Learn In-Demand Skills",
            desc: "Master industry-relevant concepts through expert-led training and practical lessons.",
            fullDesc: "Get hands-on training with industry experts. Learn the latest tools and technologies through live sessions and recorded lectures.",
            icon: BookOpen,
            duration: "4-6 weeks",
            skills: ["Web Development" , "Digital Marketing"],
            outcome: "Build Strong Foundations",
            color: "from-blue-500 to-blue-600",
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600"
        },
        {
            title: "Build Real Projects",
            desc: "Apply your knowledge by working on practical projects that simulate real-world scenarios.",
            fullDesc: "Build 5+ industry-grade projects that solve real problems. Get code reviews from mentors and improve your skills.",
            icon: Code2,
            duration: "6-8 weeks",
            skills: ["Live Projects" , "Hands-On Practice"],
            outcome: "Portfolio Ready",
            color: "from-green-500 to-green-600",
            bgColor: "bg-green-50",
            iconColor: "text-green-600"
        },
        {
            title: "Create Your Portfolio",
            desc: "Showcase your best work with a professional portfolio that highlights your skills and achievements.",
            fullDesc: "Build an impressive portfolio website that highlights your best projects. Learn to present your work professionally.",
            icon: FolderKanban,
            duration: "2-3 weeks",
            skills: ["Portfolio Website" , "Case Studies"],
            outcome: "Stand out to employers",
            color: "from-purple-500 to-purple-600",
            bgColor: "bg-purple-50",
            iconColor: "text-purple-600"
        },
        {
            title: "Start Freelancing Or Get Hired",
            desc: "Leverage your skills, portfolio, and certification to secure clients or land your dream job.",
            fullDesc: "Get placement assistance, interview preparation, and freelancing tips. Start earning within 2 months of completion.",
            icon: Rocket,
            duration: "Ongoing",
            skills: ["Interview Preparation" , "Career Guidance"],
            outcome: "Start Your Career Journey",
            color: "from-orange-500 to-red-500",
            bgColor: "bg-orange-50",
            iconColor: "text-orange-600"
        },
    ]

    return (
        <section className="w-full bg-gradient-to-b from-white to-gray-50 py-4 md:py-8 overflow-hidden">
            <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto">
                    {/* Mini badge */}
                    <div className="inline-flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-full mb-4">
                        <Target size={14} className="text-purple-600" />
                        <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">YOUR CAREER JOURNEY STARTS HERE</span>
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                        Your Path To{' '}
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Digital Success
                        </span>
                    </h2>

                    <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
                        Follow a structured learning roadmap designed to help you gain valuable skills, build real projects, create a professional portfolio, and start your career with confidence.
                        <span className="block text-sm text-purple-600 font-semibold mt-1">Step-By-Step Learning To Career Growth</span>
                    </p>
                </div>


                {/* Compact Premium Roadmap */}
                <div className="mt-14">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">

                        {steps.map((step, index) => {
                            const Icon = step.icon

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group relative"
                                >
                                    {/* Connector Line Desktop */}
                                    {index !== steps.length - 1 && (
                                        <div className="hidden lg:block absolute top-10 left-[85%] w-[30%] h-[2px] bg-gradient-to-r from-purple-300 to-blue-300 z-0"></div>
                                    )}

                                    <div className="relative z-10 bg-white border border-gray-100 rounded-2xl p-5 shadow-md hover:shadow-premium transition-all duration-300 hover:-translate-y-1 h-full">

                                        {/* Top */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg`}>
                                                <Icon size={22} className="text-white" />
                                            </div>

                                            <div className="text-xs font-semibold text-gray-400">
                                                Step {index + 1}
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                                            {step.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                            {step.desc}
                                        </p>

                                        {/* Skills */}
                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {step.skills.slice(0, 2).map((skill, i) => (
                                                <span
                                                    key={i}
                                                    className="text-[11px] px-2 py-1 bg-gray-100 rounded-full text-gray-700"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Bottom */}
                                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                            <div className="flex items-center gap-1 text-xs text-purple-600 font-semibold">
                                                <Award size={13} />
                                                {step.outcome}
                                            </div>

                                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                                <Calendar size={12} />
                                                {step.duration}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Roadmap