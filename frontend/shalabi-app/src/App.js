import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CustomerManagement from './CustomerManagement';
import Notifications from './Notifications';
import CustomerHistory from './CustomerHistory';

function App() {
  return (
    <Router>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <nav style={{ marginBottom: '30px' }}>
          <Link to="/" style={linkStyle}>Customer Management</Link>
          <Link to="/notifications" style={linkStyle}>Notifications</Link>
          <Link to="/history" style={linkStyle}>Customer History</Link>
        </nav>

        <Routes>
          <Route path="/" element={<CustomerManagement />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/history" element={<CustomerHistory />} />
        </Routes>
      </div>
    </Router>
  );
}

const linkStyle = {
  margin: '0 15px',
  padding: '10px 20px',
  backgroundColor: '#f6cd8f',
  borderRadius: '10px',
  textDecoration: 'none',
  color: '#333',
  fontWeight: 'bold'
};

export default App;


