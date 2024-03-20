import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice/productSlice";
import userSlice from "./userSlice/userSlice";
import profileSlice from "./profileSlice/profileSlice";
import cartSlice from "./cartSlice.js/cartSlice";
import newOrder from "./orderSlice/orderSlice";
import myOrder from "./myOrders/myOrders";
import completeOrderDetails from "./orderDetailsSlice/orderDetailsSlice";
import adminAllProducts from "./adminProducts/adminProductSlice";
import newProductSlice from "./createProductAdmin/createProductAdminSlice";

const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    user: userSlice.reducer,
    profile: profileSlice.reducer,
    cart: cartSlice.reducer,
    newOrder: newOrder.reducer,
    myOrders: myOrder.reducer,
    orderDetails: completeOrderDetails.reducer,
    adminAllProduct: adminAllProducts.reducer,
    createProduct: newProductSlice.reducer,
  },
});

export default store;
