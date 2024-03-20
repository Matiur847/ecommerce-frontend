import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminProductList from "../../pages/AdminProductList";

const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/admin/products" element={<AdminProductList />} />
    </Routes>
  );
};

export default AdminRoute;
