import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  // Remove withCredentials as it causes CORS issues with wildcard origins
  // withCredentials: true, 
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is 401 and not a retry attempt
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token (handled by authService)
        // This will be a circular dependency if we import authService here,
        // so refreshing is handled at the service level in each service file
        return Promise.reject(error);
      } catch (refreshError) {
        // If token refresh fails, redirect to login
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        
        // Return the original error
        return Promise.reject(error);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api; 