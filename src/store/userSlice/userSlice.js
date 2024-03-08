import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("/login", async (data) => {
  try {
    const {loginEmail, loginPassword} = data
    const config = { Headers: { "Content-Type": "application/json" } };
    const response = await axios.post("http://localhost:4242/api/v1/login", {email: loginEmail, password: loginPassword}, config);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const register = createAsyncThunk('/register', async () => {
  try {
    
  } catch (error) {
    throw error
  }
})

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
        state.status = "error";
        state.error = action.error.message;
      })

      // .addCase()
  },
});

export const userActions = userSlice.actions;

export default userSlice;
