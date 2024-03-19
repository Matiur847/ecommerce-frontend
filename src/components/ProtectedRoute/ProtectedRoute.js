import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAdmin }) => {
  const { user } = useSelector((state) => state.user);

  if (user.success === false) {
    return <Navigate to="/login" />;
  }
  if (isAdmin === true && user.user?.role === "user") {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
