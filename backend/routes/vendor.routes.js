import express from 'express';
import { 
  createVendor, 
  getVendors, 
  getVendorById, 
  updateVendor,
  approveRejectVendor
} from '../controllers/vendor.controller.js';
import { protect, admin } from '../utils/auth.middleware.js';

const router = express.Router();

// Create a new vendor profile (protected route)
router.post('/', protect, createVendor);

// Get all vendors (public)
router.get('/', getVendors);

// Get vendor by ID (public)
router.get('/:id', getVendorById);

// Update vendor profile (protected route)
router.put('/:id', protect, updateVendor);

// Admin: Approve or reject vendor
router.patch('/:id/status', protect, admin, approveRejectVendor);

export default router;