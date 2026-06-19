import React from "react";
import { motion } from "framer-motion";
import {
  FiAward,
  FiCheckCircle,
  FiShield,
  FiDownload,
  FiBriefcase,
} from "react-icons/fi";

// APNI PDF YAHAN IMPORT KARO
import SampleCertificate from "../../../assets/certificatePDF.pdf"; // <-- APNI PDF KA PATH DALO

const CertificateSection = () => {
  // PDF DOWNLOAD FUNCTION
  const handleDownloadPDF = () => {
    const link = document.createElement("a");
    link.href = SampleCertificate;
    link.download = "Maxify_Academy_Certificate.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#f5f9ff] py-8 md:py-8">
      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100/40 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-100/40 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* BADGE */}
            <div className="flex justify-center md:justify-start">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#eef4ff] border border-[#dce8ff] mb-6">
                <FiAward className="text-[#063d67]" size={16} />

                <span className="text-sm font-semibold uppercase md:tracking-[0.15em] tracking-[0.05em] text-[#063d67]">
                  INDUSTRY-RECOGNIZED CERTIFICATION
                </span>
              </div>
            </div>

            {/* TITLE */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Get Certified For
              <span className="block text-[#063d67] mt-2">
                Your Digital Skills
              </span>
            </h2>

            <div className="relative bg-white rounded-[36px] border border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden md:hidden mt-5">
              {/* Certificate Image */}
              <img
                src="https://i.ibb.co/wNLSTbRD/certificate-ssss-jpg.jpg"
                alt="Certificate of Completion"
                className="w-full h-full object-cover"
              />
            </div>

            {/* DESC */}
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Receive a professional certificate from Maxify Academy that
              demonstrates your expertise, project experience, and commitment
              to continuous learning.
            </p>

            {/* FEATURES */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                  <FiCheckCircle size={20} />
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Recognized Achievement
                  </h4>

                  <p className="text-gray-600 mt-1">
                    Validate your knowledge with an official certificate.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <FiBriefcase size={20} />
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Career & Freelance Ready
                  </h4>

                  <p className="text-gray-600 mt-1">
                    Strengthen your resume, portfolio, and professional
                    profile.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                  <FiShield size={20} />
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Trusted Certification
                  </h4>

                  <p className="text-gray-600 mt-1">
                    Designed to showcase practical skills gained through
                    hands-on training.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA BUTTON - PDF DOWNLOAD */}
            <button 
              onClick={handleDownloadPDF}
              className="mt-10 inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-[#063d67] hover:bg-[#042d4c] text-white font-semibold shadow-lg transition-all duration-300 hover:-translate-y-[2px]"
            >
              <FiDownload size={20} />
              Download Certificate (PDF)
            </button>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative flex justify-center"
          >
            {/* CERTIFICATE CARD */}
            <div className="relative w-full max-w-2xl">
              {/* SHADOW */}
              <div className="absolute inset-0 bg-blue-200/20 blur-3xl rounded-[40px]" />

              {/* MAIN CARD */}
              <div className="relative bg-white rounded-[36px] border border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden hidden md:block">
                {/* Certificate Image */}
                <img
                  src="https://i.ibb.co/wNLSTbRD/certificate-ssss-jpg.jpg"
                  alt="Certificate of Completion"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CertificateSection;