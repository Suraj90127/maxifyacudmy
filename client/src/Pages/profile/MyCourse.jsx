import React, { useEffect } from "react";
import { Plus, ArrowRight, BookOpen, Image as ImageIcon } from "lucide-react";
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

  // Fallback image
  const getFallbackImage = (title) => {
    return `https://via.placeholder.com/400x250?text=${encodeURIComponent(title || "Course")}`;
  };

  return (
    <div className="w-full min-h-screen bg-light lg:px-8 pb-24">

      {/* ===== Header ===== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-dark">
            My Courses
          </h1>
          <p className="text-gray-500 mt-1">
            Access your purchased learning content
          </p>
        </div>

        <a
          href="/courses"
          className="inline-flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-primary/90 transition w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4" />
          Purchase New
        </a>
      </div>

      {/* ===== Loading ===== */}
      {loading && (
        <div className="flex justify-center mt-20">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      )}

      {/* ===== Empty State ===== */}
      {!loading && (!myPurchases || myPurchases?.length === 0) && (
        <div className="flex flex-col items-center justify-center mt-24 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <BookOpen className="w-7 h-7 text-primary" />
          </div>
          <p className="text-gray-600 text-lg mb-3">
            You haven't purchased any courses yet
          </p>
          <a
            href="/courses"
            className="text-primary font-semibold hover:underline"
          >
            Browse Courses →
          </a>
        </div>
      )}

      {/* ===== Course List ===== */}
      {!loading && myPurchases?.length > 0 && (
        <div className="space-y-6">
          {myPurchases.map((item) => {
            // Safely access course with null checks
            const course = item?.course_id || {};
            
            return (
              <div
                key={course?._id || item?._id || Math.random()}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100 p-5 sm:p-6 flex flex-col lg:flex-row gap-6"
              >
                {/* Image with fallback */}
                <div className="w-full lg:w-56 flex-shrink-0">
                  {course?.image ? (
                    <img
                      src={course.image}
                      alt={course.title || "Course"}
                      className="w-full h-44 lg:h-36 rounded-xl object-cover"
                      onError={(e) => {
                        e.target.src = getFallbackImage(course.title);
                      }}
                    />
                  ) : (
                    <div className="w-full h-44 lg:h-36 rounded-xl bg-gray-100 flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-dark">
                    {course?.title || "Untitled Course"}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="text-yellow-400 text-base"
                      >
                        ★
                      </span>
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      {course?.average_rating || 5.0} ({course?.review_count || 0})
                    </span>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mt-4">
                    <div className="space-y-1">
                      <p>
                        <strong>Purchased:</strong> ₹{item?.purchased_amount || course?.price || 0}
                      </p>
                      <p>
                        <strong>Enrolled:</strong>{" "}
                        <span className={item?.enrolled ? "text-green-600" : "text-orange-600"}>
                          {item?.enrolled ? "Yes" : "Pending"}
                        </span>
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Original Price:</strong> ₹{course?.price || 0}
                      </p>
                      {course?.discount_price && (
                        <p>
                          <strong>Discounted:</strong> ₹{course.discount_price}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Date */}
                  <p className="text-sm text-gray-500 mt-3">
                    Purchased on{" "}
                    {item?.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recently"}
                  </p>
                </div>

                {/* Action */}
                <div className="flex items-center lg:items-end lg:justify-end lg:w-52">
                  <a
                    href={`/course-info/${course?._id || item?.course_id}`}
                    className="w-full lg:w-auto px-6 py-3 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition flex items-center justify-center gap-2"
                  >
                    View Course
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyCourses;