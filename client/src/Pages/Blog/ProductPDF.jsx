import React from "react";
import { useLocation } from "react-router-dom";
import { host } from "../../redux/slices/api";

const ProductPDF = () => {
  const { state } = useLocation();

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">{state?.title}</h1>

      <a
        href={`${host}/pdf/${state?.pdfId}`}
        target="_blank"
        className="px-5 py-3 bg-blue-600 text-white rounded-lg"
      >
        Open PDF
      </a>
    </div>
  );
};

export default ProductPDF;
