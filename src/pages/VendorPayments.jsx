import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './VendorPayments.css';

const VendorPayments = () => {
  const navigate = useNavigate();
  
  // Mock payment data
  const [payments] = useState([
    {
      id: 1,
      customerName: 'Priya Sharma',
      bookingDate: '2024-11-15',
      eventDate: '2025-03-20',
      amount: '₹50,000',
      commission: '₹2,500',
      netAmount: '₹47,500',
      status: 'Paid',
      paymentDate: '2024-11-20'
    },
    {
      id: 2,
      customerName: 'Rahul Mehta',
      bookingDate: '2024-11-10',
      eventDate: '2025-02-15',
      amount: '₹35,000',
      commission: '₹1,750',
      netAmount: '₹33,250',
      status: 'Pending',
      paymentDate: '-'
    },
    {
      id: 3,
      customerName: 'Anjali Verma',
      bookingDate: '2024-11-05',
      eventDate: '2025-01-30',
      amount: '₹25,000',
      commission: '₹1,250',
      netAmount: '₹23,750',
      status: 'Paid',
      paymentDate: '2024-11-10'
    },
    {
      id: 4,
      customerName: 'Suresh Kumar',
      bookingDate: '2024-11-01',
      eventDate: '2025-04-10',
      amount: '₹75,000',
      commission: '₹3,750',
      netAmount: '₹71,250',
      status: 'Cancelled',
      paymentDate: '-'
    }
  ]);

  // Summary data
  const [summary] = useState({
    totalRevenue: '₹1,85,000',
    totalCommission: '₹9,250',
    netEarnings: '₹1,75,750',
    pendingPayments: '₹33,250'
  });

  // Filter states
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');

  // Filter payments based on selected filters
  const filteredPayments = payments.filter(payment => {
    return (
      (statusFilter === 'All' || payment.status === statusFilter) &&
      (dateFilter === 'All' || 
        (dateFilter === 'This Month' && new Date(payment.bookingDate).getMonth() === new Date().getMonth()) ||
        (dateFilter === 'Last Month' && new Date(payment.bookingDate).getMonth() === new Date().getMonth() - 1))
    );
  });

  // Handle export
  const handleExport = () => {
    // In a real app, this would export the data to CSV or PDF
    alert('Export functionality would be implemented here');
  };

  return (
    <>
      <Navbar />
      <div className="vendor-payments-container">
        <div className="payments-header">
          <h1>Payment Status</h1>
          <p>Track your earnings, commissions, and payouts</p>
        </div>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="summary-card">
            <h3>Total Revenue</h3>
            <div className="summary-value">{summary.totalRevenue}</div>
            <div className="summary-description">Total amount from bookings</div>
          </div>
          <div className="summary-card">
            <h3>Platform Commission</h3>
            <div className="summary-value negative">{summary.totalCommission}</div>
            <div className="summary-description">5% commission on bookings</div>
          </div>
          <div className="summary-card">
            <h3>Net Earnings</h3>
            <div className="summary-value positive">{summary.netEarnings}</div>
            <div className="summary-description">Your earnings after commission</div>
          </div>
          <div className="summary-card">
            <h3>Pending Payments</h3>
            <div className="summary-value">{summary.pendingPayments}</div>
            <div className="summary-description">Awaiting payment release</div>
          </div>
        </div>

        {/* Filters */}
        <div className="payments-filters">
          <div className="filter-group">
            <label htmlFor="statusFilter">Payment Status</label>
            <select 
              id="statusFilter" 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="dateFilter">Booking Date</label>
            <select 
              id="dateFilter" 
              value={dateFilter} 
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="All">All Dates</option>
              <option value="This Month">This Month</option>
              <option value="Last Month">Last Month</option>
            </select>
          </div>
          
          <div className="filter-actions">
            <button className="export-btn" onClick={handleExport}>
              Export Data
            </button>
          </div>
        </div>

        {/* Payments Table */}
        <div className="payments-table-container">
          <div className="table-header">
            <h2>{filteredPayments.length} Payments Found</h2>
          </div>
          
          <div className="payments-table-wrapper">
            <table className="payments-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Booking Date</th>
                  <th>Event Date</th>
                  <th>Amount</th>
                  <th>Commission</th>
                  <th>Net Amount</th>
                  <th>Status</th>
                  <th>Payment Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map(payment => (
                  <tr key={payment.id}>
                    <td>
                      <div className="customer-name">{payment.customerName}</div>
                    </td>
                    <td>{payment.bookingDate}</td>
                    <td>{payment.eventDate}</td>
                    <td>{payment.amount}</td>
                    <td className="negative">{payment.commission}</td>
                    <td className="positive">{payment.netAmount}</td>
                    <td>
                      <span className={`status-badge ${payment.status.toLowerCase()}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td>{payment.paymentDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payout Information */}
        <div className="payout-info">
          <h2>Payout Schedule</h2>
          <div className="payout-details">
            <p>Payments are released on the 5th of each month for bookings completed in the previous month.</p>
            <p>Next payout date: <strong>December 5, 2024</strong></p>
            <div className="payout-method">
              <h3>Payout Method</h3>
              <div className="bank-info">
                <div className="bank-name">Bank of India</div>
                <div className="account-number">**** **** **** 4567</div>
                <button className="update-bank-btn">Update Bank Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VendorPayments;