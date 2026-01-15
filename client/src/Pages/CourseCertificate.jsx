import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import UserLayout from "../Layouts/UserLayout";
import { FaTrophy, FaDownload, FaArrowLeft } from "react-icons/fa";
import { downloadCertificate, clearCertificateState } from "../redux/slices/certificateSlice";
import { toast } from "react-toastify";

const CourseCertificate = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, successMessage } = useSelector(
    (s) => s.certificate
  );

  /* ================= HANDLE ERROR & SUCCESS ================= */
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearCertificateState());
    }

    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearCertificateState());
    }
  }, [error, successMessage, dispatch]);

  /* ================= DOWNLOAD HANDLER ================= */
  const handleDownload = async () => {
    const res = await dispatch(downloadCertificate(courseId));

    if (downloadCertificate.fulfilled.match(res)) {
      const blob = new Blob([res.payload], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `certificate-${courseId}.pdf`;
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }

    // if (downloadCertificate.rejected.match(res)) {
    //   const msg =
    //     res.payload?.message ||
    //     res.error?.message ||
    //     "Unable to download certificate";

    //   toast.error(msg);
    // }
  };

  return (
    <UserLayout>
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white max-w-xl w-full rounded-3xl shadow-xl p-10 text-center border">

          <FaTrophy className="text-emerald-500 mx-auto mb-6" size={60} />

          <h1 className="text-2xl font-black text-slate-900 mb-2">
            Course Certificate
          </h1>

          <p className="text-slate-500 mb-8">
            Download your certificate after completing all lessons.
          </p>

          <div className="flex flex-col gap-4">
            <button
              onClick={handleDownload}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-black transition disabled:opacity-60"
            >
              <FaDownload />
              {loading ? "Preparing Certificate..." : "Download Certificate"}
            </button>

            <button
              onClick={() => navigate(-1)}
              className="w-full flex items-center justify-center gap-2 border border-slate-200 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50"
            >
              <FaArrowLeft />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default CourseCertificate;
