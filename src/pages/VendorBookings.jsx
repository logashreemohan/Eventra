import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './VendorBookings.css';

const VendorBookings = () => {
  const navigate = useNavigate();
  
  // Mock bookings data
  const [bookings, setBookings] = useState([
    {
      id: 1,
      customerName: 'Priya Sharma',
      customerEmail: 'priya.sharma@email.com',
      customerPhone: '+91 98765 43210',
      bookingDate: '2024-11-15',
      eventDate: '2025-03-20',
      service: 'Full Wedding Planning',
      package: 'Premium Package',
      status: 'Confirmed',
      amount: '₹50,000',
      notes: 'Special request for floral arrangements'
    },
    {
      id: 2,
      customerName: 'Rahul Mehta',
      customerEmail: 'rahul.mehta@email.com',
      customerPhone: '+91 98765 43211',
      bookingDate: '2024-11-10',
      eventDate: '2025-02-15',
      service: 'Partial Planning',
      package: 'Standard Package',
      status: 'Pending',
      amount: '₹35,000',
      notes: 'Needs venue recommendation'
    },
    {
      id: 3,
      customerName: 'Anjali Verma',
      customerEmail: 'anjali.verma@email.com',
      customerPhone: '+91 98765 43212',
      bookingDate: '2024-11-05',
      eventDate: '2025-01-30',
      service: 'Day-of Coordination',
      package: 'Basic Package',
      status: 'Completed',
      amount: '₹25,000',
      notes: 'Very satisfied with service'
    },
    {
      id: 4,
      customerName: 'Suresh Kumar',
      customerEmail: 'suresh.kumar@email.com',
      customerPhone: '+91 98765 43213',
      bookingDate: '2024-11-01',
      eventDate: '2025-04-10',
      service: 'Full Wedding Planning',
      package: 'Deluxe Package',
      status: 'Cancelled',
      amount: '₹75,000',
      notes: 'Changed wedding plans'
    }
  ]);

  // Filter states
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');

  // Handle status change
  const handleStatusChange = (bookingId, newStatus) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
  };

  // Filter bookings based on selected filters
  const filteredBookings = bookings.filter(booking => {
    return (
      (statusFilter === 'All' || booking.status === statusFilter) &&
      (dateFilter === 'All' || 
        (dateFilter === 'This Month' && new Date(booking.eventDate).getMonth() === new Date().getMonth()) ||
        (dateFilter === 'Next Month' && new Date(booking.eventDate).getMonth() === new Date().getMonth() + 1))
    );
  });

  // Handle view details
  const handleViewDetails = (bookingId) => {
    // In a real app, this would navigate to a detailed view
    alert(`Viewing details for booking ID: ${bookingId}`);
  };

  return (
    <>
      <Navbar />
      <div className="vendor-bookings-container">
        <div className="bookings-header">
          <h1>Manage Bookings</h1>
          <p>View and manage all your customer bookings</p>
        </div>

        {/* Filters */}
        <div className="bookings-filters">
          <div className="filter-group">
            <label htmlFor="statusFilter">Status</label>
            <select 
              id="statusFilter" 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="dateFilter">Event Date</label>
            <select 
              id="dateFilter" 
              value={dateFilter} 
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="All">All Dates</option>
              <option value="This Month">This Month</option>
              <option value="Next Month">Next Month</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="search">Search</label>
            <input 
              type="text" 
              id="search" 
              placeholder="Search by customer name..." 
            />
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bookings-table-container">
          <div className="table-header">
            <h2>{filteredBookings.length} Bookings Found</h2>
          </div>
          
          <div className="bookings-table-wrapper">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Booking Date</th>
                  <th>Event Date</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map(booking => (
                  <tr key={booking.id}>
                    <td>
                      <div className="customer-info">
                        <div className="customer-name">{booking.customerName}</div>
                        <div className="customer-contact">{booking.customerEmail}</div>
                        <div className="customer-contact">{booking.customerPhone}</div>
                      </div>
                    </td>
                    <td>{booking.bookingDate}</td>
                    <td>{booking.eventDate}</td>
                    <td>
                      <div className="service-info">
                        <div className="service-name">{booking.service}</div>
                        <div className="package-name">{booking.package}</div>
                      </div>
                    </td>
                    <td>
                      <select 
                        value={booking.status} 
                        onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                        className={`status-select ${booking.status.toLowerCase()}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>{booking.amount}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="view-btn" 
                          onClick={() => handleViewDetails(booking.id)}
                        >
                          View
                        </button>
                        <button 
                          className="message-btn"
                          onClick={() => alert(`Messaging ${booking.customerName}`)}
                        >
                          Message
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="summary-card">
            <h3>Total Bookings</h3>
            <div className="summary-value">{bookings.length}</div>
          </div>
          <div className="summary-card">
            <h3>Confirmed</h3>
            <div className="summary-value">
              {bookings.filter(b => b.status === 'Confirmed').length}
            </div>
          </div>
          <div className="summary-card">
            <h3>Pending</h3>
            <div className="summary-value">
              {bookings.filter(b => b.status === 'Pending').length}
            </div>
          </div>
          <div className="summary-card">
            <h3>Revenue</h3>
            <div className="summary-value">
              ₹{bookings
                .filter(b => b.status !== 'Cancelled')
                .reduce((sum, booking) => sum + parseInt(booking.amount.replace(/[^\d]/g, '')), 0)
                .toLocaleString()}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VendorBookings;