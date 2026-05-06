import { createSlice } from '@reduxjs/toolkit';
import { fetchUserDetails, followUser } from '../thunkFunctions/thunkFunctions';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserDetails.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        if (state.data && state.data._id === action.payload.id) {
          state.data.isFollowing = action.payload.isFollowing;
          state.data.followersCount += action.payload.isFollowing ? 1 : -1;
        }
      });
  },
});

export default userDetailsSlice.reducer;
