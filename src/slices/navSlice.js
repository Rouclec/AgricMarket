import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload];
    },
    removeFromCart: (state, action) => {
      const index = state.cart.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      let newCart = [...state.cart];

      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id : ${action.id} as it's not in the cart!`
        );
      }

      return { ...state, cart: newCart };
    },
  },
});

export const { addToCart, removeFromCart } = navSlice.actions;

//selectors

export const getCartItems = (state) => state.nav.cart;

export default navSlice.reducer;
