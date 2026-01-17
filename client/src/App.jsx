import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

/* ================== PUBLIC PAGES ================== */
import Home from "./Pages/Home/Home";
import Courses from "./Pages/Courses/Courses";
import CourseInfo from "./Pages/Courses/CourseInfo";
import CoursesContent from "./Pages/Courses/CoursesContent";

import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import ForgetPassword from "./Pages/Auth/ForgotPassword";
import VerifyAndReset from "./Pages/Auth/VerifyAndReset";
import Contact from "./Pages/Auth/Contact";

import Blogs from "./Pages/Blog/Blogs";
import BlogDetail from "./Pages/Blog/BlogDetail";
import DigitalProducts from "./Pages/Blog/DigitalProducts";
import PdfReader from "./Pages/Blog/PdfReader";
import ProductPDF from "./Pages/Blog/ProductPDF";

import CategoryCourses from "./Pages/Home/CategoryCourses";

/* ================== STATIC PAGES ================== */
import About from "./Pages/About";
import FAQ from "./Pages/FAQ";
import ShippingPolicy from "./Pages/ShippingPolicy";
import RefundPolicy from "./Pages/RefundPolicy";
import TermsConditions from "./Pages/TermsConditions";
import PrivacyPolicy from "./Pages/PrivacyPolicy";

/* ================== USER PANEL ================== */
import Dashboard from "./Pages/profile/Dashboard";
import Profile from "./Pages/profile/Profile";
import MyCourse from "./Pages/profile/MyCourse";
import PaymentHistory from "./Pages/profile/PaymentHistory";
import { MyReferral } from "./Pages/profile/MyReferral";
import Support from "./Pages/profile/Support";
import ChangePassword from "./Pages/profile/ChangePassword";

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
