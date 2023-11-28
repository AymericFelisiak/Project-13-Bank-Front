import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
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
                console.log(action.error.message);
                if (
                    action.error.message ===
                    'Request failed with status code 401'
                ) {
                    state.error = 'Access Denied! Invalid Credentials';
                } else {
                    state.error = action.error.message;
                }
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.error = action.error.message;
            })
            ;
    }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
