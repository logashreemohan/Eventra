import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  
  const [rememberMe, setRememberMe] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would authenticate with a backend
    if (credentials.email === 'admin@eventra.com' && credentials.password === 'admin123') {
      // Successful login
      navigate('/admin/dashboard');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };
  
  return (
    <div className="admin-login-container">
      <div className="login-card animate-fade-in">
        <div className="login-header">
          <h1 className="admin-title">Admin Portal</h1>
          <p className="admin-subtitle">Sign in to access the administration dashboard</p>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              placeholder="admin@eventra.com"
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
              className="form-input"
            />
          </div>
          
          <div className="form-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="checkbox-input"
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>
          
          <button type="submit" className="login-btn pulse-animation">Sign In</button>
        </form>
        
        <div className="login-footer">
          <p>© 2024 Eventra. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;