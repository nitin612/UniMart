import { createSlice } from '@reduxjs/toolkit';
import { fetchUserProfile, toggleLikeItem } from '../thunkFunctions/thunkFunctions';

const initialState = {
  date: [],
  loading: false,
  error: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserProfile.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleLikeItem.fulfilled, (state, action) => {
        if (state.data) {
          state.data.likedItems = action.payload.likedItems;
        }
      });
  },
});

export default profileSlice.reducer;
