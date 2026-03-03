import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../Config/Api';

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

export const fetchSellerOrders = createAsyncThunk(
  'sellerOrders/fetchSellerOrders',
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get('/seller/orders', {
        headers: { Authorization: `Bearer ${jwt || localStorage.getItem("jwt")}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch seller orders");
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'sellerOrders/updateOrderStatus',
  async ({ orderId, orderStatus, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/seller/orders/${orderId}/status/${orderStatus}`,
        null,
        {
          headers: { Authorization: `Bearer ${jwt || localStorage.getItem("jwt")}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update order status");
    }
  }
);

export const deleteOrder = createAsyncThunk(
  'sellerOrders/deleteOrder',
  async ({ orderId, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/seller/orders/${orderId}/delete`, {
        headers: { Authorization: `Bearer ${jwt || localStorage.getItem("jwt")}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete order");
    }
  }
);

const sellerOrderSlice = createSlice({
  name: 'sellerOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchSellerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(order => order.id !== action.meta.arg.orderId);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sellerOrderSlice.reducer;
