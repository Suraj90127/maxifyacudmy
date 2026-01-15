// src/App.js
import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

/* ================== PUBLIC PAGES ================== */
import Home from "./pages/Home/Home";
import Courses from "./pages/Courses/Courses";
import CourseInfo from "./pages/Courses/CourseInfo";
import CoursesContent from "./pages/Courses/CoursesContent";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgetPassword from "./pages/Auth/ForgotPassword";
import VerifyAndReset from "./pages/Auth/VerifyAndReset";
import Contact from "./pages/Auth/Contact";

import Blogs from "./pages/Blog/Blogs";
import BlogDetail from "./pages/Blog/BlogDetail";
import DigitalProducts from "./pages/Blog/DigitalProducts";
import PdfReader from "./pages/Blog/PdfReader";
import ProductPDF from "./pages/Blog/ProductPDF";

import CategoryCourses from "./pages/Home/CategoryCourses";

/* ================== STATIC PAGES ================== */
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import ShippingPolicy from "./pages/ShippingPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";

/* ================== USER PANEL ================== */
import Dashboard from "./pages/profile/Dashboard";
import Profile from "./pages/profile/Profile";
import MyCourse from "./pages/profile/MyCourse";
import PaymentHistory from "./pages/profile/PaymentHistory";
import { MyReferral } from "./pages/profile/MyReferral";
import Support from "./pages/profile/Support";
import ChangePassword from "./pages/profile/ChangePassword";

/* ================== COMPONENTS ================== */
import ProtectedRoute from "./components/ProtectedRoute";
import UserLayout from "./components/UserLayout";

/* ================== GLOBAL STYLES ================== */
import "./index.css";
import PaymentPage from "./Pages/PaymentPage";
import PaymentSuccess from "./Pages/PaymentSuccess";
import CourseCertificate from "./Pages/CourseCertificate";

/* ================== SCROLL TO TOP ================== */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* ========== PUBLIC ROUTES ========== */}
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/verify-otp" element={<VerifyAndReset />} />

        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:categoryId" element={<CategoryCourses />} />
        <Route path="/course-info/:id" element={<CourseInfo />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />

        <Route path="/digital-product" element={<DigitalProducts />} />
        <Route path="/product-reader/:id" element={<PdfReader />} />
        <Route path="/product/:id/pdf" element={<ProductPDF />} />

        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route
          path="/cancellation-refund-policy"
          element={<RefundPolicy />}
        />
        <Route path="/terms-and-conditions" element={<TermsConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/payment/:slug" element={<PaymentPage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/course/:courseId/certificate"element={<CourseCertificate />}/>



        {/* ========== PROTECTED COURSE CONTENT ========== */}
        <Route
          path="/course-content/:id"
          element={
            <ProtectedRoute>
              <CoursesContent />
            </ProtectedRoute>
          }
        />

        {/* ========== USER PANEL ========== */}
        <Route
          path="/my-courses/*"
          element={
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="my-course" element={<MyCourse />} />
          <Route path="payment-history" element={<PaymentHistory />} />
          <Route path="my-referral" element={<MyReferral />} />
          <Route path="support" element={<Support />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

        {/* ========== REDIRECTS ========== */}
        <Route path="/account" element={<Navigate to="/my-courses" replace />} />

        {/* ========== 404 PAGE ========== */}
        <Route path="*" element={<h1 className="text-center mt-20 text-3xl">404 | Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
