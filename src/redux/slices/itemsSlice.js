import { createSlice } from '@reduxjs/toolkit';
import { fetchItems, toggleLikeItem } from '../thunkFunctions/thunkFunctions';

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
        const isNextPage = action.meta.arg > 1;
        if (isNextPage) {
          state.data = {
            ...action.payload,
            items: [...(state.data?.items || []), ...action.payload.items],
          };
        } else {
          state.data = action.payload;
        }
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleLikeItem.fulfilled, (state, action) => {
        if (state.data && state.data.items) {
          state.data.items = state.data.items.map(item =>
            item._id === action.payload.itemId
              ? { ...item, likesCount: action.payload.likesCount }
              : item,
          );
        }
      });
  },
});

export default itemSlice.reducer;
