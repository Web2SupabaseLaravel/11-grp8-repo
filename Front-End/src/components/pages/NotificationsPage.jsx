import React from 'react';
import { Container, Box, Typography, Breadcrumbs, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import NotificationList from '../notifications/NotificationList';

const NotificationsPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
          <Link component={RouterLink} to="/" underline="hover" color="inherit">
            Home
          </Link>
          <Typography color="text.primary">Notifications</Typography>
        </Breadcrumbs>
        
        <Typography variant="h4" component="h1" gutterBottom>
          Your Notifications
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Stay updated with your restaurant reservation notifications.
        </Typography>
      </Box>
      
      <NotificationList />
    </Container>
  );
};

export default NotificationsPage; 