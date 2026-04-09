// import { createSlice } from '@reduxjs/toolkit';
// import { addItemInCart } from '../thunkFunctions/thunkFunctions';

// const initialState = {
//   date: [],
//   loading: false,
//   error: null,
// };

// export const addToCartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       .addCase(addItemInCart.pending, state => {
//         state.loading = true;
//       })
//       .addCase(addItemInCart.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(addItemInCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default addToCartSlice.reducer;
