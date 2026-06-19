import React from "react"
import { Rocket, CheckCircle2, Clock, TrendingUp, Sparkles, Phone, Mail, Headphones, MessageCircle } from "lucide-react"
import AnimatedButton from "../../../components/AnimatedButton"

const FinalCTA = () => {
    return (
        <>
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-6 md:p-10 shadow-2xl">

    {/* Background Blur Effects */}
    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl"></div>

    <div className="relative z-10 text-center">

        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg mb-5">
            <Headphones size={30} className="text-white" />
        </div>

        {/* Heading */}
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Still Have Questions?
        </h3>

        <p className="text-sm md:text-base text-purple-100 max-w-xl mx-auto leading-relaxed mb-8">
            Our expert support team is available 24/7 to guide you through your learning journey and answer every question.
        </p>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 max-w-5xl mx-auto">

            {/* Email */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md flex-shrink-0">
                    <Mail size={22} className="text-purple-600" />
                </div>

                <div className="text-left min-w-0">
                    <p className="text-xs text-purple-100 uppercase tracking-wide">
                        Email Support
                    </p>

                    <p className="text-sm md:text-base font-semibold text-white truncate">
                        support@maxifyacademy.com
                    </p>
                </div>
            </div>

            {/* Phone */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md flex-shrink-0">
                    <Phone size={22} className="text-purple-600" />
                </div>

                <div className="text-left">
                    <p className="text-xs text-purple-100 uppercase tracking-wide">
                        Call Support
                    </p>

                    <p className="text-sm md:text-base font-semibold text-white">
                        +91 93103 28928
                    </p>
                </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md flex-shrink-0">
                    <MessageCircle size={22} className="text-purple-600" />
                </div>

                <div className="text-left text-xs text-purple-100 uppercase tracking-wide">
                    Chat with Support
                    
                <p className="text-sm md:text-base font-semibold text-white">
                        24/7 Chat Support
                    </p>
                </div>

            </div>
                

        </div>
    </div>
</div></>
    )
}

export default FinalCTA