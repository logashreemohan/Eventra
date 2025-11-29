import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/FeaturesOverview.css';

const FeaturesOverview = () => {
  const navigate = useNavigate();

  const features = [
    {
      id: 1,
      title: 'Wedding Checklist',
      description: 'Track your wedding planning progress with our comprehensive checklist. Categorize tasks by priority and monitor your completion rate.',
      icon: '📋',
      component: 'WeddingChecklist'
    },
    {
      id: 2,
      title: 'Vendor Comparison',
      description: 'Compare multiple vendors side-by-side based on price, ratings, services, and more to make the best choice for your special day.',
      icon: '🔍',
      component: 'VendorComparison'
    },
    {
      id: 3,
      title: 'Inspiration Gallery',
      description: 'Browse thousands of wedding inspiration images categorized by venue, decor, attire, and more to help plan your dream wedding.',
      icon: '🖼️',
      component: 'InspirationGallery'
    },
    {
      id: 4,
      title: 'Wedding Countdown',
      description: 'Keep track of the days, hours, minutes, and seconds until your big day with our beautiful countdown timer.',
      icon: '⏰',
      component: 'WeddingCountdown'
    },
    {
      id: 5,
      title: 'Weather Widget',
      description: 'Check weather forecasts for your wedding date and location to help with planning decisions.',
      icon: '☀️',
      component: 'WeatherWidget'
    },
    {
      id: 6,
      title: 'Guest Management',
      description: 'Manage your guest list, track RSVPs, assign tables, and monitor dietary preferences all in one place.',
      icon: '👥',
      component: 'GuestManagement'
    },
    {
      id: 7,
      title: 'Venue Finder',
      description: 'Discover and compare wedding venues with interactive maps, filtering options, and detailed information.',
      icon: '📍',
      component: 'VenueFinder'
    },
    {
      id: 8,
      title: 'Real-time Chat',
      description: 'Communicate directly with vendors through our real-time messaging system for quick questions and updates.',
      icon: '💬',
      component: 'RealTimeChat'
    },
    {
      id: 9,
      title: 'Budget Calculator',
      description: 'Plan and track your wedding budget with our interactive calculator that helps you stay within your financial limits.',
      icon: '💰',
      component: 'BudgetCalculator'
    },
    {
      id: 10,
      title: 'Wedding Timeline',
      description: 'Create and manage your wedding planning timeline with suggested milestones and task reminders.',
      icon: '📅',
      component: 'WeddingTimeline'
    },
    {
      id: 11,
      title: 'Mood Board',
      description: 'Create and share your wedding inspiration mood boards with categorized images and design ideas.',
      icon: '🎨',
      component: 'MoodBoard'
    },
    {
      id: 12,
      title: 'Particle Background',
      description: 'Enjoy our visually stunning particle background effects that add a modern touch to your browsing experience.',
      icon: '✨',
      component: 'ParticleBackground'
    }
  ];

  return (
    <>
      <Navbar />
      <div className="features-overview">
        <div className="features-header">
          <h1 className="features-title">Eventra Feature Overview</h1>
          <p className="features-subtitle">Discover all the powerful tools and features that make wedding planning effortless</p>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature.id} className="feature-card">
              <div className="feature-icon">
                <span className="icon-emoji">{feature.icon}</span>
              </div>
              <h3 className="feature-name">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <button 
                className="explore-btn"
                onClick={() => navigate('/')}
              >
                Explore Feature
              </button>
            </div>
          ))}
        </div>

        <div className="features-cta">
          <h2>Ready to Plan Your Perfect Wedding?</h2>
          <p>Join thousands of couples who have used Eventra to create their dream weddings</p>
          <div className="cta-buttons">
            <button className="cta-btn primary" onClick={() => navigate('/client-signup')}>Sign Up as Client</button>
            <button className="cta-btn secondary" onClick={() => navigate('/vendor-signup')}>Register as Vendor</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FeaturesOverview;