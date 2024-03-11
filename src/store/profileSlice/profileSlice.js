import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateProfile = createAsyncThunk("/login", async (data) => {
    try {
      console.log();
      const { loginEmail, loginPassword } = data;
      const config = { Headers: { "Content-Type": "application/json" } };
      const response = await axios.post(
        "/api/v1/login",
        { email: loginEmail, password: loginPassword },
        config
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  });

const initialState = {
    profile: {},
    status: "idle",
    error: null,
  };

const profileSlice = createSlice({
    name: "profile",
    initialState,
  
    reducers: {},
  
    extraReducers: (builder) => {
      builder
        .addCase(updateProfile.pending, (state) => {
          state.status = "loading";
        })
        .addCase(updateProfile.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.user = action.payload;
        })
        .addCase(updateProfile.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })
    },
  });

export const profileAction = profileSlice.actions
export default profileSlice