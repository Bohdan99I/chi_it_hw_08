import axios from 'axios';
import { history } from '../navigate';

const axiosInstance = axios.create({
    baseURL: 'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com/',
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            localStorage.removeItem('token');
            history.push('/login');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
