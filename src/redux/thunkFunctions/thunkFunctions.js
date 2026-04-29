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

export const fetchUserDetails = createAsyncThunk(
  'user/fetchUser',
  async (id, thunkAPI) => {
    try {
      const response = await API.get(`/api/users/${id}`);
      console.log('userDetails====>', response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const followUser = createAsyncThunk(
  'follow/followUser',
  async (id, thunkAPI) => {
    try {
      const response = await API.post(`/api/users/follow/${id}`);
      console.log('follow user API response====>', response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const getFollowers = createAsyncThunk(
  'follower/followerUser',
  async (id, thunkAPI) => {
    try {
      const response = await API.get(`/api/users/${id}/followers`);
      console.log('followers API response====>', response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const getFollowing = createAsyncThunk(
  'following/followingUser',
  async (id, thunkAPI) => {
    try {
      const response = await API.get(`/api/users/${id}/following`);
      console.log('following API response====>', response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const getCart = createAsyncThunk(
  'cart/userCart',
  async (_, thunkAPI) => {
    try {
      const response = await API.get(`/api/cart`);
      console.log('Cart API response====>', response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const deleteCartItem = createAsyncThunk(
  'cart/deleteCartItem',
  async (itemId, thunkAPI) => {
    try {
      const response = await API.delete(`/api/cart/${itemId}`);
      console.log('item removed from Cart API response====>', response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const clearUserCart = createAsyncThunk(
  'cart/clearUserCart',
  async (_, thunkAPI) => {
    try {
      const response = await API.delete(`/api/cart`);
      console.log('All Cart removed  API response====>', response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getChats = createAsyncThunk(
  'chats/userChats',
  async (_, thunkAPI) => {
    try {
      const response = await API.get(`/api/chats`);
      console.log('Chat API response====>', response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
