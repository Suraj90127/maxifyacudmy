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

            <p className="text-lg leading-relaxed text-gray-800 mb-4">
              For International buyers, orders are shipped and delivered through
              registered international courier companies and/or International
              speed post only. For domestic buyers, orders are shipped through
              registered domestic courier companies and/or speed post only.
            </p>

            <p className="text-lg leading-relaxed text-gray-800 mb-4">
              Orders are shipped within <strong>Not Applicable</strong> or as per
              the delivery date agreed at the time of order confirmation and delivering 
              of the shipment subject to courier company/post office norms. Maxify Academy 
              is not liable for any delay in delivery by the courier company/post authorities.
            </p>

            <p className="text-lg leading-relaxed text-gray-800 mb-4">
              Delivery of all orders will be to the address provided by the buyer.
              Delivery of services will be confirmed on your registered email ID.
            </p>

            <p className="text-lg leading-relaxed text-gray-800">
              For any issues in utilizing our services, you may contact our helpdesk at{" "}
              <a href="tel:+917033976030" className="text-blue-600 hover:underline">
                7033976030
              </a>{" "}
              or email{" "}
              <a href="mailto:support@maxifyacademy.com" className="text-blue-600 hover:underline">
                support@maxifyacademy.com
              </a>.
            </p>

          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default ShippingPolicy;
