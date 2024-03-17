import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const orders = createAsyncThunk("/myOrders", async (order) => {
  try {
    const { data } = await axios.get("/api/v1/my/orders");
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
      .addCase(orders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(orders.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("action.payload", action.payload);
        state.orders = action.payload;
      })
      .addCase(orders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const orderAction = myOrder.actions;
export default myOrder;
