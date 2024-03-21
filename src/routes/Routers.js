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
import MyOrders from "../pages/MyOrders";
import CompleteOrderDetails from "../pages/CompleteOrderDetails";
import Dashboard from "../pages/Dashboard";
import AdminProductList from "../pages/AdminProductList";
import CreateProductAdmin from "../pages/CreateProductAdmin";
import UpdateProductAdmin from "../pages/UpdateProductAdmin";
import AdminOrdersList from "../pages/AdminOrdersList";
// import AdminProductList from "../pages/AdminProductList";
// import { useSelector } from "react-redux";

const Routers = () => {
  // const { user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState(null);

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
          <ProtectedRoute>
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

      {stripeApiKey && (
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
      )}
      <Route
        path="/success"
        element={
          <ProtectedRoute>
            <Success />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order/:id"
        element={
          <ProtectedRoute>
            <CompleteOrderDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <ProtectedRoute isAdmin={true}>
            <AdminProductList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/create"
        element={
          <ProtectedRoute isAdmin={true}>
            <CreateProductAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/product/:id"
        element={
          <ProtectedRoute isAdmin={true}>
            <UpdateProductAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute isAdmin={true}>
            <AdminOrdersList />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routers;
