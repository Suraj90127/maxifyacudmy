// import React, { useState, useRef, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaBars, FaTimes, FaUser } from "react-icons/fa";

// /* ---------------- Redux ---------------- */
// import { useSelector, useDispatch } from "react-redux";
// import { logoutUser } from "../redux/slices/authSlice";

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);

//   const dispatch = useDispatch();
//     const navigate = useNavigate(); 

//   const { user } = useSelector((state) => state.auth);

//   const menuRef = useRef(null);
//   const profileRef = useRef(null);

//   // Toggle Mobile Menu
//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

//   // Sticky Navbar
//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Close dropdowns on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (
//         menuRef.current &&
//         !menuRef.current.contains(e.target) &&
//         !profileRef.current?.contains(e.target)
//       ) {
//         setIsMenuOpen(false);
//         setIsProfileOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () =>
//       document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   /* ---------------- LOGOUT FIXED ---------------- */
//   const handleLogout = () => {
//     dispatch(logoutUser());
//     setIsProfileOpen(false);
//     setIsMenuOpen(false);

//     // ✅ Redirect to Home
//     navigate("/", { replace: true });
//   };


//   return (
//     <header
//       className={`py-4 transition-all duration-300 z-50 ${isScrolled
//           ? "fixed top-0 left-0 w-full shadow-lg bg-white/90 backdrop-blur-md"
//           : "relative bg-white"
//         }`}
//     >
//       <div className="max-w-7xl mx-auto px-4">
//         <nav className="flex justify-between items-center">
//           {/* Logo */}
//           <Link to="/" className="flex items-center">
//             <img
//               src="https://i.ibb.co/5X9Fm9mc/logo-2.png"
//               alt="Logo"
//               className="h-10"
//             />
//           </Link>

//           {/* Desktop Menu */}
//           <div className="flex items-center gap-10">
//             <div className="hidden md:flex items-center space-x-8 text-base font-medium">
//               <Link to="/" className="text-gray-700 hover:text-black">
//                 Home
//               </Link>
//               <Link to="/courses" className="text-gray-700 hover:text-black">
//                 Courses
//               </Link>
//               <Link
//                 to="/digital-product"
//                 className="text-gray-700 hover:text-black"
//               >
//                 Digital Products
//               </Link>
//               <Link to="/blogs" className="text-gray-700 hover:text-black">
//                 Blog
//               </Link>
//               <Link to="/contact" className="text-gray-700 hover:text-black">
//                 Contact
//               </Link>
//               <Link
//                 to="/my-courses"
//                 className="text-gray-700 hover:text-black"
//               >
//                 My Courses
//               </Link>

//             </div>

//             {/* Auth Section */}
//             <div className="flex items-center space-x-4">
//               {user ? (
//                 /* -------- LOGGED IN PROFILE MENU ---------- */
//                 <div className="relative" ref={profileRef}>
//                   <button
//                     onClick={() => setIsProfileOpen(!isProfileOpen)}
//                     className="flex items-center space-x-2 text-gray-700 hover:text-black"
//                   >
//                     <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
//                       <FaUser className="text-white text-sm" />
//                     </div>
//                     <span className="hidden md:block capitalize">
//                       {user.firstname} {user.lastname}
//                     </span>
//                   </button>

//                   {isProfileOpen && (
//                     <div className="absolute top-full right-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg mt-1">
//                       <ul className="py-2">
//                         <li className="border-t border-gray-200 mt-2 pt-2">
//                           <button
//                             onClick={handleLogout}
//                             className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
//                           >
//                             Logout
//                           </button>
//                         </li>
//                       </ul>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 /* -------- GUEST USER ---------- */
//                 <div className="hidden md:flex items-center space-x-4">
//                   <Link
//                     to="/login"
//                     className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100"
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     to="/register"
//                     className="px-4 py-2 bg-black text-white rounded-full"
//                   >
//                     Register
//                   </Link>
//                 </div>
//               )}

//               {/* Mobile Menu Button */}
//               <button
//                 onClick={toggleMenu}
//                 className="md:hidden text-gray-800 text-2xl"
//               >
//                 {isMenuOpen ? <FaTimes /> : <FaBars />}
//               </button>
//             </div>
//           </div>
//         </nav>

//         {/* ---------------- Mobile Sidebar ---------------- */}
//         <div
//           ref={menuRef}
//           className={`fixed top-0 right-0 h-full w-full bg-white shadow-2xl transform transition-transform duration-300 z-50 md:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"
//             }`}
//         >
//           <div className="p-6 h-full flex flex-col">
//             {/* Close Button */}
//             <div className="flex justify-between items-center mb-8">
//               <Link
//                 to="/"
//                 className="flex items-center"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 <img
//                   src="https://i.ibb.co/5X9Fm9mc/logo-2.png"
//                   alt="Logo"
//                   className="h-8"
//                 />
//               </Link>

//               <button
//                 onClick={toggleMenu}
//                 className="text-gray-800 text-2xl"
//               >
//                 <FaTimes />
//               </button>
//             </div>

//             {/* Mobile Menu Items */}
//             <div className="flex-1 bg-white">
//               <ul className="space-y-6">
//                 <li>
//                   <Link
//                     to="/"
//                     className="text-gray-700 block text-lg py-2"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     Home
//                   </Link>
//                 </li>

//                 <li>
//                   <Link
//                     to="/courses"
//                     className="text-gray-700 block text-lg py-2"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     Courses
//                   </Link>
//                 </li>

//                 <li>
//                   <Link
//                     to="/blogs"
//                     className="text-gray-700 block text-lg py-2"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     Blog
//                   </Link>
//                 </li>

