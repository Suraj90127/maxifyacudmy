import React, { useEffect } from "react";
import UserLayout from "../Layouts/UserLayout";

const RefundPolicy = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <UserLayout>

      {/* Top Spacing to avoid header overlap */}
      <div className="pt-5 "></div>

      {/* Top Banner */}
      <div className="container mx-auto mb-2 px-4 lg:px-0">
        <img
          src="https://i.ibb.co/hJpGwy9k/refund.png"
          alt="Refund Policy Banner"
          className="w-full rounded-2xl object-cover"
          style={{ maxHeight: "320px" }}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-2 pb-5 px-4 lg:px-0">

        <div className="bg-white rounded-2xl border border-gray-200">
          <div className="p-6 md:p-10">

            <p className="text-gray-500 text-sm text-center mb-4">
              Last updated on Nov 25 2025
            </p>

            <hr className="mb-4" />

            <p className="text-lg text-gray-800">
              Maxify Academy believes in helping its customers as far as possible,
              and has therefore a liberal cancellation policy. Under this policy:
            </p>

            <ul className="text-lg text-gray-800 mt-4 space-y-4">

              <li>
                Cancellations will be considered only if the request is made within{" "}
                <strong>2 days</strong> of placing the order. However, cancellation
                may not be entertained if the order has already been processed or shipped.
              </li>

              <li>
                Maxify Academy does not accept cancellation requests for perishable
                items like flowers, eatables etc. However, refunds/replacements can be
                made if the customer proves the delivered product quality was unsatisfactory.
              </li>

              <li>
                For damaged or defective items, report the issue to Customer Service
                within <strong>2 days</strong> of delivery. The request will be processed
                once the vendor verifies the issue.
              </li>

              <li>
                If the delivered product does not match the display or your expectations,
                notify Customer Service within <strong>2 days</strong>. Our team will review
                the issue and take appropriate action.
              </li>

              <li>
                For items with manufacturer warranty, all complaints fall under the
                manufacturer’s responsibility.
              </li>

              <li>
                If a refund is approved, it will take <strong>3–5 days</strong> to process
                the amount back to the customer.
              </li>

            </ul>

          </div>
        </div>
      </div>

    </UserLayout>
  );
};

export default RefundPolicy;
