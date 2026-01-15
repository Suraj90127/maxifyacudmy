import React, { useState, useEffect } from "react";
import UserLayout from "../Layouts/UserLayout";

const FAQ = ({ faqs = [] }) => {

    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    // Default Questions (will show if no backend faqs provided)
    const defaultFaqs = [
        {
            question: "What is Maxify Academy?",
            answer: "Maxify Academy is an online learning platform offering practical, skill-based courses designed for beginners to professionals."
        },
        {
            question: "Do I get lifetime access to courses?",
            answer: "Yes! All courses include lifetime access. You can learn anytime at your own pace."
        },
        {
            question: "Will I get a certificate after completing a course?",
            answer: "Absolutely. After successful completion, you receive a verified certificate from Maxify Academy."
        },
        {
            question: "Are the courses beginner-friendly?",
            answer: "Yes, courses are structured from beginner to advanced levels with real-world examples."
        },
        {
            question: "Can I access the courses on mobile?",
            answer: "Yes! Our platform is fully mobile-friendly, so you can learn anywhere."
        },
        {
            question: "What payment methods are supported?",
            answer: "We support all major payment methods including UPI, Debit/Credit Cards, Net Banking, and Wallets."
        }
    ];

    const finalFaqs = faqs.length > 0 ? faqs : defaultFaqs;

    const [openIndex, setOpenIndex] = useState(0);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <UserLayout>
            <main className="pt-[100px] bg-[#f8f9fa] min-h-screen">
                <section className="py-10">
                    <div className="container mx-auto px-4">

                        {/* Header */}
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
                            <p className="text-gray-500 mt-1">
                                Find quick answers to commonly asked questions below.
                            </p>
                        </div>

                        {/* Accordion */}
                        <div className="space-y-4 max-w-3xl mx-auto">
                            {finalFaqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="bg-white shadow rounded overflow-hidden"
                                >
                                    {/* Question */}
                                    <button
                                        className={`w-full text-left px-5 py-4 font-medium flex justify-between items-center ${
                                            openIndex === index ? "bg-blue-50" : ""
                                        }`}
                                        onClick={() => toggleFAQ(index)}
                                    >
                                        <span>{faq.question}</span>

                                        <svg
                                            className={`w-5 h-5 transform transition-transform ${
                                                openIndex === index ? "rotate-180" : ""
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {/* Answer */}
                                    {openIndex === index && (
                                        <div className="px-5 py-4 text-gray-700 border-t">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                    </div>
                </section>
            </main>
        </UserLayout>
    );
};

export default FAQ;
