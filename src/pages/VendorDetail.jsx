import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/VendorDetail.css';

const VendorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);
  // Booking form state
  const [bookingData, setBookingData] = useState({
    eventDate: '',
    eventTime: '',
    eventType: '',
    venueName: '',
    venueLocation: '',
    clientEmail: '',
    numberOfGuests: '',
    clientName: '',
    clientPhone: '',
    budget: ''
  });

  // Mock vendor data
  useEffect(() => {
    // In a real app, this would come from an API
    const mockVendor = {
      id: parseInt(id),
      name: 'Elegant DJ Services',
      category: 'DJ',
      rating: 4.8,
      reviewsCount: 42,
      price: '$$$',
      location: 'Mumbai',
      description: 'Professional DJ services for weddings with over 10 years of experience. We specialize in creating the perfect atmosphere for your special day with our extensive music library and state-of-the-art equipment.',
      images: [
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
      ],
      services: [
        { name: 'Wedding DJ Services', price: '$500' },
        { name: 'Pre-Wedding Events', price: '$300' },
        { name: 'Post-Wedding Celebration', price: '$400' },
        { name: 'Custom Playlist Creation', price: '$100' }
      ],
      reviews: [
        { id: 1, name: 'Priya Sharma', rating: 5, date: '2024-10-15', comment: 'Amazing service! The DJ made our wedding reception unforgettable.' },
        { id: 2, name: 'Rohan Mehta', rating: 5, date: '2024-09-22', comment: 'Professional and talented. Highly recommend!' },
        { id: 3, name: 'Anita Desai', rating: 4, date: '2024-08-30', comment: 'Great music selection and smooth coordination.' }
      ]
    };
    setVendor(mockVendor);
  }, [id]);

  if (!vendor) {
    return <div className="loading">Loading...</div>;
  }

  const handleBooking = () => {
    setShowBookingModal(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
    // Reset form data when closing
    setBookingData({
      eventDate: '',
      eventTime: '',
      eventType: '',
      venueName: '',
      venueLocation: '',
      clientEmail: '',
      numberOfGuests: '',
      clientName: '',
      clientPhone: '',
      budget: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const confirmBooking = () => {
    // Validate required fields
    if (!bookingData.eventDate || !bookingData.eventTime || !bookingData.eventType || 
        !bookingData.venueName || !bookingData.venueLocation || !bookingData.clientEmail || 
        !bookingData.numberOfGuests || !bookingData.clientName || !bookingData.clientPhone) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // In a real app, this would send booking data to the server
    alert(`Booking confirmed for ${vendor.name}!\n\n` +
          `Event Date: ${bookingData.eventDate}\n` +
          `Event Time: ${bookingData.eventTime}\n` +
          `Event Type: ${bookingData.eventType}\n` +
          `Venue: ${bookingData.venueName}, ${bookingData.venueLocation}\n` +
          `Client: ${bookingData.clientName}\n` +
          `Phone: ${bookingData.clientPhone}\n` +
          `Email: ${bookingData.clientEmail}\n` +
          `Guests: ${bookingData.numberOfGuests}\n` +
          `Budget: ${bookingData.budget || 'Not specified'}`);
          
    setShowBookingModal(false);
    navigate('/checkout');
  };

  return (
    <>
      <Navbar />
      <div className="vendor-detail-container">
        {/* Vendor Header */}
        <section className="vendor-header">
          <div className="vendor-header-content">
            <div className="vendor-info-main">
              <div className="vendor-header-top">
                {/* Filter symbol */}
                <div className="filter-symbol">☰</div>
                <h1 className="vendor-name">{vendor.name}</h1>
              </div>
              <div className="vendor-meta">
                <span className="vendor-category">{vendor.category}</span>
                <div className="rating-container">
                  <span className="rating-stars">
                    {'★'.repeat(Math.floor(vendor.rating))}
                    {'☆'.repeat(5 - Math.floor(vendor.rating))}
                  </span>
                  <span className="rating-text">{vendor.rating} ({vendor.reviewsCount} reviews)</span>
                </div>
                <span className="vendor-price">{vendor.price}</span>
                <span className="vendor-location">📍 {vendor.location}</span>
              </div>
            </div>
            <div className="vendor-header-actions">
              <button className="back-button pulse-animation" onClick={() => navigate(-1)}>
                Back to Search
              </button>
              <button className="book-now-button pulse-animation" onClick={handleBooking}>
                Book Now
              </button>
            </div>
          </div>
        </section>

        <div className="content-wrapper">
          {/* Gallery Section */}
          <section className="gallery-section">
            <div className="main-image-container">
              <img 
                src={vendor.images[selectedImage]} 
                alt={`${vendor.name} showcase`} 
                className="main-image"
              />
            </div>
            <div className="thumbnail-gallery">
              {vendor.images.map((image, index) => (
                <img 
                  key={index}
                  src={image} 
                  alt={`${vendor.name} ${index + 1}`} 
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </section>

          {/* Vendor Details */}
          <section className="vendor-details">
            <div className="detail-card">
              <h2>About {vendor.name}</h2>
              <p className="vendor-description">{vendor.description}</p>
            </div>

            {/* Services */}
            <div className="detail-card">
              <h2>Services & Pricing</h2>
              <div className="services-list">
                {vendor.services.map((service, index) => (
                  <div key={index} className="service-item fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="service-name">{service.name}</div>
                    <div className="service-price">{service.price}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="detail-card">
              <h2>Customer Reviews</h2>
              <div className="reviews-summary">
                <div className="average-rating">
                  <div className="rating-value">{vendor.rating}</div>
                  <div className="rating-stars-large">
                    {'★'.repeat(Math.floor(vendor.rating))}
                    {'☆'.repeat(5 - Math.floor(vendor.rating))}
                  </div>
                  <div className="reviews-count">{vendor.reviewsCount} reviews</div>
                </div>
              </div>
              <div className="reviews-list">
                {vendor.reviews.map((review, index) => (
                  <div key={review.id} className="review-item fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="review-header">
                      <div className="reviewer-info">
                        <h4 className="reviewer-name">{review.name}</h4>
                        <div className="review-date">{review.date}</div>
                      </div>
                      <div className="review-rating">
                        <span className="rating-stars">
                          {'★'.repeat(review.rating)}
                          {'☆'.repeat(5 - review.rating)}
                        </span>
                      </div>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="modal-overlay">
          <div className="booking-modal">
            <div className="modal-header">
              <h2>Book {vendor.name}</h2>
              <button className="close-button" onClick={closeBookingModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="booking-form">
                <div className="form-group">
                  <label>Event Date *</label>
                  <input 
                    type="date" 
                    name="eventDate"
                    value={bookingData.eventDate}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="dd-mm-yyyy"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Event Time *</label>
                  <input 
                    type="time" 
                    name="eventTime"
                    value={bookingData.eventTime}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="--:--"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Event Type (Wedding, Birthday, Meeting, etc.) *</label>
                  <select
                    name="eventType"
                    value={bookingData.eventType}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select Event Type</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Venue Name *</label>
                  <input 
                    type="text" 
                    name="venueName"
                    placeholder="Enter venue name"
                    value={bookingData.venueName}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Venue Location *</label>
                  <input 
                    type="text" 
                    name="venueLocation"
                    placeholder="Enter venue location"
                    value={bookingData.venueLocation}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Client Email *</label>
                  <input 
                    type="email" 
                    name="clientEmail"
                    placeholder="Enter your email"
                    value={bookingData.clientEmail}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Number of Guests *</label>
                  <input 
                    type="number" 
                    name="numberOfGuests"
                    placeholder="Enter number of guests"
                    value={bookingData.numberOfGuests}
                    onChange={handleInputChange}
                    className="form-input"
                    min="1"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Client Name *</label>
                  <input 
                    type="text" 
                    name="clientName"
                    placeholder="Enter your full name"
                    value={bookingData.clientName}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Client Phone Number *</label>
                  <input 
                    type="tel" 
                    name="clientPhone"
                    placeholder="Enter your phone number"
                    value={bookingData.clientPhone}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Budget (optional)</label>
                  <input 
                    type="text" 
                    name="budget"
                    placeholder="Enter your budget (optional)"
                    value={bookingData.budget}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                
                <div className="service-summary">
                  <h3>Service Details</h3>
                  <div className="service-item">
                    <span>Wedding DJ Services</span>
                    <span>$500</span>
                  </div>
                  <div className="total-amount">
                    <strong>Total: $500</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-button" onClick={closeBookingModal}>Cancel</button>
              <button className="confirm-button pulse-animation" onClick={confirmBooking}>Confirm Booking</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default VendorDetail;