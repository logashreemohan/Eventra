import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ManageCustomers.css';

const ManageCustomers = () => {
  const navigate = useNavigate();
  
  // Mock customer data
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 98765 43210',
      location: 'Mumbai',
      status: 'Active',
      joinDate: '2024-01-15',
      totalBookings: 3,
      totalSpent: '₹1,25,000'
    },
    {
      id: 2,
      name: 'Rahul Mehta',
      email: 'rahul.mehta@email.com',
      phone: '+91 98765 43211',
      location: 'Delhi',
      status: 'Active',
      joinDate: '2024-02-20',
      totalBookings: 2,
      totalSpent: '₹85,000'
    },
    {
      id: 3,
      name: 'Anjali Verma',
      email: 'anjali.verma@email.com',
      phone: '+91 98765 43212',
      location: 'Bangalore',
      status: 'Inactive',
      joinDate: '2024-03-10',
      totalBookings: 1,
      totalSpent: '₹45,000'
    },
    {
      id: 4,
      name: 'Suresh Kumar',
      email: 'suresh.kumar@email.com',
      phone: '+91 98765 43213',
      location: 'Chennai',
      status: 'Active',
      joinDate: '2024-04-05',
      totalBookings: 4,
      totalSpent: '₹1,85,000'
    },
    {
      id: 5,
      name: 'Meera Patel',
      email: 'meera.patel@email.com',
      phone: '+91 98765 43214',
      location: 'Pune',
      status: 'Suspended',
      joinDate: '2024-05-12',
      totalBookings: 0,
      totalSpent: '₹0'
    }
  ]);

  // Filter states
  const [statusFilter, setStatusFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Handle status change
  const handleStatusChange = (customerId, newStatus) => {
    setCustomers(customers.map(customer => 
      customer.id === customerId ? { ...customer, status: newStatus } : customer
    ));
  };

  // Filter customers based on selected filters
  const filteredCustomers = customers.filter(customer => {
    return (
      (statusFilter === 'All' || customer.status === statusFilter) &&
      (locationFilter === 'All' || customer.location === locationFilter) &&
      (searchTerm === '' || 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Handle view details
  const handleViewDetails = (customerId) => {
    // In a real app, this would navigate to a detailed view
    alert(`Viewing details for customer ID: ${customerId}`);
  };

  // Handle suspend
  const handleSuspend = (customerId) => {
    handleStatusChange(customerId, 'Suspended');
    alert(`Customer suspended successfully!`);
  };

  // Handle activate
  const handleActivate = (customerId) => {
    handleStatusChange(customerId, 'Active');
    alert(`Customer activated successfully!`);
  };

  return (
    <>
      <Navbar />
      <div className="manage-customers-container">
        <div className="customers-header">
          <h1>Manage Customers</h1>
          <p>View and manage customer accounts</p>
        </div>

        {/* Filters */}
        <div className="customers-filters">
          <div className="filter-group">
            <label htmlFor="statusFilter">Status</label>
            <select 
              id="statusFilter" 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="locationFilter">Location</label>
            <select 
              id="locationFilter" 
              value={locationFilter} 
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="All">All Locations</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Chennai">Chennai</option>
              <option value="Pune">Pune</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="search">Search</label>
            <input 
              type="text" 
              id="search" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Customers Table */}
        <div className="customers-table-container">
          <div className="table-header">
            <h2>{filteredCustomers.length} Customers Found</h2>
          </div>
          
          <div className="customers-table-wrapper">
            <table className="customers-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Join Date</th>
                  <th>Bookings</th>
                  <th>Total Spent</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map(customer => (
                  <tr key={customer.id}>
                    <td>
                      <div className="customer-info">
                        <div className="customer-name">{customer.name}</div>
                        <div className="customer-email">{customer.email}</div>
                      </div>
                    </td>
                    <td>
                      <div className="contact-info">
                        <div className="phone">{customer.phone}</div>
                      </div>
                    </td>
                    <td>{customer.location}</td>
                    <td>
                      <span className={`status-badge ${customer.status.toLowerCase()}`}>
                        {customer.status}
                      </span>
                    </td>
                    <td>{customer.joinDate}</td>
                    <td>{customer.totalBookings}</td>
                    <td>{customer.totalSpent}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="view-btn" 
                          onClick={() => handleViewDetails(customer.id)}
                        >
                          View
                        </button>
                        {customer.status === 'Active' && (
                          <button 
                            className="suspend-btn"
                            onClick={() => handleSuspend(customer.id)}
                          >
                            Suspend
                          </button>
                        )}
                        {(customer.status === 'Inactive' || customer.status === 'Suspended') && (
                          <button 
                            className="activate-btn"
                            onClick={() => handleActivate(customer.id)}
                          >
                            Activate
                          </button>
                        )}
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
            <h3>Total Customers</h3>
            <div className="summary-value">{customers.length}</div>
          </div>
          <div className="summary-card">
            <h3>Active</h3>
            <div className="summary-value">
              {customers.filter(c => c.status === 'Active').length}
            </div>
          </div>
          <div className="summary-card">
            <h3>Inactive</h3>
            <div className="summary-value">
              {customers.filter(c => c.status === 'Inactive').length}
            </div>
          </div>
          <div className="summary-card">
            <h3>Suspended</h3>
            <div className="summary-value">
              {customers.filter(c => c.status === 'Suspended').length}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ManageCustomers;