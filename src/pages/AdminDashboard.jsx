import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // Mock statistics data
  const [stats] = useState([
    { id: 1, title: 'Total Vendors', value: 245, change: '+12%' },
    { id: 2, title: 'Total Customers', value: 1250, change: '+8%' },
    { id: 3, title: 'Total Bookings', value: 890, change: '+15%' },
    { id: 4, title: 'Revenue', value: '₹2,45,00,000', change: '+22%' }
  ]);

  // Mock recent activity
  const [recentActivity] = useState([
    {
      id: 1,
      action: 'New vendor registered',
      description: 'Royal Wedding Planners has registered',
      time: '2 hours ago',
      type: 'vendor'
    },
    {
      id: 2,
      action: 'New booking',
      description: 'Priya Sharma booked Elegant Decorators',
      time: '4 hours ago',
      type: 'booking'
    },
    {
      id: 3,
      action: 'Vendor approved',
      description: 'Approved Divine Caterers',
      time: '1 day ago',
      type: 'approval'
    },
    {
      id: 4,
      action: 'New customer',
      description: 'Suresh Kumar joined Eventra',
      time: '1 day ago',
      type: 'customer'
    }
  ]);

  // Mock chart data
  const [chartData] = useState([
    { month: 'Jan', vendors: 20, customers: 120, bookings: 45 },
    { month: 'Feb', vendors: 35, customers: 180, bookings: 78 },
    { month: 'Mar', vendors: 42, customers: 240, bookings: 110 },
    { month: 'Apr', vendors: 58, customers: 310, bookings: 156 },
    { month: 'May', vendors: 75, customers: 420, bookings: 210 },
    { month: 'Jun', vendors: 95, customers: 560, bookings: 280 }
  ]);

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <Navbar />
      <div className="admin-dashboard-container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Welcome back, Administrator</p>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          {stats.map(stat => (
            <div key={stat.id} className="stat-card">
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
            <div className="quick-actions-card">
              <h2>Quick Actions</h2>
              <div className="actions-grid">
                <button className="action-btn" onClick={() => handleNavigation('/admin/vendors')}>
                  <span className="action-icon">🏢</span>
                  <span>Manage Vendors</span>
                </button>
                <button className="action-btn" onClick={() => handleNavigation('/admin/customers')}>
                  <span className="action-icon">👥</span>
                  <span>Manage Customers</span>
                </button>
                <button className="action-btn">
                  <span className="action-icon">📊</span>
                  <span>View Reports</span>
                </button>
                <button className="action-btn">
                  <span className="action-icon">⚙️</span>
                  <span>System Settings</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="recent-activity-card">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className={`activity-icon ${activity.type}`}>
                      {activity.type === 'vendor' && '🏢'}
                      {activity.type === 'booking' && '📅'}
                      {activity.type === 'approval' && '✅'}
                      {activity.type === 'customer' && '👤'}
                    </div>
                    <div className="activity-content">
                      <p className="activity-action">{activity.action}</p>
                      <p className="activity-description">{activity.description}</p>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="dashboard-right-column">
            {/* Performance Chart */}
            <div className="performance-card">
              <div className="card-header">
                <h2>Platform Growth</h2>
                <div className="chart-legend">
                  <div className="legend-item">
                    <div className="legend-color vendors"></div>
                    <span>Vendors</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color customers"></div>
                    <span>Customers</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color bookings"></div>
                    <span>Bookings</span>
                  </div>
                </div>
              </div>
              <div className="chart-placeholder">
                <div className="chart-bars">
                  {chartData.map((data, index) => (
                    <div key={index} className="chart-bar-group">
                      <div 
                        className="chart-bar vendors" 
                        style={{ height: `${(data.vendors / 100) * 100}%` }}
                      >
                        <span className="bar-value">{data.vendors}</span>
                      </div>
                      <div 
                        className="chart-bar customers" 
                        style={{ height: `${(data.customers / 600) * 100}%` }}
                      >
                        <span className="bar-value">{data.customers}</span>
                      </div>
                      <div 
                        className="chart-bar bookings" 
                        style={{ height: `${(data.bookings / 300) * 100}%` }}
                      >
                        <span className="bar-value">{data.bookings}</span>
                      </div>
                      <span className="bar-label">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Categories */}
            <div className="top-categories-card">
              <h2>Top Vendor Categories</h2>
              <div className="categories-list">
                <div className="category-item">
                  <span className="category-name">Wedding Planners</span>
                  <span className="category-count">42 vendors</span>
                </div>
                <div className="category-item">
                  <span className="category-name">Photographers</span>
                  <span className="category-count">38 vendors</span>
                </div>
                <div className="category-item">
                  <span className="category-name">Decorators</span>
                  <span className="category-count">35 vendors</span>
                </div>
                <div className="category-item">
                  <span className="category-name">Caterers</span>
                  <span className="category-count">29 vendors</span>
                </div>
                <div className="category-item">
                  <span className="category-name">Makeup Artists</span>
                  <span className="category-count">27 vendors</span>
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

export default AdminDashboard;