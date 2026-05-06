import { createSlice } from '@reduxjs/toolkit';
import { fetchUserProfile, toggleLikeItem, followUser } from '../thunkFunctions/thunkFunctions';

const initialState = {
  data: null,
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
      })
      .addCase(followUser.fulfilled, (state, action) => {
        if (state.data && state.data.following) {
          const { id, isFollowing } = action.payload;
          if (isFollowing) {
            if (!state.data.following.includes(id)) {
              state.data.following.push(id);
            }
          } else {
            state.data.following = state.data.following.filter(fid => fid !== id);
          }
        }
      });
  },
});

export default profileSlice.reducer;
