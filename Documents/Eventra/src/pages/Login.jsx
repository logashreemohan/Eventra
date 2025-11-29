import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
    name: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would call an API
    console.log('Form submitted:', formData);
    
    // For demo purposes, we'll check if this is a vendor login
    // In a real app, this would be determined by the API response
    const isVendor = formData.email.includes('vendor') || formData.email.includes('photographer') || formData.email.includes('dj');

    if (isVendor) {
      navigate('/vendor-profile');
    } else {
      navigate('/');
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
      name: ''
    });
  };

  const handleSignupTypeSelect = (type) => {
    setSignupType(type);
    setIsSignupTypeSelected(true);
    
    // Navigate to the appropriate signup page
    if (type === 'client') {
      navigate('/client-signup');
    } else if (type === 'vendor') {
      navigate('/vendor-signup');
    }
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
                
                <button type="submit" className="submit-button">
                  Login
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
              ) : null}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;