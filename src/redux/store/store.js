const { configureStore } = require('@reduxjs/toolkit');
import authReducer from '../slices/authSlice';
import profileReducer from '../slices/userProfileSlice';
import itemReducer from '../slices/itemsSlice';
import updateUserReducer from '../slices/updateUserSlice';
import userDetailsSlice from '../slices/userDetailsSlice';
import followReducer from '../slices/followSlice';
import cartReducer from '../slices/cartSlice';
import chatReducer from '../slices/chatsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    items: itemReducer,
    updateUser: updateUserReducer,
    userDetails: userDetailsSlice,
    follow: followReducer,
    cart: cartReducer,
    chat: chatReducer,
  },
});
