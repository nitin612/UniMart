import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/Api';

export const fetchUserProfile = createAsyncThunk(
  'fetch/fetchUser',
  async (_, thunkAPI) => {
    try {
      const response = await API.get('/api/auth/profile');
      console.log('userProfileData====>', response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (_, thunkAPI) => {
    try {
      const response = await API.get('/api/items');
      console.log('Items====>', response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  'profile/updateProfile',
  async (payload, thunkAPI) => {
    try {
      const response = await API.put('/api/auth/profile', payload);
      console.log('UpdatedUserProfile response====>', response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// export const addItemInCart = createAsyncThunk(
//   'cart/addToCart',
//   async (itemId, thunkAPI) => {
//     try {
//       const response = await API.post(`/api/cart/${itemId}`);
//       console.log('AddtoCartResponse response====>', response.data);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   },
// );
