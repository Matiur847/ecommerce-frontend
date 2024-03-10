import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("/login", async (data) => {
  try {
    console.log(
      
    )
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

export const register = createAsyncThunk("/register", async (myForm) => {
  try {
    const config = { Headers: { "content-type": "multipart/form-data" } };
    const response = await axios.post(
      "/api/v1/register",
      myForm,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const getUserDetails = createAsyncThunk("/user-detail", async () => {
  try {
    const response = await axios.get(
      "/api/v1/user/details"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  user: {},
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.user = action.error.message;
      })

      .addCase(getUserDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        console.log('action', action)
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.status = "failed";
        state.user = action.error.message;
      });
  },
});

export const userActions = userSlice.actions;

export default userSlice;
