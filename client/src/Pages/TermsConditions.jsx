import React, { useEffect } from "react";
import UserLayout from "../Layouts/UserLayout";

const TermsConditions = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <UserLayout>

      <div className="pt-2"></div>

      <div className="container mx-auto py-4 pb-5 px-4 lg:px-0">

        {/* Banner */}
        <div className="text-center mb-4">
          <img
            src="https://i.ibb.co/Hf4qQXmY/terms-and-conditions.png"
            alt="Terms and Conditions Banner"
            className="w-full mx-auto rounded-none"
          />
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl">
          <div className="p-6 md:p-10">

            {/* Title */}
            <h2 className="text-center text-2xl md:text-3xl font-bold mb-3">
              Terms & Conditions
            </h2>

            <p className="text-gray-500 text-sm text-center mb-4">
              Last updated on Nov 25 2025
            </p>

            <hr className="mb-4" />

            {/* INTRO */}
            <p className="text-lg text-gray-800 mb-4">
              For the purpose of these Terms and Conditions, the term{" "}
              <strong>“we”, “us”, “our”</strong> used anywhere on this page shall mean{" "}
              <strong>Maxify Academy</strong>, whose registered/operational office is:
            </p>

            <ul className="text-lg text-gray-800 mb-4 list-disc pl-6">
              <li><strong>Registered Office:</strong> Garhi Khaira, Jamui, Bihar 811317</li>
              <li><strong>Operational Office:</strong> Noida Sector 2, Uttar Pradesh, India</li>
            </ul>

            <p className="text-lg text-gray-800 mb-4">
              The terms <strong>“you”, “your”, “user”, “visitor”</strong> refer to any natural 
              or legal person who is visiting our website or has agreed to purchase from us.
            </p>

            <p className="text-lg text-gray-800 mb-4">
              Your use of our website and/or purchase from us is governed by the following Terms & Conditions:
            </p>

            {/* LIST */}
            <ul className="text-lg text-gray-800 space-y-4">

              <li>
                The content of the pages of this website is subject to change without notice.
              </li>

              <li>
                All products available on this website are digital courses. Access to the course is 
                provided either through registered email (login credentials) or directly in the user 
                dashboard after successful purchase.
              </li>

              <li>
                Neither we nor any third parties provide any warranty or guarantee as to the accuracy, 
                timeliness, performance, completeness or suitability of the information and materials 
                found or offered on this website.
              </li>

              <li>
                Your use of any information or materials on our website is entirely at your own risk. 
                It is your responsibility to ensure that any services meet your requirements.
              </li>

              <li>
                Our website contains material owned by or licensed to us including design, layout, 
                appearance, videos, course content, and graphics. Reproduction is prohibited.
              </li>

              <li>
                Sharing, distributing, or reselling course content or login credentials without 
                permission is strictly prohibited and may result in legal action.
              </li>

              <li>
                All trademarks reproduced on our website which are not the property of, or licensed 
                to, the operator are acknowledged.
              </li>

              <li>
                Unauthorized use of information may give rise to a claim for damages and/or criminal offense.
              </li>

              <li>
                From time to time, our website may include links to other websites for additional information.
              </li>

              <li>
                You may not create a link to our website without prior written consent from Maxify Academy.
              </li>

              <li>
                All purchases made on this website are final. No cancellation or refund will be provided 
                unless specifically mentioned on the course sales page.
              </li>

              <li>
                Some courses may include referral or earning opportunities. We do not guarantee any fixed 
                income, and results depend on individual efforts and performance.
              </li>

              <li>
                Any dispute arising out of your use of our website is subject to the laws of India.
              </li>

              <li>
                We shall not be liable for any loss or damage arising directly or indirectly from 
                declined transactions due to bank/payment issues.
              </li>

            </ul>

          </div>
        </div>

      </div>

    </UserLayout>
  );
};

export default TermsConditions;