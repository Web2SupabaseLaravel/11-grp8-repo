import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Divider,
  IconButton,
  CircularProgress
} from '@mui/material';
import {
  Close as CloseIcon,
  CheckCircleOutline as ConfirmIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Notifications as NotificationIcon,
  Event as EventIcon,
  AccessTime as TimeIcon
} from '@mui/icons-material';
import { formatDate } from '../../utils/dateFormatter';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../hooks/useNotifications';

// Map notification types to icons and colors
const notificationTypeConfig = {
  confirmation: {
    icon: <ConfirmIcon sx={{ color: 'success.main' }} />,
    color: 'success',
    label: 'Reservation Confirmed'
  },
  cancellation: {
    icon: <ErrorIcon sx={{ color: 'error.main' }} />,
    color: 'error',
    label: 'Reservation Cancelled'
  },
  reminder: {
    icon: <InfoIcon sx={{ color: 'info.main' }} />,
    color: 'info',
    label: 'Reservation Reminder'
  },
  default: {
    icon: <NotificationIcon sx={{ color: 'primary.main' }} />,
    color: 'primary',
    label: 'Notification'
  }
};

const NotificationDetailModal = ({ 
  open,
  onClose,
  notification,
  notificationId,
  isLoading: isLoadingProp,
  error: errorProp
}) => {
  const navigate = useNavigate();
  
  // If notification is not provided directly but ID is, fetch it
  const {
    data: fetchedNotification,
    isLoading: isLoadingFetch,
    error: errorFetch
  } = useNotification(notificationId && !notification ? notificationId : null);

  // Use either provided notification or fetched one
  const notificationData = notification || fetchedNotification;
  const isLoading = isLoadingProp || isLoadingFetch;
  const error = errorProp || errorFetch;
  
  // Handle navigation to reservation details
  const handleViewReservation = () => {
    if (notificationData && notificationData.reservationId) {
      navigate(`/reservations/${notificationData.reservationId}`);
      onClose();
    }
  };
  
  if (!open) return null;
  
  if (isLoading) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </Dialog>
    );
  }
  
  if (error || !notificationData) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          Error
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography color="error">
            {error ? `Error loading notification: ${error.message}` : 'Notification not found'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
  
  const typeConfig = notificationTypeConfig[notificationData.type] || notificationTypeConfig.default;
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pr: 6 }}>
        {notificationData.title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Chip 
            icon={typeConfig.icon} 
            label={typeConfig.label} 
            color={typeConfig.color} 
            sx={{ mb: 2 }} 
          />
          
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mb: 3 }}>
            {notificationData.message}
          </Typography>
          
          <Divider sx={{ my: 2 }} />
          
          {notificationData.reservationTime && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <EventIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2">
                {formatDate(notificationData.reservationTime)}
              </Typography>
            </Box>
          )}
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <TimeIcon sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              Received: {formatDate(notificationData.createdAt)}
            </Typography>
          </Box>
          
          {notificationData.additionalInfo && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Additional Information:
              </Typography>
              <Typography variant="body2">
                {notificationData.additionalInfo}
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        {notificationData.reservationId && (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleViewReservation}
          >
            View Reservation
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default NotificationDetailModal; 