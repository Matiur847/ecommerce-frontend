import React, { useEffect } from "react";
import "../style/CompleteOrderDetails.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { orderDetails } from "../store/orderDetailsSlice/orderDetailsSlice";

const CompleteOrderDetails = () => {
  const dispatch = useDispatch();
  const { order, status, error } = useSelector((state) => state.orderDetails);
  console.log(order)
  const id = useParams();

  useEffect(() => {
    dispatch(orderDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      <h1>Order details</h1>
    </div>
  );
};

export default CompleteOrderDetails;
