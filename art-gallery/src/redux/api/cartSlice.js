// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   cartItems: [],
//   totalQuantity: 0,
//   totalAmount: 0,
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addItem: (state, action) => {
//       const newItem = action.payload;
//       const existingItem = state.cartItems.find(item => item.id === newItem.id);

//       if (existingItem) {
//         existingItem.quantity += newItem.quantity;
//         existingItem.totalPrice += newItem.price * newItem.quantity;
//       } else {
//         state.cartItems.push({
//           ...newItem,
//           quantity: newItem.quantity,
//           totalPrice: newItem.price * newItem.quantity,
//         });
//       }

//       state.totalQuantity += newItem.quantity;
//       state.totalAmount += newItem.price * newItem.quantity;
//     },

//     removeItem: (state, action) => {
//       const id = action.payload;
//       const existingItem = state.cartItems.find(item => item.id === id);

//       if (existingItem) {
//         state.totalQuantity -= existingItem.quantity;
//         state.totalAmount -= existingItem.totalPrice;
//         state.cartItems = state.cartItems.filter(item => item.id !== id);
//       }
//     },

//     updateQuantity: (state, action) => {
//       const { id, quantity } = action.payload;
//       const existingItem = state.cartItems.find(item => item.id === id);

//       if (existingItem && quantity > 0) {
//         state.totalQuantity += quantity - existingItem.quantity;
//         state.totalAmount += (quantity - existingItem.quantity) * existingItem.price;
//         existingItem.quantity = quantity;
//         existingItem.totalPrice = existingItem.price * quantity;
//       }
//     },

//     clearCart: (state) => {
//       state.cartItems = [];
//       state.totalQuantity = 0;
//       state.totalAmount = 0;
//     },
//   },
// });

// export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;
