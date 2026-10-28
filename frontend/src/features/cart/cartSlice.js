import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api.js';

export const fetchCart = createAsyncThunk('cart/fetch', async (_, thunkAPI) => {
  try {
    const { data } = await api.get('/cart');
    return data.items || [];
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const addItem = createAsyncThunk(
  'cart/add',
  async (payload, thunkAPI) => {
    try {
      const { data } = await api.post('/cart', payload);
      return data.items || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const updateItem = createAsyncThunk(
  'cart/update',
  async ({ itemId, quantity }, thunkAPI) => {
    try {
      const { data } = await api.put(`/cart/${itemId}`, { quantity });
      return data.items || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const removeItem = createAsyncThunk(
  'cart/remove',
  async (itemId, thunkAPI) => {
    try {
      const { data } = await api.delete(`/cart/${itemId}`);
      return data.items || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const clearCartThunk = createAsyncThunk(
  'cart/clear',
  async (_, thunkAPI) => {
    try {
      await api.delete('/cart');
      return [];
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    const setItems = (state, action) => {
      state.loading = false;
      state.items = action.payload;
    };
    builder
      .addCase(fetchCart.fulfilled, setItems)
      .addCase(addItem.fulfilled, setItems)
      .addCase(updateItem.fulfilled, setItems)
      .addCase(removeItem.fulfilled, setItems)
      .addCase(clearCartThunk.fulfilled, setItems);
  },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
