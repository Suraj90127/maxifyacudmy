import React from "react";
import {
    ExternalLink,
    Calendar,
    Clock3,
    Star,
    Users,
    Award,
    CheckCircle2,
    ArrowLeft,
    PlayCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import UserLayout from "../Layouts/UserLayout";

const ProjectCaseStudy = () => {
    const { slug } = useParams();

    const projectsData = {
        "frontend-development": {
            title: "Frontend Development",
            category: "Frontend",
            image:
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
            demoUrl: "https://frontend-demo.vercel.app",
            desc: "Premium responsive frontend applications built by students after completing the course.",
            mentor: "Saqlain Malik",
            students: [
                {
                    name: "Rahul Verma",
                    image:
                        "https://randomuser.me/api/portraits/men/32.jpg",
                    joined: "January 2026",
                    duration: "4 Months",
                    mentor: "Saqlain Malik",
                    role: "Frontend Developer",
                    projectTitle: "Modern Ecommerce UI",
                    projectImage:
                        "https://images.unsplash.com/photo-1523475472560-d2df97ec485c",
                    demo: "https://ecommerce-ui-demo.vercel.app",
                    review:
                        "I learned React and Tailwind from scratch and built this ecommerce frontend project during mentorship sessions.",
                    rating: 5,
                },

                {
                    name: "Priya Singh",
                    image:
                        "https://randomuser.me/api/portraits/women/44.jpg",
                    joined: "March 2026",
                    duration: "3 Months",
                    mentor: "Saqlain Malik",
                    role: "UI Developer",
                    projectTitle: "SaaS Dashboard Design",
                    projectImage:
                        "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
                    demo: "https://dashboard-ui-demo.vercel.app",
                    review:
                        "The mentorship helped me understand responsive layouts and modern component architecture.",
                    rating: 5,
                },
            ],
        },

        "brand-logo-design": {
            title: "Brand Logo Design",
            category: "Branding",
            image:
                "https://images.unsplash.com/photo-1626785774573-4b799315345d",
            demoUrl: "https://behance.net",
            desc: "Professional logo and branding projects designed by students.",
            mentor: "Ayesha Khan",
            students: [
                {
                    name: "Neha Kapoor",
                    image:
                        "https://randomuser.me/api/portraits/women/68.jpg",
                    joined: "February 2026",
                    duration: "2 Months",
                    mentor: "Ayesha Khan",
                    role: "Brand Designer",
                    projectTitle: "Coffee Brand Identity",
                    projectImage:
                        "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
                    demo: "https://behance.net/project-logo",
                    review:
                        "Learned branding psychology and professional logo design techniques from the mentorship.",
                    rating: 5,
                },
            ],
        },

        "social-media-marketing-campaign": {
            title: "Social Media Marketing Campaign",
            category: "Marketing",
            image:
                "https://images.unsplash.com/photo-1533750349088-cd871a92f312",
            demoUrl: "https://marketing-demo.vercel.app",
            desc: "Real marketing campaigns created and managed by students.",
            mentor: "Armaan Siddiqui",
            students: [
                {
                    name: "Akash Yadav",
                    image:
                        "https://randomuser.me/api/portraits/men/51.jpg",
                    joined: "December 2025",
                    duration: "5 Months",
                    mentor: "Armaan Siddiqui",
                    role: "Social Media Marketer",
                    projectTitle: "Instagram Lead Campaign",
                    projectImage:
                        "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
                    demo: "https://meta-campaign-demo.vercel.app",
                    review:
                        "Generated real leads during the mentorship while learning Meta Ads and analytics.",
                    rating: 5,
                },
            ],
        },

        "graphic-design": {
            title: "Graphic Design",
            category: "Design",
            image:
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
            demoUrl: "https://dribbble.com",
            desc: "Creative graphic design projects built by students.",
            mentor: "Sana Ali",
            students: [
                {
                    name: "Karan Malhotra",
                    image:
                        "https://randomuser.me/api/portraits/men/76.jpg",
                    joined: "April 2026",
                    duration: "3 Months",
                    mentor: "Sana Ali",
                    role: "Graphic Designer",
                    projectTitle: "Social Media Creative Pack",
                    projectImage:
                        "https://images.unsplash.com/photo-1545239351-1141bd82e8a6",
                    demo: "https://dribbble.com/design-demo",
                    review:
                        "Created professional-level creatives and portfolio projects with expert guidance.",
                    rating: 5,
                },
            ],
        },
    };

    const project = projectsData[slug];

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
                Project Not Found
            </div>
        );
    }

    return (
        <UserLayout>
            <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50 relative overflow-hidden">
                {/* Background Glow - Same as HeroSection */}
                <div className="absolute top-0 left-0 w-80 h-80 bg-purple-200/30 blur-3xl rounded-full" />
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-200/30 blur-3xl rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-100/20 blur-3xl rounded-full" />

                {/* HERO - Updated with from-blue-100 to-indigo-100 gradient */}
                <section className="relative overflow-hidden bg-gradient-to-r from-blue-100 to-indigo-100 text-gray-900 py-5">
                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-20 left-20 w-60 h-60 border-2 border-gray-300 rounded-full animate-scroll" />
                        <div className="absolute bottom-10 right-10 w-80 h-80 border border-purple-300 rounded-full" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-purple-200/30 rounded-full" />
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-sm text-purple-700 mb-8 hover:text-purple-900 transition font-medium"
                        >
                            <ArrowLeft size={16} />
                            Back To Projects
                        </Link>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 mb-5">
                                    <Award size={16} className="text-purple-700" />
                                    <span className="text-sm font-semibold text-purple-800">
                                        {project.category}
                                    </span>
                                </div>

                                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-gray-900">
                                    {project.title}
                                </h1>

                                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                                    {project.desc}
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <a
                                        href={project.demoUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:scale-[1.02] transition shadow-lg"
                                    >
                                        <PlayCircle size={20} />
                                        Live Demo
                                    </a>

                                    <div className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-white/60 border border-purple-200 text-gray-700">
                                        <Users size={20} className="text-purple-600" />
                                        <span>
                                            {project.students.length}+ Students Projects
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-[420px] object-cover rounded-[32px] shadow-2xl border-4 border-white"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* STUDENTS SECTION */}
                <section className="py-16 relative z-10">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-14">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                Student Success Projects
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Real projects built by students after completing mentorship and practical training.
                            </p>
                        </div>

                        <div className="space-y-10">
                            {project.students.map((student, index) => (
                                <div
                                    key={index}
                                    className="bg-white/80 rounded-[32px] p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-white/50"
                                >
                                    <div className="grid lg:grid-cols-2 gap-10">
                                        {/* LEFT */}
                                        <div>
                                            <div className="flex items-center gap-4 mb-6">
                                                <img
                                                    src={student.image}
                                                    alt={student.name}
                                                    className="w-20 h-20 rounded-2xl object-cover border-2 border-purple-200"
                                                />
                                                <div>
                                                    <h3 className="text-2xl font-bold text-gray-900">
                                                        {student.name}
                                                    </h3>
                                                    <p className="text-purple-600 font-medium">
                                                        {student.role}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-4 mb-6">
                                                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-4 border border-purple-100">
                                                    <div className="flex items-center gap-2 text-purple-600 mb-2">
                                                        <Calendar size={18} />
                                                        <span className="font-semibold">
                                                            Joined
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-700">
                                                        {student.joined}
                                                    </p>
                                                </div>

                                                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-4 border border-purple-100">
                                                    <div className="flex items-center gap-2 text-purple-600 mb-2">
                                                        <Clock3 size={18} />
                                                        <span className="font-semibold">
                                                            Course Duration
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-700">
                                                        {student.duration}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-5 mb-6 border border-purple-100">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <CheckCircle2
                                                        size={18}
                                                        className="text-green-600"
                                                    />
                                                    <h4 className="font-bold text-gray-900">
                                                        Mentorship
                                                    </h4>
                                                </div>
                                                <p className="text-gray-700">
                                                    This project was built under the mentorship of{" "}
                                                    <span className="font-semibold text-purple-600">
                                                        {student.mentor}
                                                    </span>
                                                </p>
                                            </div>

                                            <div className="bg-gradient-to-r from-purple-50/50 to-indigo-50/50 rounded-2xl p-5 border border-purple-100">
                                                <div className="flex items-center gap-1 mb-3">
                                                    {[...Array(student.rating)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={16}
                                                            className="fill-yellow-400 text-yellow-400"
                                                        />
                                                    ))}
                                                </div>
                                                <p className="text-gray-700 leading-relaxed">
                                                    "{student.review}"
                                                </p>
                                            </div>
                                        </div>

                                        {/* RIGHT */}
                                        <div>
                                            <div className="relative overflow-hidden rounded-[28px] mb-5 shadow-xl">
                                                <img
                                                    src={student.projectImage}
                                                    alt={student.projectTitle}
                                                    className="w-full h-[340px] object-cover"
                                                />
                                            </div>

                                            <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
                                                <div>
                                                    <h3 className="text-2xl font-bold text-gray-900">
                                                        {student.projectTitle}
                                                    </h3>
                                                    <p className="text-gray-600 mt-1">
                                                        Student Portfolio Project
                                                    </p>
                                                </div>

                                                <a
                                                    href={student.demo}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:scale-[1.02] transition shadow-md"
                                                >
                                                    View Demo
                                                    <ExternalLink size={18} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </UserLayout>
    );
};

export default ProjectCaseStudy;