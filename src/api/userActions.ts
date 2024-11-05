import axiosInstance from './axiosInstance';

interface UserCredentials {
    email: string;
    password: string;
}

export const login = async (credentials: UserCredentials) => {
    const response = await axiosInstance.post('/auth/login', credentials);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

export const register = async (credentials: UserCredentials) => {
    const response = await axiosInstance.post('/auth/register', credentials);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};
