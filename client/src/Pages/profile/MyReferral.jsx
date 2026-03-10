import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/slices/authSlice";
import { createWithdrawal, getMyWithdrawals } from "../../redux/slices/withdrawalSlice";
import { getAllCourses } from "../../redux/slices/courseSlice";
import { toast } from "react-toastify";
import { Copy, Wallet, Link2, X, Banknote } from "lucide-react";

export const MyReferral = () => {

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { loading, myWithdrawals: withdrawals } = useSelector((state) => state.withdrawal);
  const { courses } = useSelector((state) => state.courses);

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    payment_method: "bank",
    account_name: "",
    account_number: "",
    bank_name: "",
    ifsc_code: "",
    upi_id: "",
    upi_name: "",
    withdraw_amount: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    return `${referralLink}&course=${slug}`;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {

    const withdrawAmount = Number(form.withdraw_amount);
    const maxCredit = user?.credit || 0;

    if (form.payment_method === "bank") {
      if (!form.account_name || !form.account_number || !form.bank_name || !form.ifsc_code) {
        return toast.error("All bank fields are required");
      }
    }

    if (form.payment_method === "upi") {
      if (!form.upi_id || !form.upi_name) {
        return toast.error("UPI Name and UPI ID are required");
      }
    }

    if (!withdrawAmount || withdrawAmount < 1) {
      return toast.error("Enter valid amount");
    }

    if (withdrawAmount % 1000 !== 0) {
      return toast.error("Withdrawal must be multiple of 1000");
    }

    if (withdrawAmount > maxCredit) {
      return toast.error("Amount exceeds credits");
    }

    const result = await dispatch(createWithdrawal({
      ...form,
      withdraw_amount: withdrawAmount,
    }));

    if (result.meta.requestStatus === "fulfilled") {

      toast.success("Withdrawal request submitted");

      setShowModal(false);

      setForm({
        payment_method: "bank",
        account_name: "",
        account_number: "",
        bank_name: "",
        ifsc_code: "",
        upi_id: "",
        upi_name: "",
        withdraw_amount: "",
      });

      dispatch(getProfile());
      dispatch(getMyWithdrawals());

    } else {
      toast.error(result.payload || "Withdrawal failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">

      {/* HEADER */}
      <div className="mb-6 rounded-xl bg-gradient-to-r from-[#5d45fd] to-[#7a67ff] p-6 text-white shadow">
        <h1 className="text-3xl font-bold">My Referral</h1>
        <p className="opacity-90 mt-1">
          Earn credits & withdraw your earnings easily
        </p>
      </div>

      {/* DASHBOARD */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">

        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
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

        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
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
          className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl shadow p-5 flex items-center gap-4"
        >
          <Banknote />
          Withdraw Earnings
        </button>

      </div>

      {/* BASE REFERRAL */}
      <div className="bg-white rounded-xl shadow p-6">

        <p className="font-semibold mb-2">Your Referral Link</p>

        <div className="flex gap-3">

          <input
            value={referralLink}
            readOnly
            className="flex-1 border rounded-lg px-4 py-3 bg-gray-50"
          />

          <button
            onClick={copyReferral}
            className="flex items-center gap-2 px-5 py-3 bg-[#5d45fd] text-white rounded-lg"
          >
            <Copy size={18} /> Copy
          </button>

        </div>

      </div>

      {/* COURSE REFERRALS */}
      <div className="bg-white rounded-xl shadow p-6 mt-6">

        <h2 className="text-lg font-semibold mb-4">Refer Courses</h2>

        <div className="grid md:grid-cols-3 gap-4">

          {courses?.map((course) => {

            const link = generateCourseReferral(course._id);

            return (
              <div key={course._id} className="border rounded-lg p-4 flex flex-col gap-3">

                <img
                  src={course.image}
                  alt={course.title}
                  className="rounded h-40 object-cover"
                />

                <h3 className="font-semibold">{course.title}</h3>

                <input
                  value={link}
                  readOnly
                  className="border rounded px-3 py-2 text-sm"
                />

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(link);
                    toast.success("Course referral copied!");
                  }}
                  className="bg-[#5d45fd] text-white rounded-lg py-2 text-sm"
                >
                  Copy Link
                </button>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `Join this course 🚀 ${link}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white text-center rounded-lg py-2 text-sm"
                >
                  Share WhatsApp
                </a>

              </div>
            );
          })}

        </div>

      </div>

      {/* WITHDRAWAL HISTORY */}
      <div className="bg-white rounded-xl shadow p-6 mt-6">

        <h2 className="text-lg font-semibold mb-4">My Withdrawals</h2>

        {withdrawals?.length === 0 ? (
          <p className="text-gray-500">No withdrawals yet</p>
        ) : (
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

                  <td className="p-3 text-green-600 font-semibold">
                    ₹ {w.withdraw_amount}
                  </td>

                  <td className="p-3">{w.payment_method}</td>

                  <td className="p-3">{w.status}</td>

                  <td className="p-3">
                    {new Date(w.createdAt).toLocaleDateString()}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        )}

      </div>

    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <input
      {...props}
      className="w-full mt-1 border rounded-lg px-4 py-3"
    />
  </div>
);