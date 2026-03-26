const { configureStore } = require('@reduxjs/toolkit');
import authReducer from '../slices/authSlice';
import profileReducer from '../slices/userProfileSlice';
import itemReducer from '../slices/itemsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    items: itemReducer,
  },
});
