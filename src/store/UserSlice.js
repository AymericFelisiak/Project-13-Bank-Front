import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * Call to the API when user wants to log
 * Will return a JWT (Json Web Token) if credentials are correct and if not, different errors (see the API doc)
 */

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userCredentials) => {
        const request = await axios.post(
            'http://localhost:3001/api/v1/user/Login',
            userCredentials
        );
        const response = await request.data;
        return response;
    }
);

/**
 * Call to the API when the user log is successful
 * Returns the user data
 */

export const fetchUserProfile = createAsyncThunk(
    'user/fetchUserProfile',
    async (token) => {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.post(
            'http://localhost:3001/api/v1/user/profile',
            null,
            config
        );
        const data = await response.data;
        return data;
    }
);

/**
 * Call to the API when the user updates their first/last name
 * Returns the new data
 */

export const updateUserProfile = createAsyncThunk(
    'user/updateUserProfile',
    async ({ token, user }) => {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.put(
            'http://localhost:3001/api/v1/user/profile',
            user,
            config
        );
        const data = await response.data;
        return data;
    }
);

/**
 * Slice containing all the reducers
 * Temporary using localStorage to keep user token, it avoids the user the need to relog if they refresh the page
 */

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        email: '',
        password: '',
        token: null,
        loading: false,
        error: null
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem('jwtToken');
            state.loading = false;
            state.user = null;
            state.token = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                localStorage.setItem('jwtToken', action.payload.body.token);
                state.loading = false;
                state.user = action.payload;
                state.token = action.payload.body.token;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.error.message;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.error = action.error.message;
            });
    }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
