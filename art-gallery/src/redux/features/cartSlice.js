import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../Utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { user, rating, numReviews, reviews, ...item } = action.payload;
      const existItem = state.cartItems.find((x) => x.mal_id === item.mal_id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.mal_id === existItem.mal_id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x.mal_id !== action.payload);
      return updateCart(state);
    },

    updateQuantity: (state, action) => {
      const { mal_id, quantity } = action.payload;
      const item = state.cartItems.find((x) => x.mal_id === mal_id);

      if (item) {
        item.quantity = Math.max(1, quantity); // Ensure quantity is at least 1
      }
      return updateCart(state);
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },

    clearCartItems: (state) => {
      state.cartItems = [];
      return updateCart(state);
    },

    resetCart: (state) => {
      state.cartItems = [];
      state.shippingAddress = {};
      state.paymentMethod = "PayPal";
      localStorage.removeItem("cart");
      return state;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  savePaymentMethod,
  saveShippingAddress,
  clearCartItems,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
