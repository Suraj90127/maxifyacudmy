import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/slices/authSlice";
import { createWithdrawal, getMyWithdrawals } from "../../redux/slices/withdrawalSlice";
import { getAllCourses } from "../../redux/slices/courseSlice";
import { toast } from "react-toastify";
import { Copy, Wallet, Link2, Banknote } from "lucide-react";

export const MyReferral = () => {

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { myWithdrawals: withdrawals } = useSelector((state) => state.withdrawal);
  const { courses } = useSelector((state) => state.courses);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getMyWithdrawals());
    dispatch(getAllCourses());
  }, [dispatch]);

  const referralLink = user?.referral_link || "";

  const copyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied!");
  };

  const generateCourseReferral = (slug) => {
    if (!referralLink) return "";

    // ensure proper format
    if (referralLink.includes("?")) {
      return `${referralLink}&course=${slug}`;
    } else {
      return `${referralLink}?course=${slug}`;
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white mb-8 shadow-lg">
        <h1 className="text-3xl font-bold">Referral Dashboard</h1>
        <p className="opacity-90 mt-2">
          Invite friends & earn credits easily
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-full">
            <Wallet className="text-green-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Credits</p>
            <p className="text-2xl font-bold text-green-600">
              ₹ {user?.credit || 0}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-full">
            <Link2 className="text-purple-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Referrals</p>
            <p className="text-2xl font-bold text-purple-600">
              {user?.referrals_count || 0}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl shadow-md p-6 font-semibold transition"
        >
          <Banknote size={22} />
          Withdraw Earnings
        </button>

      </div>

      {/* REFERRAL LINK */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">

        <h2 className="font-semibold text-lg mb-4">
          Your Referral Link
        </h2>

        <div className="flex flex-col md:flex-row gap-3">

          <input
            value={referralLink}
            readOnly
            className="flex-1 border rounded-lg px-4 py-3 bg-gray-50"
          />

          <button
            onClick={copyReferral}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
          >
            <Copy size={18} /> Copy
          </button>

        </div>

      </div>

      {/* COURSE REFERRALS */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">

        <h2 className="text-lg font-semibold mb-6">
          Refer Courses
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {courses?.map((course) => {

            const link = generateCourseReferral(course._id);

            return (
              <div
                key={course._id}
                className="border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
              >

                <img
                  src={course.image}
                  alt={course.title}
                  className="h-44 w-full object-cover"
                />

                <div className="p-4 flex flex-col gap-3">

                  <h3 className="font-semibold">
                    {course.title}
                  </h3>

                  {course.referral_commission > 0 && (
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full w-fit">
                      Earn {course.referral_commission}%
                    </span>
                  )}

                  <input
                    value={link}
                    readOnly
                    className="border rounded px-3 py-2 text-sm"
                  />

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(link);
                      toast.success("Referral copied!");
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 text-sm transition"
                  >
                    Copy Link
                  </button>

                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `Join this course 🚀 ${link}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white text-center rounded-lg py-2 text-sm transition"
                  >
                    Share on WhatsApp
                  </a>

                </div>

              </div>
            );
          })}

        </div>

      </div>

      {/* WITHDRAWAL HISTORY */}
      <div className="bg-white rounded-xl shadow-md p-6">

        <h2 className="text-lg font-semibold mb-6">
          Withdrawal History
        </h2>

        {withdrawals?.length === 0 ? (
          <p className="text-gray-500">No withdrawals yet</p>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3">Method</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>

              <tbody>

                {withdrawals?.map((w) => (

                  <tr key={w._id} className="border-t">

                    <td className="p-3 font-semibold text-green-600">
                      ₹ {w.withdraw_amount}
                    </td>

                    <td className="p-3 capitalize">
                      {w.payment_method}
                    </td>

                    <td className="p-3">

                      <span className={`px-2 py-1 text-xs rounded-full 
                      ${w.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : w.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"}`}>
                        {w.status}
                      </span>

                    </td>

                    <td className="p-3">
                      {new Date(w.createdAt).toLocaleDateString()}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
};