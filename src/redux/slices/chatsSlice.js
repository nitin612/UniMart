import { createSlice } from '@reduxjs/toolkit';
import { getChats } from '../thunkFunctions/thunkFunctions';

const initialState = {
  date: [],
  loading: false,
  error: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getChats.pending, state => {
        state.loading = true;
      })
      .addCase(getChats.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default chatSlice.reducer;
