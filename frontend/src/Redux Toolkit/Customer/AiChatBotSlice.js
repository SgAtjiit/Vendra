import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";

const initialState = {
  response: null,
  loading: false,
  error: null,
  messages: [],
};

export const chatBot = createAsyncThunk(
  "aiChatBot/generateResponse",
  async ({ prompt, productId, userId }, { rejectWithValue }) => {
    try {
      const response = await api.post("/ai/chat", prompt, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        params: { productId, userId },
      });
      console.log("response ", productId, response.data);
      return response.data;
    } catch (error) {
      console.log("error ", error.response);
      return rejectWithValue(
        error.response?.data?.message || "Failed to generate chatbot response"
      );
    }
  }
);

const aiChatBotSlice = createSlice({
  name: "aiChatBot",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(chatBot.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(chatBot.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
        state.messages = [...state.messages, action.payload];
      })
      .addCase(chatBot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default aiChatBotSlice.reducer;
