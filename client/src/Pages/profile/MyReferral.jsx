import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/slices/authSlice";
import { createWithdrawal, getMyWithdrawals } from "../../redux/slices/withdrawalSlice";
import { toast } from "react-toastify";
import { Copy, Wallet, Link2, X, Banknote } from "lucide-react";

export const MyReferral = () => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading, myWithdrawals: withdrawals} = useSelector((state) => state.withdrawal);

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

  // scroll top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // load data
  useEffect(() => {
    dispatch(getProfile());
    dispatch(getMyWithdrawals());
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
      return toast.error("Enter a valid amount");
    }

    if (withdrawAmount % 1000 !== 0) {
      return toast.error("Withdrawal must be multiple of 1000");
    }

    if (withdrawAmount > maxCredit) {
      return toast.error("Amount exceeds available credits");
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

        {/* REFERRALS */}
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

        <div className="flex flex-wrap gap-3 mt-5">

          <a
            href={`https://wa.me/?text=Join%20me!%20${encodeURIComponent(referralLink)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-green-600 text-white rounded-lg"
          >
            WhatsApp
          </a>

          <a
            href={`mailto:?subject=Join me!&body=Use my referral link: ${referralLink}`}
            className="px-5 py-3 bg-gray-600 text-white rounded-lg"
          >
            Email
          </a>

        </div>

      </div>

      {/* WITHDRAWAL HISTORY */}
      <div className="bg-white rounded-xl shadow p-6 mt-6">

        <h2 className="text-lg font-semibold mb-4">My Withdrawals</h2>

        {withdrawals?.length === 0 ? (
          <p className="text-gray-500">No withdrawals yet</p>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Method</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Date</th>
                </tr>
              </thead>

              <tbody>
                {withdrawals?.map((w) => (
                  <tr key={w._id} className="border-t">

                    <td className="p-3 font-semibold text-green-600">
                      ₹ {w.withdraw_amount}
                    </td>

                    <td className="p-3">
                      {w.payment_method === "bank" ? "Bank" : "UPI"}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          w.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : w.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
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

              <div>
                <label className="text-sm font-medium">Payment Method</label>
                <select
                  name="payment_method"
                  value={form.payment_method}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg px-4 py-3"
                >
                  <option value="bank">Bank Transfer</option>
                  <option value="upi">UPI</option>
                </select>
              </div>

              {form.payment_method === "bank" && (
                <>
                  <Input label="Account Name" name="account_name" value={form.account_name} onChange={handleChange}/>
                  <Input label="Account Number" name="account_number" value={form.account_number} onChange={handleChange}/>
                  <Input label="Bank Name" name="bank_name" value={form.bank_name} onChange={handleChange}/>
                  <Input label="IFSC Code" name="ifsc_code" value={form.ifsc_code} onChange={handleChange}/>
                </>
              )}

              {form.payment_method === "upi" && (
                <>
                  <Input label="UPI Name" name="upi_name" value={form.upi_name} onChange={handleChange}/>
                  <Input label="UPI ID" name="upi_id" value={form.upi_id} onChange={handleChange}/>
                </>
              )}

              <Input
                label="Withdraw Amount"
                type="number"
                name="withdraw_amount"
                value={form.withdraw_amount}
                onChange={handleChange}
              />

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
                className="px-6 py-2 rounded-lg bg-[#5d45fd] text-white disabled:opacity-50"
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