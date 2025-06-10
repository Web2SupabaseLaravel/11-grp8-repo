import React from 'react';
import { Container, Typography, Box, Button, Paper, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Notifications as NotificationsIcon } from '@mui/icons-material';

const HomePage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to ReservEat
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Your restaurant reservation management system
        </Typography>
      </Box>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper 
            sx={{ 
              p: 3, 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            <NotificationsIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" component="h2" gutterBottom>
              Notifications
            </Typography>
            <Typography sx={{ mb: 2 }}>
              Stay updated with your reservation status, confirmations, and reminders.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              component={RouterLink} 
              to="/notifications"
              sx={{ mt: 'auto' }}
            >
              View Notifications
            </Button>
          </Paper>
        </Grid>
        
        {/* Additional feature cards would go here */}
      </Grid>
    </Container>
  );
};

export default HomePage; 