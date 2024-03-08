import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice/productSlice";
import userSlice from "./userSlice/userSlice";

const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
