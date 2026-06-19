import React, {
  useState,
  useRef,
  useEffect,
} from "react";

import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

/* ICONS */
import {
  Menu,
  X,
  User,
  LogIn,
  UserPlus,
  Home,
  BookOpen,
  ShoppingBag,
  FileText,
  Mail,
  GraduationCap,
  ChevronRight,
} from "lucide-react";

/* REDUX */
import {
  useSelector,
  useDispatch,
} from "react-redux";

import { logoutUser } from "../redux/slices/authSlice";

const Header = () => {
  // =========================================
  // STATES
  // =========================================

  const [isOpen, setIsOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  const [isProfileOpen, setIsProfileOpen] =
    useState(false);

  // =========================================
  // REFS
  // =========================================

  const menuRef = useRef(null);
  const profileRef = useRef(null);

  // =========================================
  // REDUX
  // =========================================

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();
  const loginRedirect = `/login?redirect=${encodeURIComponent(`${location.pathname}${location.search}${location.hash}`)}`;

  const { user } = useSelector(
    (state) => state.auth
  );

  // =========================================
  // NAVIGATION LINKS
  // =========================================

  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "Courses",
      path: "/courses",
      icon: BookOpen,
    },
    {
      name: "Products",
      path: "/digital-product",
      icon: ShoppingBag,
    },
    // {
    //   name: "Blog",
    //   path: "/blogs",
    //   icon: FileText,
    // },
    {
      name: "Contact",
      path: "/contact",
      icon: Mail,
    },
    {
      name: "My Courses",
      path: "/my-courses",
      icon: GraduationCap,
    },
  ];

  // =========================================
  // ACTIVE ROUTE
  // =========================================

  const isActive = (path) => {
    if (path === "/") {
      return (
        location.pathname ===
        path
      );
    }

    return location.pathname.startsWith(
      path
    );
  };

  // =========================================
  // SCROLL TO TOP FUNCTION
  // =========================================

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // =========================================
  // HANDLE LOGO/HOME CLICK
  // =========================================

  const handleLogoClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      scrollToTop();
    }
  };

  // =========================================
  // STICKY NAVBAR
  // =========================================

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY > 10
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  // =========================================
  // BODY SCROLL LOCK
  // =========================================

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowX =
        "hidden";

      document.body.style.overflowY =
        "hidden";
    } else {
      document.body.style.overflowX =
        "hidden";

      document.body.style.overflowY =
        "auto";
    }

    return () => {
      document.body.style.overflowX =
        "hidden";

      document.body.style.overflowY =
        "auto";
    };
  }, [isOpen]);

  // =========================================
  // CLOSE MENU ON ROUTE CHANGE
  // =========================================

  useEffect(() => {
    setIsOpen(false);

    setIsProfileOpen(false);
  }, [location]);

  // =========================================
  // OUTSIDE CLICK
  // =========================================

  useEffect(() => {
    const handleClickOutside = (
      e
    ) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          e.target
        ) &&
        profileRef.current &&
        !profileRef.current.contains(
          e.target
        )
      ) {
        setIsOpen(false);
        setIsProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = () => {
    dispatch(logoutUser());

    setIsProfileOpen(false);

    setIsOpen(false);

    navigate("/", {
      replace: true,
    });
    
    scrollToTop();
  };

  return (
    <>
      {/* ========================================= */}
      {/* HEADER */}
      {/* ========================================= */}

      <header
        className={`w-full sticky top-0 z-[100] overflow-x-hidden transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white shadow-sm"
        }`}
      >
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* ========================================= */}
            {/* LOGO */}
            {/* ========================================= */}

            <Link
              to="/"
              onClick={handleLogoClick}
              className="flex items-center gap-2 group flex-shrink-0 cursor-pointer"
            >
              <img
                src="https://i.ibb.co/5X9Fm9mc/logo-2.png"
                alt="Maxify Academy"
                className="h-8 md:h-10 w-auto transition-transform group-hover:scale-105"
              />
            </Link>

            {/* ========================================= */}
            {/* DESKTOP NAVIGATION */}
            {/* ========================================= */}

            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map(
                (link, i) => {
                  const Icon =
                    link.icon;

                  const active =
                    isActive(
                      link.path
                    );

                  return (
                    <Link
                      key={i}
                      to={
                        link.path
                      }
                      onClick={() => {
                        if (link.path === "/") {
                          scrollToTop();
                        }
                        setIsProfileOpen(false);
                      }}
                      className={`
                        relative px-3 xl:px-4 py-2 rounded-lg transition-all duration-300
                        flex items-center gap-2 text-sm xl:text-base font-medium whitespace-nowrap
                        ${
                          active
                            ? "text-purple-600 bg-purple-50"
                            : "text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                        }
                      `}
                    >
                      <Icon
                        size={18}
                        className={
                          active
                            ? "text-purple-600"
                            : "text-gray-500"
                        }
                      />

                      <span>
                        {
                          link.name
                        }
                      </span>

                      {active && (
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></span>
                      )}
                    </Link>
                  );
                }
              )}
            </nav>

            {/* ========================================= */}
            {/* RIGHT SIDE */}
            {/* ========================================= */}

            <div className="flex items-center gap-3">
              
              {/* ========================================= */}
              {/* USER LOGGED IN */}
              {/* ========================================= */}

              {user ? (
                <div
                  className="relative hidden md:block"
                  ref={
                    profileRef
                  }
                >
                  <Link to={"/my-courses/profile"}>
                  <button
                    onClick={() =>
                      setIsProfileOpen(
                        !isProfileOpen
                      )
                    }
                    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition-all duration-300"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                      <User
                        size={
                          16
                        }
                        className="text-white"
                      />
                    </div>
                    <span className="font-semibold text-gray-700 capitalize hidden lg:block">
                      {user.firstname}
                    </span>
                  </button>
                    </Link>
                </div>
              ) : (
                <>
                  
                  {/* TABLET BUTTONS */}
                  <div className="hidden md:flex lg:hidden items-center gap-2">
                    <Link
                      to={loginRedirect}
                      className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      className="px-3 py-1.5 text-sm rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    >
                      Register
                    </Link>
                  </div>

                  {/* DESKTOP BUTTONS */}
                  <div className="hidden lg:flex items-center gap-3">
                    <Link
                      to={loginRedirect}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-purple-300 transition-all duration-300"
                    >
                      <LogIn
                        size={18}
                      />

                      <span>
                        Login
                      </span>
                    </Link>

                    <Link
                      to="/register"
                      className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      <UserPlus
                        size={18}
                      />

                      <span>
                        Register
                      </span>
                    </Link>
                  </div>
                </>
              )}

              {/* ========================================= */}
              {/* MOBILE MENU BUTTON */}
              {/* ========================================= */}

              <button
                onClick={() =>
                  setIsOpen(true)
                }
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu
                  size={24}
                  className="text-gray-700"
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================= */}
      {/* MOBILE MENU */}
      {/* ========================================= */}

      <div
        className={`fixed inset-0 z-[9999] transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        
        {/* BACKDROP */}
        <div
          onClick={() =>
            setIsOpen(false)
          }
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* DRAWER */}
        <div
          ref={menuRef}
          className={`absolute top-0 right-0 h-full md:w-[280px] w-[85vw] max-w-[320px] bg-white shadow-2xl transition-transform duration-500 ease-out overflow-y-auto ${
            isOpen
              ? "translate-x-0"
              : "translate-x-full"
          }`}
        >
          
          {/* DRAWER HEADER */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-5 sm:px-6 sm:py-6 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              
              <img
                src="https://i.ibb.co/5X9Fm9mc/logo-2.png"
                alt="logo"
                className="h-8 w-auto"
              />

              <button
                onClick={() =>
                  setIsOpen(false)
                }
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <X
                  size={20}
                  className="text-white"
                />
              </button>
            </div>

            <p className="text-purple-100 text-xs sm:text-sm mt-3">
              Start your learning
              journey today
            </p>
          </div>

          {/* USER PREVIEW */}
          <div className="px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center flex-shrink-0">
                <User
                  size={20}
                  className="text-purple-600"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm sm:text-base capitalize">
                  {user
                    ? `${user.firstname} ${user.lastname}`
                    : "Guest User"}
                </p>

                <p className="text-xs text-gray-500 truncate">
                  {user
                    ? user.email
                    : "Login to access your courses"}
                </p>
              </div>
            </div>
          </div>

          {/* NAV LINKS */}
          <div className="flex-1 py-4">
            <div className="px-3 space-y-1">
              {navLinks.map(
                (link, i) => {
                  const Icon =
                    link.icon;

                  const active =
                    isActive(
                      link.path
                    );

                  return (
                    <Link
                      key={i}
                      to={
                        link.path
                      }
                      onClick={() => {
                        setIsOpen(false);
                        if (link.path === "/") {
                          scrollToTop();
                        }
                      }}
                      className={`
                        flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-300
                        ${
                          active
                            ? "bg-gradient-to-r from-purple-50 to-blue-50 text-purple-600 font-semibold"
                            : "text-gray-700 hover:bg-gray-50"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon
                          size={
                            18
                          }
                          className={
                            active
                              ? "text-purple-600 flex-shrink-0"
                              : "text-gray-500 flex-shrink-0"
                          }
                        />

                        <span className="text-sm truncate">
                          {
                            link.name
                          }
                        </span>
                      </div>

                      {active && (
                        <ChevronRight
                          size={16}
                          className="text-purple-600 flex-shrink-0"
                        />
                      )}
                    </Link>
                  );
                }
              )}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="border-t border-gray-100 p-5 bg-gray-50 sticky bottom-0">
            {!user ? (
              <div className="space-y-2">
                <Link
                  to={loginRedirect}
                  onClick={() =>
                    setIsOpen(
                      false
                    )
                  }
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-300 text-sm"
                >
                  <LogIn
                    size={16}
                  />

                  <span>
                    Login
                  </span>
                </Link>

                <Link
                  to="/register"
                  onClick={() =>
                    setIsOpen(
                      false
                    )
                  }
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg transition-all duration-300 text-sm"
                >
                  <UserPlus
                    size={16}
                  />

                  <span>
                    Create Free
                    Account
                  </span>
                </Link>
              </div>
            ) : (
              <button
                onClick={
                  handleLogout
                }
                className="w-full py-3 bg-red-50 text-red-600 rounded-xl font-semibold"
              >
                Logout
              </button>
            )}

            {/* TRUST TEXT */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Join 2500+ students
                already learning
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
