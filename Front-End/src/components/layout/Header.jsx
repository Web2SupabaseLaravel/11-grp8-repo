import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import NotificationBadge from '../notifications/NotificationBadge';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              color: 'primary.main',
              textDecoration: 'none',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            ReservEat
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!isMobile && (
              <>
                <Button component={RouterLink} to="/" color="inherit" sx={{ ml: 2 }}>
                  Home
                </Button>
                <Button component={RouterLink} to="/reservations" color="inherit" sx={{ ml: 2 }}>
                  Reservations
                </Button>
                <Button component={RouterLink} to="/admin" color="inherit" sx={{ ml: 2 }}>
                  Admin
                </Button>
              </>
            )}
            
            <NotificationBadge />
            
            <Button 
              variant="contained" 
              color="primary"
              component={RouterLink}
              to="/reservations/new"
              sx={{ ml: isMobile ? 1 : 2 }}
            >
              {isMobile ? 'New' : 'New Reservation'}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 