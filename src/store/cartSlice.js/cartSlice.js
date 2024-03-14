import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

// export const addToCartItems = createAsyncThunk(
//   "/add-item",
//   async (props, dispatch) => {
//     try {
//       console.log("Hello");
//       const { id, quantity } = props;
//       const { data } = await axios.get(
//         `/api/v1/product/65d9e1db0860ab3476167710`
//       );
//       // dispatch(
//       //   cartActions.addItem({
//       //     id: data.product._id,
//       //     name: data.product.name,
//       //     price: data.product.price,
//       //     image: data.product.images[0]?.url,
//       //     // stock: data.product.stock,
//       //     quantity: quantity,
//       //   })
//       // );

//       dispatch(cartActions.addItem("hello"));
//     } catch (error) {
//       throw error;
//     }
//   }
// );

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
