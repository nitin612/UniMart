import { createSlice } from '@reduxjs/toolkit';
import {
  getCart,
  deleteCartItem,
  clearUserCart,
} from '../thunkFunctions/thunkFunctions';

const initialState = {
  data: null,
  singleCartItem: [],
  clearCartItem: [],
  getCartloading: false,
  getCartItemloading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Get User Cart
      .addCase(getCart.pending, state => {
        state.getCartloading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.getCartloading = false;
        state.data = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.getCartloading = false;
        state.error = action.payload;
      })

      // Delete item from user Cart
      .addCase(deleteCartItem.pending, state => {
        state.getCartItemloading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.getCartItemloading = false;
        state.singleCartItem = action.payload;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.getCartItemloading = false;
        state.error = action.payload;
      })

      // Clear all items from user Cart
      .addCase(clearUserCart.pending, state => {
        state.getCartloading = true;
      })
      .addCase(clearUserCart.fulfilled, (state, action) => {
        state.getCartloading = false;
        state.data = null;
      })
      .addCase(clearUserCart.rejected, (state, action) => {
        state.getCartloading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
