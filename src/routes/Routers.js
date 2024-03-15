import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import Products from "../pages/Products";
import LoginRegister from "../pages/LoginRegister";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import ProfileUpdate from "../pages/ProfileUpdate";
import UpdatePassword from "../pages/UpdatePassword";
import ForgotPassword from "../pages/ForgotPassword";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import ResetPassword from "../pages/ResetPassword";
import Shipping from "../pages/Shipping";
// import { useSelector } from "react-redux";

const Routers = () => {
  // const { user } = useSelector((state) => state.user);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:keyword" element={<Products />} />
      <Route path="/login" element={<LoginRegister />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/update" element={<ProfileUpdate />} />
      <Route path="/password/forgot" element={<ForgotPassword />} />
      <Route path="/password/reset/:token" element={<ResetPassword />} />


      {/* Protected Route */}
      <Route
        path="/change-password"
        element={
          <ProtectedRoute isAdmin={true}>
            <UpdatePassword />
          </ProtectedRoute>
        }
      />
      <Route
        path="/shipping"
        element={
          <ProtectedRoute isAdmin={true}>
            <Shipping />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routers;
