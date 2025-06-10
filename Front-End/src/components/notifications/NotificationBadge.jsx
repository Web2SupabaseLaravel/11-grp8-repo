import React from 'react';
import { Badge, IconButton, Tooltip } from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useNotifications from '../../hooks/useNotifications';

/**
 * Notification bell icon with unread count badge
 */
const NotificationBadge = () => {
  const navigate = useNavigate();
  const { unreadCount, isLoading } = useNotifications();
  
  const handleClick = () => {
    navigate('/notifications');
  };
  
  return (
    <Tooltip title="Notifications">
      <IconButton
        color="inherit"
        aria-label="notifications"
        onClick={handleClick}
        sx={{ mr: 1 }}
      >
        <Badge 
          badgeContent={isLoading ? 0 : unreadCount} 
          color="error"
          max={99}
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};

export default NotificationBadge; 