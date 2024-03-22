import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk(
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

export const userUpdateAdmin = createAsyncThunk(
  "/adminUpdateUser",
  async (allData) => {
    try {
      const { id, myForm } = allData;
      const config = { Headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        `/api/v1/admin/update/user/role/${id.id}`,
        myForm,
        config
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const userDeleteAdmin = createAsyncThunk(
  "/adminDeleteUser",
  async (allData) => {
    try {
      const { id, myForm } = allData;
      const config = { Headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        `/api/v1/admin/update/user/role/${id.id}`,
        myForm,
        config
      );
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
      .addCase(getAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
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
      })

      .addCase(userUpdateAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userUpdateAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userUpdate = action.payload;
      })
      .addCase(userUpdateAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(userDeleteAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userDeleteAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userDelete = action.payload;
      })
      .addCase(userDeleteAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default allUsers;
