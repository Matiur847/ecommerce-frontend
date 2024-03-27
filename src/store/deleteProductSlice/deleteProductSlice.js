import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteProduct = createAsyncThunk("/delete-product", async (id) => {
  try {
    const response = await axios.delete(`/api/v1/product/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  isDelete: {},
  status: "idle",
  error: null,
};

const adminDeleteProduct = createSlice({
  name: "deleteProduct",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isDelete = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default adminDeleteProduct;
