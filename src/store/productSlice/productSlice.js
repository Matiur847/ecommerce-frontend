import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const fetchProduct = createAsyncThunk('/products', async (data) => {
  try {
    const { keyword = '', currentPage, minValue = 0, maxValue = 2500000} = data;  
    console.log('priceSlice', minValue, maxValue)
    let link = `http://localhost:4242/api/v1/productPerPage?keyword=${keyword}&page=${currentPage}&price[gte]=${minValue}&price[lte]=${maxValue}`
    const response = await axios.get(link);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const detailsProduct = createAsyncThunk('/product', async (id) => {
  try {
    const response = await axios.get(`http://localhost:4242/api/v1/product/${id.id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  products: [],
  product: {},
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "productsss",
  initialState,
  reducers: {
    allProduct: (state, action) => {
      state.products = action.payload;
    },
    productDetails: (state, action) => {
      // const id = action.payload.id
      state.product = action.payload
    },
    paginationNumber: (state, action) => {
      const currentPage = action.payload
      console.log('paginationNumber', currentPage)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })





      .addCase(detailsProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(detailsProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(detailsProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const productActions = productSlice.actions;
export { fetchProduct };
export default productSlice;
