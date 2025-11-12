import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MobileMenu.css';

const MobileMenu = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleChatClick = () => {
    toggleMenu();
    navigate('/ai-chat');
  };

  return (
    <div className="mobile-menu">
      <button className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      {isOpen && (
        <div className="mobile-menu-content">
          <a href="#vendors" onClick={toggleMenu}>Vendors</a>
          <a href="#login" onClick={toggleMenu}>Login</a>
          <a href="#profile" onClick={toggleMenu}>Profile</a>
          <button className="chat-button" onClick={handleChatClick}>AI Chat</button>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;