import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const newProductCreate = createAsyncThunk(
  "/crate/product",
  async (myForm) => {
    try {
      // const { myForm } = allData;
      const config = { Headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post("/api/v1/product/new", myForm, config);
      console.log('data', data)
      return data;
    } catch (error) {
      console.log('error', error)
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
      .addCase(newProductCreate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(newProductCreate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(newProductCreate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default newProductSlice;
