import React, { useEffect } from "react";
import { Plus, ArrowRight, BookOpen } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchasesByUser } from "../../redux/slices/purchaseSlice";

const MyCourses = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const { myPurchases, loading } = useSelector((state) => state.purchase);

  useEffect(() => {
    dispatch(getPurchasesByUser());
  }, [dispatch]);

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 pb-24">

      {/* ===== Header ===== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#336699]">
            My Courses
          </h1>
          <p className="text-gray-500 mt-1">
            Access your purchased learning content
          </p>
        </div>

        <a
          href="/courses"
          className="inline-flex items-center gap-2 bg-[#5d45fd] text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-[#4a37d9] transition w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4" />
          Purchase New
        </a>
      </div>

      {/* ===== Loading ===== */}
      {loading && (
        <div className="flex justify-center mt-20">
          <p className="text-gray-600 text-lg animate-pulse">
            Loading your courses...
          </p>
        </div>
      )}

      {/* ===== Empty State ===== */}
      {!loading && myPurchases?.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-24 text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <BookOpen className="w-7 h-7 text-indigo-600" />
          </div>
          <p className="text-gray-600 text-lg mb-3">
            You haven’t purchased any courses yet
          </p>
          <a
            href="/courses"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Browse Courses →
          </a>
        </div>
      )}

      {/* ===== Course List ===== */}
      <div className="space-y-6">
        {myPurchases?.map((item) => {
          const course = item.course_id;

          return (
            <div
              key={course._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition border p-5 sm:p-6 flex flex-col lg:flex-row gap-6"
            >
              {/* Image */}
              <div className="w-full lg:w-56 flex-shrink-0">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-44 lg:h-36 rounded-xl object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[#336699]">
                  {course.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="text-yellow-500 text-base"
                    >
                      ★
                    </span>
                  ))}
                  <span className="ml-2 text-sm text-gray-500">
                    5.0 (0)
                  </span>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mt-4">
                  <div className="space-y-1">
                    <p>
                      <strong>Purchased:</strong> ₹{item.purchased_amount}
                    </p>
                    <p>
                      <strong>Enrolled:</strong>{" "}
                      {item.enrolled ? "Yes" : "No"}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p>
                      <strong>Price:</strong> ₹{course.price}
                    </p>
                    <p>
                      <strong>Discount:</strong> ₹{course.discount_price}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <p className="text-sm text-gray-500 mt-3">
                  Purchased on{" "}
                  {item.createdAt?.split("T")[0]}
                </p>
              </div>

              {/* Action */}
              <div className="flex items-center lg:items-end lg:justify-end lg:w-52">
                <a
                  href={`/course-info/${course._id}`}
                  className="w-full lg:w-auto px-6 py-3 bg-[#5d45fd] text-white text-sm font-semibold rounded-xl hover:bg-[#4a37d9] transition flex items-center justify-center gap-2"
                >
                  View Course
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyCourses;
