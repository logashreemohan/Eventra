import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import Search from './pages/Search';
import Login from './pages/Login';
import ClientSignup from './pages/ClientSignup';
import VendorSignup from './pages/VendorSignup';
import VendorProfile from './pages/VendorProfile';
import ClientHire from './pages/ClientHire';
import AIChat from './pages/AIChat';
import FeaturesOverview from './pages/FeaturesOverview';
// Customer Website
import ServiceListing from './pages/ServiceListing';
import VendorDetail from './pages/VendorDetail';
import Checkout from './pages/Checkout';
import CustomerProfile from './pages/CustomerProfile';
import BookingConfirmation from './pages/BookingConfirmation';
// Vendor Dashboard
import VendorDashboard from './pages/VendorDashboard';
import VendorBookings from './pages/VendorBookings';
import VendorPayments from './pages/VendorPayments';
// Admin Panel
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ManageVendors from './pages/ManageVendors';
import ManageCustomers from './pages/ManageCustomers';
// Test Component
import TestNavigation from './TestNavigation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Test Route */}
          <Route path="/test" element={<TestNavigation />} />
          
          {/* Customer Website */}
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/service-listing" element={<ServiceListing />} />
          <Route path="/vendor/:id" element={<VendorDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/client-signup" element={<ClientSignup />} />
          <Route path="/client-hire" element={<ClientHire />} />
          <Route path="/profile" element={<CustomerProfile />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          
          {/* Vendor Dashboard */}
          <Route path="/vendor/dashboard" element={<VendorDashboard />} />
          <Route path="/vendor/signup" element={<VendorSignup />} />
          <Route path="/vendor/profile" element={<VendorProfile />} />
          <Route path="/vendor/bookings" element={<VendorBookings />} />
          <Route path="/vendor/payments" element={<VendorPayments />} />
          
          {/* Admin Panel */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/vendors" element={<ManageVendors />} />
          <Route path="/admin/customers" element={<ManageCustomers />} />
          
          {/* Other */}
          <Route path="/ai-chat" element={<AIChat />} />
          <Route path="/features" element={<FeaturesOverview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;