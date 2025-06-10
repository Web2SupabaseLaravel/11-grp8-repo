import React, { useState } from 'react';
import {
  Box,
  List,
  Typography,
  Button,
  Paper,
  Divider,
  CircularProgress,
  Pagination,
  Alert,
  Skeleton,
  IconButton
} from '@mui/material';
import {
  NotificationsOff as EmptyIcon,
  Refresh as RefreshIcon,
  DoneAll as MarkAllReadIcon
} from '@mui/icons-material';
import NotificationItem from './NotificationItem';
import NotificationDetailModal from './NotificationDetailModal';
import useNotifications from '../../hooks/useNotifications';

const NotificationList = () => {
  const [page, setPage] = useState(1);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const itemsPerPage = 10;
  
  const {
    notifications,
    totalPages,
    isLoading,
    isError,
    error,
    refetch,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    isMarkingAllAsRead
  } = useNotifications(page, itemsPerPage);
  
  // Handle pagination change
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  
  // Handle notification click to open detail modal
  const handleNotificationClick = (id) => {
    markAsRead(id);
    setSelectedNotificationId(id);
  };
  
  // Handle closing notification detail modal
  const handleCloseDetail = () => {
    setSelectedNotificationId(null);
  };
  
  // Render loading state
  if (isLoading) {
    return (
      <Paper sx={{ p: 2, height: '100%', minHeight: 400 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
          <Typography variant="h6">
            Notifications
          </Typography>
          <IconButton disabled>
            <RefreshIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <List sx={{ width: '100%' }}>
          {[...Array(3)].map((_, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 1 }} />
            </Box>
          ))}
        </List>
      </Paper>
    );
  }
  
  // Render error state
  if (isError) {
    return (
      <Paper sx={{ p: 2, height: '100%', minHeight: 400 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
          <Typography variant="h6">
            Notifications
          </Typography>
          <IconButton onClick={refetch} aria-label="refresh">
            <RefreshIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Alert severity="error" sx={{ mb: 2 }}>
          Error loading notifications: {error?.message || 'Unknown error'}
        </Alert>
        <Button variant="outlined" onClick={refetch} startIcon={<RefreshIcon />}>
          Try Again
        </Button>
      </Paper>
    );
  }
  
  // Render empty state
  if (notifications.length === 0) {
    return (
      <Paper sx={{ p: 2, height: '100%', minHeight: 400 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
          <Typography variant="h6">
            Notifications
          </Typography>
          <IconButton onClick={refetch} aria-label="refresh">
            <RefreshIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            py: 4
          }}
        >
          <EmptyIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No Notifications
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
            You don't have any notifications at the moment.
            <br />
            Check back later for updates on your reservations.
          </Typography>
          <Button 
            variant="outlined" 
            onClick={refetch}
            startIcon={<RefreshIcon />}
          >
            Refresh
          </Button>
        </Box>
      </Paper>
    );
  }
  
  // Render notification list
  return (
    <Paper sx={{ p: 2, height: '100%', minHeight: 400 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
        <Typography variant="h6">
          Notifications
        </Typography>
        <Box>
          <Button
            startIcon={<MarkAllReadIcon />}
            onClick={markAllAsRead}
            disabled={isMarkingAllAsRead || notifications.every(n => n.read)}
            sx={{ mr: 1 }}
          >
            Mark all read
            {isMarkingAllAsRead && <CircularProgress size={16} sx={{ ml: 1 }} />}
          </Button>
          <IconButton onClick={refetch} aria-label="refresh">
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>
      <Divider sx={{ mb: 2 }} />
      
      <List sx={{ width: '100%' }}>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onDelete={deleteNotification}
            onRead={() => handleNotificationClick(notification.id)}
          />
        ))}
      </List>
      
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
          <Pagination 
            count={totalPages} 
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
      
      {/* Notification detail modal */}
      <NotificationDetailModal
        open={!!selectedNotificationId}
        onClose={handleCloseDetail}
        notificationId={selectedNotificationId}
      />
    </Paper>
  );
};

export default NotificationList; 