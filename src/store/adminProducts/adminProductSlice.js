import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAdminProducts = createAsyncThunk(
  "/admin/products",
  async () => {
    try {
      const { data } = await axios.get("https://ecommerce-backend-1-pcvn.onrender.com/api/v1/admin/all/products");
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  adminProducts: [],
  status: "idle",
  error: null,
};

const adminAllProducts = createSlice({
  name: "adminAllProducts",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAdminProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.adminProducts = action.payload;
      })
      .addCase(getAdminProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const adminAllProductSlice = adminAllProducts.actions;
export default adminAllProducts;
