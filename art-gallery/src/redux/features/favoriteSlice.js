import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    addToFavorites: (state, action) => {
      const productExists = state.some((product) => product.mal_id === action.payload.mal_id);
      if (!productExists) {
        state.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      const updatedState = state.filter((product) => product.mal_id !== action.payload.mal_id);
      return updatedState;
    },
    setFavorites: (state, action) => {
      return action.payload;
    },
  },
});

export const { addToFavorites, removeFromFavorites, setFavorites } = favoriteSlice.actions;
export const selectFavoriteProduct = (state) => state.favorites;
export default favoriteSlice.reducer;
