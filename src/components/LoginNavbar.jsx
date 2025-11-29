import React from 'react';
import '../styles/Navbar.css';

const LoginNavbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo">
          <img src="/src/assets/logo.svg" alt="Eventra Logo" className="logo-icon" />
          <span className="logo-text">EVENTRA</span>
        </div>
      </div>
      <div className="nav-right">
        {/* Empty div to maintain layout structure */}
        <div></div>
      </div>
    </nav>
  );
};

export default LoginNavbar;