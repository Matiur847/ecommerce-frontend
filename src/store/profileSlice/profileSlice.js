import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateProfile = createAsyncThunk(
  "/update-profile",
  async (myForm) => {
    try {
      const config = { Headers: { "content-type": "multipart/form-data" } };
      const response = await axios.put(
        "https://ecommerce-backend-tzi7.onrender.com/api/v1/update/profile",
        myForm,
        config
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updatePassword = createAsyncThunk(
  "/update-password",
  async (myForm) => {
    try {
      const config = { Headers: { "Content-Type": "application/json" } };
      const response = await axios.put(
        "https://ecommerce-backend-tzi7.onrender.com/api/v1/update/password",
        myForm,
        config
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "/forgot-password",
  async (myForm) => {
    try {
      const config = { Headers: { "Content-Type": "application/json" } };
      const response = await axios.post(
        "https://ecommerce-backend-tzi7.onrender.com/api/v1/forgot/password",
        myForm,
        config
      );
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const resetPassword = createAsyncThunk(
  "/reset-pwd",
  async (data) => {
    try {
      const { myForm, token } = data;
      console.log("Token", data);
      const config = { Headers: { "Content-Type": "application/json" } };

      const response = await axios.put(
        `https://ecommerce-backend-tzi7.onrender.com/api/v1/forgot/password/${token}`,
        myForm,
        config
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

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
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(updatePassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(forgotPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("forgotActions", action);
        state.profile = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(resetPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const profileAction = profileSlice.actions;
export default profileSlice;
