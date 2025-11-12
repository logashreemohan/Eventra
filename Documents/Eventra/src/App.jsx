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
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/login" element={<Login />} />
          <Route path="/client-signup" element={<ClientSignup />} />
          <Route path="/vendor-signup" element={<VendorSignup />} />
          <Route path="/vendor-profile" element={<VendorProfile />} />
          <Route path="/client-hire" element={<ClientHire />} />
          <Route path="/ai-chat" element={<AIChat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;