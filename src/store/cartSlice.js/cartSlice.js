import { createSlice } from "@reduxjs/toolkit";

const items =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
const totalQuantity =
  localStorage.getItem("totalQuantity") !== null
    ? JSON.parse(localStorage.getItem("totalQuantity"))
    : 0;
const totalAmount =
  localStorage.getItem("totalAmount") !== null
    ? JSON.parse(localStorage.getItem("totalAmount"))
    : 0;

const saveDataToLocalStorage = (item, totalQuantity, totalAmount) => {
  localStorage.setItem("cartItems", JSON.stringify(item));
  localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
  localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
};

const initialState = {
  cartItem: items,
  totalQuantity: totalQuantity,
  totalAmount: totalAmount,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      console.log('action', action)
      const id = action.payload.id
      const existingItem = state.cartItem.find(
        (item) => item.id === id
      );
      state.totalQuantity++;

      if (!existingItem) {
        state.cartItem.push({
          id: id,
          name: newItem.name,
          image: newItem.image,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          category: newItem.category,
          stock: newItem.stock,
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

      saveDataToLocalStorage(
        state.cartItem.map((item) => item),
        state.totalQuantity,
        state.totalAmount
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
      saveDataToLocalStorage(
        state.cartItem.map((item) => item),
        state.totalQuantity,
        state.totalAmount
      );
    },

    deleteItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartItem.find((item) => item.id === id);

      if (existingItem) {
        state.cartItem = state.cartItem.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }
      state.totalAmount = state.cartItem.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
      saveDataToLocalStorage(
        state.cartItem.map((item) => item),
        state.totalQuantity,
        state.totalAmount
      );
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
