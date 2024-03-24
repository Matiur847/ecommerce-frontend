import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const orderDetails = createAsyncThunk(
  "/order/details",
  async (allData) => {
    try {
      const { id } = allData;
      const { data } = await axios.get(`https://ecommerce-backend-tzi7.onrender.com/api/v1/order/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  order: {},
  status: "idle",
  error: null,
};

const completeOrderDetails = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(orderDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(orderDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.order = action.payload;
      })
      .addCase(orderDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const completerOrderDetail = completeOrderDetails.actions;
export default completeOrderDetails;
