import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8081', // URL backend
    withCredentials: true,
    timeout: 10000,
});

// Menambahkan interceptor untuk menyertakan token dalam setiap permintaan
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Menambahkan interceptor untuk menangani respons error terkait token
api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && error.response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            alert('Session expired, please login again.');
            window.location.href = '/login'; // Redirect to login page
        }
        return Promise.reject(error);
    }
);

export default api;
