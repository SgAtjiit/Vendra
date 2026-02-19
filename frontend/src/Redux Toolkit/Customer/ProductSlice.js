import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

const API_URL = "/products";

const initialState = {
  product: null,
  products: [],
  paginatedProducts: null,
  searchProduct: [],
  loading: false,
  error: null,
  totalPages: 1,
};

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/${productId}`);
      console.log("product details ", response.data);
      return response.data;
    } catch (error) {
      console.log("error ", error.response);
      return rejectWithValue(error.response?.data || "Failed to fetch product details");
    }
  }
);

export const searchProduct = createAsyncThunk(
  "products/searchProduct",
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/search`, { params: { query } });
      console.log("search products ", response.data);
      return response.data;
    } catch (error) {
      console.log("error ", error.response);
      return rejectWithValue(error.response?.data || "Failed to search products");
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get(API_URL, { params });
      console.log("all products ", response.data);
      return response.data;
    } catch (error) {
      console.log("error ", error.response);
      return rejectWithValue(error.response?.data || "Failed to fetch products");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch product";
      })
      .addCase(searchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.searchProduct = action.payload;
        state.loading = false;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to search products";
      })
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.paginatedProducts = action.payload;
        state.products = action.payload?.content || action.payload;
        state.totalPages = action.payload?.totalPages || 1;
        state.loading = false;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export default productSlice.reducer;

export const selectProduct = (state) => state.products.product;
export const selectProducts = (state) => state.products.products;
export const selectPaginatedProducts = (state) => state.products.paginatedProducts;
export const selectProductLoading = (state) => state.products.loading;
export const selectProductError = (state) => state.products.error;
