import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createProduct = createAsyncThunk(
  "/user-detail",
  async (allData) => {
    try {
      const { product } = allData;
      const config = { Headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post("/api/v1/product/new", product, config);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  product: {},
  status: "idle",
  error: null,
};

const newProductSlice = createSlice({
  name: "createProductAdmin",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default newProductSlice;
