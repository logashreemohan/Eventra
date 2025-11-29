import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentGateway from '../components/PaymentGateway';
import '../styles/Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    specialRequests: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState('');

  // Mock booking data (in a real app, this would come from the booking context or API)
  const bookingData = {
    vendorName: 'Royal Wedding Planners',
    service: 'Wedding Planning Package',
    date: '2025-03-15',
    guests: 150,
    amount: 50000 // ₹50,000
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentSuccess = (response) => {
    console.log('Payment successful:', response);
    setPaymentSuccess(true);
    // In a real app, you would save the booking to the database here
    setTimeout(() => {
      setBookingConfirmed(true);
    }, 2000);
  };

  const handlePaymentError = (error) => {
    console.error('Payment failed:', error);
    setError('Payment failed. Please try again.');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would validate the form and save customer info here
    console.log('Form submitted:', formData);
  };

  if (bookingConfirmed) {
    return (
      <div className="checkout-container">
        <div className="confirmation-page">
          <div className="confirmation-icon">✓</div>
          <h2>Booking Confirmed!</h2>
          <p>Your booking with {bookingData.vendorName} has been confirmed.</p>
          <p>A confirmation email has been sent to {formData.email}.</p>
          <button 
            className="btn-primary" 
            onClick={() => navigate('/profile')}
          >
            View My Bookings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <p>Complete your booking with {bookingData.vendorName}</p>
      </div>

      <div className="checkout-content">
        {/* Order Summary */}
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-item">
            <span>Service:</span>
            <span>{bookingData.service}</span>
          </div>
          <div className="summary-item">
            <span>Date:</span>
            <span>{bookingData.date}</span>
          </div>
          <div className="summary-item">
            <span>Guests:</span>
            <span>{bookingData.guests}</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-total">
            <span>Total Amount:</span>
            <span>₹{bookingData.amount.toLocaleString()}</span>
          </div>
        </div>

        {/* Customer Information */}
        <div className="checkout-form">
          <h2>Customer Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                rows="3"
              ></textarea>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="zipCode">ZIP Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="specialRequests">Special Requests (Optional)</label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                rows="3"
              ></textarea>
            </div>
            
            <h2>Payment Method</h2>
            <div className="payment-methods">
              <div className="payment-option">
                <input
                  type="radio"
                  id="razorpay"
                  name="paymentMethod"
                  value="razorpay"
                  checked={paymentMethod === 'razorpay'}
                  onChange={() => setPaymentMethod('razorpay')}
                />
                <label htmlFor="razorpay">Razorpay (Credit Card, Debit Card, Net Banking, UPI)</label>
              </div>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <div className="payment-section">
              <PaymentGateway 
                amount={bookingData.amount}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;