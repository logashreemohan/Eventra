import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/Login.css';

const ClientSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    confirmPassword: ''
  });

  const locations = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Chennai',
    'Kolkata',
    'Hyderabad'
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would call an API
    console.log('Client signup form submitted:', formData);
    // Navigate to home page after signup
    navigate('/');
  };

  const handleGoogleSignup = () => {
    // In a real app, this would initiate Google OAuth
    console.log('Google signup initiated');
    // Navigate to home page after signup
    navigate('/');
  };

  return (
    <>
      <div className="login-container">
        <div className="login-form-container">
          <button onClick={() => navigate('/login')} className="back-button">
            ← Back
          </button>
          <h2>Client Signup</h2>
          <p className="signup-subtitle">Find the perfect vendors for your event</p>
          
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
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              >
                <option value="">Select your city</option>
                {locations.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
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
            
            <button type="submit" className="submit-button">
              Sign Up as Client
            </button>
          </form>
          
          <div className="google-signup">
            <p>or</p>
            <button className="google-signup-button" onClick={handleGoogleSignup}>
              Sign up with Google
            </button>
          </div>
          
          <div className="form-toggle">
            <p>
              Already have an account? 
              <button onClick={() => navigate('/login')} className="toggle-button">
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ClientSignup;