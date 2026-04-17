import { createSlice } from '@reduxjs/toolkit';
import {
  followUser,
  getFollowers,
  getFollowing,
} from '../thunkFunctions/thunkFunctions';

const initialState = {
  data: null,
  followers: [],
  following: [],
  loading: false,
  error: null,
};

export const followSlice = createSlice({
  name: 'follow',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // FOLLOW USER
      .addCase(followUser.pending, state => {
        state.loading = true;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(followUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET FOLLOWERS
      .addCase(getFollowers.pending, state => {
        state.loading = true;
      })
      .addCase(getFollowers.fulfilled, (state, action) => {
        state.loading = false;
        state.followers = action.payload;
      })
      .addCase(getFollowers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET FOLLOWING
      .addCase(getFollowing.pending, state => {
        state.loading = true;
      })
      .addCase(getFollowing.fulfilled, (state, action) => {
        state.loading = false;
        state.following = action.payload;
      })
      .addCase(getFollowing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default followSlice.reducer;
