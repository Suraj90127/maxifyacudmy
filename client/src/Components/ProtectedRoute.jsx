import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  const location = useLocation();
  const redirectTo = `${location.pathname}${location.search}${location.hash}`;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user && !token) {
    // Save the attempted URL for redirect after login
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(redirectTo)}`}
        state={{ from: redirectTo }}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
