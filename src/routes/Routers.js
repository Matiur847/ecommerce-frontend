import React, { useEffect, useState } from "react";
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
import OrderConfirm from "../pages/OrderConfirm";
import ProceedToPayment from "../pages/ProceedToPayment";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Success from "../pages/Success";

// import { useSelector } from "react-redux";

const Routers = () => {
  // const { user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeApiKey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    getStripeApiKey();
  }, []);

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
          <ProtectedRoute>
            <Shipping />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order/confirm"
        element={
          <ProtectedRoute>
            <OrderConfirm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/proceed/payment"
        element={
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute>
              <ProceedToPayment />
            </ProtectedRoute>
          </Elements>
        }
      />
      <Route
        path="/success"
        element={
          <ProtectedRoute>
            <Success />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routers;
