import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/CustomerProfile.css';

const CustomerProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    address: '123 Wedding Street, Mumbai, Maharashtra',
    joinDate: 'January 15, 2024'
  });

  const [bookings] = useState([
    {
      id: 1,
      vendor: 'Elegant DJ Services',
      category: 'DJ',
      date: '2024-12-15',
      status: 'Confirmed',
      price: '$500',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      vendor: 'Royal Makeup Artists',
      category: 'Makeup Artist',
      date: '2024-12-14',
      status: 'Pending',
      price: '$300',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      vendor: 'Dream Decorators',
      category: 'Decor',
      date: '2024-12-20',
      status: 'Completed',
      price: '$1200',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save to a database
    alert('Profile updated successfully!');
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Confirmed': return 'status-confirmed';
      case 'Pending': return 'status-pending';
      case 'Completed': return 'status-completed';
      default: return '';
    }
  };

  return (
    <>
      <Navbar />
      <div className="customer-profile-container">
        {/* Profile Header */}
        <section className="profile-header">
          <div className="profile-header-content">
            <div className="profile-avatar">
              <div className="avatar-placeholder">
                <span className="avatar-initials">PS</span>
              </div>
            </div>
            <div className="profile-info">
              <h1 className="profile-name">{profile.name}</h1>
              <p className="profile-email">{profile.email}</p>
              <p className="profile-member-since">Member since {profile.joinDate}</p>
            </div>
            <div className="profile-actions">
              <button 
                className="edit-button pulse-animation"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </section>

        {/* Profile Content */}
        <div className="profile-content">
          {/* Sidebar Navigation */}
          <aside className="profile-sidebar">
            <nav className="profile-nav">
              <button 
                className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <span className="nav-icon">👤</span>
                <span className="nav-text">Profile</span>
              </button>
              <button 
                className={`nav-item ${activeTab === 'bookings' ? 'active' : ''}`}
                onClick={() => setActiveTab('bookings')}
              >
                <span className="nav-icon">📅</span>
                <span className="nav-text">My Bookings</span>
              </button>
              <button 
                className={`nav-item ${activeTab === 'wishlist' ? 'active' : ''}`}
                onClick={() => setActiveTab('wishlist')}
              >
                <span className="nav-icon">❤️</span>
                <span className="nav-text">Wishlist</span>
              </button>
              <button 
                className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                <span className="nav-icon">⚙️</span>
                <span className="nav-text">Settings</span>
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="profile-main">
            {activeTab === 'profile' && (
              <div className="profile-details animate-fade-in">
                <h2 className="section-title">Personal Information</h2>
                <div className="profile-form">
                  {isEditing ? (
                    <>
                      <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={profile.name}
                          onChange={handleInputChange}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={profile.email}
                          onChange={handleInputChange}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={profile.phone}
                          onChange={handleInputChange}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <textarea
                          id="address"
                          name="address"
                          value={profile.address}
                          onChange={handleInputChange}
                          className="form-textarea"
                          rows="3"
                        />
                      </div>
                      <button 
                        className="save-button pulse-animation"
                        onClick={handleSave}
                      >
                        Save Changes
                      </button>
                    </>
                  ) : (
                    <div className="profile-info-grid">
                      <div className="info-item">
                        <span className="info-label">Full Name</span>
                        <span className="info-value">{profile.name}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Email Address</span>
                        <span className="info-value">{profile.email}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Phone Number</span>
                        <span className="info-value">{profile.phone}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Address</span>
                        <span className="info-value">{profile.address}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="bookings-section animate-fade-in">
                <h2 className="section-title">My Bookings</h2>
                <div className="bookings-list">
                  {bookings.map((booking, index) => (
                    <div 
                      key={booking.id} 
                      className="booking-card card-hover-animation"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="booking-image-container">
                        <img src={booking.image} alt={booking.vendor} className="booking-image" />
                      </div>
                      <div className="booking-details">
                        <h3 className="booking-vendor">{booking.vendor}</h3>
                        <p className="booking-category">{booking.category}</p>
                        <p className="booking-date">📅 {booking.date}</p>
                        <div className="booking-footer">
                          <span className={`booking-status ${getStatusClass(booking.status)}`}>
                            {booking.status}
                          </span>
                          <span className="booking-price">{booking.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="wishlist-section animate-fade-in">
                <h2 className="section-title">My Wishlist</h2>
                <div className="wishlist-content">
                  <p className="empty-message">You haven't added any vendors to your wishlist yet.</p>
                  <button 
                    className="browse-button pulse-animation"
                    onClick={() => navigate('/search')}
                  >
                    Browse Vendors
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="settings-section animate-fade-in">
                <h2 className="section-title">Account Settings</h2>
                <div className="settings-content">
                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Notifications</h3>
                      <p>Manage your notification preferences</p>
                    </div>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Newsletter</h3>
                      <p>Subscribe to our newsletter for updates</p>
                    </div>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Privacy</h3>
                      <p>Manage your privacy settings</p>
                    </div>
                    <button className="manage-button">Manage</button>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Security</h3>
                      <p>Update your password and security settings</p>
                    </div>
                    <button className="manage-button">Manage</button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CustomerProfile;