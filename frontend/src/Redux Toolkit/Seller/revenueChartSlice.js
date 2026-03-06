import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../Config/Api';

const API_BASE_URL = '/api/seller/revenue/chart';

const initialState = {
  chart: [],
  loading: false,
  error: null,
};

export const fetchRevenueChart = createAsyncThunk(
  'revenue/fetchRevenueChart',
  async ({ type, jwt }, { rejectWithValue }) => {
    console.log("type ---- ", type);
    try {
      const response = await api.get(API_BASE_URL, { params });
      console.log("revenue chart data", response.data);
      return response.data;
    } catch (error) {
      console.log("error ", error.response);
      return rejectWithValue(error.response?.data || 'Failed to fetch daily revenue');
    }
  }
);

const revenueSlice = createSlice({
  name: 'revenue',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
.addCase(fetchRevenueChart.fulfilled, (state, action) => {
        state.loading = false;
        state.chart = action.payload;
      })
      .addCase(fetchRevenueChart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default revenueSlice.reducer;
