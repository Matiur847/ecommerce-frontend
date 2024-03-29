import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("/login", async (data) => {
  try {
    const { loginEmail, loginPassword } = data;
    const config = {
      Headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
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
    const config = {
      Headers: { "content-type": "multipart/form-data" },
      withCredentials: true,
    };
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
    const config = {
      Headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const response = await axios.get(
      "/api/v1/user/details",
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const loggedOut = createAsyncThunk("/user-logout", async (data) => {
  try {
    const response = await axios.get("/api/v1/logout");
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
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.status = "failed";
        state.user = action.error.message;
      })

      .addCase(loggedOut.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loggedOut.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loggedOut.rejected, (state, action) => {
        state.status = "failed";
        state.user = action.error.message;
      });
  },
});

export const userActions = userSlice.actions;

export default userSlice;
