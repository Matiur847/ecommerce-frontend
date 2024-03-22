import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUser = createAsyncThunk(
  "/getAllUserAdmin",
  async (order) => {
    try {
      // const config = { Headers: { "Content-Type": "application/json" } };
      const { data } = await axios.get("/api/v1/admin/users");
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const userDetailAdmin = createAsyncThunk(
  "/getAdminSingleUser",
  async (id) => {
    try {
      // const config = { Headers: { "Content-Type": "application/json" } };
      const { data } = await axios.get(`/api/v1/admin/user/${id.id}`);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  users: [],
  user: {},
  status: "idle",
  error: null,
};

const allUsers = createSlice({
  name: "allUserAdmin",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(userDetailAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userDetailAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(userDetailAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default allUsers;