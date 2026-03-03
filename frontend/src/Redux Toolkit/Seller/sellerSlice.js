import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";

const initialState = {
  sellers: [],
  selectedSeller: null,
  loading: false,
  error: null,
  profile: null,
  report: null,
  profileUpdated: false,
};

const API_URL = "/sellers";

export const fetchSellerProfile = createAsyncThunk(
  "sellers/fetchSellerProfile",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${jwt || localStorage.getItem("jwt")}` },
      });
      console.log("fetch seller profile", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch seller profile");
    }
  }
);

export const fetchSellers = createAsyncThunk(
  "sellers/fetchSellers",
  async (status, { rejectWithValue }) => {
    try {
      const response = await api.get(API_URL, {
        params: { status },
      });
      console.log("fetch sellers", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch sellers");
    }
  }
);

export const fetchSellerById = createAsyncThunk(
  "sellers/fetchSellerById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch seller");
    }
  }
);

export const updateSeller = createAsyncThunk(
  "sellers/updateSeller",
  async (seller, { rejectWithValue }) => {
    console.log("seller update request ", seller);
    try {
      const response = await api.patch(API_URL, seller, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });
      console.log("update seller profile: ", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update seller");
    }
  }
);

export const updateSellerAccountStatus = createAsyncThunk(
  "sellers/updateSellerAccountStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/seller/${id}/status/${status}`);
      console.log("update seller status: ", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update seller status");
    }
  }
);

export const verifySellerEmail = createAsyncThunk(
  "sellers/verifySellerEmail",
  async ({ otp, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${API_URL}/verify/${otp}`);
      if (navigate) navigate("/seller-account-verified");
      console.log("verify seller email ", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to verify seller email");
    }
  }
);

export const deleteSeller = createAsyncThunk(
  "sellers/deleteSeller",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete seller");
    }
  }
);

export const fetchSellerReport = createAsyncThunk(
  "sellers/fetchSellerReport",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/report`, {
        headers: { Authorization: `Bearer ${jwt || localStorage.getItem("jwt")}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch seller report");
    }
  }
);

const sellerSlice = createSlice({
  name: "sellers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.profileUpdated = false;
      })
      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch sellers";
      })
      .addCase(fetchSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellers.fulfilled, (state, action) => {
        state.sellers = action.payload;
        state.loading = false;
      })
      .addCase(fetchSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch sellers";
      })
      .addCase(fetchSellerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerById.fulfilled, (state, action) => {
        state.selectedSeller = action.payload;
        state.loading = false;
      })
      .addCase(fetchSellerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch seller";
      })
      .addCase(updateSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.profileUpdated = false;
      })
      .addCase(updateSeller.fulfilled, (state, action) => {
        const index = state.sellers.findIndex(
          (seller) => seller.id === action.payload.id
        );
        if (index !== -1) {
          state.sellers[index] = action.payload;
        }
        state.profile = action.payload;
        state.loading = false;
        state.profileUpdated = true;
      })
      .addCase(updateSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update seller";
      })
      .addCase(updateSellerAccountStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSellerAccountStatus.fulfilled, (state, action) => {
        const index = state.sellers.findIndex(
          (seller) => seller.id === action.payload.id
        );
        if (index !== -1) {
          state.sellers[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateSellerAccountStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update seller";
      })
      .addCase(deleteSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSeller.fulfilled, (state, action) => {
        state.sellers = state.sellers.filter(
          (seller) => seller.id !== action.meta.arg
        );
        state.loading = false;
      })
      .addCase(deleteSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete seller";
      })
      .addCase(fetchSellerReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload;
      })
      .addCase(fetchSellerReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sellerSlice.reducer;

export const selectSellers = (state) => state.sellers.sellers;
export const selectSelectedSeller = (state) => state.sellers.selectedSeller;
export const selectSellerLoading = (state) => state.sellers.loading;
export const selectSellerError = (state) => state.sellers.error;
