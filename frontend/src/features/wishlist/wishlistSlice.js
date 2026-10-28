import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api.js';

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetch',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get('/wishlist');
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const toggleWishlist = createAsyncThunk(
  'wishlist/toggle',
  async ({ productId, isWished }, thunkAPI) => {
    try {
      const { data } = isWished
        ? await api.delete(`/wishlist/${productId}`)
        : await api.post(`/wishlist/${productId}`);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetWishlist: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const { resetWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
