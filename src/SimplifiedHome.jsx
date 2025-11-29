import React from 'react';

const SimplifiedHome = () => {
  return (
    <div className="home-container">
      <header>
        <nav>
          <h1>Eventra Navbar</h1>
        </nav>
      </header>
      <main>
        <section className="hero-section">
          <div className="hero-content">
            <h1>Welcome to Eventra</h1>
            <p>Your perfect wedding starts here</p>
          </div>
        </section>
      </main>
      <footer>
        <p>Eventra Footer</p>
      </footer>
    </div>
  );
};

export default SimplifiedHome;