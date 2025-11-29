import express from 'express';
import { register, login, getProfile } from '../controllers/auth.controller.js';
import { verifyToken } from '../utils/auth.utils.js';

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Get profile (protected route)
router.get('/profile', verifyToken, getProfile);

export default router;