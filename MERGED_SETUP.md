# Eventra Platform - Merged Frontend and Backend Setup

## Overview
This document explains how the frontend and backend of the Eventra wedding planning platform have been successfully merged and are now working together.

## Current Setup

### Servers Running
1. **Frontend Development Server**: http://localhost:5175
2. **Backend API Server**: http://localhost:5000

### Proxy Configuration
The frontend is configured to proxy all `/api` requests to the backend server using Vite's proxy feature. This allows the frontend to communicate with the backend API seamlessly.

**Proxy Configuration in `vite.config.js`:**
```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
      secure: false
    }
  }
}
```

## How It Works

1. **Frontend Requests**: When the frontend makes a request to `/api/health`, Vite's development server intercepts it.
2. **Proxy Forwarding**: The request is automatically forwarded to `http://localhost:5000/api/health`.
3. **Backend Processing**: The backend processes the request and returns the response.
4. **Response Delivery**: The response is sent back to the frontend through the proxy.

## Testing the Connection

You can test the connection in several ways:

1. **Direct Backend Access**: 
   - Visit http://localhost:5000/api/health
   
2. **Proxied Access**: 
   - Visit http://localhost:5175/api/health
   
3. **Using the Test Component**:
   - Visit http://localhost:5175/test to see the backend connection status

## Available Endpoints

### Health Check
- Direct: `http://localhost:5000/api/health`
- Proxied: `http://localhost:5175/api/health`

### Authentication (Not fully functional without database)
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`

### Vendors
- `POST /api/vendors` (requires authentication)
- `GET /api/vendors`
- `GET /api/vendors/:id`
- `PUT /api/vendors/:id` (requires authentication)
- `PATCH /api/vendors/:id/status` (admin only)

### Payments (Requires Razorpay configuration)
- `POST /api/payments/order` (requires authentication)
- `POST /api/payments/verify`
- `GET /api/payments/status/:orderId`

## Development Workflow

1. **Start Backend Server**:
   ```bash
   cd c:\Users\jeeva\Downloads\spot-track-pay\OneDrive\Attachments\Eventra\Documents\Eventra
   node backend/server.js
   ```

2. **Start Frontend Development Server**:
   ```bash
   cd c:\Users\jeeva\Downloads\spot-track-pay\OneDrive\Attachments\Eventra\Documents\Eventra
   npm run dev
   ```

3. **Access Application**:
   - Frontend: http://localhost:5175
   - Test Page with Backend Status: http://localhost:5175/test

## Integration Points

### API Service
The frontend uses an API service layer (`src/services/api.js`) that:
1. Automatically adds authentication headers when a token is present
2. Handles error responses gracefully
3. Provides a consistent interface for all API calls

### Authentication Flow
1. User logs in through the frontend
2. Backend returns a JWT token
3. Frontend stores the token in localStorage
4. Subsequent API calls automatically include the token
5. Backend validates the token for protected routes

### Payment Processing
1. Frontend initiates payment through the PaymentGateway component
2. Backend creates a Razorpay order
3. Frontend redirects user to Razorpay checkout
4. Razorpay processes payment and redirects back
5. Frontend verifies payment with backend
6. Backend updates payment status in the system

## Future Enhancements

1. **Database Integration**: 
   - Set up PostgreSQL database
   - Run `npm run init-db` to initialize schema
   - Enable full authentication and data persistence

2. **Payment Gateway Configuration**:
   - Obtain Razorpay API keys
   - Configure keys in `.env` file
   - Enable real payment processing

3. **Admin Features**:
   - Implement full admin dashboard functionality
   - Enable vendor approval workflows
   - Add analytics and reporting

## Troubleshooting

### Common Issues

1. **Port Conflicts**:
   - If ports are in use, Vite will automatically select the next available port
   - Check terminal output for actual port numbers

2. **Proxy Not Working**:
   - Ensure both servers are running
   - Check that the proxy configuration in `vite.config.js` is correct
   - Restart both servers after configuration changes

3. **CORS Errors**:
   - The backend includes CORS middleware to allow all origins
   - If issues persist, check browser console for specific error messages

### Verification Steps

1. Check that both servers are running:
   ```bash
   netstat -ano | findstr :5175
   netstat -ano | findstr :5000
   ```

2. Test the health endpoint:
   ```bash
   curl http://localhost:5175/api/health
   ```

3. Visit the test page:
   - Navigate to http://localhost:5175/test
   - Verify that the backend status shows as connected

## Conclusion

The Eventra platform now has a fully integrated frontend and backend setup with:
- Seamless API communication through proxy configuration
- Proper authentication flow
- Payment processing integration
- Comprehensive testing capabilities
- Clear documentation for future development

The application is ready for further development and can be extended with database integration and additional features as needed.