# Eventra Backend API

This is the backend API for the Eventra wedding planning platform, built with Node.js, Express, and PostgreSQL.

## Table of Contents
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [Payment Integration](#payment-integration)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- Razorpay account for payment processing

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   DB_USER=your_postgres_username
   DB_HOST=localhost
   DB_NAME=eventra
   DB_PASSWORD=your_postgres_password
   DB_PORT=5432
   JWT_SECRET=your_jwt_secret_key
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   PORT=5000
   ```

3. Initialize the database:
   ```bash
   npm run init-db
   ```

4. Start the server:
   ```bash
   npm run server
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires authentication)

### Vendors
- `POST /api/vendors` - Create a new vendor profile (requires authentication)
- `GET /api/vendors` - Get all vendors (with optional filters)
- `GET /api/vendors/:id` - Get vendor by ID
- `PUT /api/vendors/:id` - Update vendor profile (requires authentication)
- `PATCH /api/vendors/:id/status` - Approve/reject vendor (admin only)

### Payments
- `POST /api/payments/order` - Create a new payment order (requires authentication)
- `POST /api/payments/verify` - Verify payment
- `GET /api/payments/status/:orderId` - Get payment status

## Database Schema

The database consists of the following tables:
- `users` - Stores user information (clients, vendors, admins)
- `vendors` - Stores vendor profiles and business information
- `customers` - Stores customer preferences
- `bookings` - Stores booking information
- `payments` - Stores payment records
- `reviews` - Stores customer reviews and ratings

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. After logging in, the client receives a token that must be included in the Authorization header for protected routes:

```
Authorization: Bearer <token>
```

## Payment Integration

The backend integrates with Razorpay for payment processing:
1. Create a payment order using `/api/payments/order`
2. Redirect the user to Razorpay checkout
3. Verify the payment using `/api/payments/verify`
4. Check payment status using `/api/payments/status/:orderId`

## Vendor Onboarding System

The vendor onboarding system allows vendors to register and create detailed profiles including:
- Business information
- Service categories
- Experience and pricing
- Portfolio images
- Social media links
- Approval workflow for admin review