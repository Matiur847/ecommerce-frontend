import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const adminProducts = createAsyncThunk("/product", async (id) => {
  try {
    const response = await axios.get(`/api/v1/product/${id.id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  adminProducts: [],
};

const adminAllProducts = createSlice({
  name: "adminAllProducts",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(adminProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.adminProducts = action.payload;
      })
      .addCase(adminProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default adminAllProducts;
