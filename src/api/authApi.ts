import axiosInstance from './axiosInstance';
import { 
  AuthResponse, 
  LoginDto, 
  RegisterDto, 
  User, 
  UpdateProfileDto, 
  ProfileResponse 
} from '../types/api';
import { tokenStorage } from '../utils/tokenStorage';

export const register = async (data: RegisterDto): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>('/api/auth/register', data);
    const { token } = response.data;    

    tokenStorage.setToken(token);
    
    return response.data;
  } catch (error: any) {
    console.error('Registration error:', error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Registration failed');
  }
};

export const login = async (data: LoginDto): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>('/api/auth/login', data);
    const { token } = response.data;
    
    tokenStorage.setToken(token);
    
    return response.data;
  } catch (error: any) {
    console.error('Login error:', error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Login failed');
  }
};

export const logout = (): void => {
  tokenStorage.removeToken();
};

export const getProfile = async (): Promise<User> => {
  try {
    const response = await axiosInstance.get<ProfileResponse>('/api/auth/profile');
    return response.data.user;
  } catch (error: any) {
    console.error('Get profile error:', error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Failed to get profile');
  }
};

export const updateProfile = async (data: UpdateProfileDto): Promise<User> => {
  try {
    const response = await axiosInstance.put<ProfileResponse>('/api/auth/profile', data);
    return response.data.user;
  } catch (error: any) {
    console.error('Update profile error:', error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Failed to update profile');
  }
};
