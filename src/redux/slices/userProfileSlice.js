import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

const initialState = {
  date: [],
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
      });
  },
});

export default profileSlice.reducer;
