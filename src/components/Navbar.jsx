import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (newDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleChatClick = () => {
    navigate('/ai-chat');
  };

  const handleSearchClick = () => {
    // Navigate to the full-screen search page
    navigate('/search');
  };

  // Mock vendor data - in a real app this would come from context or API
  const vendorData = {
    name: 'John Doe Photography',
    role: 'Vendor'
  };

  // Check if we're on the vendor profile page
  const isVendorProfilePage = location.pathname === '/vendor-profile';

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <div className="logo">
            <img src="/src/assets/logo.svg" alt="Eventra Logo" className="logo-icon" />
            <span className="logo-text">EVENTRA</span>
          </div>
        </div>
        
        <div className="nav-center">
        </div>
        
        <div className="nav-right">
          {/* Vendors link moved here to be closer to search box */}
          <div className="nav-links">
            <a href="#vendors" onClick={(e) => {
              e.preventDefault();
              document.getElementById('vendors').scrollIntoView({ behavior: 'smooth' });
            }}>Vendors</a>
          </div>
          
          {/* Dark Mode Toggle */}
          <button className="dark-mode-toggle nav-button" onClick={toggleDarkMode}>
            {darkMode ? '☀️' : '🌙'}
          </button>
          
          {/* Show vendor details only on vendor profile page */}
          {isVendorProfilePage && (
            <div className="user-profile-corner">
              <div className="user-info">
                <div className="user-avatar">
                  <span className="user-initials">
                    {vendorData.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </span>
                </div>
                <div className="user-details">
                  <p className="user-name">{vendorData.name}</p>
                  <p className="user-role">{vendorData.role}</p>
                </div>
              </div>
            </div>
          )}
          
          <button className="search-button nav-button" onClick={handleSearchClick}>Search</button>
          <Link to="/login" className="login-button nav-button">Login</Link>
          <button className="chat-button nav-button" onClick={handleChatClick}>AI Chat</button>
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;