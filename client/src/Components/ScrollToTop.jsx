import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;

            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

            setScrollProgress(progress);
            setVisible(scrollTop > 300);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () =>
        window.scrollTo({ top: 0, behavior: "smooth" });

    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    const offset =
        circumference - (scrollProgress / 100) * circumference;

    return (
        <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10 pointer-events-none"
                }`}
        >
            <div className="relative h-14 w-14">
                <svg
                    className="absolute inset-0 h-full w-full -rotate-90"
                    viewBox="0 0 56 56"
                >
                    <circle
                        cx="28"
                        cy="28"
                        r={radius}
                        stroke="rgba(255,255,255,0.25)"
                        strokeWidth="3"
                        fill="none"
                    />

                    <circle
                        cx="28"
                        cy="28"
                        r={radius}
                        stroke="#053D67"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        className="transition-all duration-150"
                    />
                </svg>

                <div className="absolute inset-[4px] flex items-center justify-center rounded-full shadow-xl">
                    <ChevronUp size={20} className="text-black" />
                </div>
            </div>
        </button>
    );
}