import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const adminOrderList = createAsyncThunk(
  "/admin/order-list",
  async () => {
    try {
      //   const config = { Headers: { "Content-Type": "application/json" } };
      const { data } = await axios.get("/api/v1/admin/orders");
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const adminUpdateOrder = createAsyncThunk(
  "/admin/update-order",
  async (allData) => {
    try {
      const { id } = allData;
      //   const config = { Headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(`/api/v1//admin/order/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const adminDeletOrder = createAsyncThunk(
  "/admin/delete-order",
  async (id) => {
    try {
      //   const config = { Headers: { "Content-Type": "application/json" } };
      const { data } = await axios.delete(`/api/v1/admin/order/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  adminOrders: [],
  adminDeleteOrder: [],
  status: "idle",
  error: null,
};

const adminOrders = createSlice({
  name: "adminOrders",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(adminOrderList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(adminOrderList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.adminOrders = action.payload;
      })
      .addCase(adminOrderList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(adminUpdateOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(adminUpdateOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state = action.payload;
      })
      .addCase(adminUpdateOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(adminDeletOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(adminDeletOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.adminDeleteOrder = action.payload;
      })
      .addCase(adminDeletOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default adminOrders;
