import React, { useEffect } from 'react';
import UserLayout from '../Layouts/UserLayout';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    return (
        <UserLayout>
            <div className="container mx-auto px-4 mb-10">

                {/* Banner */}
                <div className="text-center mb-8">
                    <img
                        src="https://i.ibb.co/gZ2HY4W1/Privacy-Policy.jpg"
                        alt="Privacy Policy Banner"
                        className="w-full mx-auto rounded-lg shadow-lg object-cover"
                    />
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 md:p-8 lg:p-10">
                    <div className="space-y-6">

                        {/* INTRO */}
                        <p className="text-gray-700 leading-relaxed">
                            This Privacy Policy outlines how Maxify Academy collects, uses, and protects any information 
                            that you provide when you visit our website or purchase our digital courses.
                        </p>

                        <p className="text-gray-700 leading-relaxed">
                            Maxify Academy is committed to ensuring that your privacy is protected. Any information you 
                            provide will only be used in accordance with this privacy policy.
                        </p>

                        <p className="text-gray-700 leading-relaxed">
                            Maxify Academy may update this policy from time to time by modifying this page. 
                            You are advised to review this page periodically to stay informed of any changes.
                        </p>

                        {/* INFORMATION */}
                        <div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-3">
                                📊 Information We Collect
                            </h4>
                            <p className="text-gray-700 mb-3">
                                We may collect the following information:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li>Name</li>
                                <li>Contact information including email address and phone number</li>
                                <li>Billing details (if required for payment processing)</li>
                                <li>Preferences and interests related to our courses</li>
                                <li>Other information relevant to customer feedback, surveys, or offers</li>
                            </ul>
                        </div>

                        {/* USAGE */}
                        <div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-3">
                                ⚙️ How We Use Your Information
                            </h4>
                            <p className="text-gray-700 mb-3">
                                We collect this information to better understand your needs and provide improved services:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li>Internal record keeping</li>
                                <li>Providing access to purchased digital courses</li>
                                <li>Sending login credentials (ID & Password) via email (for landing page purchases)</li>
                                <li>Managing your account and course dashboard (for direct website purchases)</li>
                                <li>Improving our products, services, and user experience</li>
                                <li>Sending promotional emails, offers, or updates (only if opted-in)</li>
                                <li>Conducting market research and customer feedback analysis</li>
                            </ul>
                        </div>

                        {/* SECURITY */}
                        <div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-3">
                                🔐 Data Security
                            </h4>
                            <p className="text-gray-700">
                                We are committed to ensuring that your information is secure. We implement appropriate 
                                technical and organizational measures to prevent unauthorized access, disclosure, or misuse 
                                of your personal data.
                            </p>
                        </div>

                        {/* COOKIES */}
                        <div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-3">
                                🍪 Cookies Policy
                            </h4>
                            <p className="text-gray-700 mb-3">
                                A cookie is a small file placed on your device to enhance your browsing experience.
                            </p>
                            <p className="text-gray-700 mb-3">We use cookies to:</p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li>Analyze website traffic and user behavior</li>
                                <li>Improve website performance and user experience</li>
                                <li>Customize content based on your preferences</li>
                            </ul>
                            <p className="text-gray-700 mt-3">
                                You can choose to accept or decline cookies through your browser settings. However, 
                                disabling cookies may affect some functionalities of the website.
                            </p>
                        </div>

                        {/* CONTROL */}
                        <div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-3">
                                🎯 Controlling Your Personal Information
                            </h4>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-3">
                                <li>You may opt-out of receiving marketing communications at any time</li>
                                <li>You can request modification or deletion of your personal data</li>
                                <li>You may contact us if you believe any information we hold is incorrect</li>
                            </ul>
                            <p className="text-gray-700">
                                We do not sell, distribute, or lease your personal information to third parties unless 
                                required by law or with your explicit permission.
                            </p>
                        </div>

                        {/* CONTACT */}
                        <div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-3">
                                📩 Contact & Support
                            </h4>
                            <p className="text-gray-700">
                                If you have any questions regarding this Privacy Policy or your data, you can contact us:
                            </p>

                            <div className="mt-3 space-y-1 text-gray-800">
                                <p>
                                    📞{" "}
                                    <a href="tel:9310328928" className="text-blue-600 hover:underline">
                                        9310328928
                                    </a>
                                </p>
                                <p>
                                    📧{" "}
                                    <a href="mailto:support@maxifyacademy.com" className="text-blue-600 hover:underline">
                                        support@maxifyacademy.com
                                    </a>
                                </p>
                                <p>📍 Address: Noida sector 2, UP 201301</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default PrivacyPolicy;