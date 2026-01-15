import React from 'react';
import { FaStar, FaRegStar, FaPlayCircle } from 'react-icons/fa';

const CourseCard = () => {
  return (
    <div className="max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 font-sans">
      {/* Thumbnail Section */}
      <div className="relative">
        <img 
          src="https://your-image-url.com/thumbnail.jpg" // Replace with your image link
          alt="Graphic Design Mastery" 
          className="w-full h-64 object-cover"
        />
        {/* Premium Badge */}
        <div className="absolute top-4 left-4 bg-[#FF4D4D] text-white text-xs font-bold px-3 py-1 rounded flex items-center gap-1 uppercase tracking-wider">
          <span className="w-2 h-2 bg-white rounded-full"></span>
          Premium
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 leading-tight mb-4">
          Complete Graphic Design Mastery Course (Beginner to Pro)
        </h2>

        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600 font-medium">
            Duration: <span className="text-gray-800">00:42:53</span>
          </p>
          
          {/* Rating Stars */}
          <div className="flex text-[#FFD700] space-x-0.5">
            <FaStar size={18} />
            <FaStar size={18} />
            <FaStar size={18} />
            <FaStar size={18} />
            <FaRegStar size={18} className="text-gray-300" />
          </div>
        </div>

        <hr className="border-gray-100 mb-6" />

        {/* Footer Section: Pricing and CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-gray-400 line-through text-lg">₹1,999.00 INR</span>
            <span className="text-2xl font-black text-gray-900">₹999.00 INR</span>
          </div>

          <button className="bg-[#E5E7EB] hover:bg-gray-300 text-gray-900 font-bold py-3 px-8 rounded-full flex items-center gap-2 transition-colors">
            <FaPlayCircle size={20} />
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;