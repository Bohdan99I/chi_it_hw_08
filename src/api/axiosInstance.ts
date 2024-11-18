import axios from 'axios';
import { tokenStorage } from '../utils/tokenStorage';
import store from '../store/store';
import { logout } from '../store/slices/userSlice';

const axiosInstance = axios.create({
    baseURL: '',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = tokenStorage.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }    
        if (config.data instanceof FormData) {
            delete config.headers['Content-Type'];
        }
        return config;
    },
    (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Response error:', error.response?.data || error.message);
        
        if (error.response?.status === 401) {     
            store.dispatch(logout());       
            const currentPath = window.location.pathname;    
            if (currentPath !== '/login') {
                window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
