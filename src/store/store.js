import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice/productSlice";
import userSlice from "./userSlice/userSlice";
import profileSlice from "./profileSlice/profileSlice";
import cartSlice from "./cartSlice.js/cartSlice";

const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    user: userSlice.reducer,
    profile: profileSlice.reducer,
    cart: cartSlice.reducer
  },
});

export default store;
