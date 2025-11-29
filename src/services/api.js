// API service to connect frontend with backend
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Set default headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };

  // Add authorization header if token exists
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    
    // Handle successful responses
    if (response.ok) {
      const data = await response.json();
      return { data, error: null };
    }
    
    // Handle error responses
    const errorData = await response.json();
    return { data: null, error: errorData.message || 'Something went wrong' };
  } catch (error) {
    console.error('API request error:', error);
    return { data: null, error: 'Network error. Please try again.' };
  }
};

// Auth API
export const authAPI = {
  // Register a new user
  register: async (userData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  // Login user
  login: async (credentials) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },

  // Get user profile
  getProfile: async () => {
    return apiRequest('/auth/profile', {
      method: 'GET'
    });
  }
};

// Vendor API
export const vendorAPI = {
  // Create a new vendor profile
  createVendor: async (vendorData) => {
    return apiRequest('/vendors', {
      method: 'POST',
      body: JSON.stringify(vendorData)
    });
  },

  // Get all vendors
  getVendors: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = `/vendors${queryParams ? `?${queryParams}` : ''}`;
    return apiRequest(endpoint, {
      method: 'GET'
    });
  },

  // Get vendor by ID
  getVendorById: async (id) => {
    return apiRequest(`/vendors/${id}`, {
      method: 'GET'
    });
  },

  // Update vendor profile
  updateVendor: async (id, vendorData) => {
    return apiRequest(`/vendors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(vendorData)
    });
  }
};

// Payment API
export const paymentAPI = {
  // Create a new payment order
  createOrder: async (orderData) => {
    return apiRequest('/payments/order', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  },

  // Verify payment
  verifyPayment: async (paymentData) => {
    return apiRequest('/payments/verify', {
      method: 'POST',
      body: JSON.stringify(paymentData)
    });
  },

  // Get payment status
  getPaymentStatus: async (orderId) => {
    return apiRequest(`/payments/status/${orderId}`, {
      method: 'GET'
    });
  }
};

export default {
  authAPI,
  vendorAPI,
  paymentAPI
};