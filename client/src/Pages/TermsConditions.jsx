import React, { useEffect } from "react";
import UserLayout from "../Layouts/UserLayout";

const TermsConditions = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <UserLayout>

      {/* Top Spacing for Navbar */}
      <div className="pt-2 "></div>

      <div className="container mx-auto py-4 pb-5 px-4 lg:px-0">

        {/* Top Image */}
        <div className="text-center mb-4">
          <img
            src="https://i.ibb.co/Hf4qQXmY/terms-and-conditions.png"
            alt="Terms and Conditions Banner"
            className="w-full mx-auto rounded-none"
          />
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl">
          <div className="p-6 md:p-10">

            {/* Title + Last Updated */}
            <h2 className="text-center text-2xl md:text-3xl font-bold mb-3">
              Terms & Conditions
            </h2>

            <p className="text-gray-500 text-sm text-center mb-4">
              Last updated on Nov 25 2025
            </p>

            <hr className="mb-4" />

            <p className="text-lg text-gray-800 mb-4">
              For the purpose of these Terms and Conditions, the term{" "}
              <strong>“we”, “us”, “our”</strong> used anywhere on this page shall
              mean <strong>Maxify Academy</strong>, whose registered/operational
              office is garhi khaira jamui, Jamui, BIHAR 811317.
            </p>

            <p className="text-lg text-gray-800 mb-4">
              The terms <strong>“you”, “your”, “user”, “visitor”</strong> refer to
              any natural or legal person who is visiting our website or has agreed
              to purchase from us.
            </p>

            <p className="text-lg text-gray-800 mb-4">
              Your use of our website and/or purchase from us is governed by the
              following Terms & Conditions:
            </p>

            {/* List */}
            <ul className="text-lg text-gray-800 mt-3 space-y-4">

              <li>
                The content of the pages of this website is subject to change
                without notice.
              </li>

              <li>
                Neither we nor any third parties provide any warranty or guarantee
                as to the accuracy, timeliness, performance, completeness or
                suitability of the information and materials found or offered on
                this website for any particular purpose. You acknowledge that such
                information may contain inaccuracies or errors, and we expressly
                exclude liability for such inaccuracies to the fullest extent
                permitted by law.
              </li>

              <li>
                Your use of any information or materials on our website and/or
                product pages is entirely at your own risk. It is your
                responsibility to ensure that any products, services, or
                information available through our website meet your specific
                requirements.
              </li>

              <li>
                Our website contains material owned by or licensed to us. This
                includes design, layout, appearance, and graphics. Reproduction is
                prohibited except in accordance with the copyright notice.
              </li>

              <li>
                All trademarks reproduced on our website which are not the property
                of, or licensed to, the operator are acknowledged on the website.
              </li>

              <li>
                Unauthorized use of information provided by us may give rise to a
                claim for damages and/or be a criminal offense.
              </li>

              <li>
                From time to time, our website may include links to other websites.
                These links are provided for your convenience to offer additional
                information.
              </li>

              <li>
                You may not create a link to our website from another website or
                document without <strong>Maxify Academy’s prior written consent.</strong>
              </li>

              <li>
                Any dispute arising out of your use of our website and/or purchase
                from us is subject to the laws of <strong>India</strong>.
              </li>

              <li>
                We shall not be liable for any loss or damage arising directly or
                indirectly from the decline of authorization for any transaction due
                to the Cardholder exceeding the preset limit agreed with our
                acquiring bank.
              </li>
            </ul>

          </div>
        </div>

      </div>

    </UserLayout>
  );
};

export default TermsConditions;
