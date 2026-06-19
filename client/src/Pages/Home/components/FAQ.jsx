import React, { useState } from "react"
import {
    ChevronDown,
    HelpCircle,
    MessageCircle,
    Mail,
    Phone,
    Zap,
    Shield,
    Clock,
    Award,
    GraduationCap,
    Briefcase,
    Video,
    DollarSign,
    RefreshCw,
    ShieldCheck,
    AlarmClock,
    FileText,
    Headphones
} from "lucide-react"

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null)

    const faqs = [
        {
            question: "Who can join Maxify Academy courses?",
            answer: "Anyone can join, including students, job seekers, freelancers, business owners, and professionals looking to upgrade their digital skills.",
            icon: GraduationCap,
            category: "Getting Started"
        },
        {
            question: "Do I need any prior experience to enroll?",
            answer: "No. Most of our courses are designed for beginners and guide you step-by-step from fundamentals to advanced concepts.",
            icon: Briefcase,
            category: "Career Support"
        },
        {
            question: "Will I receive a certificate after completing a course?",
            answer: "Yes, students receive a course completion certificate from Maxify Academy after successfully completing the course requirements.",
            icon: Video,
            category: "Learning Format"
        },
        {
            question: "Are the courses practical or theory-based?",
            answer: "Our courses focus on practical learning through real-world projects, assignments, case studies, and hands-on exercises",
            icon: DollarSign,
            category: "Results"
        },
        {
            question: " Will I get lifetime access to the course?",
            answer: "Yes, once enrolled, you get lifetime access to course content, future updates, and learning resources.",
            icon: RefreshCw,
            category: "Access"
        },
        {
            question: "Can I learn at my own pace?",
            answer: "Absolutely. You can access the course anytime and learn according to your schedule from any device.",
            icon: ShieldCheck,
            category: "Guarantee"
        },
        {
            question: "Do you provide mentorship and support?",
            answer: "Yes, students receive guidance, doubt-solving support, and mentorship throughout their learning journey.",
            icon: AlarmClock,
            category: "Flexibility"
        },
        {
            question: "How do I get started with Maxify Academy?",
            answer: "Simply choose your preferred course, complete the enrollment process, and start learning immediately from your student dashboard.",
            icon: FileText,
            category: "Certification"
        }
    ]

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index)
    }

    return (
        <section className="w-full bg-gradient-to-b from-white to-gray-50 py-4 md:py-8">
            <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto">
                    {/* Mini badge */}
                    <div className="inline-flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-full mb-4">
                        <HelpCircle size={14} className="text-purple-600" />
                        <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">HAVE QUESTIONS?</span>
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                        Frequently Asked{' '}
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Questions
                        </span>
                    </h2>

                    <p className="mt-4 text-base md:text-lg text-gray-600">
                        Find answers to the most common questions about courses, certifications, learning support, and your journey with Maxify Academy.
                        <span className="block text-sm text-purple-600 font-semibold mt-1">Still Have Questions? Contact Our Support Team</span>
                    </p>
                </div>

                {/* FAQ Grid - Desktop */}
                <div className="hidden md:grid md:grid-cols-2 gap-4 mt-12">
                    {faqs.map((faq, index) => {
                        const Icon = faq.icon
                        const isOpen = activeIndex === index

                        return (
                            <div
                                key={index}
                                className={`bg-white rounded-xl border transition-all duration-300 cursor-pointer ${isOpen
                                    ? 'border-purple-200 shadow-lg'
                                    : 'border-gray-200 hover:border-purple-200 hover:shadow-premium'
                                    }`}
                                onClick={() => toggleFAQ(index)}
                            >
                                <div className="p-5">
                                    {/* Question */}
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-6 h-6 rounded-lg bg-purple-100 flex items-center justify-center">
                                                    <Icon size={14} className="text-purple-600" />
                                                </div>
                                                <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                                                    {faq.category}
                                                </span>
                                            </div>
                                            <h3 className="text-base font-semibold text-gray-900 pr-4">
                                                {faq.question}
                                            </h3>
                                        </div>
                                        <ChevronDown
                                            size={20}
                                            className={`flex-shrink-0 transition-transform duration-300 mt-1 ${isOpen ? "rotate-180 text-purple-600" : "text-gray-400"
                                                }`}
                                        />
                                    </div>

                                    {/* Answer */}
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 mt-3" : "max-h-0"
                                            }`}
                                    >
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* FAQ List - Mobile (Vertical) */}
                <div className="md:hidden mt-12 space-y-3">
                    {faqs.map((faq, index) => {
                        const Icon = faq.icon
                        const isOpen = activeIndex === index

                        return (
                            <div
                                key={index}
                                className="bg-white rounded-xl border border-gray-200 transition-all duration-300 cursor-pointer hover:border-purple-200"
                                onClick={() => toggleFAQ(index)}
                            >
                                <div className="p-4">
                                    {/* Question */}
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-5 h-5 rounded-lg bg-purple-100 flex items-center justify-center">
                                                    <Icon size={12} className="text-purple-600" />
                                                </div>
                                                <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                                                    {faq.category}
                                                </span>
                                            </div>
                                            <h3 className="text-sm font-semibold text-gray-900 pr-4 leading-relaxed">
                                                {faq.question}
                                            </h3>
                                        </div>
                                        <ChevronDown
                                            size={18}
                                            className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-purple-600" : "text-gray-400"
                                                }`}
                                        />
                                    </div>

                                    {/* Answer */}
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-32 mt-3" : "max-h-0"
                                            }`}
                                    >
                                        <p className="text-xs text-gray-600 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Quick Stats */}
                <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-4">

                    {/* Card 1 */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-premium transition-all duration-300 p-5 text-center hover:-translate-y-1">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-3">
                            <Clock size={22} className="text-purple-600" />
                        </div>

                        <p className="text-base font-bold text-gray-900">
                            24/7 Support
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                            Always here to help
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-premium transition-all duration-300 p-5 text-center hover:-translate-y-1">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-3">
                            <Zap size={22} className="text-green-600" />
                        </div>

                        <p className="text-base font-bold text-gray-900">
                            Fast Response
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                            Within 2 hours
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-premium transition-all duration-300 p-5 text-center hover:-translate-y-1">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-3">
                            <Shield size={22} className="text-blue-600" />
                        </div>

                        <p className="text-base font-bold text-gray-900">
                            Secure Learning
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                            100% safe platform
                        </p>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-premium transition-all duration-300 p-5 text-center hover:-translate-y-1">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-xl mb-3">
                            <Award size={22} className="text-orange-600" />
                        </div>

                        <p className="text-base font-bold text-gray-900">
                            Trusted by 2500+
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                            Students Across India
                        </p>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default FAQ