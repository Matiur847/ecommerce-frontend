import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allOrders } from "../store/myOrders/myOrders";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(allOrders());
  }, [dispatch]);

  return (
    <div>
      <h1>My Orders</h1>
    </div>
  );
};

export default MyOrders;
