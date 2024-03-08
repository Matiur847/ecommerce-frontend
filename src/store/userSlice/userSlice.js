import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const login = createAsyncThunk('/login', async () => {
    try {
        // all your functionality here 
    } catch (error) {
        // catech error for user 
    }
});

const initialState = {
    user: {},
    status: 'idle',
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(login.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
            state.status = 'error';
            state.error = action.error.message;
        })
    }
})

export const userActions = userSlice.actions;

export default userSlice