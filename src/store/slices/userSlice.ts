import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register, getProfile } from '../../api/authApi';
import { tokenStorage } from '../../utils/tokenStorage';
import { LoginDto, RegisterDto } from '../../types/api';

interface User {
  id: number;
  username: string;
}

interface UserState {
  isAuthenticated: boolean;
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
  status: 'idle',
  error: null
};

// Асинхронні дії
export const userLogin = createAsyncThunk(
  'user/login',
  async (credentials: LoginDto) => {
    try {
      const response = await login(credentials);
      tokenStorage.setToken(response.token);
      return response.user;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to login');
    }
  }
);

export const userRegister = createAsyncThunk(
  'user/register',
  async (credentials: RegisterDto) => {
    try {
      const response = await register(credentials);
      tokenStorage.setToken(response.token);
      return response.user;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to register');
    }
  }
);

export const validateToken = createAsyncThunk(
  'user/validateToken',
  async (_, { rejectWithValue }) => {
    try {
      const token = tokenStorage.getToken();
      if (!token) {
        return rejectWithValue('No token found');
      }
      
      const user = await getProfile();
      return user;
    } catch (error: any) {
      tokenStorage.removeToken();
      return rejectWithValue(error.message || 'Invalid token');
    }
  }
);

export const getProfileAsync = createAsyncThunk(
  'user/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const user = await getProfile();
      return user;
    } catch (error: any) {
      tokenStorage.removeToken();
      return rejectWithValue(error.message || 'Invalid token');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.status = 'idle';
      state.error = null;
      tokenStorage.removeToken();
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(userLogin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to login';
      })
      // Register
      .addCase(userRegister.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to register';
      })
      // Validate Token
      .addCase(validateToken.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(validateToken.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.status = 'failed';
        state.error = action.payload as string || 'Token validation failed';
      })
      // Get Profile
      .addCase(getProfileAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProfileAsync.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getProfileAsync.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.status = 'failed';
        state.error = action.payload as string || 'Failed to get profile';
      });
  }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
