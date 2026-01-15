// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FaFileAlt,
//   FaCreditCard,
//   FaPaypal,
//   FaCheckCircle,
// } from "react-icons/fa";
// import UserLayout from "../../Layouts/UserLayout";

// // Redux
// import { useDispatch, useSelector } from "react-redux";
// import { getAllProducts } from "../../redux/slices/productSlice";

// const ProductsPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { products, loading } = useSelector((state) => state.products);

//   useEffect(() => {
//     dispatch(getAllProducts());
//   }, [dispatch]);

//   useEffect(() => {
//     window.scroll(0, 0);
//   });

//   // ALWAYS OPEN PDF
//   const openProductPDF = (product) => {
//     navigate(`/product-reader/${product._id}`, {
//       state: {
//         pdfUrl: product.pdf_file,
//         title: product.title,
//       },
//     });
//   };

//   return (
//     <UserLayout>
//       <div className="min-h-screen bg-white py-16 px-4 md:px-6">
//         <div className="max-w-7xl mx-auto mb-8">
//           <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
//             All Digital Products
//           </h2>
//           <p className="text-gray-600 mt-2">
//             Discover premium digital products to enhance your skills.
//           </p>
//         </div>

//         {/* Loader */}
//         {loading && (
//           <div className="text-center py-12 text-lg text-gray-600">
//             Loading products...
//           </div>
//         )}

//         {/* Product Grid */}
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {products.map((product) => (
//               <div
//                 key={product._id}
//                 onClick={() => openProductPDF(product)}
//                 className="group cursor-pointer"
//               >
//                 <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition">
//                   <div className="h-48 bg-gray-100 overflow-hidden">
//                     <img
//                       src={product.image_file}
//                       alt={product.title}
//                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                     />
//                   </div>

//                   <div className="p-4">
//                     <p className="text-sm text-gray-500 mb-1">
//                       {product?.category_id?.name}
//                     </p>

//                     <h3 className="text-lg font-semibold mb-2">
//                       {product.title}
//                     </h3>

//                     <p className="line-clamp-2 text-sm text-gray-600 mb-3">
//                       {product.short_description}
//                     </p>

//                     {/* Price Section (Updated with FREE condition) */}
//                     <div className="pt-3 border-t flex justify-between items-center">
//                       <div className="flex items-center gap-2">
//                         {product.price === 0 || product.discount_price === 0 ? (
//                           <p className="font-bold text-green-700 text-lg">Free</p>
//                         ) : product.discount_price ? (
//                           <>
//                             <p className="line-through text-red-500 text-sm">
//                               ₹{product.price}
//                             </p>
//                             <p className="font-bold text-green-700 text-lg">
//                               ₹{product.discount_price}
//                             </p>
//                           </>
//                         ) : (
//                           <p className="font-bold text-gray-900 text-lg">
//                             ₹{product.price}
//                           </p>
//                         )}
//                       </div>


//                       <button className="text-sm font-medium text-[#003366]">
//                         View PDF
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </UserLayout>
//   );
// };

// export default ProductsPage;


import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFileAlt,
  FaTags,
  FaArrowRight,
  FaRegFilePdf,
  FaCrown,
} from "react-icons/fa";
import UserLayout from "../../Layouts/UserLayout";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/slices/productSlice";

const ProductsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
    window.scrollTo(0, 0);
  }, [dispatch]);

  const openProductPDF = (product) => {
    navigate(`/product-reader/${product._id}`, {
      state: {
        pdfUrl: product.pdf_file,
        title: product.title,
      },
    });
  };

  return (
    <UserLayout>
      <div className="min-h-screen bg-white font-sans text-[#1c1d1f]">
        {/* Header Section */}
        <div className="bg-gray-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto py-12 px-4 md:px-6">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              All Digital Products
            </h1>
            <p className="text-gray-500 mt-3 text-lg max-w-2xl font-medium">
              Discover premium digital resources, guides, and assets to enhance your skills.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-12 px-4 md:px-6">
          {/* Loader */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
              <p className="text-gray-500 mt-4 font-bold">Loading products...</p>
            </div>
          ) : (
            /* Product Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => {
                const isFree = product.price === 0 || product.discount_price === 0;
                
                return (
                  <div
                    key={product._id}
                    onClick={() => openProductPDF(product)}
                    className="group cursor-pointer bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    {/* Image Area */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={product.image_file}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Badge */}
                      <div className="absolute top-4 left-4">
                        {isFree ? (
                          <span className="bg-emerald-500 text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                            Free Resource
                          </span>
                        ) : (
                          <span className="bg-amber-400 text-gray-900 text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1">
                            <FaCrown /> Premium
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-cyan-600 mb-2">
                        <FaTags size={12} />
                        <span className="text-[12px] font-bold uppercase tracking-widest">
                          {product?.category_id?.name || "Digital Asset"}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-cyan-600 transition-colors line-clamp-1">
                        {product.title}
                      </h3>

                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-6 font-medium">
                        {product.short_description}
                      </p>

                      {/* Footer Section */}
                      <div className="mt-auto pt-5 border-t border-gray-50 flex justify-between items-center">
                        <div>
                          {isFree ? (
                            <p className="text-2xl font-black text-emerald-600">Free</p>
                          ) : (
                            <div className="flex flex-col">
                              {product.discount_price && (
                                <span className="text-xs text-gray-400 line-through font-bold">
                                  ₹{product.price}
                                </span>
                              )}
                              <p className="text-2xl font-black text-gray-900">
                                ₹{product.discount_price || product.price}
                              </p>
                            </div>
                          )}
                        </div>

                        <button className="flex items-center gap-2 bg-gray-900 group-hover:bg-cyan-500 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-gray-200 group-hover:shadow-cyan-100">
                          <FaRegFilePdf />
                          Read Now
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="text-center py-20">
              <FaFileAlt size={48} className="mx-auto text-gray-200 mb-4" />
              <h3 className="text-xl font-bold text-gray-400">No products found</h3>
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default ProductsPage;