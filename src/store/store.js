import { configureStore } from "@reduxjs/toolkit";
import productSlice, { fetchProduct } from "./productSlice/productSlice";

const store = configureStore({
  reducer: {
    product: productSlice.reducer,
  },
});

export { fetchProduct };

export default store;
