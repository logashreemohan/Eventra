# Eventra Backend Features

## Overview
The Eventra platform now includes a fully functional backend API built with Node.js, Express, and PostgreSQL, featuring real payment integration with Razorpay and a comprehensive vendor onboarding system.

## Key Features Implemented

### 1. Backend API Structure
- RESTful API architecture with Express.js
- PostgreSQL database integration
- Modular code organization with controllers, models, routes, and utilities
- Environment-based configuration management
- Comprehensive error handling and logging

### 2. Database Schema
- Users table for client, vendor, and admin accounts
- Vendors table for detailed vendor profiles
- Bookings table for service reservations
- Payments table for transaction records
- Reviews table for customer feedback
- Proper indexing for performance optimization

### 3. Authentication System
- JWT-based authentication and authorization
- Password hashing with bcrypt
- Role-based access control (client, vendor, admin)
- Protected routes middleware
- User registration and login endpoints

### 4. Vendor Onboarding System
- Multi-step vendor registration process
- Detailed vendor profile creation
- Service category classification
- Experience and pricing information
- Social media integration
- Portfolio image management
- Admin approval workflow

### 5. Payment Integration (Razorpay)
- Real payment processing with Razorpay
- Order creation and management
- Payment verification and validation
- Transaction status tracking
- Secure webhook handling

### 6. API Endpoints
#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

#### Vendors
- `POST /api/vendors` - Create vendor profile
- `GET /api/vendors` - List vendors with filters
- `GET /api/vendors/:id` - Get vendor details
- `PUT /api/vendors/:id` - Update vendor profile
- `PATCH /api/vendors/:id/status` - Admin vendor approval

#### Payments
- `POST /api/payments/order` - Create payment order
- `POST /api/payments/verify` - Verify payment
- `GET /api/payments/status/:orderId` - Get payment status

### 7. Frontend Integration
- Updated Login and Vendor Signup components
- New Payment Gateway component
- API service layer for backend communication
- Token-based authentication persistence
- Error handling and user feedback

## Setup Instructions

1. Install PostgreSQL database
2. Configure environment variables in `.env` file
3. Run `npm run init-db` to initialize database schema
4. Start backend server with `npm run server`
5. Frontend will automatically connect to backend API

## Security Features
- Password encryption with bcrypt
- JWT token authentication
- Input validation and sanitization
- Protected routes with middleware
- SQL injection prevention through parameterized queries
- CORS configuration for secure cross-origin requests

## Future Enhancements
- Real-time notifications with WebSocket
- Advanced analytics and reporting
- Vendor rating and review system
- Booking calendar integration
- Email/SMS notifications
- Admin dashboard with metrics