import React, { useState, useEffect } from "react";
import UserLayout from "../Layouts/UserLayout";
import { ChevronDown, HelpCircle, MessageCircle, Mail, Headphones, Search } from "lucide-react";
import { Link } from "react-router-dom";

const FAQ = ({ faqs = [] }) => {

    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    // Default Questions
    const defaultFaqs = [
        {
            question: "What is Maxify Academy?",
            answer: "Maxify Academy is an online learning platform offering practical, skill-based courses designed for beginners to professionals. We focus on real-world projects and income-generating skills in programming, web development, graphic design, and social media earning."
        },
        {
            question: "Do I get lifetime access to courses?",
            answer: "Yes! All courses include lifetime access. You can learn anytime at your own pace without any deadlines or restrictions. Plus, you get all future updates for free."
        },
        {
            question: "Will I get a certificate after completing a course?",
            answer: "Absolutely! After successful completion, you receive a verified certificate from Maxify Academy that you can share on LinkedIn, add to your resume, and showcase to potential employers."
        },
        {
            question: "Are the courses beginner-friendly?",
            answer: "Yes, all courses are structured from beginner to advanced levels with real-world examples, hands-on projects, and expert mentorship. No prior experience needed for most courses."
        },
        {
            question: "Can I access the courses on mobile?",
            answer: "Yes! Our platform is fully mobile-responsive, so you can learn anywhere, anytime from your phone, tablet, or laptop. All course materials are optimized for mobile viewing."
        },
        {
            question: "What payment methods are supported?",
            answer: "We support all major payment methods including UPI (Google Pay, PhonePe, Paytm), Debit/Credit Cards, Net Banking, and digital wallets. EMI options are also available."
        },
        {
            question: "Is there any refund policy?",
            answer: "Yes, we offer a 7-day money-back guarantee. If you're not satisfied with the course quality within the first 7 days, we'll issue a full refund — no questions asked."
        },
        {
            question: "How can I get placement assistance?",
            answer: "After course completion, you get access to our placement cell including resume reviews, mock interviews, portfolio building, and connections with 200+ hiring partners."
        }
    ];

    const finalFaqs = faqs.length > 0 ? faqs : defaultFaqs;
    const [openIndex, setOpenIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Filter FAQs based on search
    const filteredFaqs = searchQuery 
        ? finalFaqs.filter(faq => 
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : finalFaqs;

    return (
        <UserLayout>
            <main className="min-h-screen bg-gray-50">
                {/* Hero Section - Purple to Blue Gradient (Matching Courses Component) */}
                <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-blue-800 overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 rounded-full filter blur-3xl"></div>
                    </div>
                    
                    {/* Hero Content */}
                    <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-20">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            {/* Left Side - Text */}
                            <div>
                                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-5">
                                    <HelpCircle className="w-4 h-4 text-white" />
                                    <span className="text-white/90 text-sm font-medium">Got Questions? We Have Answers</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
                                    Frequently Asked
                                    <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent"> Questions</span>
                                </h1>
                                <p className="text-white/80 text-lg mb-8 leading-relaxed max-w-lg">
                                    Everything you need to know about Maxify Academy. Can't find what you're looking for? Our support team is here to help 24/7.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link 
                                        to="/contact" 
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
                                    >
                                        <Headphones className="w-5 h-5" />
                                        Contact Support
                                    </Link>
                                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-white border border-white/20">
                                        <Mail className="w-5 h-5" />
                                        <span>support@maxifyacademy.com</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - FAQ Related Image */}
                            <div className="relative">
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                    <img 
                                        src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80"
                                        alt="FAQ Support Team"
                                        className="w-full h-auto object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                </div>
                                {/* Floating Badge 1 */}
                                <div className="absolute -bottom-5 -left-5 bg-white rounded-xl shadow-lg p-3 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <MessageCircle className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Quick Response</p>
                                        <p className="text-sm font-semibold text-gray-900">Within 4 hours</p>
                                    </div>
                                </div>
                                {/* Floating Badge 2 */}
                                <div className="absolute -top-5 -right-5 bg-white rounded-xl shadow-lg p-3 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <Headphones className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">24/7 Available</p>
                                        <p className="text-sm font-semibold text-gray-900">Live Support</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Curve */}
                    <div className="absolute bottom-0 left-0 right-0">
                        <svg viewBox="0 0 1440 100" className="w-full h-auto" fill="#f8fafc">
                            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
                        </svg>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-7xl mx-auto px-4 py-16">
                    {/* Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                        <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <p className="text-2xl font-bold text-purple-600">8+</p>
                            <p className="text-sm text-gray-600">FAQ Topics</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <p className="text-2xl font-bold text-purple-600">24/7</p>
                            <p className="text-sm text-gray-600">Support Available</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <p className="text-2xl font-bold text-green-600">5000+</p>
                            <p className="text-sm text-gray-600">Happy Students</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <p className="text-2xl font-bold text-green-600">92%</p>
                            <p className="text-sm text-gray-600">Satisfaction Rate</p>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-8">
                        <div className="relative max-w-md mx-auto">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search your question..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 transition-all"
                            />
                        </div>
                    </div>

                    {/* Accordion */}
                    {filteredFaqs.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                            <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">No matching questions found.</p>
                            <button 
                                onClick={() => setSearchQuery("")}
                                className="mt-3 text-purple-600 font-medium hover:underline"
                            >
                                Clear search
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredFaqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                                >
                                    <button
                                        className={`w-full text-left px-6 py-5 flex justify-between items-center transition-colors ${
                                            openIndex === index ? "bg-purple-50 border-b border-purple-100" : ""
                                        }`}
                                        onClick={() => toggleFAQ(index)}
                                    >
                                        <span className="font-semibold text-gray-900 text-base md:text-lg pr-4">
                                            {faq.question}
                                        </span>
                                        <ChevronDown 
                                            className={`w-5 h-5 text-purple-600 flex-shrink-0 transition-transform duration-200 ${
                                                openIndex === index ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>

                                    {openIndex === index && (
                                        <div className="px-6 py-5 text-gray-600 bg-white leading-relaxed border-t border-gray-50">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Still Have Questions */}
                    <div className="mt-12 text-center bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                        <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageCircle className="w-7 h-7 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                            Can't find the answer you're looking for? Our friendly support team is here to help.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link 
                                to="/contact" 
                                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                            >
                                <Mail className="w-4 h-4" />
                                Contact Support
                            </Link>
                            <button 
                                onClick={() => window.location.href = "mailto:support@maxifyacademy.com"}
                                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-gray-200 bg-white text-gray-700 rounded-lg font-medium hover:border-purple-600 hover:text-purple-600 transition-colors"
                            >
                                support@maxifyacademy.com
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </UserLayout>
    );
};

export default FAQ;