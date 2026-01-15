import React, { useEffect, useState } from "react";
import {
  FaPlayCircle,
  FaChevronDown,
  FaChevronUp,
  FaCheck,
  FaStar,
  FaRegStar,
  FaRegShareSquare,
  FaTags,
  FaBookOpen,
  FaChalkboardTeacher,
  FaInfinity,
  FaTimes,
  FaCopy,
  FaWhatsapp,
  FaTelegram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPinterestP
} from "react-icons/fa";

import { useParams, useNavigate } from "react-router-dom";
import UserLayout from "../../Layouts/UserLayout";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  getCourse,
  getCourseContentByCourseId,
  resetCourse,
} from "../../redux/slices/courseSlice";

import {
  createReview,
  getReviewByCourseId,
} from "../../redux/slices/courseReviewSlice";

import {
  createOrder,
  verifyPayment,
  createPurchase,
  getPurchasesByUser,
  enrollCourse,
} from "../../redux/slices/purchaseSlice";

import { saveFailedPayment } from "../../redux/slices/amountSlice";


import { toast } from "react-toastify";

/** * HELPER COMPONENTS **/
const RatingStars = ({ rating }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) =>
        i <= rating ? (
          <FaStar key={i} className="text-yellow-400 text-sm sm:text-base" />
        ) : (
          <FaRegStar key={i} className="text-yellow-400 text-sm sm:text-base" />
        )
      )}
    </div>
  );
};

