import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const allOrders = createAsyncThunk("/myOrders", async (order) => {
  try {
    const { data } = await axios.get("https://ecommerce-backend-tzi7.onrender.com/api/v1/my/orders");
    return data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  orders: [],
  status: "idle",
  error: null,
};

const myOrder = createSlice({
  name: "orders",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(allOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(allOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(allOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const orderAction = myOrder.actions;
export default myOrder;
