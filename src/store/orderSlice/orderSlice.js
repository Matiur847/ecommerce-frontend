import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk("create/order", async (order) => {
  try {
    const config = { Headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post("/api/v1/order/new", order, config);
    return data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  status: "idle",
  error: null,
};

const newOrder = createSlice({
  name: "order",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log('action.payload', action.payload)
        state = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const orderAction = newOrder.actions;
export default newOrder;
