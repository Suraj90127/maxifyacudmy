import React, { useEffect } from "react";
import UserLayout from "../Layouts/UserLayout"; // optional, remove if not needed

const ShippingPolicy = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <UserLayout>
      <div className="pt-5 "></div>

      <div className="container mx-auto py-4 pb-5 px-4 lg:px-0">
        
        {/* Top Image Banner */}
        <div className="mb-4 text-center">
          <img
            src="https://i.ibb.co/0pkLLrK0/shipping.jpg"
            alt="Shipping Policy Banner"
            className="img-fluid rounded-2xl mx-auto"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-none border border-gray-200">
          <div className="p-6 md:p-10">

            {/* Last Updated */}
            <p className="text-gray-500 text-sm text-center mb-4">
              Last updated on Nov 25 2025
            </p>

            <hr className="mb-4" />

            {/* Content Starts */}
            <p className="text-lg leading-relaxed text-gray-800 mb-4">
              For international buyers, purchases are processed online and access is delivered digitally. 
              No physical shipping is involved.
            </p>

            <p className="text-lg leading-relaxed text-gray-800 mb-4">
              For domestic buyers, course access is also delivered digitally without any physical shipment.
            </p>

            <p className="text-lg leading-relaxed text-gray-800 mb-4">
              Once the payment is successfully completed:
            </p>

            <ul className="list-disc pl-6 text-lg text-gray-800 mb-4 space-y-2">
              <li>
                If you purchase through our landing page, your login ID & password 
                will be sent to your registered email ID.
              </li>
              <li>
                If you purchase directly from our website, the course will be automatically 
                available in your account dashboard instantly after payment.
              </li>
            </ul>

            <p className="text-lg leading-relaxed text-gray-800 mb-4">
              All course deliveries are typically instant. However, in rare cases, it may take 
              a few minutes due to server or payment gateway processing.
            </p>

            <p className="text-lg leading-relaxed text-gray-800 mb-4">
              Maxify Academy is not responsible for delays caused by payment gateway issues, 
              email delivery delays, or technical errors beyond our control.
            </p>

            <p className="text-lg leading-relaxed text-gray-800 mb-4">
              Access to the course will be provided only to the email ID used during purchase.
            </p>

            <p className="text-lg leading-relaxed text-gray-800">
              For any issues in accessing or utilizing the course, you can contact our support team:
              <br />
              📞{" "}
              <a href="tel:9310328928" className="text-blue-600 hover:underline">
                9310328928
              </a>
              <br />
              📧{" "}
              <a href="mailto:support@maxifyacademy.com" className="text-blue-600 hover:underline">
                support@maxifyacademy.com
              </a>
            </p>

          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default ShippingPolicy;