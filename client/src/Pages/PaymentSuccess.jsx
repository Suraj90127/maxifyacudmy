import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  /* 🔒 PREVENT BACK NAVIGATION */
  useEffect(() => {
    // Replace current history entry
    window.history.replaceState(null, "", window.location.href);

    const handleBack = () => {
      navigate("/", { replace: true });
    };

    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, [navigate]);

  /* 🔐 SAFE FALLBACK (refresh / direct open case) */
  const {
    email = "N/A",
    phone = "N/A",
    paymentId = "N/A",
    courseTitle = "Your Course",
    amount = "",
  } = state || {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050816] via-[#0b1225] to-black px-4">
      <div className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-8 text-center text-white">

        {/* ICON */}
        <div className="flex justify-center mb-4">
          <div className="bg-emerald-500/20 p-4 rounded-full">
            <CheckCircle className="text-emerald-400 w-10 h-10" />
          </div>
        </div>

        {/* TITLE */}
        <p className="text-xs tracking-widest text-emerald-400 mb-1">
          PAYMENT RECEIVED • REGISTRATION CONFIRMED
        </p>
        <h1 className="text-2xl font-extrabold mb-2">
          Payment Successful
        </h1>

        {/* MESSAGE */}
        <p className="text-gray-300 text-sm mb-6">
          Thank you for enrolling in
          <span className="text-white font-semibold"> {courseTitle}</span>.
          <br />
          <span className="text-gray-400">
            Your seat has been confirmed.
          </span>
        </p>

        {/* DETAILS */}
        <div className="text-left bg-black/30 rounded-xl p-4 space-y-2 text-sm">
          <Detail label="Email" value={email} />
          <Detail label="Phone" value={phone} />
          <Detail label="Amount Paid" value={`₹${amount}`} />
          <Detail label="Payment ID" value={paymentId} highlight />
        </div>

        {/* NEXT STEP */}
        <p className="text-xs text-gray-400 mt-4">
          <span className="text-white font-semibold">Next step:</span>{" "}
          Login ID & password will be sent to your email.
          Please check spam/promotions folder.
        </p>

        {/* BUTTONS */}
        <div className="mt-6 space-y-3">
          <button
            onClick={() => navigate("/", { replace: true })}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-3 rounded-xl transition"
          >
            Go to Homepage
          </button>

          <button
            onClick={() => navigate("/support", { replace: true })}
            className="w-full border border-white/20 hover:bg-white/10 py-3 rounded-xl text-sm transition"
          >
            Need help? Contact support
          </button>
        </div>

        {/* FOOTER */}
        <p className="text-[10px] text-gray-500 mt-4">
          If you don’t receive email within 5–10 minutes,
          contact WhatsApp support with your Payment ID.
        </p>
      </div>
    </div>
  );
};

const Detail = ({ label, value, highlight }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-400">{label}</span>
    <span
      className={`font-medium ${
        highlight ? "text-emerald-400 font-mono" : ""
      }`}
    >
      {value}
    </span>
  </div>
);

export default PaymentSuccess;
