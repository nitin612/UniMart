import { createSlice } from '@reduxjs/toolkit';
import { updateUserProfile } from '../thunkFunctions/thunkFunctions';

const initialState = {
  date: [],
  loading: false,
  error: null,
};

export const updateUserSlice = createSlice({
  name: 'updateUser',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(updateUserProfile.pending, state => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default updateUserSlice.reducer;
