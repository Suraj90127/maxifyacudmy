import React from "react"

const AnimatedButton = ({
    text = "Enroll Now",
    className = "",
}) => {
    return (
        <button
            className={`
                group relative inline-flex items-center justify-center gap-3
                px-5 py-2 rounded-full font-medium
                bg-primary text-white overflow-hidden
                transition duration-300
                hover:bg-gray-200 hover:text-dark
                ${className}
            `}
        >

            {/* Icon Wrapper */}
            <span className="flex-shrink-0 w-6 h-6 relative rounded-full bg-white text-primary grid place-items-center overflow-hidden transition group-hover:bg-white group-hover:text-primary">

                {/* Main Icon */}
                <svg
                    viewBox="0 0 14 15"
                    className="w-[10px] transition-transform duration-700 group-hover:translate-x-[150%] group-hover:-translate-y-[150%]"
                    fill="currentColor"
                >
                    <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" />
                </svg>

                {/* Copy Icon */}
                <svg
                    viewBox="0 0 14 15"
                    className="w-[10px] absolute transform -translate-x-[150%] translate-y-[150%] transition-transform duration-300 delay-100 group-hover:translate-x-0 group-hover:translate-y-0"
                    fill="currentColor"
                >
                    <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" />
                </svg>

            </span>

            {/* Text */}
            <span className="whitespace-nowrap">
                {text}
            </span>

        </button>
    )
}

export default AnimatedButton