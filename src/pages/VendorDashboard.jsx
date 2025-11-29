import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './VendorDashboard.css';

const VendorDashboard = () => {
  const navigate = useNavigate();
  
  // Mock vendor data
  const vendor = {
    name: 'Royal Wedding Planners',
    category: 'Wedding Planners',
    rating: 4.8,
    totalBookings: 124,
    profileImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
  };

  // Mock statistics data
  const [stats] = useState([
    { id: 1, title: 'Total Bookings', value: 124, change: '+12%' },
    { id: 2, title: 'Revenue', value: '₹12,50,000', change: '+8%' },
    { id: 3, title: 'Avg. Rating', value: '4.8', change: '+0.2' },
    { id: 4, title: 'Pending Requests', value: 8, change: '-3' }
  ]);

  // Mock recent bookings
  const [recentBookings] = useState([
    {
      id: 1,
      customerName: 'Priya Sharma',
      bookingDate: '2024-11-15',
      eventDate: '2025-03-20',
      status: 'Confirmed',
      amount: '₹50,000'
    },
    {
      id: 2,
      customerName: 'Rahul Mehta',
      bookingDate: '2024-11-10',
      eventDate: '2025-02-15',
      status: 'Pending',
      amount: '₹35,000'
    },
    {
      id: 3,
      customerName: 'Anjali Verma',
      bookingDate: '2024-11-05',
      eventDate: '2025-01-30',
      status: 'Completed',
      amount: '₹45,000'
    }
  ]);

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <Navbar />
      <div className="vendor-dashboard-container">
        <div className="dashboard-header">
          <div className="vendor-info">
            <img src={vendor.profileImage} alt={vendor.name} className="vendor-avatar" />
            <div>
              <h1 className="vendor-name">{vendor.name}</h1>
              <p className="vendor-category">{vendor.category}</p>
              <div className="vendor-rating">
                {'★'.repeat(Math.floor(vendor.rating))}
                {'☆'.repeat(5 - Math.floor(vendor.rating))}
                <span className="rating-value">{vendor.rating}</span>
              </div>
            </div>
          </div>
          <div className="dashboard-actions">
            <button className="view-profile-btn pulse-animation" onClick={() => handleNavigation('/vendor-profile')}>
              View Public Profile
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={stat.id} className="stat-card card-hover-animation" style={{ animationDelay: `${index * 0.1}s` }}>
              <h3>{stat.title}</h3>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-change">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="dashboard-content">
          {/* Left Column */}
          <div className="dashboard-left-column">
            {/* Quick Actions */}
            <div className="quick-actions-card animate-fade-in">
              <h2>Quick Actions</h2>
              <div className="actions-grid">
                <button className="action-btn pulse-animation" onClick={() => handleNavigation('/vendor/profile')}>
                  <span className="action-icon">👤</span>
                  <span>Edit Profile</span>
                </button>
                <button className="action-btn pulse-animation" onClick={() => handleNavigation('/vendor/bookings')}>
                  <span className="action-icon">📅</span>
                  <span>Manage Bookings</span>
                </button>
                <button className="action-btn pulse-animation" onClick={() => handleNavigation('/vendor/payments')}>
                  <span className="action-icon">💰</span>
                  <span>Payment Status</span>
                </button>
                <button className="action-btn pulse-animation">
                  <span className="action-icon">📊</span>
                  <span>View Analytics</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="recent-activity-card animate-fade-in-delay">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                <div className="activity-item fade-in-up">
                  <div className="activity-icon">📋</div>
                  <div className="activity-content">
                    <p>New booking request from Priya Sharma</p>
                    <span className="activity-time">2 hours ago</span>
                  </div>
                </div>
                <div className="activity-item fade-in-up-delay">
                  <div className="activity-icon">⭐</div>
                  <div className="activity-content">
                    <p>You received a 5-star review from Rahul Mehta</p>
                    <span className="activity-time">1 day ago</span>
                  </div>
                </div>
                <div className="activity-item fade-in-up-delay-2">
                  <div className="activity-icon">💳</div>
                  <div className="activity-content">
                    <p>Payment of ₹35,000 received for Anjali Verma</p>
                    <span className="activity-time">2 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="dashboard-right-column">
            {/* Recent Bookings */}
            <div className="recent-bookings-card animate-fade-in-delay-2">
              <div className="card-header">
                <h2>Recent Bookings</h2>
                <button className="view-all-btn pulse-animation" onClick={() => handleNavigation('/vendor/bookings')}>
                  View All
                </button>
              </div>
              <div className="bookings-table">
                <table>
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Event Date</th>
                      <th>Status</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map(booking => (
                      <tr key={booking.id}>
                        <td>{booking.customerName}</td>
                        <td>{booking.eventDate}</td>
                        <td>
                          <span className={`status-badge ${booking.status.toLowerCase()}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td>{booking.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="performance-card animate-fade-in-delay-3">
              <h2>Monthly Performance</h2>
              <div className="chart-placeholder">
                <div className="chart-bars">
                  {[40, 60, 75, 50, 80, 90, 65].map((height, index) => (
                    <div key={index} className="chart-bar" style={{ height: `${height}%` }}>
                      <span className="bar-value">{height}%</span>
                    </div>
                  ))}
                </div>
                <div className="chart-labels">
                  <span>Oct</span>
                  <span>Nov</span>
                  <span>Dec</span>
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VendorDashboard;