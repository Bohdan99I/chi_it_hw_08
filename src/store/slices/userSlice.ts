import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register } from '../../api/userActions';

interface UserCredentials {
    username: string;
    password: string;
}

interface UserState {
    isAuthenticated: boolean;
    user: any;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: UserState = {
    isAuthenticated: false,
    user: null,
    status: 'idle',
    error: null,
};

export const userLogin = createAsyncThunk('user/login', async (credentials: UserCredentials) => {
    const response = await login(credentials);
    return response.data;
});

export const userRegister = createAsyncThunk('user/register', async (credentials: UserCredentials) => {
    const response = await register(credentials);
    return response.data;
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
            });
    },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
