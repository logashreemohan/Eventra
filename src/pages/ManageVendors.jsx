import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ManageVendors.css';

const ManageVendors = () => {
  const navigate = useNavigate();
  
  // Mock vendor data
  const [vendors, setVendors] = useState([
    {
      id: 1,
      name: 'Royal Wedding Planners',
      category: 'Wedding Planners',
      email: 'contact@royalweddingplanners.com',
      phone: '+91 98765 43210',
      location: 'Mumbai',
      status: 'Approved',
      joinDate: '2024-01-15',
      rating: 4.8,
      totalBookings: 42
    },
    {
      id: 2,
      name: 'Elegant Decorators',
      category: 'Decor',
      email: 'info@elegantdecorators.com',
      phone: '+91 98765 43211',
      location: 'Delhi',
      status: 'Approved',
      joinDate: '2024-02-20',
      rating: 4.6,
      totalBookings: 38
    },
    {
      id: 3,
      name: 'Capture Moments Photography',
      category: 'Photographer',
      email: 'hello@capturemoments.com',
      phone: '+91 98765 43212',
      location: 'Bangalore',
      status: 'Pending',
      joinDate: '2024-03-10',
      rating: 0,
      totalBookings: 0
    },
    {
      id: 4,
      name: 'Divine Caterers',
      category: 'Food & Catering',
      email: 'orders@divinecaterers.com',
      phone: '+91 98765 43213',
      location: 'Chennai',
      status: 'Approved',
      joinDate: '2024-04-05',
      rating: 4.7,
      totalBookings: 29
    },
    {
      id: 5,
      name: 'Bridal Beauty Studio',
      category: 'Makeup Artist',
      email: 'appointments@bridalbeauty.com',
      phone: '+91 98765 43214',
      location: 'Pune',
      status: 'Rejected',
      joinDate: '2024-05-12',
      rating: 0,
      totalBookings: 0
    }
  ]);

  // Filter states
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Handle status change
  const handleStatusChange = (vendorId, newStatus) => {
    setVendors(vendors.map(vendor => 
      vendor.id === vendorId ? { ...vendor, status: newStatus } : vendor
    ));
  };

  // Filter vendors based on selected filters
  const filteredVendors = vendors.filter(vendor => {
    return (
      (statusFilter === 'All' || vendor.status === statusFilter) &&
      (categoryFilter === 'All' || vendor.category === categoryFilter) &&
      (searchTerm === '' || 
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Handle view details
  const handleViewDetails = (vendorId) => {
    // In a real app, this would navigate to a detailed view
    alert(`Viewing details for vendor ID: ${vendorId}`);
  };

  // Handle approve
  const handleApprove = (vendorId) => {
    handleStatusChange(vendorId, 'Approved');
    alert(`Vendor approved successfully!`);
  };

  // Handle reject
  const handleReject = (vendorId) => {
    handleStatusChange(vendorId, 'Rejected');
    alert(`Vendor rejected!`);
  };

  return (
    <>
      <Navbar />
      <div className="manage-vendors-container">
        <div className="vendors-header">
          <h1>Manage Vendors</h1>
          <p>Approve, reject, or manage vendor accounts</p>
        </div>

        {/* Filters */}
        <div className="vendors-filters">
          <div className="filter-group">
            <label htmlFor="statusFilter">Status</label>
            <select 
              id="statusFilter" 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="categoryFilter">Category</label>
            <select 
              id="categoryFilter" 
              value={categoryFilter} 
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Wedding Planners">Wedding Planners</option>
              <option value="Decor">Decor</option>
              <option value="Photographer">Photographer</option>
              <option value="Food & Catering">Food & Catering</option>
              <option value="Makeup Artist">Makeup Artist</option>
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

        {/* Vendors Table */}
        <div className="vendors-table-container">
          <div className="table-header">
            <h2>{filteredVendors.length} Vendors Found</h2>
          </div>
          
          <div className="vendors-table-wrapper">
            <table className="vendors-table">
              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Category</th>
                  <th>Contact</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Rating</th>
                  <th>Bookings</th>
                  <th>Join Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.map(vendor => (
                  <tr key={vendor.id}>
                    <td>
                      <div className="vendor-info">
                        <div className="vendor-name">{vendor.name}</div>
                        <div className="vendor-email">{vendor.email}</div>
                      </div>
                    </td>
                    <td>{vendor.category}</td>
                    <td>
                      <div className="contact-info">
                        <div className="phone">{vendor.phone}</div>
                      </div>
                    </td>
                    <td>{vendor.location}</td>
                    <td>
                      <span className={`status-badge ${vendor.status.toLowerCase()}`}>
                        {vendor.status}
                      </span>
                    </td>
                    <td>
                      {vendor.rating > 0 ? (
                        <div className="rating-display">
                          {'★'.repeat(Math.floor(vendor.rating))}
                          {'☆'.repeat(5 - Math.floor(vendor.rating))}
                          <span className="rating-value">{vendor.rating}</span>
                        </div>
                      ) : (
                        <span className="no-rating">-</span>
                      )}
                    </td>
                    <td>{vendor.totalBookings}</td>
                    <td>{vendor.joinDate}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="view-btn" 
                          onClick={() => handleViewDetails(vendor.id)}
                        >
                          View
                        </button>
                        {vendor.status === 'Pending' && (
                          <>
                            <button 
                              className="approve-btn"
                              onClick={() => handleApprove(vendor.id)}
                            >
                              Approve
                            </button>
                            <button 
                              className="reject-btn"
                              onClick={() => handleReject(vendor.id)}
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {vendor.status === 'Approved' && (
                          <button 
                            className="suspend-btn"
                            onClick={() => handleStatusChange(vendor.id, 'Suspended')}
                          >
                            Suspend
                          </button>
                        )}
                        {vendor.status === 'Rejected' && (
                          <button 
                            className="approve-btn"
                            onClick={() => handleApprove(vendor.id)}
                          >
                            Re-approve
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
            <h3>Total Vendors</h3>
            <div className="summary-value">{vendors.length}</div>
          </div>
          <div className="summary-card">
            <h3>Approved</h3>
            <div className="summary-value">
              {vendors.filter(v => v.status === 'Approved').length}
            </div>
          </div>
          <div className="summary-card">
            <h3>Pending Approval</h3>
            <div className="summary-value">
              {vendors.filter(v => v.status === 'Pending').length}
            </div>
          </div>
          <div className="summary-card">
            <h3>Rejected</h3>
            <div className="summary-value">
              {vendors.filter(v => v.status === 'Rejected').length}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ManageVendors;