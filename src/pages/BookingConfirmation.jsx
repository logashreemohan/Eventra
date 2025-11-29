import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/SearchResults.css';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingData, vendor } = location.state || {};

  const handleBackToSearch = () => {
    navigate('/');
  };

  const handleViewVendor = () => {
    navigate(`/vendor/${vendor?.id}`);
  };

  if (!bookingData || !vendor) {
    return (
      <>
        <Navbar />
        <div className="search-results-container">
          <div className="no-results">
            <h3>Booking details not found</h3>
            <p>It seems there was an issue with your booking.</p>
            <button className="reset-search-button" onClick={handleBackToSearch}>
              Back to Search
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="search-results-container">
        <div className="search-results-header">
          <h1 className="results-title animate-fade-in">Booking Confirmation</h1>
          <button className="back-button pulse-animation" onClick={handleBackToSearch}>
            Back to Search
          </button>
        </div>
        
        <div className="booking-confirmation-card">
          <div className="confirmation-header">
            <h2>Booking Details</h2>
            <p>Thank you for booking with Eventra!</p>
          </div>
          
          <div className="confirmation-details">
            <div className="vendor-info">
              <h3>Vendor Information</h3>
              <div className="vendor-details">
                <p><strong>Name:</strong> {vendor.name}</p>
                <p><strong>Category:</strong> {vendor.vendor}</p>
                <p><strong>Location:</strong> {vendor.city}</p>
                <p><strong>Price Range:</strong> {vendor.price}</p>
              </div>
            </div>
            
            <div className="event-info">
              <h3>Event Information</h3>
              <div className="event-details">
                <p><strong>Event Date:</strong> {bookingData.eventDate}</p>
                <p><strong>Event Time:</strong> {bookingData.eventTime}</p>
                <p><strong>Event Type:</strong> {bookingData.eventType}</p>
                <p><strong>Venue Name:</strong> {bookingData.venueName}</p>
                <p><strong>Venue Location:</strong> {bookingData.venueLocation}</p>
                <p><strong>Number of Guests:</strong> {bookingData.numberOfGuests}</p>
              </div>
            </div>
            
            <div className="client-info">
              <h3>Client Information</h3>
              <div className="client-details">
                <p><strong>Client Name:</strong> {bookingData.clientName}</p>
                <p><strong>Client Email:</strong> {bookingData.clientEmail}</p>
                <p><strong>Client Phone:</strong> {bookingData.clientPhone}</p>
                <p><strong>Budget:</strong> {bookingData.budget || 'Not specified'}</p>
              </div>
            </div>
          </div>
          
          <div className="confirmation-actions">
            <button className="view-vendor-button pulse-animation" onClick={handleViewVendor}>
              View Vendor Details
            </button>
            <button className="back-to-search-button pulse-animation" onClick={handleBackToSearch}>
              Back to Search
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookingConfirmation;