// src/services/api.js
import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000' , // Use the base URL from your environment variable
});

// Optional: Add interceptors if needed
api.interceptors.request.use(
  (config) => {
    // You can add authorization tokens or modify requests here
    const token = localStorage.getItem('token'); // Assuming you're storing the token in localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Handle responses globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // You can handle errors globally here
    console.error('API call error:', error);
    return Promise.reject(error);
  }
);

// Export the configured Axios instance
export default api;
