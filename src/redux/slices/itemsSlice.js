import { createSlice } from '@reduxjs/toolkit';
import { fetchItems } from '../thunkFunctions/thunkFunctions';

const initialState = {
  date: [],
  loading: false,
  error: null,
};

export const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchItems.pending, state => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default itemSlice.reducer;
