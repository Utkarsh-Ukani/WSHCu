import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5112/api/admin'; // Adjust if needed

// --- Thunks ---
// Add Category
export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/add-category`, categoryData, { withCredentials: true });
      return response.data.category;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Get All Categories
export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/get-categories`);
      return response.data.categories;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Get Category by ID
export const getCategoryById = createAsyncThunk(
  'categories/getCategoryById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/get-category/${id}`);
      return response.data.category;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Update Category
export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/update-category/${id}`, updatedData, { withCredentials: true });
      return response.data.category;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Delete Category
export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/delete-category/${id}`, { withCredentials: true });
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// --- Initial State ---
const initialState = {
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,
  successMessage: null,
};

// --- Slice ---
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Category
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
        state.successMessage = 'Category added successfully';
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Categories
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Category by ID
      .addCase(getCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCategory = action.payload;
      })
      .addCase(getCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Category
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.map((cat) =>
          cat._id === action.payload._id ? action.payload : cat
        );
        state.successMessage = 'Category updated successfully';
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Category
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter((cat) => cat._id !== action.payload);
        state.successMessage = 'Category deleted successfully';
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages, clearSelectedCategory } = categorySlice.actions;

export default categorySlice.reducer;
