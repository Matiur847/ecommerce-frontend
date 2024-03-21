import React from "react";
import "../style/UpdateProductAdmin.css";
import { useParams } from "react-router-dom";

const UpdateProductAdmin = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Updata Product</h1>
    </div>
  );
};

export default UpdateProductAdmin;
