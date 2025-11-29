import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackendTest from './components/BackendTest';

const TestNavigation = () => {
  const navigate = useNavigate();

  const testRoutes = [
    { path: '/', label: 'Home Page' },
    { path: '/search', label: 'Search Page' },
    { path: '/search-results', label: 'Search Results' },
    { path: '/service-listing', label: 'Service Listing' },
    { path: '/vendor/1', label: 'Vendor Detail' },
    { path: '/checkout', label: 'Checkout Page' },
    { path: '/login', label: 'Login Page' },
    { path: '/client-signup', label: 'Client Signup' },
    { path: '/profile', label: 'Customer Profile' },
    { path: '/vendor/dashboard', label: 'Vendor Dashboard' },
    { path: '/vendor/signup', label: 'Vendor Signup' },
    { path: '/vendor/profile', label: 'Vendor Profile' },
    { path: '/vendor/bookings', label: 'Vendor Bookings' },
    { path: '/vendor/payments', label: 'Vendor Payments' },
    { path: '/admin/login', label: 'Admin Login' },
    { path: '/admin/dashboard', label: 'Admin Dashboard' },
    { path: '/admin/vendors', label: 'Manage Vendors' },
    { path: '/admin/customers', label: 'Manage Customers' }
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Eventra Navigation Test</h1>
      <p>Click on any button below to test navigation to that page:</p>
      
      {/* Backend Connection Test */}
      <div style={{ marginBottom: '30px' }}>
        <h2>Backend Connection Status</h2>
        <BackendTest />
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '10px' }}>
        {testRoutes.map((route, index) => (
          <button
            key={index}
            onClick={() => navigate(route.path)}
            style={{
              padding: '10px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {route.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TestNavigation;