import api from './api';


export const authService = {
  /**
   * Login with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise} API response with user data and token
   */
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data.access_token) {
        localStorage.setItem('authToken', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  /**
   * Register a new user
   * @param {string} name - User name
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise} API response with user data and token
   */
  register: async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      
      if (response.data.access_token) {
        localStorage.setItem('authToken', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  /**
   * Logout the current user
   * @returns {Promise} API response
   */
  logout: async () => {
    try {
      await api.post('/auth/logout');
      
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      
      throw error;
    }
  },
  
  /**
   * Get current user information
   * @returns {Promise} API response with user data
   */
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },
  
  /**
   * Refresh the JWT token
   * @returns {Promise} API response with new token
   */
  refreshToken: async () => {
    try {
      const response = await api.post('/auth/refresh');
      
      if (response.data.access_token) {
        localStorage.setItem('authToken', response.data.access_token);
      }
      
      return response.data;
    } catch (error) {
      console.error('Token refresh error:', error);
      throw error;
    }
  },
  
  /**
   * Check if user is authenticated
   * @returns {boolean} True if user has a token, false otherwise
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },
  
  /**
   * Get the current user from localStorage
   * @returns {Object|null} User object or null if not logged in
   */
  getUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
}; 