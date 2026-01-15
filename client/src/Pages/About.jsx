import React from "react";
import { useEffect } from "react";
import UserLayout from "../Layouts/UserLayout";

const About = () => {
    useEffect(() => {
        window.scroll(0, 0)
    })
    return (
        <UserLayout>
            <main className="py-5 mt-5 bg-gradient-to-br from-gray-100 to-[#eef1f6]">
                <div className="container mx-auto px-4 lg:px-0">

                    {/* Hero Section */}
                    <div className="grid lg:grid-cols-2 items-center mb-10">

                        {/* Left Image */}
                        <div className="mb-6 lg:mb-0">
                            <img
                                src="https://img.freepik.com/free-photo/about-as-service-contact-information-concept_53876-138509.jpg"
                                alt="About Maxify Academy"
                                className="rounded-2xl w-full"
                            />
                        </div>

                        {/* Right Content */}
                        <div className="lg:pl-10">
                            <h1 className="font-bold text-4xl lg:text-5xl mb-3 text-gray-900">
                                🧠 About <span className="text-blue-600">Maxify Academy</span>
                            </h1>

                            <p className="text-lg text-gray-600 mb-4">
                                Welcome to <strong>Maxify Academy</strong>, a modern online learning platform
                                created to empower individuals and professionals with the skills needed
                                to thrive in the digital era.
                            </p>

                            <p className="text-gray-700">
                                We believe education should be <strong>practical</strong>,
                                <strong> affordable</strong>, and <strong>accessible</strong> to everyone,
                                everywhere.
                            </p>

                            <a
                                href="/"
                                className="inline-block mt-4 px-6 py-3 text-white text-lg rounded-lg"
                                style={{
                                    background: "linear-gradient(90deg, #007bff, #6610f2)",
                                }}
                            >
                                ← Back to Home
                            </a>
                        </div>
                    </div>

                    <hr className="my-8 opacity-20" />

                    {/* Who We Are */}
                    <section className="p-6 bg-white rounded-2xl mb-10 shadow-sm">
                        <h3 className="text-2xl font-semibold mb-4 text-blue-600">🚀 Who We Are</h3>

                        <p className="text-lg leading-relaxed">
                            Maxify Academy is an initiative by <strong>Md Jahid Raza</strong>, founder of
                            <strong> Maxify Web Solutions Pvt. Ltd.</strong> — a leading IT company known
                            for innovation in web development, digital marketing, and technology-based solutions.
                        </p>

                        <p className="text-gray-600 mt-3">
                            The Academy was built with one mission — to simplify learning and help
                            learners gain real-world knowledge through hands-on courses taught by industry experts.
                        </p>
                    </section>

                    {/* Mission & What We Offer */}
                    <div className="grid md:grid-cols-2 gap-6 mb-10">
                        {/* Mission */}
                        <section className="p-6 bg-white rounded-2xl h-full shadow-sm">
                            <h3 className="text-xl font-semibold mb-3 text-blue-600">🎯 Our Mission</h3>
                            <p className="text-gray-600">
                                Our mission is to bridge the gap between theoretical knowledge and practical skills.
                                Every course is designed so that learners can apply what they learn confidently in
                                real business and professional environments.
                            </p>
                        </section>

                        {/* What We Offer */}
                        <section className="p-6 bg-white rounded-2xl h-full shadow-sm">
                            <h3 className="text-xl font-semibold mb-3 text-blue-600">💡 What We Offer</h3>

                            <ul className="space-y-2 text-gray-800">
                                <li>💻 Website Development & Design</li>
                                <li>📈 Digital Marketing & Meta Ads Mastery</li>
                                <li>🎨 Graphic Design & Brand Building</li>
                                <li>📱 Social Media Marketing & Strategy</li>
                                <li>🤖 AI Tools & Automation Techniques</li>
                            </ul>

                            <p className="text-gray-600 mt-3">
                                Each course includes live examples, structured modules, and expert guidance.
                            </p>
                        </section>
                    </div>

                    {/* Values */}
                    <section className="p-6 bg-white rounded-2xl mb-10 shadow-sm">
                        <h3 className="text-xl font-semibold mb-3 text-blue-600">🔐 Our Values</h3>

                        <p className="text-gray-600 leading-relaxed">
                            At Maxify Academy, trust, transparency, and learner satisfaction are our top priorities.
                            We follow a strict Privacy Policy to ensure your data remains protected.
                            Our Terms of Use and Refund Policy make your learning experience safe and secure.
                        </p>
                    </section>

                    {/* Why Choose Us */}
                    <section
                        className="my-10 py-10 px-6 rounded-2xl text-white text-center"
                        style={{
                            background: "linear-gradient(90deg, #6610f2, #007bff)",
                        }}
                    >
                        <h3 className="text-2xl font-bold mb-8">👨‍🏫 Why Choose Maxify Academy?</h3>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                            {[
                                ["Practical Learning", "Focused on real-world applications."],
                                ["Lifetime Access", "Learn anytime, anywhere, at your pace."],
                                ["Expert Support", "Get help from professionals anytime."],
                                ["Affordable Courses", "Quality education at minimal cost."],
                                ["Community Learning", "Connect and grow with other learners."],
                            ].map(([title, desc], idx) => (
                                <div key={idx} className="p-4 bg-white text-gray-900 rounded-2xl shadow-sm">
                                    <span className="font-bold">✅ {title}</span>
                                    <br />
                                    <small>{desc}</small>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Commitment */}
                    <section className="p-6 bg-white rounded-2xl mb-10 shadow-sm">
                        <h3 className="text-xl font-semibold mb-3 text-blue-600">🤝 Our Commitment</h3>
                        <p className="text-gray-600 leading-relaxed">
                            We’re committed to helping every learner achieve personal and professional growth through
                            technology-driven education. You’re not just enrolling in a course —
                            you’re joining a community that believes in lifelong learning.
                        </p>
                    </section>

                    {/* Contact */}
                    <section className="text-center p-8 bg-white rounded-2xl shadow-sm">
                        <h3 className="text-xl font-semibold mb-3 text-blue-600">📞 Contact Us</h3>
                        <p className="text-gray-600">For any inquiries, support, or feedback:</p>

                        <p className="font-bold text-lg mt-2">
                            📩{" "}
                            <a
                                href="mailto:support@maxifyacademy.com"
                                className="text-gray-800 hover:text-blue-600"
                            >
                                support@maxifyacademy.com
                            </a>
                        </p>
                    </section>
                </div>
            </main>
        </UserLayout>

    );
};

export default About;
