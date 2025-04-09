// src/redux/slices/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Axios config with credentials for cookie-based auth
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5112/api/cart',
  withCredentials: true
});

// 🔁 Thunks

// Fetch Cart
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get('/');
    return res.data.data.cart;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
  }
});

// Add to Cart
export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, quantity }, thunkAPI) => {
  try {
    const res = await axiosInstance.post('/add', { productId, quantity });
    return res.data.data.cart;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to add to cart');
  }
});

// Update Cart Item
export const updateCartItem = createAsyncThunk('cart/updateCartItem', async ({ coItemId, quantity }, thunkAPI) => {
  try {
    const res = await axiosInstance.put('/update', { coItemId, quantity });
    return res.data.data.cart;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update cart item');
  }
});

// Remove Cart Item
export const removeCartItem = createAsyncThunk('cart/removeCartItem', async (coItemId, thunkAPI) => {
  try {
    const res = await axiosInstance.delete(`/remove/${coItemId}`);
    return res.data.data.cart;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to remove cart item');
  }
});

// Clear Cart
export const clearCart = createAsyncThunk('cart/clearCart', async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.delete('/clear');
    return res.data.data.cart;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to clear cart');
  }
});

// 🧠 Initial State
const initialState = {
  cart: null,
  loading: false,
  error: null,
};

// ⚙️ Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCart: (state) => {
      state.cart = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add to Cart
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update Item
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Remove Item
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Clear Cart
      .addCase(clearCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
