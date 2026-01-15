import React, { useEffect, useState } from "react";
import { Search, X, CreditCard } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchasesByUser } from "../../redux/slices/purchaseSlice";

const PaymentHistory = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();

  const { myPurchases, loading } = useSelector(
    (state) => state.purchase
  );

  useEffect(() => {
    dispatch(getPurchasesByUser());
  }, [dispatch]);

  const filtered = myPurchases?.filter((item) => {
    const keyword = search.toLowerCase();
    return (
      item?.purchase_id?.toLowerCase()?.includes(keyword) ||
      item?.course_id?.title?.toLowerCase()?.includes(keyword)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 pb-24">

      {/* ===== Header ===== */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#336699]">
          Payment History
        </h1>
        <p className="text-gray-500 mt-1">
          View all your course payments
        </p>
      </div>

      {/* ===== Search ===== */}
      <div className="mb-6 flex justify-end">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by course name"
            className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>
      </div>

      {/* ===== Loading ===== */}
      {loading && (
        <p className="text-center text-gray-600 text-lg mt-20 animate-pulse">
          Loading payment history...
        </p>
      )}

      {/* ===== Empty State ===== */}
      {!loading && filtered?.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-10 flex flex-col items-center text-center mt-10">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <CreditCard className="w-7 h-7 text-indigo-600" />
          </div>
          <p className="text-gray-600 text-lg">
            No payment history found
          </p>
        </div>
      )}

      {/* ===== Table ===== */}
      {filtered?.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border overflow-x-auto">
          <table className="w-full text-sm lg:text-base">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-5 py-4 text-left font-semibold">
                  Course
                </th>
                <th className="px-5 py-4 text-left font-semibold">
                  Amount
                </th>
                <th className="px-5 py-4 text-left font-semibold">
                  Coupon
                </th>
                <th className="px-5 py-4 text-left font-semibold">
                  Date
                </th>
                <th className="px-5 py-4 text-right font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-5 py-4">
                    {item?.course_id?.title || "N/A"}
                  </td>

                  <td className="px-5 py-4 font-semibold text-green-600">
                    ₹{item?.purchased_amount}
                  </td>

                  <td className="px-5 py-4">
                    {item?.coupon_amount > 0
                      ? `₹${item.coupon_amount}`
                      : "—"}
                  </td>

                  <td className="px-5 py-4">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setSelected(item)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ===== Modal ===== */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-lg">
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="text-xl font-semibold text-[#336699]">
                Payment Details
              </h3>
              <button onClick={() => setSelected(null)}>
                <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            <div className="p-5">
              <ul className="space-y-3 text-sm lg:text-base text-gray-700">
                <li>
                  <strong>Course:</strong>{" "}
                  {selected?.course_id?.title}
                </li>
                <li>
                  <strong>Amount Paid:</strong>{" "}
                  ₹{selected?.purchased_amount}
                </li>
                <li>
                  <strong>Coupon Discount:</strong>{" "}
                  {selected?.coupon_amount > 0
                    ? `₹${selected?.coupon_amount}`
                    : "No Coupon"}
                </li>
                <li>
                  <strong>Status:</strong>{" "}
                  {selected?.is_buy
                    ? "Purchased"
                    : "Free Enrollment"}
                </li>
                <li>
                  <strong>Date:</strong>{" "}
                  {new Date(
                    selected?.createdAt
                  ).toLocaleString()}
                </li>
                <li>
                  <strong>Transaction ID:</strong>{" "}
                  {selected?._id || "N/A"}
                </li>
              </ul>
            </div>

            <div className="p-5 border-t flex justify-end">
              <button
                onClick={() => setSelected(null)}
                className="px-6 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
