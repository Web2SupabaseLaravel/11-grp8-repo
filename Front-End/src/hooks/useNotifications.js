import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useState, useEffect, useCallback } from 'react';
import notificationService from '../services/notificationService';

// Use the actual notification service, not the mock
const service = notificationService;

// Local storage key for read notifications
const READ_NOTIFICATIONS_KEY = 'readNotifications';

/**
 * Get read notification IDs from localStorage
 * @returns {Array<string>} Array of read notification IDs
 */
const getReadNotifications = () => {
  try {
    const stored = localStorage.getItem(READ_NOTIFICATIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Failed to parse read notifications:', e);
    return [];
  }
};

/**
 * Save read notification IDs to localStorage
 * @param {Array<string>} ids - Array of read notification IDs
 */
const saveReadNotifications = (ids) => {
  try {
    localStorage.setItem(READ_NOTIFICATIONS_KEY, JSON.stringify(ids));
  } catch (e) {
    console.error('Failed to save read notifications:', e);
  }
};

/**
 * Custom hook for notifications data and actions
 */
export const useNotifications = (page = 1, limit = 10) => {
  const queryClient = useQueryClient();
  const [readIds, setReadIds] = useState(getReadNotifications());
  
  // Fetch notifications with pagination
  const { 
    data: notificationsData,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery(
    ['notifications', page, limit],
    () => service.getAllNotifications(page, limit),
    {
      keepPreviousData: true,
      staleTime: 60000, // 1 minute
    }
  );
  
  // Process notifications to add read state from local storage
  const notifications = (notificationsData?.notifications || []).map(notification => {
    // Safely handle potentially missing ids
    const notificationId = notification?.id;
    return {
      ...notification,
      read: notificationId ? readIds.includes(notificationId.toString()) : false
    };
  });
  
  const totalNotifications = notificationsData?.total || 0;
  const totalPages = notificationsData?.totalPages || 0;
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  // Save read state to localStorage when it changes
  useEffect(() => {
    saveReadNotifications(readIds);
  }, [readIds]);
  
  // Mark notification as read locally
  const markAsRead = useCallback((id) => {
    if (!id) return Promise.resolve({ success: false });
    
    const idStr = id.toString();
    if (!readIds.includes(idStr)) {
      const newReadIds = [...readIds, idStr];
      setReadIds(newReadIds);
      saveReadNotifications(newReadIds);
    }
    return Promise.resolve({ id, read: true });
  }, [readIds]);
  
  // Mark all notifications as read locally
  const markAllAsRead = useCallback(() => {
    // Only include IDs that are not undefined/null
    const validIds = notifications
      .filter(n => n.id)
      .map(n => n.id.toString());
      
    const newReadIds = [...new Set([...readIds, ...validIds])];
    setReadIds(newReadIds);
    saveReadNotifications(newReadIds);
    return Promise.resolve({ success: true });
  }, [notifications, readIds]);
  
  // Delete notification mutation
  const deleteNotificationMutation = useMutation(
    (id) => service.deleteNotification(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('notifications');
      }
    }
  );
  
  return {
    // Data
    notifications,
    totalNotifications,
    totalPages,
    unreadCount,
    isLoading,
    isError,
    error,
    
    // Actions
    refetch,
    getNotification: (id) => id ? service.getNotification(id) : Promise.resolve(null),
    markAsRead,
    markAllAsRead,
    deleteNotification: (id) => id ? deleteNotificationMutation.mutate(id) : null,
    
    // Mutation states
    isMarkingAsRead: false,
    isMarkingAllAsRead: false,
    isDeleting: deleteNotificationMutation.isLoading,
  };
};

/**
 * Custom hook to fetch a single notification by ID
 */
export const useNotification = (id) => {
  const [readIds, setReadIds] = useState(getReadNotifications());
  
  const query = useQuery(
    ['notification', id],
    () => service.getNotification(id),
    {
      enabled: !!id, // Only run if ID is provided
    }
  );
  
  // Mark as read when notification is viewed
  useEffect(() => {
    if (query.data && id) {
      const idStr = id.toString();
      if (!readIds.includes(idStr)) {
        const newReadIds = [...readIds, idStr];
        setReadIds(newReadIds);
        saveReadNotifications(newReadIds);
      }
    }
  }, [id, query.data, readIds]);
  
  // Add read status to fetched notification
  const notification = query.data
    ? { ...query.data, read: true }
    : null;
  
  return {
    ...query,
    data: notification
  };
};

export default useNotifications; 