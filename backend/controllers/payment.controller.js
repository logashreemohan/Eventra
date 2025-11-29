import Razorpay from 'razorpay';
import crypto from 'crypto';
import db from '../config/db.js';

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create a new payment order
const createOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt, notes } = req.body;

    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    // Create order options
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      notes: notes || {}
    };

    // Create order using Razorpay API
    const order = await razorpay.orders.create(options);

    // Save order to database
    const result = await db.query(
      'INSERT INTO payments (order_id, amount, currency, receipt, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [order.id, amount, currency, order.receipt, 'created']
    );

    res.status(201).json({
      message: 'Order created successfully',
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt
      }
    });
  } catch (error) {
    console.error('Payment order creation error:', error);
    res.status(500).json({ message: 'Server error during order creation' });
  }
};

// Verify payment
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Create expected signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    // Verify signature
    const isVerified = expectedSignature === razorpay_signature;

    if (isVerified) {
      // Update payment status in database
      await db.query(
        'UPDATE payments SET payment_id = $1, signature = $2, status = $3 WHERE order_id = $4',
        [razorpay_payment_id, razorpay_signature, 'completed', razorpay_order_id]
      );

      res.json({
        message: 'Payment verified successfully',
        verified: true
      });
    } else {
      // Update payment status as failed
      await db.query(
        'UPDATE payments SET signature = $1, status = $2 WHERE order_id = $3',
        [razorpay_signature, 'failed', razorpay_order_id]
      );

      res.status(400).json({
        message: 'Payment verification failed',
        verified: false
      });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ message: 'Server error during payment verification' });
  }
};

// Get payment status
const getPaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;

    const result = await db.query(
      'SELECT * FROM payments WHERE order_id = $1',
      [orderId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    const payment = result.rows[0];

    res.json({
      payment: {
        id: payment.id,
        order_id: payment.order_id,
        payment_id: payment.payment_id,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        created_at: payment.created_at
      }
    });
  } catch (error) {
    console.error('Get payment status error:', error);
    res.status(500).json({ message: 'Server error fetching payment status' });
  }
};

export {
  createOrder,
  verifyPayment,
  getPaymentStatus
};