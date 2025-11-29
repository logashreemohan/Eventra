import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/FeatureDashboard.css';

const FeatureDashboard = () => {
  const navigate = useNavigate();

  const featureCategories = [
    {
      id: 1,
      title: 'Wedding Planning Tools',
      description: 'Essential tools to plan your perfect wedding',
      features: [
        { name: 'Budget Calculator', icon: '💰', path: '/' },
        { name: 'Wedding Timeline', icon: '📅', path: '/' },
        { name: 'Wedding Checklist', icon: '📋', path: '/' },
        { name: 'Wedding Countdown', icon: '⏰', path: '/' },
        { name: 'Mood Board', icon: '🎨', path: '/' }
      ]
    },
    {
      id: 2,
      title: 'Vendor Management',
      description: 'Find, compare, and connect with the best vendors',
      features: [
        { name: 'Vendor Comparison', icon: '🔍', path: '/' },
        { name: 'Venue Finder', icon: '📍', path: '/' },
        { name: 'Guest Management', icon: '👥', path: '/' },
        { name: 'Real-time Chat', icon: '💬', path: '/' }
      ]
    },
    {
      id: 3,
      title: 'Inspiration & Information',
      description: 'Get inspired and stay informed',
      features: [
        { name: 'Inspiration Gallery', icon: '🖼️', path: '/' },
        { name: 'Weather Widget', icon: '☀️', path: '/' },
        { name: 'Features Overview', icon: '✨', path: '/features' }
      ]
    }
  ];

  return (
    <div className="feature-dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Eventra Feature Dashboard</h2>
        <p className="dashboard-subtitle">All the tools you need for your perfect wedding</p>
      </div>

      <div className="dashboard-content">
        {featureCategories.map(category => (
          <div key={category.id} className="category-section">
            <div className="category-header">
              <h3 className="category-title">{category.title}</h3>
              <p className="category-description">{category.description}</p>
            </div>
            
            <div className="features-grid">
              {category.features.map((feature, index) => (
                <div 
                  key={index} 
                  className="feature-card"
                  onClick={() => navigate(feature.path)}
                >
                  <div className="feature-icon">
                    <span className="icon-emoji">{feature.icon}</span>
                  </div>
                  <h4 className="feature-name">{feature.name}</h4>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-cta">
        <button className="explore-all-btn" onClick={() => navigate('/features')}>
          Explore All Features
        </button>
      </div>
    </div>
  );
};

export default FeatureDashboard;