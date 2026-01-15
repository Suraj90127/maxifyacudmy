import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/slices/authSlice";
import { createWithdrawal } from "../../redux/slices/withdrawalSlice";
import { toast } from "react-toastify";
import {
  Copy,
  Wallet,
  Link2,
  X,
  Send,
  Banknote
} from "lucide-react";

export const MyReferral = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.withdrawal);

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    account_name: "",
    account_number: "",
    bank_name: "",
    ifsc_code: "",
    withdraw_amount: "",
  });

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const referralLink =
    user?.referral_link ||
    "https://course.super-club.xyz/user/register?referral_code=68F1F0C23C0BC";

  const copyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied!");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const maxCredit = user?.credit || 0;

    if (
      !form.account_name ||
      !form.account_number ||
      !form.bank_name ||
      !form.ifsc_code
    ) {
      return toast.error("All fields are required");
    }

    if (!form.withdraw_amount || form.withdraw_amount < 1) {
      return toast.error("Enter a valid amount");
    }

    if (form.withdraw_amount > maxCredit) {
      return toast.error("Amount exceeds available credits");
    }

    const result = await dispatch(createWithdrawal(form));

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Withdrawal request submitted");
      setShowModal(false);
      setForm({
        account_name: "",
        account_number: "",
        bank_name: "",
        ifsc_code: "",
        withdraw_amount: "",
      });
      dispatch(getProfile());
    } else {
      toast.error(result.payload);
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

        {/* CREDITS */}
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

        {/* REFERRAL COUNT */}
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

        {/* WITHDRAW */}
        <button
          onClick={() => setShowModal(true)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl shadow p-5 flex items-center gap-4 transition"
        >
          <Banknote />
          <span className="font-semibold">Withdraw Earnings</span>
        </button>
      </div>

      {/* REFERRAL LINK */}
      <div className="bg-white rounded-xl shadow p-6">
        <p className="font-semibold mb-2">Your Referral Link</p>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={referralLink}
            readOnly
            className="flex-1 border rounded-lg px-4 py-3 bg-gray-50"
          />
          <button
            onClick={copyReferral}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-[#5d45fd] text-white rounded-lg hover:bg-[#4a37d9]"
          >
            <Copy size={18} /> Copy
          </button>
        </div>

        {/* SHARE */}
        <div className="flex flex-wrap gap-3 mt-5">
          <a
            href={`https://wa.me/?text=Join%20me!%20${encodeURIComponent(
              referralLink
            )}`}
            target="_blank"
            className="px-5 py-3 bg-green-600 text-white rounded-lg text-center"
          >
            WhatsApp
          </a>

          <a
            href={`mailto:?subject=Join me!&body=Use my referral link: ${referralLink}`}
            className="px-5 py-3 bg-gray-600 text-white rounded-lg text-center"
          >
            Email
          </a>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-lg">

            <div className="flex justify-between items-center p-5 border-b">
              <h3 className="text-xl font-semibold">Withdraw Credits</h3>
              <button onClick={() => setShowModal(false)}>
                <X />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <Input label="Account Name" name="account_name" value={form.account_name} onChange={handleChange} />
              <Input label="Account Number" name="account_number" value={form.account_number} onChange={handleChange} />
              <Input label="Bank Name" name="bank_name" value={form.bank_name} onChange={handleChange} />
              <Input label="IFSC Code" name="ifsc_code" value={form.ifsc_code} onChange={handleChange} />
              <Input label="Withdraw Amount" type="number" name="withdraw_amount" value={form.withdraw_amount} onChange={handleChange} />
            </div>

            <div className="flex justify-end gap-3 p-5 border-t">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-lg bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 rounded-lg bg-[#5d45fd] text-white"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <input
      {...props}
      className="w-full mt-1 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#5d45fd]"
    />
  </div>
);
