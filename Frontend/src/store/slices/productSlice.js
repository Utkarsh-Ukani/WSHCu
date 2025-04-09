import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5112/api/admin';

// Async thunks
export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  const res = await axios.get(`${BASE_URL}/get-products`);
  return res.data.products;
});

export const fetchProductById = createAsyncThunk('products/fetchById', async (id) => {
  const res = await axios.get(`${BASE_URL}/get-product/${id}`);
  return res.data.product;
});

export const addProduct = createAsyncThunk('products/add', async (productData) => {
  const res = await axios.post(`${BASE_URL}/add-product`, productData);
  return res.data.product;
});

export const addMultipleProducts = createAsyncThunk('products/addMultiple', async (products) => {
  const res = await axios.post(`${BASE_URL}/add-multiple-products`, products);
  return res.data.products;
});

export const updateProduct = createAsyncThunk('products/update', async ({ id, updateData }) => {
  const res = await axios.put(`${BASE_URL}/update-product/${id}`, updateData);
  return res.data.product;
});

export const deleteProduct = createAsyncThunk('products/delete', async (id) => {
  await axios.delete(`${BASE_URL}/delete-product/${id}`);
  return id;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    product: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedProduct: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // fetch by ID
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.product = action.payload;
      })

      // add product
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })

      // add multiple products
      .addCase(addMultipleProducts.fulfilled, (state, action) => {
        state.products = [...state.products, ...action.payload];
      })

      // update product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.products.findIndex((p) => p._id === updated._id);
        if (index !== -1) state.products[index] = updated;
      })

      // delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p._id !== action.payload);
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
