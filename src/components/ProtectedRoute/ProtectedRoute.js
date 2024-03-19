import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children, isAdmin }) => {
  const { user } = useSelector((state) => state.user);
  let location = useLocation();

  if(isAdmin === true && user.user?.role !== "admini") {
    toast.warning('You Are Not ADMIN', {
      position: 'top-right',
      autoClose: 2000
    })
  }

  if (user.success === false) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else if (isAdmin === true && user.user?.role !== "admin") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
