import axiosInstance from './axiosInstance';

interface UserCredentials {
    username: string;
    password: string;
}

export const login = async (credentials: UserCredentials) => {
    try {
        const response = await axiosInstance.post('/auth/login', credentials);
        const { token } = response.data;
        if (token) {
            localStorage.setItem('token', token);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const register = async (credentials: UserCredentials) => {
    try {
        const response = await axiosInstance.post('/auth/register', credentials);
        return response.data;
    } catch (error) {
        console.error('Register error:', error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    delete axiosInstance.defaults.headers.common['Authorization'];
};
