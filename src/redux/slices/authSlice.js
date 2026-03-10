import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isUserValid: false,
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.token = action.payload;
      state.isUserValid = true;
    },
    logOut: state => {
      state.token = null;
      state.isUserValid = false;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
