import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        Loading...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-red-500">
        Course not found
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-[#0f172a] py-10 px-4">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT */}
          <div className="flex-1 space-y-6">
            <img
              src={course.image}
              alt={course.title}
              className="rounded-2xl object-cover w-full shadow-lg"
            />

            <h1 className="text-xl font-black text-white">
              {course.title}
            </h1>

            <div className="flex gap-4 items-center">
              <span className="text-3xl font-black text-[#22c55e]">
                ₹{finalPrice}
              </span>
              {course?.discount_price > 0 && (
                <span className="line-through text-gray-400">
                  ₹{course.price}
                </span>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-[420px] sticky top-6">
            <div className="bg-gradient-to-br from-[#020617] via-[#1e1b4b] to-[#312e81]
              rounded-2xl p-7 space-y-6 border border-white/10">

              <p className="text-sm font-semibold text-gray-300">
                Enter email + mobile → Pay → Get instant access
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="w-full bg-[#020617]/60 border border-white/10
                  rounded-xl px-4 py-3.5 text-sm text-white"
                />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                  className="w-full bg-[#020617]/60 border border-white/10
                  rounded-xl px-4 py-3.5 text-sm text-white"
                />

                <button
                  type="submit"
                  disabled={paymentLoading}
                  className="w-full bg-gradient-to-r from-[#06b6d4] to-[#9333ea]
                  text-white py-4 rounded-xl font-extrabold"
                >
                  Pay ₹{finalPrice} & Get Instant Access
                </button>
              </form>

              <div className="text-sm text-gray-300 space-y-2 pt-2">
                <p>🔐 100% Secure payment</p>
                <p>⚡ Instant login delivery</p>
                <p>💰 Pay just <b className="text-white">₹{finalPrice}</b></p>
                <p>♾️ Lifetime access</p>
                <p>🎧 Support after enrollment</p>
              </div>


              {/* REVIEWS */}
              <div className="border-t border-white/10 pt-5 space-y-4">
                <h4 className="text-white font-extrabold">
                  ⭐ Student Reviews
                </h4>

                {reviews.length === 0 && (
                  <p className="text-sm text-gray-400">
                    No reviews yet
                  </p>
                )}

                {reviews.slice(-3).reverse().map((r) => (
                  <div key={r._id} className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#06b6d4]
                      text-[#020617] flex items-center justify-center font-bold">
                      {r.reviewer_name?.[0]?.toUpperCase() || "U"}
                    </div>
                    <div className="text-sm text-gray-300">
                      <p className="font-bold text-white">
                        {r.reviewer_name}
                        <span className="text-yellow-400 ml-1">
                          {"⭐".repeat(r.rating)}
                        </span>
                      </p>
                      <p>{r.review}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
