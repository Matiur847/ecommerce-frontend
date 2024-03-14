import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

const initialState = {
  cartItem: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItem.find(
        (item) => item.id === newItem.id.id
      );
      state.totalQuantity++;

      if (!existingItem) {
        state.cartItem.push({
          id: newItem.id.id,
          name: newItem.name,
          image: newItem.image,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
      }

      state.totalAmount = state.cartItem.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),

        0
      );
    },

    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartItem.find((item) => item.id === id);
      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        state.cartItem = state.cartItem.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) - Number(existingItem.price);
      }

      state.totalAmount = state.cartItem.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
