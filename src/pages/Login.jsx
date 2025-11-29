import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '../services/api';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [isSignupTypeSelected, setIsSignupTypeSelected] = useState(false);
  const [signupType, setSignupType] = useState(''); // 'client' or 'vendor'
  
  // Check if fullscreen parameter is present
  const isFullscreen = new URLSearchParams(location.search).get('fullscreen') === 'true';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    location: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (isLogin) {
        // Login with email and password
        const { data, error } = await authAPI.login({
          email: formData.email,
          password: formData.password
        });
        
        if (error) {
          throw new Error(error);
        }
        
        // Save token to localStorage
        localStorage.setItem('token', data.token);
        
        // Navigate based on user role
        const isVendor = data.user.role === 'vendor';
        
        if (isVendor) {
          navigate('/vendor/dashboard');
        } else {
          navigate('/');
        }
      } else {
        // Handle signup
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        
        const { data, error } = await authAPI.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: signupType,
          phone: formData.phone,
          location: formData.location
        });
        
        if (error) {
          throw new Error(error);
        }
        
        // Save token to localStorage
        localStorage.setItem('token', data.token);
        
        // Navigate based on user role
        const isVendor = data.user.role === 'vendor';
        
        if (isVendor) {
          navigate('/vendor/dashboard');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setIsSignupTypeSelected(false);
    setSignupType('');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      phone: '',
      location: ''
    });
    setError('');
  };

  const handleSignupTypeSelect = (type) => {
    setSignupType(type);
    setIsSignupTypeSelected(true);
  };

  const handleBackToTypeSelection = () => {
    setIsSignupTypeSelected(false);
    setSignupType('');
  };

  return (
    <>
      <div className={isFullscreen ? "vendor-registration-container" : "login-container"}>
        <div className={isFullscreen ? "vendor-registration-form-container" : "login-form-container"}>
          {/* Back button for fullscreen mode */}
          {isFullscreen && (
            <button onClick={() => navigate('/')} className="back-button">
              ← Back
            </button>
          )}
          
          {error && <div className="error-message">{error}</div>}
          
          {isLogin ? (
            <>
              <h2>Login to Eventra</h2>
              <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <button type="submit" className="submit-button" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
              
              <div className="form-toggle">
                <p>
                  Don't have an account? 
                  <button onClick={toggleForm} className="toggle-button">
                    Sign Up
                  </button>
                </p>
              </div>
            </>
          ) : (
            <>
              {!isSignupTypeSelected ? (
                <>
                  <h2>Join Eventra</h2>
                  <p className="signup-type-description">Are you a client or a vendor?</p>
                  <div className="signup-type-buttons">
                    <button 
                      className="signup-type-button client-button"
                      onClick={() => handleSignupTypeSelect('client')}
                    >
                      Client
                    </button>
                    <button 
                      className="signup-type-button vendor-button"
                      onClick={() => handleSignupTypeSelect('vendor')}
                    >
                      Vendor
                    </button>
                  </div>
                  
                  <div className="form-toggle">
                    <p>
                      Already have an account? 
                      <button onClick={toggleForm} className="toggle-button">
                        Login
                      </button>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <h2>Sign Up as {signupType === 'client' ? 'Client' : 'Vendor'}</h2>
                  <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="location">Location</label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Enter your city"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <button type="submit" className="submit-button" disabled={loading}>
                      {loading ? 'Signing up...' : `Sign Up as ${signupType === 'client' ? 'Client' : 'Vendor'}`}
                    </button>
                  </form>
                  
                  <div className="form-toggle">
                    <button onClick={handleBackToTypeSelection} className="toggle-button">
                      ← Back to selection
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;