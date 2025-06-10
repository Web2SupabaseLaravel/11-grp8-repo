import api from './api';
import { authService } from './authService';

/**
 * Service for handling notification-related API calls matching Laravel backend
 */
export const notificationService = {
  /**
   * Get all notifications with pagination
   * @param {number} page - Page number (1-based)
   * @param {number} limit - Number of items per page
   * @returns {Promise} API response with notifications data
   */
  getAllNotifications: async (page = 1, limit = 10) => {
    try {
      // Check if user is authenticated
      if (!authService.isAuthenticated()) {
        throw new Error('User is not authenticated');
      }
      
      const response = await api.get('/notifications', {
        params: { page, per_page: limit }
      });
      
      // Map each notification from backend format to frontend format
      const mappedNotifications = (response.data.data || []).map(notification =>
        mapNotificationFromBackend(notification)
      );
      
      // Handle Laravel pagination structure
      return {
        notifications: mappedNotifications,
        total: response.data.total || 0,
        totalPages: response.data.last_page || 0,
        currentPage: response.data.current_page || 1
      };
    } catch (error) {
      console.error('Error fetching notifications:', error);
      if (error.response && error.response.status === 401) {
        // Try to refresh token
        try {
          await authService.refreshToken();
          // Retry the request
          return notificationService.getAllNotifications(page, limit);
        } catch (refreshError) {
          // If refresh fails, redirect to login
          console.error('Token refresh failed:', refreshError);
          // Clean up authentication data
          await authService.logout();
          throw new Error('Authentication expired. Please login again.');
        }
      }
      throw error;
    }
  },
  
  /**
   * Get a single notification by ID
   * @param {string} id - Notification ID
   * @returns {Promise} API response with notification data
   */
  getNotification: async (id) => {
    try {
      // Check if user is authenticated
      if (!authService.isAuthenticated()) {
        throw new Error('User is not authenticated');
      }
      
      const response = await api.get(`/notifications/${id}`);
      return mapNotificationFromBackend(response.data);
    } catch (error) {
      console.error(`Error fetching notification ${id}:`, error);
      if (error.response && error.response.status === 401) {
        // Try to refresh token
        try {
          await authService.refreshToken();
          // Retry the request
          return notificationService.getNotification(id);
        } catch (refreshError) {
          // If refresh fails, redirect to login
          console.error('Token refresh failed:', refreshError);
          // Clean up authentication data
          await authService.logout();
          throw new Error('Authentication expired. Please login again.');
        }
      }
      throw error;
    }
  },
  
  /**
   * Mark a notification as read
   * Note: Since your backend doesn't have a specific endpoint for this,
   * we'll handle read state in the frontend
   * @param {string} id - Notification ID
   * @returns {Promise} API response
   */
  markAsRead: async (id) => {
    // This would ideally call an API endpoint to update read status
    // For now, we'll track this on the client side
    console.warn('markAsRead: Backend API does not support this operation');
    return { id, read: true };
  },
  
  /**
   * Mark all notifications as read
   * Note: Since your backend doesn't have a specific endpoint for this,
   * we'll handle read state in the frontend
   * @returns {Promise} API response
   */
  markAllAsRead: async () => {
    // This would ideally call an API endpoint to update read status for all
    console.warn('markAllAsRead: Backend API does not support this operation');
    return { success: true };
  },
  
  /**
   * Delete a notification
   * @param {string} id - Notification ID
   * @returns {Promise} API response
   */
  deleteNotification: async (id) => {
    try {
      // Check if user is authenticated
      if (!authService.isAuthenticated()) {
        throw new Error('User is not authenticated');
      }
      
      const response = await api.delete(`/notifications/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting notification ${id}:`, error);
      if (error.response && error.response.status === 401) {
        // Try to refresh token
        try {
          await authService.refreshToken();
          // Retry the request
          return notificationService.deleteNotification(id);
        } catch (refreshError) {
          // If refresh fails, redirect to login
          console.error('Token refresh failed:', refreshError);
          // Clean up authentication data
          await authService.logout();
          throw new Error('Authentication expired. Please login again.');
        }
      }
      throw error;
    }
  },
  
  /**
   * Send a test notification (admin feature)
   * @param {Object} data - Notification data
   * @returns {Promise} API response
   */
  sendTestNotification: async (data) => {
    try {
      const response = await api.post('/notifications/test', data);
      return response.data;
    } catch (error) {
      console.error('Error sending test notification:', error);
      throw error;
    }
  }
};

/**
 * Helper function to map notification from backend format to frontend format
 * @param {Object} notification - Backend notification object
 * @returns {Object} Frontend notification object
 */
function mapNotificationFromBackend(notification) {
  return {
    id: notification.NotID,
    title: notification.Title,
    message: notification.Massage, // Using the column name as defined in backend
    userId: notification.UID,
    createdAt: notification.CreatedTime,
    read: false // Default to unread since backend doesn't track read status yet
  };
}

/**
 * Infer notification type from title
 * @param {string} title - Notification title
 * @returns {string} Notification type
 */
function getNotificationType(title) {
  const lowerTitle = (title || '').toLowerCase();
  
  if (lowerTitle.includes('confirm')) return 'confirmation';
  if (lowerTitle.includes('cancel')) return 'cancellation';
  if (lowerTitle.includes('remind')) return 'reminder';
  
  return 'default';
}

export default notificationService; 