import express from 'express';
import { createOrder, verifyPayment, getPaymentStatus } from '../controllers/payment.controller.js';
import { protect } from '../utils/auth.middleware.js';

const router = express.Router();

// Create a new payment order (protected route)
router.post('/order', protect, createOrder);

// Verify payment
router.post('/verify', verifyPayment);

// Get payment status
router.get('/status/:orderId', getPaymentStatus);

export default router;