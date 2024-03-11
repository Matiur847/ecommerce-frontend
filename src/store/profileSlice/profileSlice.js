import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateProfile = createAsyncThunk(
  "/update-profile",
  async (myForm) => {
    try {
      const config = { Headers: { "content-type": "multipart/form-data" } };
      const response = await axios.put(
        "/api/v1/update/profile",
        myForm,
        config
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updatePassword = createAsyncThunk("/update-password", async (myForm) => {
  try {
    const config = { Headers: { "Content-Type": "application/json" } };
    const response = await axios.put("/api/v1/update/password", myForm, config);
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
  },
});

export const profileAction = profileSlice.actions;
export default profileSlice;
