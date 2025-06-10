import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Paper,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import notificationService from '../../services/notificationService';

const AdminPage = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    title: '',
    message: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await notificationService.sendTestNotification(formData);
      setAlert({
        open: true,
        message: 'Test notification sent successfully!',
        severity: 'success'
      });
      // Clear form
      setFormData({
        user_id: '',
        title: '',
        message: ''
      });
    } catch (error) {
      setAlert({
        open: true,
        message: `Error: ${error.response?.data?.message || error.message}`,
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCloseAlert = () => {
    setAlert(prev => ({
      ...prev,
      open: false
    }));
  };
  
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Tools
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Create and manage test notifications
        </Typography>
      </Box>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Send Test Notification
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="user_id"
            label="User ID"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Notification Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            multiline
            rows={4}
            id="message"
            label="Notification Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
          
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
            disabled={isLoading || !formData.user_id || !formData.title || !formData.message}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Send Notification'}
          </Button>
        </Box>
      </Paper>
      
      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminPage; 