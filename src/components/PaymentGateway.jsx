import React, { useState } from 'react';
import { paymentAPI } from '../services/api';

const PaymentGateway = ({ amount, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      // Load Razorpay script
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        throw new Error('Failed to load payment gateway. Please try again.');
      }

      // Create order
      const { data, error } = await paymentAPI.createOrder({
        amount: amount,
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        notes: {
          description: 'Eventra Booking Payment'
        }
      });

      if (error) {
        throw new Error(error);
      }

      // Initialize Razorpay payment
      const options = {
        key: process.env.RAZORPAY_KEY_ID || 'rzp_test_your_key_id', // Replace with your Razorpay Key ID
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'Eventra',
        description: 'Wedding Service Booking',
        order_id: data.order.id,
        handler: async function (response) {
          // Verify payment
          const verifyResult = await paymentAPI.verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          });

          if (verifyResult.data && verifyResult.data.verified) {
            onSuccess(response);
          } else {
            onError(new Error('Payment verification failed'));
          }
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#3399cc'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'Payment failed. Please try again.');
      onError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-gateway">
      {error && <div className="error-message">{error}</div>}
      <button 
        className="payment-button" 
        onClick={handlePayment} 
        disabled={loading}
      >
        {loading ? 'Processing...' : `Pay ₹${amount.toLocaleString()}`}
      </button>
    </div>
  );
};

export default PaymentGateway;