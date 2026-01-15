// import React, { useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getSingleProduct } from "../../redux/slices/productSlice";
// import UserLayout from "../../Layouts/UserLayout";

// import { toast } from "react-toastify";                 // Toast import
// import "react-toastify/dist/ReactToastify.css";         // Toast CSS

// const ProductDetails = () => {
//   useEffect(() => {
//     window.scroll(0, 0)
//   })

//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { product, loading } = useSelector((state) => state.products);


//   const user = JSON.parse(localStorage.getItem("user")); // Check user login

//   useEffect(() => {
//     if (id) dispatch(getSingleProduct(id));
//   }, [id]);

//   if (loading || !product) {
//     return (
//       <UserLayout>
//         <div className="flex justify-center items-center h-screen">
//           <div className="animate-spin h-10 w-10 rounded-full border-t-2 border-[#003366]"></div>
//         </div>
//       </UserLayout>
//     );
//   }

//   // PDF URL fix
//   const pdfUrl = product.pdf_file ? `${product.pdf_file}` : null;

//   const cleanPdfUrl =
//     pdfUrl &&
//     pdfUrl
//       .replace(/ /g, "%20")
//       .replace(/([^:]\/)\/+/g, "$1"); 

//   return (
//     <UserLayout>
//       <div className="max-w-5xl mx-auto px-4 py-10">

//         {/* Product Header */}
//         <div className="flex flex-col md:flex-row gap-8">

//           {/* Left Image */}
//           <div className="w-full md:w-1/2">
//             <img
//               src={product.image_file}
//               alt={product.title}
//               className="w-full h-auto rounded-xl shadow-md"
//             />
//           </div>

//           {/* Right Details */}
//           <div className="w-full md:w-1/2">
//             <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

//             <p className="mt-2 text-gray-600">{product.short_description}</p>

//             <div className="mt-4">
//               {product.discount_price ? (
//                 <>
//                   <p className="text-red-500 line-through text-lg">₹{product.price}</p>
//                   <p className="text-2xl font-bold text-green-700">₹{product.discount_price}</p>
//                 </>
//               ) : (
//                 <p className="text-2xl font-bold text-gray-800">₹{product.price}</p>
//               )}
//             </div>

//             {/* Includes */}
//             <h3 className="mt-6 text-lg font-semibold">Includes:</h3>
//             <ul className="mt-2 space-y-2">
//               {product.includes?.map((inc) => (
//                 <li key={inc._id} className="flex items-center gap-3 text-gray-700">
//                   <span className="text-[#003366] font-bold">•</span> {inc.text}
//                 </li>
//               ))}
//             </ul>

//             {/* Learnings */}
//             <h3 className="mt-6 text-lg font-semibold">What You Will Learn:</h3>
//             <ul className="mt-2 space-y-2">
//               {product.learns?.map((l, i) => (
//                 <li key={i} className="text-gray-700">✔ {l}</li>
//               ))}
//             </ul>

//             {/* Category */}
//             <p className="mt-6 text-sm text-gray-600">
//               <strong>Category:</strong> {product.category_id?.name}
//             </p>

//             {/* Keywords */}
//             <p className="text-sm text-gray-600 mt-2">
//               <strong>Keywords:</strong> {product.meta_keyword?.join(", ")}
//             </p>

//             {/* View PDF Button */}
//             {cleanPdfUrl && (
//               <button
//                 onClick={() => {
//                   if (!user) {
//                     toast.error("Please log in first to continue.");
//                     return navigate("/login");
//                   }
//                   window.open(cleanPdfUrl, "_blank");
//                 }}
//                 className="mt-6 w-full md:w-auto px-6 py-3 bg-[#003366] text-white rounded-lg hover:bg-[#002244] transition"
//               >
//                 📄 View PDF
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Full Description */}
//         <div className="mt-10 bg-white p-6 rounded-xl shadow">
//           <h2 className="text-xl font-semibold mb-3">Description</h2>
//           <p className="text-gray-700 leading-relaxed">{product.description}</p>
//         </div>

//       </div>
//     </UserLayout>
//   );
// };

// export default ProductDetails;


import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../../redux/slices/productSlice";
import UserLayout from "../../Layouts/UserLayout";
import { 
  FaRegFilePdf, 
  FaCheck, 
  FaTags, 
  FaInfoCircle, 
  FaLayerGroup, 
  FaArrowLeft,
  FaShieldAlt
} from "react-icons/fa";
import { toast } from "react-toastify";

const ProductDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading } = useSelector((state) => state.products);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (id) dispatch(getSingleProduct(id));
  }, [id, dispatch]);

  if (loading || !product) {
    return (
      <UserLayout>
        <div className="flex flex-col justify-center items-center h-[60vh]">
          <div className="animate-spin h-12 w-12 rounded-full border-t-4 border-cyan-500 border-gray-200"></div>
        </div>
      </UserLayout>
    );
  }

  const pdfUrl = product.pdf_file ? `${product.pdf_file}` : null;
  const cleanPdfUrl = pdfUrl?.replace(/ /g, "%20").replace(/([^:]\/)\/+/g, "$1");

  return (
    <UserLayout>
      <div className="min-h-screen bg-white font-sans text-[#1c1d1f]">
        
        {/* Navigation - Better Mobile Padding */}
        <div className="bg-gray-50 border-b border-gray-100 py-3 md:py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-500 hover:text-cyan-500 transition-colors"
            >
              <FaArrowLeft /> Back to Marketplace
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-12 lg:py-16">
          {/* Main Responsive Grid: 1 column on mobile/tablet, 2 columns on Desktop (lg) */}
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-20">
            
            {/* LEFT SIDE: PRODUCT INFO (Order 2 on Mobile, 1 on Desktop) */}
            <div className="w-full lg:w-[60%] order-2 lg:order-1">
              <div className="mb-6 md:mb-10">
                <div className="flex items-center gap-2 text-cyan-600 mb-3 md:mb-4">
                   <FaLayerGroup size={12} />
                   <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.15em]">
                     {product.category_id?.name || "Digital Asset"}
                   </span>
                </div>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-4 md:mb-6">
                  {product.title}
                </h1>
                <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed">
                  {product.short_description}
                </p>
              </div>

              {/* Learning Outcomes - Responsive 2-col grid */}
              <div className="bg-gray-50 rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 border border-gray-100 mb-8 md:mb-12">
                <h3 className="text-lg md:text-xl font-black text-gray-900 mb-6 uppercase tracking-tight">
                  What you'll find inside
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  {product.learns?.map((l, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 bg-cyan-500/10 p-1 rounded-full shrink-0">
                        <FaCheck className="text-cyan-500 text-[10px]" />
                      </div>
                      <span className="text-gray-700 font-medium text-sm md:text-base leading-snug">{l}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Description */}
              <div className="px-1">
                <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-4 md:mb-6 uppercase tracking-tight">
                  Product Description
                </h3>
                <div className="text-gray-600 leading-loose whitespace-pre-line font-medium text-sm md:text-base">
                  {product.description}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: FLOATING SIDEBAR (Order 1 on Mobile, 2 on Desktop) */}
            <div className="w-full lg:w-[40%] order-1 lg:order-2">
              <div className="lg:sticky lg:top-8">
                <div className="bg-white rounded-2xl md:rounded-[2rem] border border-gray-100 shadow-xl md:shadow-2xl shadow-gray-200/50 overflow-hidden">
                  
                  {/* Image: Responsive height */}
                  <div className="relative h-48 sm:h-64 lg:h-72 overflow-hidden">
                    <img
                      src={product.image_file}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  </div>

                  {/* Pricing and Actions */}
                  <div className="p-6 md:p-10">
                    <div className="flex items-center gap-4 mb-6 md:mb-8">
                      {product.discount_price ? (
                        <div className="flex items-baseline gap-3">
                          <span className="text-3xl md:text-4xl font-black text-gray-900">₹{product.discount_price}</span>
                          <span className="text-base md:text-lg text-gray-400 line-through font-bold">₹{product.price}</span>
                        </div>
                      ) : (
                        <span className="text-3xl md:text-4xl font-black text-gray-900">₹{product.price}</span>
                      )}
                    </div>

                    <div className="space-y-4">
                      {cleanPdfUrl && (
                        <button
                          onClick={() => {
                            if (!user) {
                              toast.error("Please log in first.");
                              return navigate("/login");
                            }
                            window.open(cleanPdfUrl, "_blank");
                          }}
                          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-black py-4 md:py-5 rounded-xl md:rounded-2xl uppercase tracking-widest transition-all shadow-lg shadow-cyan-100 flex items-center justify-center gap-3 text-sm md:text-base active:scale-[0.98]"
                        >
                          <FaRegFilePdf size={18} /> Access Digital PDF
                        </button>
                      )}
                    </div>

                    {/* Features List */}
                    <div className="mt-8 pt-8 border-t border-gray-50 space-y-4">
                      <div className="flex items-center justify-between text-xs md:text-sm font-bold">
                        <span className="text-gray-500 flex items-center gap-2"><FaTags className="text-cyan-500"/> Format</span>
                        <span className="text-gray-900">PDF E-Book</span>
                      </div>

                      <div className="flex items-center justify-between text-xs md:text-sm font-bold">
                        <span className="text-gray-500 flex items-center gap-2"><FaInfoCircle className="text-cyan-500"/> Delivery</span>
                        <span className="text-gray-900">Instant Access</span>
                      </div>

                      <div className="flex items-center justify-between text-xs md:text-sm font-bold">
                        <span className="text-gray-500 flex items-center gap-2"><FaShieldAlt className="text-cyan-500"/> Guarantee</span>
                        <span className="text-gray-900">Secure Payment</span>
                      </div>

                      {/* Keywords - Mobile Optimized Wrap */}
                      <div className="mt-6">
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Keywords</p>
                         <div className="flex flex-wrap gap-2">
                            {product.meta_keyword?.map((tag, idx) => (
                              <span key={idx} className="bg-gray-100 text-gray-600 text-[10px] px-3 py-1.5 rounded-lg font-bold">
                                {tag}
                              </span>
                            ))}
                         </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Secure Footer - Hidden on very small screens to save space */}
                <div className="hidden sm:flex mt-6 items-center justify-center gap-3 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                  <div className="h-[1px] flex-1 bg-gray-100"></div>
                  100% Digital Delivery
                  <div className="h-[1px] flex-1 bg-gray-100"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default ProductDetails;