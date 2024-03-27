import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateProduct = createAsyncThunk(
  "/update/product",
  async (allData) => {
    try {
      const { id, myForm } = allData;
      const config = { Headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        `/api/v1/product/${id.id}`,
        myForm,
        config
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  isUpdateProduct: {},
  status: "idle",
  error: null,
};

const productUpdate = createSlice({
  name: "updateProduct",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isUpdateProduct = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productUpdate;
