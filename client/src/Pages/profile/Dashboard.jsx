import React, { useEffect } from "react";
import { Bell, MoreVertical, BookOpen, HelpCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchasesByUser } from "../../redux/slices/purchaseSlice";
import { getMyTickets } from "../../redux/slices/supportTicketSlice";
import MyCourses from "./MyCourse";

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPurchasesByUser());
    dispatch(getMyTickets());
  }, [dispatch]);

  const myPurchases = useSelector(
    (state) => state.purchase?.myPurchases || []
  );
  const myTickets = useSelector(
    (state) => state.support?.myTickets || []
  );

  const totalCourses = myPurchases.length;
  const totalTickets = myTickets.length;

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 pb-24 bg-gray-50">

      {/* ===== Header ===== */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#336699]">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Overview of your activity & courses
        </p>
      </div>

      {/* ===== Notification Card ===== */}
      {/* <div className="bg-gradient-to-r from-blue-50 to-white border border-blue-100 rounded-xl p-6 shadow-sm mb-10">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-red-100 rounded-full">
            <Bell className="text-red-500 w-5 h-5" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Enable Browser Notifications
            </h3>
            <p className="text-gray-600 text-sm mt-1 max-w-xl">
              Allow notifications from your browser to stay updated about
              course access, support replies, and important alerts.
            </p>
          </div>
        </div>
      </div> */}

      {/* ===== Stats Cards ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">

        {/* Courses */}
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-100">
              <BookOpen className="w-6 h-6 text-[#336699]" />
            </div>

            <div>
              <p className="text-3xl font-bold text-[#336699]">
                {totalCourses}
              </p>
              <p className="text-gray-500 font-medium">
                Courses Purchased
              </p>
            </div>
          </div>

          <MoreVertical className="text-gray-400" />
        </div>

        {/* Tickets */}
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-orange-100">
              <HelpCircle className="w-6 h-6 text-orange-500" />
            </div>

            <div>
              <p className="text-3xl font-bold text-[#336699]">
                {totalTickets}
              </p>
              <p className="text-gray-500 font-medium">
                Support Tickets
              </p>
            </div>
          </div>

          <MoreVertical className="text-gray-400" />
        </div>
      </div>

      {/* ===== My Courses Section ===== */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <MyCourses />
      </div>

    </div>
  );
};

export default Dashboard;
