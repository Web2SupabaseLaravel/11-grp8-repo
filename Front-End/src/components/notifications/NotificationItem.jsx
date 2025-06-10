import React, { useState } from 'react';
import { 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  IconButton, 
  Avatar, 
  Typography, 
  Box, 
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@mui/material';
import { 
  DeleteOutline as DeleteIcon,
  CheckCircleOutline as ConfirmIcon, 
  Error as ErrorIcon,
  Info as InfoIcon,
  Notifications as NotificationIcon
} from '@mui/icons-material';
import { getRelativeTime, formatDate } from '../../utils/dateFormatter';

// Map notification types to icons and colors
const notificationTypeConfig = {
  confirmation: {
    icon: <ConfirmIcon sx={{ color: 'success.main' }} />,
    color: 'success',
    avatar: 'success.main'
  },
  cancellation: {
    icon: <ErrorIcon sx={{ color: 'error.main' }} />,
    color: 'error',
    avatar: 'error.main'
  },
  reminder: {
    icon: <InfoIcon sx={{ color: 'info.main' }} />,
    color: 'info',
    avatar: 'info.main'
  },
  default: {
    icon: <NotificationIcon sx={{ color: 'primary.main' }} />,
    color: 'primary',
    avatar: 'primary.main'
  }
};

const NotificationItem = ({ notification, onDelete, onRead }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // Handle notification deletion
  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = () => {
    onDelete(notification.id);
    setDeleteDialogOpen(false);
  };
  
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };
  
  // Get configuration based on notification type
  const typeConfig = notificationTypeConfig[notification.type] || notificationTypeConfig.default;
  
  return (
    <>
      <ListItem
        alignItems="flex-start"
        sx={{ 
          mb: 1, 
          borderRadius: 1, 
          bgcolor: notification.read ? 'background.paper' : 'action.hover',
          position: 'relative'
        }}
        secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        }
        onClick={() => !notification.read && onRead(notification.id)}
      >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: typeConfig.avatar }}>
            {typeConfig.icon}
          </Avatar>
        </ListItemAvatar>
        
        <ListItemText
          primary={
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="subtitle1" component="div" sx={{ fontWeight: notification.read ? 'normal' : 'bold' }}>
                {notification.title}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                {getRelativeTime(notification.createdAt)}
              </Typography>
            </Box>
          }
          secondary={
            <Box>
              <Typography
                variant="body2"
                color="text.primary"
                sx={{
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
                  mb: 1
                }}
              >
                {notification.message}
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Chip 
                  label={notification.type || 'notification'} 
                  size="small" 
                  color={typeConfig.color} 
                  variant="outlined" 
                />
                <Typography variant="caption" color="text.secondary">
                  {formatDate(notification.createdAt, true)}
                </Typography>
              </Box>
            </Box>
          }
        />
      </ListItem>
      
      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Delete Notification
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this notification? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NotificationItem; 