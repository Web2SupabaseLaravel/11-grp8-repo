import React from 'react';
import './RestTable.css'; // Assuming you have a CSS file for styling



function navbar () {
    return (
        <div className="header">
            <img src="/assets/logo.jpg" alt="logo" />
            <div className="nav-links">
                <a href="#">Home</a>
                <a href="#">Menu</a>
                <a href="#">Reserve</a>
                <a href="#">Online</a>
            </div>
            <div className="auth-buttons">
                <button className="signup-btn">Sign up</button>
                <button className="login-btn">Login</button>
            </div>
        </div>
    );
    }

    export default navbar;