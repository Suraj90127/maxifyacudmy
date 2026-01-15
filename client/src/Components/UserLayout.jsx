// src/components/Layout/my-coursesLayout.jsx
import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate, useLocation, Link } from "react-router-dom";
import {
  X,
  Home,
  User,
  BookOpen,
  Clock,
  Star,
  HelpCircle,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice"; // <-- ADDED

const UserLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(0);

  const navigation = [
    { name: "Profile", icon: User, href: "/my-courses/profile" },
    { name: "Dashboard", icon: Home, href: "/my-courses/dashboard" },
    { name: "My Course", icon: BookOpen, href: "/my-courses/my-course" },
    { name: "Payment History", icon: Clock, href: "/my-courses/payment-history" },
    { name: "My Referral", icon: Star, href: "/my-courses/my-referral" },
    { name: "Support", icon: HelpCircle, href: "/my-courses/support" },
    { name: "Change Password", icon: Settings, href: "/my-courses/change-password" },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (sidebarOpen) setTimeout(() => setOverlayOpacity(40), 10);
    else setOverlayOpacity(0);
  }, [sidebarOpen]);

  useEffect(() => {
    if (sidebarOpen && isMobile) setSidebarOpen(false);
  }, [location.pathname, isMobile]);

  const handleLogout = () => {
    dispatch(logoutUser()); // <-- FIXED LOGOUT
    navigate("/login");
  };

  const getCurrentPageTitle = () => {
    const currentItem = navigation.find((item) =>
      location.pathname.startsWith(item.href)
    );
    return currentItem ? currentItem.name : "Profile Setting";
  };

  const handleOverlayClick = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between h-16 px-4">
          <h1 className="text-lg md:text-xl font-semibold text-gray-900">
            {getCurrentPageTitle()}
          </h1>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <Menu className="h-6 w-6 md:h-7 md:w-7" />
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-black transition-opacity duration-300 ease-in-out ${
          sidebarOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ opacity: `${overlayOpacity}%` }}
        onClick={handleOverlayClick}
      />

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-[80%] max-w-sm transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full bg-white shadow-xl overflow-y-auto">
          <SidebarContent
            navigation={navigation}
            handleLogout={handleLogout}
            onClose={() => setSidebarOpen(false)}
            isMobile={isMobile}
          />
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`pt-16 lg:pt-0 lg:pl-72 transition-all duration-300 ease-in-out ${
          sidebarOpen && isMobile ? "opacity-90 " : "opacity-100"
        }`}
      >
        <main className="flex-1 min-h-screen">
          <div className="py-6">
            <div className="mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white">
          <SidebarContent
            navigation={navigation}
            handleLogout={handleLogout}
            isMobile={false}
          />
        </div>
      </div>
    </div>
  );
};

//
// ============== SIDEBAR COMPONENT (WITH USER DETAILS) =============
//
const SidebarContent = ({ navigation, handleLogout, onClose, isMobile }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const avatarLetter = user?.firstname
    ? user.firstname.charAt(0).toUpperCase()
    : "U";

  return (
    <>
      {/* Sidebar Header */}
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <Link to="/">
            <img src="https://i.ibb.co/5X9Fm9mc/logo-2.png" alt="Logo" className="h-10" />
          </Link>

          {isMobile && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname.startsWith(item.href);
          return (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={isMobile ? onClose : undefined}
              className={`flex items-center px-4 py-3 text-sm md:text-base font-medium rounded-lg transition-all
                ${
                  isActive
                    ? "bg-[#F1F0FE] text-[#6366f1]"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 ${
                  isActive ? "text-[#6253F4]" : "text-gray-400"
                }`}
              />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="mt-auto p-6 border-t border-gray-100">
        <Link to="/my-courses/profile" onClick={isMobile ? onClose : undefined}>
          <div className="group flex items-center p-3 border border-gray-300 rounded-xl hover:bg-gray-50 cursor-pointer transition-all duration-200">
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                className="h-10 w-10 rounded-full object-cover"
                alt="User"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {avatarLetter}
                </span>
              </div>
            )}

            <div className="ml-3 flex-1">
              <div className="text-sm font-semibold text-gray-900">
                {user?.firstname} {user?.lastname}
              </div>
              <div className="text-xs text-gray-500">
                {user?.username || user?.email}
              </div>
            </div>

            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
          </div>
        </Link>

        {/* Logout */}
        <button
          onClick={() => {
            if (isMobile && onClose) onClose();
            handleLogout();
          }}
          className="mt-4 w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </button>
      </div>
    </>
  );
};

export default UserLayout;