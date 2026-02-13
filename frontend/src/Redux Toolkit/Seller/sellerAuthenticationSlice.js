import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../Config/Api';
import axios from 'axios';

const initialState = {
    otpSent: false,
    error: null,
    loading: false,
    jwt: null,
    sellerCreated: ""
};

const API_URL = '/sellers';

export const sendLoginOtp = createAsyncThunk('otp/sendLoginOtp', async (email, { rejectWithValue }) => {
    try {
        const { data } = await api.post('/sellers/sent/login-top', { email });
        console.log("otp sent - ", email, data);
        return { email };
    } catch (error) {
        console.log("error", error);
        return rejectWithValue(error.response?.data?.message || 'Failed to send OTP');
    }
});

export const verifyLoginOtp = createAsyncThunk('otp/verifyLoginOtp', 
    async (data, { rejectWithValue }) => {
    try {
        const response = await api.post('/sellers/verify/login-top', data);
        console.log("login seller success - ", response.data);
        localStorage.setItem("jwt", response.data.jwt);
        if (data.navigate) data.navigate("/seller");
        return response.data;
    } catch (error) {
        console.log("error", error.response?.data);
        return rejectWithValue(error.response?.data?.message || 'Failed to verify OTP');
    }
});

export const createSeller = createAsyncThunk(
    'sellers/createSeller',
    async (seller, { rejectWithValue }) => {
        try {
            const response = await api.post(API_URL, seller);
            console.log('create seller', response.data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Create seller error response data:', error.response.data);
                return rejectWithValue(error.message);
            } else {
                console.error('Create seller error message:', error.message);
                return rejectWithValue('Failed to create seller');
            }
        }
    }
);

const sellerAuthSlice = createSlice({
    name: 'sellerAuth',
    initialState,
    reducers: {},
  extraReducers: (builder) => {
    builder
.addCase(sendLoginOtp.fulfilled, (state) => {
                state.loading = false;
                state.otpSent = true;
                state.error = null;
            })
            .addCase(sendLoginOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(verifyLoginOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyLoginOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.jwt = action.payload.jwt;
                state.error = null;
            })
            .addCase(verifyLoginOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createSeller.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSeller.fulfilled, (state) => {
                state.sellerCreated = "verification email sent to you";
                state.loading = false;
            })
            .addCase(createSeller.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to create seller';
            });
    },
});

export const { resetSellerAuthState } = sellerAuthSlice.actions;
export default sellerAuthSlice.reducer;
