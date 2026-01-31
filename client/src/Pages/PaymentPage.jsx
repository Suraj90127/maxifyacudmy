import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaLock,
  FaBolt,
  FaRupeeSign,
  FaInfinity,
  FaHeadphonesAlt,
  FaStar,
  FaChevronRight,
  FaCheckCircle,
  FaEnvelope,
  FaPhone,
  FaArrowLeft,
  FaShieldAlt,
  FaCreditCard,
  FaUserCircle
} from "react-icons/fa";
import { getCourseBySlug } from "../redux/slices/courseSlice";
import { getReviewByCourseId } from "../redux/slices/courseReviewSlice";
import {
  createOrder,
  verifyPayment,
  createPurchase,
  saveFailedPayment,
} from "../redux/slices/amountSlice";

const PaymentPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  /* ================= META PAGE VIEW ================= */
  useEffect(() => {
    if (window.fbq) window.fbq("track", "PageView");
  }, [location.pathname]);

  /* ================= PREVENT BACK ================= */
  useEffect(() => {
    window.history.replaceState(null, "", window.location.href);
    const handleBack = () => navigate("/", { replace: true });
    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, [navigate]);

  /* ================= REDUX ================= */
  const { courseBySlug: course, loading: courseLoading } = useSelector(
    (state) => state.courses
  );
  const { loading: paymentLoading } = useSelector((state) => state.amount);
  const { user } = useSelector((state) => state.auth);
  const { reviews = [] } = useSelector((state) => state.courseReview);

  /* ================= LOCAL STATE ================= */
  const [formData, setFormData] = useState({
    email: user?.email || "",
    phone: user?.mobile ? String(user.mobile) : "",
  });

  /* ================= FETCH COURSE ================= */
  useEffect(() => {
    if (slug) dispatch(getCourseBySlug(slug));
  }, [slug, dispatch]);

  /* ================= FETCH REVIEWS ================= */
  useEffect(() => {
    if (course?._id) dispatch(getReviewByCourseId(course._id));
  }, [course?._id, dispatch]);

  /* ================= PRICE ================= */
  const finalPrice =
    course?.discount_price && course.discount_price > 0
      ? course.discount_price
      : course?.price;

  /* ================= VIEW CONTENT ================= */
  useEffect(() => {
    if (window.fbq && course) {
      window.fbq("track", "ViewContent", {
        content_name: course.title,
        content_type: "course",
        content_ids: [course._id],
        value: finalPrice || 0,
        currency: "INR",
      });
    }
  }, [course, finalPrice]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!course || paymentLoading) return;

    if (!formData.phone || formData.phone.length < 10) {
      alert("Enter valid mobile number");
      return;
    }

    try {
      /* ================= CREATE ORDER ================= */
      const orderRes = await dispatch(
        createOrder({
          amount: finalPrice,
          email: formData.email,
          phone: Number(formData.phone),
        })
      );

      if (!createOrder.fulfilled.match(orderRes)) {
        alert("Order creation failed");
        return;
      }

      const { key, order_id, amount } = orderRes.payload;

      /* ================= INITIATE CHECKOUT ================= */
      if (window.fbq) {
        window.fbq("track", "InitiateCheckout", {
          value: finalPrice,
          currency: "INR",
          content_name: course.title,
          content_type: "course",
          content_ids: [course._id],
        });
      }

      /* ================= RAZORPAY OPTIONS ================= */
      const options = {
        key,
        amount,
        currency: "INR",
        name: "Maxify",
        description: course.title,
        order_id,

        prefill: {
          email: formData.email,
          contact: formData.phone,
        },

        /* ===== SUCCESS ===== */
        handler: async (response) => {
          try {
            const verifyRes = await dispatch(
              verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              })
            );

            if (!verifyPayment.fulfilled.match(verifyRes)) {
              alert("Payment verification failed");
              return;
            }

            const purchaseRes = await dispatch(
              createPurchase({
                course_id: course._id,
                is_buy: true,
                purchased_amount: finalPrice,
                coupon_amount: 0,
                email: formData.email,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
              })
            );

            if (!createPurchase.fulfilled.match(purchaseRes)) {
              alert("Purchase failed");
              return;
            }

            if (window.fbq) {
              window.fbq("track", "Purchase", {
                value: finalPrice,
                currency: "INR",
                content_name: course.title,
                content_type: "course",
                content_ids: [course._id],
              });
            }

            navigate("/payment-success", {
              state: {
                email: formData.email,
                phone: formData.phone,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                courseTitle: course.title,
                amount: finalPrice,
              },
            });
          } catch {
            alert("Payment done but processing failed");
          }
        },

        /* ===== USER CANCEL ===== */
        modal: {
          ondismiss: () => {
            dispatch(
              saveFailedPayment({
                course_id: course._id,
                email: formData.email,
                mobile: formData.phone,
                amount: finalPrice,
                order_id,
                reason: "User cancelled payment",
              })
            );
          },
        },

        theme: { color: "#06b6d4" },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", (response) => {
        dispatch(
          saveFailedPayment({
            course_id: course._id,
            email: formData.email,
            mobile: formData.phone,
            amount: finalPrice,
            order_id,
            reason:
              response.error?.description ||
              response.error?.reason ||
              "Payment failed",
          })
        );
      });

      rzp.open();
    } catch {
      alert("Something went wrong");
    }
  };

  /* ================= LOADING ================= */
  if (courseLoading || paymentLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCreditCard className="text-3xl text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Course Not Found</h2>
          <p className="text-gray-600 mb-6">The course you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate("/courses")}
            className=" bg-[#0092B9] text-white font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity"
          >
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header - Mobile Optimized */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-primary transition-colors mb-4 text-sm sm:text-base"
          >
            <FaArrowLeft className="mr-2 text-sm" />
            Back to Course
          </button>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Complete Your Enrollment</h1>
          {/* <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Secure checkout for {course.title}</p> */}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT: Course Details & Secure Checkout (Mobile: One Column, Desktop: Left Column) */}
          <div className="flex-1">
            {/* Mobile Only: Course Card - Compact */}
            <div className="lg:hidden bg-white rounded-xl shadow-lg overflow-hidden mb-6">
              {/* Course Image - Smaller on Mobile */}
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
                {/* 
                <div className="absolute top-3 right-3 bg-black/80 text-white px-3 py-1.5 rounded-lg">
                  <span className="font-bold text-lg">₹{finalPrice}</span>
                  {course?.discount_price > 0 && (
                    <span className="text-xs line-through ml-1 text-gray-300">₹{course.price}</span>
                  )}
                </div>
                */}
              </div>
              
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-3">
                  {course.title}
                </h2>
                
                {/* Features Grid - Compact on Mobile */}
                <div className=" hidden sm:grid grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                    <div className="w-7 h-7 bg-primary/10 rounded flex items-center justify-center mr-2 flex-shrink-0">
                      <FaLock className="text-primary text-xs" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-xs">Secure</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                    <div className="w-7 h-7 bg-primary/10 rounded flex items-center justify-center mr-2 flex-shrink-0">
                      <FaBolt className="text-primary text-xs" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-xs">Instant</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                    <div className="w-7 h-7 bg-primary/10 rounded flex items-center justify-center mr-2 flex-shrink-0">
                      <FaInfinity className="text-primary text-xs" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-xs">Lifetime</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                    <div className="w-7 h-7 bg-primary/10 rounded flex items-center justify-center mr-2 flex-shrink-0">
                      <FaHeadphonesAlt className="text-primary text-xs" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-xs">Support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Only: Course Card - Full Size */}
            <div className="hidden lg:block bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden mb-6">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 sm:h-56 md:h-64 object-cover"
              />
              <div className="p-4 sm:p-6 md:p-8">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {course.title}
                </h2>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center">
                        <FaRupeeSign className="inline mr-1" />{finalPrice}
                      </span>
                      {course?.discount_price > 0 && (
                        <span className="line-through text-gray-400 text-base sm:text-lg flex items-center">
                          <FaRupeeSign className="inline mr-1" />{course.price}
                        </span>
                      )}
                      {course?.discount_price > 0 && (
                        <span className="bg-green-100 text-green-800 text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-full">
                          Save ₹{course.price - course.discount_price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Features Grid - Responsive */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg sm:rounded-xl">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      <FaLock className="text-primary text-sm sm:text-base" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">Secure Payment</p>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">100% protected</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg sm:rounded-xl">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      <FaBolt className="text-primary text-sm sm:text-base" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">Instant Access</p>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">Immediate delivery</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg sm:rounded-xl">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      <FaInfinity className="text-primary text-sm sm:text-base" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">Lifetime Access</p>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">Never expires</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg sm:rounded-xl">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      <FaHeadphonesAlt className="text-primary text-sm sm:text-base" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">24/7 Support</p>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">Always available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Only: Secure Checkout Form - Compact */}
            <div className="lg:hidden bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden mb-6">
              {/* Header - Compact */}
              <div className="bg-[#0092B9] p-4 text-white">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-bold">Secure Checkout</h3>
                  <FaShieldAlt className="text-lg" />
                </div>
                <p className="text-white/90 text-xs">Enter your details to complete enrollment</p>
              </div>

              {/* Form - Compact */}
              <div className="p-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      <FaEnvelope className="inline mr-1 text-gray-400" />
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2.5 pl-9 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="you@example.com"
                      />
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      <FaPhone className="inline mr-1 text-gray-400" />
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2.5 pl-9 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="10-digit mobile number"
                      />
                      <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    </div>
                  </div>

                  {/* Order Summary - Compact */}
                  <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                    <div className="flex justify-between text-gray-600 text-sm">
                      <span>Course Price</span>
                      <span className="font-medium">₹{course.price}</span>
                    </div>
                    {course?.discount_price > 0 && (
                      <div className="flex justify-between text-green-600 text-sm">
                        <span>Discount</span>
                        <span className="font-medium">-₹{course.price - course.discount_price}</span>
                      </div>
                    )}
                    <div className="border-t border-gray-200 pt-2">
                      <div className="flex justify-between font-bold text-gray-900">
                        <span>Total Amount</span>
                        <span>₹{finalPrice}</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={paymentLoading}
                    className="w-full bg-[#0092B9] text-white font-bold py-3 rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                  >
                    {paymentLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <FaLock className="text-white text-xs" />
                        Pay ₹{finalPrice} & Enroll Now
                        <FaChevronRight className="text-xs" />
                      </>
                    )}
                  </button>

                  {/* Security Note */}
                  <div className="text-center">
                    <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                      <FaShieldAlt className="text-gray-400 text-xs" />
                      Your payment is secured with 256-bit SSL encryption
                    </p>
                  </div>
                </form>

                {/* Benefits - Compact */}
                <div className="mt-5 pt-4 border-t border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center text-sm">
                    <FaCheckCircle className="text-green-500 mr-2 text-sm" />
                    What You Get
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start text-gray-700">
                      <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-0.5 text-xs" />
                      <span className="text-xs">Full lifetime access to all course materials</span>
                    </li>
                    <li className="flex items-start text-gray-700">
                      <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-0.5 text-xs" />
                      <span className="text-xs">Certificate of completion</span>
                    </li>
                    <li className="flex items-start text-gray-700">
                      <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-0.5 text-xs" />
                      <span className="text-xs">Priority support & community access</span>
                    </li>
                    <li className="flex items-start text-gray-700">
                      <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-0.5 text-xs" />
                      <span className="text-xs">30-day money-back guarantee</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Desktop: Reviews Section will be in LEFT column */}
            <div className="hidden lg:block bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center">
                  <FaStar className="text-yellow-500 mr-2 text-base sm:text-lg" />
                  Student Reviews
                </h3>
                {reviews.length > 0 && (
                  <span className="bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium px-3 py-1 rounded-full self-start sm:self-center">
                    {reviews.length} reviews
                  </span>
                )}
              </div>

              {reviews.length === 0 ? (
                <div className="text-center py-6 sm:py-8">
                  <FaStar className="text-gray-300 text-3xl sm:text-4xl mx-auto mb-3 sm:mb-4" />
                  <p className="text-gray-500 text-sm sm:text-base">No reviews yet. Be the first to review!</p>
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-6">
                  {reviews.slice(-3).reverse().map((review) => (
                    <div key={review._id} className="border-b border-gray-100 pb-4 sm:pb-6 last:border-0 last:pb-0">
                      <div className="flex gap-3 sm:gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 sm:w-12 sm:h-12  bg-[#0092B9] rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg">
                            {review.reviewer_name?.[0]?.toUpperCase() || "U"}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                            <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate">
                              {review.reviewer_name || "Anonymous"}
                            </h4>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <FaStar
                                  key={i}
                                  className={`text-xs sm:text-sm ${
                                    i < review.rating ? "text-yellow-500" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 text-xs sm:text-sm md:text-base line-clamp-3 sm:line-clamp-none">
                            {review.review}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Payment Form (Desktop) and Reviews (Mobile) */}
          <div className="w-full lg:w-[400px] xl:w-[420px]">
            <div className="sticky top-6">
              {/* Desktop: Payment Form */}
              <div className="hidden lg:block bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className=" bg-[#0092B9] p-4 sm:p-6 text-white">
                  <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <h3 className="text-lg sm:text-xl font-bold">Secure Checkout</h3>
                    <FaShieldAlt className="text-lg sm:text-xl" />
                  </div>
                  <p className="text-white/90 text-xs sm:text-sm">Enter your details to complete enrollment</p>
                </div>

                {/* Form */}
                <div className="p-4 sm:p-6">
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    {/* Email Input */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        <FaEnvelope className="inline mr-1 sm:mr-2 text-gray-400" />
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-gray-50 border border-gray-300 rounded-lg sm:rounded-xl px-4 py-3 sm:py-3.5 pl-10 sm:pl-11 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="you@example.com"
                        />
                        <FaEnvelope className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
                      </div>
                    </div>

                    {/* Phone Input */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        <FaPhone className="inline mr-1 sm:mr-2 text-gray-400" />
                        Phone Number
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full bg-gray-50 border border-gray-300 rounded-lg sm:rounded-xl px-4 py-3 sm:py-3.5 pl-10 sm:pl-11 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="10-digit mobile number"
                        />
                        <FaPhone className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 space-y-2 sm:space-y-3">
                      <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                        <span>Course Price</span>
                        <span className="font-medium">₹{course.price}</span>
                      </div>
                      {course?.discount_price > 0 && (
                        <div className="flex justify-between text-green-600 text-sm sm:text-base">
                          <span>Discount</span>
                          <span className="font-medium">-₹{course.price - course.discount_price}</span>
                        </div>
                      )}
                      <div className="border-t border-gray-200 pt-2 sm:pt-3">
                        <div className="flex justify-between font-bold text-gray-900 text-base sm:text-lg">
                          <span>Total Amount</span>
                          <span>₹{finalPrice}</span>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={paymentLoading}
                      className="w-full  bg-[#0092B9] text-white font-bold py-3 sm:py-4 rounded-lg sm:rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      {paymentLoading ? (
                        <>
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <FaLock className="text-white text-sm sm:text-base" />
                          Pay ₹{finalPrice} & Enroll Now
                          <FaChevronRight className="text-sm sm:text-base" />
                        </>
                      )}
                    </button>

                    {/* Security Note */}
                    <div className="text-center">
                      <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                        <FaShieldAlt className="text-gray-400 text-xs" />
                        Your payment is secured with 256-bit SSL encryption
                      </p>
                    </div>
                  </form>

                  {/* Benefits */}
                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                      <FaCheckCircle className="text-green-500 mr-2 text-sm sm:text-base" />
                      What You Get
                    </h4>
                    <ul className="space-y-2 sm:space-y-3">
                      <li className="flex items-start text-gray-700">
                        <FaCheckCircle className="text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5 text-sm sm:text-base" />
                        <span className="text-xs sm:text-sm">Full lifetime access to all course materials</span>
                      </li>
                      <li className="flex items-start text-gray-700">
                        <FaCheckCircle className="text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5 text-sm sm:text-base" />
                        <span className="text-xs sm:text-sm">Certificate of completion</span>
                      </li>
                      <li className="flex items-start text-gray-700">
                        <FaCheckCircle className="text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5 text-sm sm:text-base" />
                        <span className="text-xs sm:text-sm">Priority support & community access</span>
                      </li>
                      <li className="flex items-start text-gray-700">
                        <FaCheckCircle className="text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5 text-sm sm:text-base" />
                        <span className="text-xs sm:text-sm">30-day money-back guarantee</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Mobile Only: Reviews Section at Bottom */}
              <div className="lg:hidden bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center">
                    <FaStar className="text-yellow-500 mr-2 text-base" />
                    Student Reviews
                  </h3>
                  {reviews.length > 0 && (
                    <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                      {reviews.length} reviews
                    </span>
                  )}
                </div>

                {reviews.length === 0 ? (
                  <div className="text-center py-6">
                    <FaStar className="text-gray-300 text-3xl mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">No reviews yet. Be the first to review!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviews.slice(-2).reverse().map((review) => (
                      <div key={review._id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-[#0092B9] rounded-full flex items-center justify-center text-white font-bold text-base">
                              {review.reviewer_name?.[0]?.toUpperCase() || "U"}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col gap-1 mb-2">
                              <h4 className="font-bold text-gray-900 text-sm truncate">
                                {review.reviewer_name || "Anonymous"}
                              </h4>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar
                                    key={i}
                                    className={`text-xs ${
                                      i < review.rating ? "text-yellow-500" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700 text-xs line-clamp-2">
                              {review.review}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;