const ProgressBar = ({ value }) => {
  return (
    <div className="w-full bg-gray-200 h-1.5 sm:h-2 rounded overflow-hidden">
      <div
        className="h-full bg-yellow-400 rounded transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

const ShareModal = ({ course, onClose }) => {
  const courseUrl = window.location.href;
  const courseTitle = course?.title || 'Check out this course!';

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${courseTitle} - ${courseUrl}`)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(courseUrl)}&text=${encodeURIComponent(courseTitle)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(courseUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(courseTitle)}&url=${encodeURIComponent(courseUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(courseUrl)}`,
    pinterest: `http://pinterest.com/pin/create/button/?url=${encodeURIComponent(courseUrl)}&description=${encodeURIComponent(courseTitle)}&media=${encodeURIComponent(course?.image || '')}`,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(courseUrl)
      .then(() => toast.success('Link copied to clipboard!'))
      .catch(() => toast.error('Failed to copy link'));
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Share Course</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><FaTimes size={20} /></button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-8 text-center">
            {Object.entries(shareLinks).map(([platform, link]) => (
              <a key={platform} href={link} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 text-white transition-transform group-hover:scale-110 
                  ${platform === 'whatsapp' ? 'bg-[#25D366]' : ''}
                  ${platform === 'telegram' ? 'bg-[#0088cc]' : ''}
                  ${platform === 'facebook' ? 'bg-[#1877F2]' : ''}
                  ${platform === 'twitter' ? 'bg-[#1DA1F2]' : ''}
                  ${platform === 'linkedin' ? 'bg-[#0A66C2]' : ''}
                  ${platform === 'pinterest' ? 'bg-[#E60023]' : ''}
                `}>
                  {platform === 'whatsapp' && <FaWhatsapp size={22} />}
                  {platform === 'telegram' && <FaTelegram size={22} />}
                  {platform === 'facebook' && <FaFacebookF size={20} />}
                  {platform === 'twitter' && <FaTwitter size={20} />}
                  {platform === 'linkedin' && <FaLinkedinIn size={20} />}
                  {platform === 'pinterest' && <FaPinterestP size={20} />}
                </div>
                <span className="text-[10px] font-bold uppercase text-gray-500">{platform}</span>
              </a>
            ))}
          </div>
          <div className="mt-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">Or copy link</label>
            <div className="flex bg-gray-50 border border-gray-200 rounded-xl p-1">
              <input type="text" readOnly value={courseUrl} className="flex-1 bg-transparent px-3 py-2 text-sm text-gray-600 outline-none" />
              <button onClick={copyToClipboard} className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all font-bold text-sm"><FaCopy /> Copy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleCourse: course, courseContent, loading } = useSelector((state) => state.courses);
  const { reviews } = useSelector((state) => state.courseReview);
  const { user } = useSelector((state) => state.auth);
  const { myPurchases } = useSelector((state) => state.purchase);

  const [expandedSections, setExpandedSections] = useState(new Set([0]));
  const [isBought, setIsBought] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    dispatch(resetCourse());
    dispatch(getCourse(id));
    dispatch(getCourseContentByCourseId(id));
    dispatch(getPurchasesByUser());
    dispatch(getReviewByCourseId(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (myPurchases && course?._id) {
      const purchased = myPurchases.find((p) => p.course_id?._id === course._id);
      if (purchased) {
        setIsBought(purchased.is_buy);
        setIsEnrolled(purchased.enrolled);
      }
    }
  }, [myPurchases, course]);

  // --- DYNAMIC REVIEW CALCULATION ---
  const totalReviewsCount = reviews?.length || 0;
  const calculatedAverage = totalReviewsCount > 0
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviewsCount).toFixed(1)
    : "0.0";

  const getDistributionData = () => {
    return [5, 4, 3, 2, 1].map(star => {
      const count = reviews?.filter(r => Math.round(r.rating) === star).length || 0;
      const percentage = totalReviewsCount > 0 ? (count / totalReviewsCount) * 100 : 0;
      return { star, count, percentage };
    });
  };

  if (loading || !course) return <div className="text-center py-20 font-bold">Loading Course...</div>;

  // ⭐ PRICE FIX LOGIC
  const isFreeCourse =
    !course?.price ||
    Number(course.price) === 0 ||
    course.is_premium === false;

  const hasDiscount =
    !isFreeCourse &&
    course.discount_price &&
    Number(course.discount_price) < Number(course.price);

  const finalAmount = hasDiscount
    ? Number(course.discount_price)
    : Number(course.price);

  const toggleSection = (id) => {
    const updated = new Set(expandedSections);
    updated.has(id) ? updated.delete(id) : updated.add(id);
    setExpandedSections(updated);
  };

  const handleBuyCourse = async () => {
    if (!user) {
      toast.error("Please log in first.");
      return navigate("/login");
    }

    try {
      /* ================= CREATE ORDER ================= */
      const orderRes = await dispatch(createOrder({ amount: finalAmount }));

      if (!createOrder.fulfilled.match(orderRes)) {
        dispatch(
          saveFailedPayment({
            course_id: course._id,
            email: user.email,
            mobile: user.mobile,
            amount: finalAmount,
            reason: "Order creation failed",
          })
        );
        return toast.error("Order failed");
      }

      const { key, order } = orderRes.payload;

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        order_id: order.id,
        name: "Maxify",
        description: course.title,

        /* ================= SUCCESS ================= */
        handler: async (response) => {
          try {
            const verifyRes = await dispatch(
              verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              })
            );

            /* ❌ VERIFY FAIL */
            if (!verifyRes.payload?.success) {
              dispatch(
                saveFailedPayment({
                  course_id: course._id,
                  email: user.email,
                  mobile: user.mobile,
                  amount: finalAmount,
                  order_id: response.razorpay_order_id,
                  payment_id: response.razorpay_payment_id,
                  reason: "Payment verification failed",
                })
              );
              return toast.error("Payment verification failed");
            }

            /* ================= CREATE PURCHASE ================= */
            const purchaseRes = await dispatch(
              createPurchase({
                course_id: course._id,
                is_buy: true,
                purchased_amount: finalAmount,
                coupon_amount: 0,
                email: user.email,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
              })
            );

            if (!createPurchase.fulfilled.match(purchaseRes)) {
              throw new Error("Purchase failed");
            }

            window.location.reload();
          } catch (err) {
            dispatch(
              saveFailedPayment({
                course_id: course._id,
                email: user.email,
                mobile: user.mobile,
                amount: finalAmount,
                reason: err.message || "Payment handler failed",
              })
            );
            toast.error("Payment failed");
          }
        },

        /* ❌ USER CLOSES POPUP */
        modal: {
          ondismiss: () => {
            dispatch(
              saveFailedPayment({
                course_id: course._id,
                email: user.email,
                mobile: user.mobile,
                amount: finalAmount,
                order_id: order.id,
                reason: "User closed Razorpay popup",
              })
            );
            toast.info("Payment cancelled");
          },
        },

        theme: { color: "#06b6d4" },
      };

      /* ================= RAZORPAY INSTANCE ================= */
      const rzp = new window.Razorpay(options);

      /* ❌ PAYMENT FAILED EVENT */
      rzp.on("payment.failed", (response) => {
        dispatch(
          saveFailedPayment({
            course_id: course._id,
            email: user.email,
            mobile: user.mobile,
            amount: finalAmount,
            order_id: response.error?.metadata?.order_id,
            payment_id: response.error?.metadata?.payment_id,
            reason:
              response.error?.description ||
              response.error?.reason ||
              "Razorpay payment failed",
          })
        );
        toast.error("Payment failed");
      });

      rzp.open();
    } catch (err) {
      dispatch(
        saveFailedPayment({
          course_id: course._id,
          email: user.email,
          mobile: user.mobile,
          amount: finalAmount,
          reason: "Unexpected error",
        })
      );
      toast.error("Something went wrong");
    }
  };



  const handleEnrollCourse = async () => {
    if (!user) return navigate("/login");
    const res = await dispatch(enrollCourse({ course_id: course._id }));
    if (enrollCourse.fulfilled.match(res)) navigate(`/course-content/${course._id}`);
  };

  const handleReviewSubmit = async () => {
    if (!user) return toast.error("Login to review");
    const res = await dispatch(createReview({ user_id: user._id, course_id: id, rating, review: reviewText }));
    if (createReview.fulfilled.match(res)) {
      setRating(0); setReviewText(""); dispatch(getReviewByCourseId(id));
      toast.success("Review added!");
    }
  };

  console.log(course?.learns)
  const learnPoints = Array.isArray(course?.learns)
    ? course.learns
    : typeof course?.learns === "string"
      ? course.learns.split(/\d+\.\s*/).filter(Boolean)
      : [];

  return (
    <UserLayout>
      {showShareModal && <ShareModal course={course} onClose={() => setShowShareModal(false)} />}
      <div className="min-h-screen bg-white font-sans text-[#1c1d1f]">
        <div className="mx-auto px-4 sm:px-6 py-6 lg:py-12 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

            <div className="w-full lg:w-1/3 order-1 lg:order-2">
              <div className="lg:sticky lg:top-24 border border-gray-100 rounded-2xl shadow-xl bg-white overflow-hidden">
                <div className="relative aspect-video lg:aspect-auto">
                  <img src={course.image} alt={course.title} className="w-full h-full lg:h-64 object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6 flex-wrap">
                    {isFreeCourse ? (
                      <span className="text-2xl font-black text-green-600 uppercase">
                        FREE
                      </span>
                    ) : (
                      <>
                        {hasDiscount && (
                          <span className="line-through text-gray-400 text-lg">
                            ₹{course.price}
                          </span>
                        )}
                        <h2 className="text-3xl font-black text-gray-900">
                          ₹{finalAmount}
                        </h2>
                      </>
                    )}
                    <div className="ml-auto flex gap-4 text-xs font-bold text-gray-500">
                      {/* <button className="flex items-center gap-1 text-cyan-500"><FaTags/> Promo</button> */}
                      <button onClick={() => setShowShareModal(true)} className="flex items-center gap-1"><FaRegShareSquare /> Share</button>
                    </div>
                  </div>
                  {/* ⭐ BUTTON LOGIC ⭐ */}
                  {course.price === 0 || course.is_premium === false ? (
                    // ✅ FREE COURSE
                    isEnrolled ? (
                      <button
                        onClick={() => navigate(`/course-content/${course._id}`)}
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-4 rounded-xl font-black text-lg transition-all uppercase shadow-lg shadow-cyan-100"
                      >
                        Continue Learning
                      </button>
                    ) : (
                      <button
                        onClick={handleEnrollCourse}
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-4 rounded-xl font-black text-lg transition-all uppercase shadow-lg shadow-cyan-100"
                      >
                        Enroll Now (Free)
                      </button>
                    )
                  ) : isEnrolled ? (
                    // ✅ PAID COURSE → ALREADY ENROLLED
                    <button
                      onClick={() => navigate(`/course-content/${course._id}`)}
                      className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-4 rounded-xl font-black text-lg transition-all uppercase shadow-lg shadow-cyan-100"
                    >
                      Continue Learning
                    </button>
                  ) : isBought ? (
                    // ✅ PAID COURSE → BOUGHT BUT NOT ENROLLED
                    <button
                      onClick={handleEnrollCourse}
                      className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-4 rounded-xl font-black text-lg transition-all uppercase shadow-lg shadow-cyan-100"
                    >
                      Enroll Now
                    </button>
                  ) : (
                    // ❌ PAID COURSE → NOT BOUGHT
                    <button
                      onClick={handleBuyCourse}
                      className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-4 rounded-xl font-black text-lg transition-all uppercase shadow-lg shadow-cyan-100"
                    >
                      Buy Now ₹{finalAmount}
                    </button>
                  )}
                  <div className="mt-8 space-y-4">
                    <h5 className="font-bold text-sm uppercase tracking-widest text-gray-400">Includes:</h5>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 text-sm font-bold text-gray-600">

                      {course?.includes?.map((p, i) => <li key={i} className="flex items-start gap-3"><FaCheck className="text-green-500 mt-1" /> {p.text}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="w-full lg:w-2/3 order-2 lg:order-1">
              <h1 className="text-2xl sm:text-4xl font-black mb-4 leading-tight">{course.title}</h1>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">{course.short_description}</p>

              <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 mb-10 border border-gray-100">
                <h4 className="text-xl font-black mb-6 uppercase tracking-tight">What you'll learn</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {learnPoints?.map((l, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm sm:text-base">
                      <FaCheck className="text-cyan-500 mt-1 shrink-0" />
                      <span className="text-gray-700 font-medium">{l}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CURRICULUM */}
              <div className="mb-10">
                <h4 className="text-2xl font-black mb-6">Course Content</h4>
                <div className="border border-gray-200 rounded-2xl overflow-hidden">
                  {courseContent.map((content) => (
                    <div key={content._id} className="border-b border-gray-200 last:border-none">
                      <button onClick={() => toggleSection(content._id)} className="w-full p-5 flex justify-between items-center bg-white hover:bg-gray-50 transition-all">
                        <div className="text-left">
                          <span className="font-bold text-gray-900 block">{content.title}</span>
                          <span className="text-[10px] font-black text-gray-400 uppercase">{content.videos?.length} Lectures</span>
                        </div>
                        {expandedSections.has(content._id) ? <FaChevronUp /> : <FaChevronDown />}
                      </button>
                      {expandedSections.has(content._id) && (
                        <div className="bg-gray-50/50 p-2">
                          {content.videos.map((v, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 hover:bg-white rounded-xl transition-all cursor-default">
                              <FaPlayCircle className="text-gray-300" />
                              <span className="text-sm font-medium text-gray-700">{v.video_title}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* DYNAMIC REVIEWS */}
              <div className="mt-16">
                <h3 className="text-2xl font-black mb-8">Student Feedback</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-3xl border-2 border-gray-50">
                  <div className="text-center md:text-left">
                    <div className="text-6xl font-black text-gray-900">{calculatedAverage}<span className="text-2xl text-gray-300">/5</span></div>
                    <div className="mt-4 flex justify-center md:justify-start"><RatingStars rating={Math.round(Number(calculatedAverage))} /></div>
                    <p className="text-xs font-black text-gray-400 uppercase mt-2 tracking-widest">{totalReviewsCount} Total Ratings</p>
                  </div>
                  <div className="space-y-3">
                    {getDistributionData().map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs font-bold text-gray-500">
                        <div className="w-8">{item.star}★</div>
                        <div className="flex-1"><ProgressBar value={item.percentage} /></div>
                        <div className="w-4 text-right">{item.count}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-12 space-y-8">
                  {reviews?.map((rev, i) => (
                    <div key={i} className="border-b border-gray-50 pb-8 last:border-none">
                      <RatingStars rating={rev.rating} />
                      <p className="font-black text-gray-900 mt-2">{rev.reviewer_name || "Course Student"}</p>
                      <p className="text-gray-500 mt-1 italic text-sm">"{rev.review}"</p>
                    </div>
                  ))}
                </div>

                {/* REVIEW FORM */}
                <div className="mt-12 bg-cyan-50/50 p-8 rounded-[2rem] border border-cyan-100">
                  <h4 className="font-black text-gray-900 mb-4">Add your experience</h4>
                  <div className="flex gap-2 mb-6">
                    {[1, 2, 3, 4, 5].map(n => <FaStar key={n} onClick={() => setRating(n)} className={`size-8 cursor-pointer transition-all ${rating >= n ? 'text-yellow-400' : 'text-gray-200'}`} />)}
                  </div>
                  <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} rows={4} className="w-full bg-white rounded-2xl p-4 outline-none border border-cyan-100 focus:ring-2 ring-cyan-500/20" placeholder="What did you love about this course?" />
                  <button onClick={handleReviewSubmit} className="mt-4 bg-gray-900 text-white px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-cyan-500 transition-all">Post Review</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default CourseDetail;