//                 <li>
//                   <Link
//                     to="/contact"
//                     className="text-gray-700 block text-lg py-2"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     Contact
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             {/* Mobile Authentication */}
//             {!user ? (
//               <div className="pt-6 border-t border-gray-200 space-y-4">
//                 <Link
//                   to="/login"
//                   className="block w-full text-center px-4 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Login
//                 </Link>

//                 <Link
//                   to="/register"
//                   className="block w-full text-center px-4 py-3 bg-black text-white rounded-full"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Register
//                 </Link>
//               </div>
//             ) : (
//               <button
//                 onClick={handleLogout}
//                 className="block w-full mt-6 text-center px-4 py-3 bg-red-600 text-white rounded-full"
//               >
//                 Logout
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Overlay */}
//         {isMenuOpen && (
//           <div
//             className="fixed inset-0 bg-black/20 z-40 md:hidden"
//             onClick={() => setIsMenuOpen(false)}
//           />
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;



import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";

/* ---------------- Redux ---------------- */
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const menuRef = useRef(null);
  const profileRef = useRef(null);

  // Toggle Mobile Menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent background scrolling when menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  // Sticky Navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "unset"; // Cleanup
    };
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !profileRef.current?.contains(e.target)
      ) {
        setIsMenuOpen(false);
        setIsProfileOpen(false);
        document.body.style.overflow = "unset";
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    document.body.style.overflow = "unset";
    navigate("/", { replace: true });
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <header
        className={`py-4 transition-all duration-300 z-[100] ${
          isScrolled
            ? "fixed top-0 left-0 w-full shadow-lg bg-white/95 backdrop-blur-md"
            : "relative bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src="https://i.ibb.co/5X9Fm9mc/logo-2.png"
                alt="Logo"
                className="h-8 md:h-10"
              />
            </Link>

            {/* Right Side Items */}
            <div className="flex items-center gap-4 md:gap-10">
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8 text-base font-medium">
                <Link to="/" className="text-gray-700 hover:text-black">Home</Link>
                <Link to="/courses" className="text-gray-700 hover:text-black">Courses</Link>
                <Link to="/digital-product" className="text-gray-700 hover:text-black">Products</Link>
                <Link to="/blogs" className="text-gray-700 hover:text-black">Blog</Link>
                <Link to="/contact" className="text-gray-700 hover:text-black">Contact</Link>
                <Link to="/my-courses" className="text-gray-700 hover:text-black">My Courses</Link>
              </div>

              {/* User Profile / Auth */}
              <div className="flex items-center space-x-3">
                {user ? (
                  <div className="relative" ref={profileRef}>
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center space-x-2 text-gray-700"
                    >
                      <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                        <FaUser className="text-white text-xs" />
                      </div>
                      <span className="hidden lg:block capitalize">
                        {user.firstname}
                      </span>
                    </button>

                    {isProfileOpen && (
                      <div className="absolute top-full right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-xl mt-2 py-2">
                         <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="hidden md:flex items-center space-x-4">
                    <Link to="/login" className="px-5 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50">Login</Link>
                    <Link to="/register" className="px-5 py-2 bg-black text-white rounded-full">Register</Link>
                  </div>
                )}

                {/* Mobile Menu Toggle */}
                <button
                  onClick={toggleMenu}
                  className="md:hidden p-2 text-gray-800 text-2xl focus:outline-none"
                  aria-label="Toggle Menu"
                >
                  {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* ---------------- Mobile Sidebar ---------------- */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-[1000] md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-10">
            <img src="https://i.ibb.co/5X9Fm9mc/logo-2.png" alt="Logo" className="h-8" />
            <button onClick={closeMenu} className="text-2xl text-gray-800"><FaTimes /></button>
          </div>

          <nav className="flex-1">
            <ul className="space-y-4">
              <li><Link to="/" onClick={closeMenu} className="text-gray-800 text-lg font-medium block border-b border-gray-50 pb-2">Home</Link></li>
              <li><Link to="/courses" onClick={closeMenu} className="text-gray-800 text-lg font-medium block border-b border-gray-50 pb-2">Courses</Link></li>
              <li><Link to="/digital-product" onClick={closeMenu} className="text-gray-800 text-lg font-medium block border-b border-gray-50 pb-2">Digital Products</Link></li>
              <li><Link to="/blogs" onClick={closeMenu} className="text-gray-800 text-lg font-medium block border-b border-gray-50 pb-2">Blog</Link></li>
              <li><Link to="/my-courses" onClick={closeMenu} className="text-gray-800 text-lg font-medium block border-b border-gray-50 pb-2">My Courses</Link></li>
              <li><Link to="/contact" onClick={closeMenu} className="text-gray-800 text-lg font-medium block border-b border-gray-50 pb-2">Contact</Link></li>
            </ul>
          </nav>

          <div className="mt-auto pt-6 border-t border-gray-100">
            {!user ? (
              <div className="space-y-3">
                <Link to="/login" onClick={closeMenu} className="block w-full py-3 text-center border border-gray-300 rounded-xl font-semibold">Login</Link>
                <Link to="/register" onClick={closeMenu} className="block w-full py-3 text-center bg-black text-white rounded-xl font-semibold">Register</Link>
              </div>
            ) : (
              <div className="space-y-3">
                 <div className="flex items-center gap-3 px-2 mb-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"><FaUser /></div>
                    <span className="font-bold text-gray-800">{user.firstname} {user.lastname}</span>
                 </div>
                <button onClick={handleLogout} className="w-full py-3 bg-red-50 text-red-600 rounded-xl font-semibold">Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] md:hidden transition-opacity"
          onClick={closeMenu}
        />
      )}
    </>
  );
};

export default Header;