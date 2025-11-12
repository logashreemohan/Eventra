import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
      <div className="nav-left">
        <div className="logo">
          <img src="/src/assets/logo.svg" alt="Eventra Logo" className="logo-icon" />
          <span className="logo-text">EVENTRA</span>
        </div>
      </div>
      <div className="nav-right">
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
        
        <div className="nav-links">
          <a href="#vendors" onClick={(e) => {
            e.preventDefault();
            document.getElementById('vendors').scrollIntoView({ behavior: 'smooth' });
          }}>Vendors</a>
          <button className="search-button" onClick={handleSearchClick}>Search</button>
          <Link to="/login">Login</Link>
        </div>
        <div className="ai-chat-box">
          <button className="chat-button" onClick={handleChatClick}>AI Chat</button>
        </div>
        <MobileMenu />
      </div>
    </nav>
  );
};

export default Navbar;