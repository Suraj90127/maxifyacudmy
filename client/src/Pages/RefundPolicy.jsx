import React, { useEffect } from "react";
import UserLayout from "../Layouts/UserLayout";

const RefundPolicy = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <UserLayout>

      <div className="pt-5"></div>

      {/* Banner */}
      <div className="container mx-auto mb-2 px-4 lg:px-0">
        <img
          src="https://i.ibb.co/hJpGwy9k/refund.png"
          alt="Refund Policy Banner"
          className="w-full rounded-2xl object-cover"
          style={{ maxHeight: "320px" }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto py-2 pb-5 px-4 lg:px-0">
        <div className="bg-white rounded-2xl border border-gray-200">
          <div className="p-6 md:p-10">

            <p className="text-gray-500 text-sm text-center mb-4">
              Last updated on Nov 25 2025
            </p>

            <hr className="mb-6" />

            {/* INTRO */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              ❌ Cancellation & Refund Policy
            </h2>

            <p className="text-lg text-gray-800 mb-4">
              At Maxify Academy, we provide digital courses. Therefore, our cancellation 
              and refund policy is designed accordingly.
            </p>

            {/* NO CANCELLATION */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                🚫 No Cancellation Policy
              </h3>
              <p className="text-gray-800">
                Once a course is purchased, no cancellation requests will be accepted under any circumstances.
                Since all our products are digital and delivered instantly, the purchase is considered final.
              </p>
            </div>

            {/* NO REFUND */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                💸 No Refund Policy (All Courses)
              </h3>
              <p className="text-gray-800 mb-2">
                We follow a strict no refund policy for all courses available on our platform.
              </p>
              <ul className="list-disc pl-6 text-gray-800 space-y-2">
                <li>Once the course is purchased and access is provided</li>
                <li>No refunds will be issued in any case</li>
              </ul>

              <p className="text-gray-800 mt-3">This includes reasons such as:</p>
              <ul className="list-disc pl-6 text-gray-800 space-y-2 mt-2">
                <li>Change of mind</li>
                <li>Lack of usage</li>
                <li>Technical issues (unless from our side and unresolved)</li>
              </ul>
            </div>

            {/* SPECIAL CASE */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                🎯 Special Case: 1-Day Money Back Guarantee
              </h3>

              <p className="text-gray-800 mb-2">
                The 1-Day Money Back Guarantee applies only to the course:
              </p>

              <p className="text-gray-900 font-semibold mb-2">
                👉 “Complete Social Media Income System”
              </p>

              <p className="text-gray-800">
                This guarantee does NOT mean a refund will be provided. It means you get an opportunity 
                to recover your full investment within 1 day.
              </p>
            </div>

            {/* HOW IT WORKS */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                💼 How This Guarantee Works
              </h3>

              <ul className="list-disc pl-6 text-gray-800 space-y-2">
                <li>You can promote the course using our referral system</li>
                <li>You will earn 40% commission on each successful sale</li>
                <li>If you refer the course to 3 people, you can earn up to 120% of your investment</li>
              </ul>

              <p className="text-gray-800 mt-3">
                👉 This means you can recover (and even profit) your course cost within 1 day, based on your efforts.
              </p>
            </div>

            {/* IMPORTANT NOTES */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                ⚠️ Important Notes
              </h3>

              <ul className="list-disc pl-6 text-gray-800 space-y-2">
                <li>This is an earning-based guarantee, not a refund policy</li>
                <li>No refund will be issued under this guarantee</li>
                <li>Earnings depend on your efforts, marketing, and conversions</li>
                <li>Any misuse or fraudulent activity may lead to account suspension</li>
              </ul>
            </div>

            {/* SUPPORT */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                📩 Support
              </h3>

              <p className="text-gray-800 mb-2">
                For any queries, you can contact:
              </p>

              <p className="text-gray-800">
                📞{" "}
                <a href="tel:9310328928" className="text-blue-600 hover:underline">
                  9310328928
                </a>
              </p>

              <p className="text-gray-800">
                📧{" "}
                <a href="mailto:support@maxifyacademy.com" className="text-blue-600 hover:underline">
                  support@maxifyacademy.com
                </a>
              </p>
            </div>

          </div>
        </div>
      </div>

    </UserLayout>
  );
};

export default RefundPolicy;