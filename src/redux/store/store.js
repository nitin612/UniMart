const { configureStore } = require('@reduxjs/toolkit');
import authReducer from '../slices/authSlice';
import profileReducer from '../slices/userProfileSlice';
import itemReducer from '../slices/itemsSlice';
import updateUserReducer from '../slices/updateUserSlice';
import addToCartSlice from '../slices/addToCartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    items: itemReducer,
    updateUser: updateUserReducer,
    cart: addToCartSlice,
  },
});
