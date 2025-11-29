import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/ServiceListing.css';

const ServiceListing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchTerm = location.state?.vendor || '';

  // Mock vendor data
  const [vendors, setVendors] = useState([
    { 
      id: 1, 
      name: 'Elegant DJ Services', 
      category: 'DJ', 
      rating: 4.8, 
      reviews: 42, 
      price: '$$$', 
      location: 'Mumbai',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      featured: true,
      description: 'Professional DJ services for weddings with over 10 years of experience.'
    },
    { 
      id: 2, 
      name: 'Royal Makeup Artists', 
      category: 'Makeup Artist', 
      rating: 4.9, 
      reviews: 38, 
      price: '$$', 
      location: 'Delhi',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      featured: true,
      description: 'Bridal makeup specialists creating stunning looks for your special day.'
    },
    { 
      id: 3, 
      name: 'Starlight Dancers', 
      category: 'Dancer', 
      rating: 4.7, 
      reviews: 29, 
      price: '$$$$', 
      location: 'Bangalore',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      featured: false,
      description: 'Energetic dance performances to entertain your guests.'
    },
    { 
      id: 4, 
      name: 'Dream Decorators', 
      category: 'Decor', 
      rating: 4.9, 
      reviews: 56, 
      price: '$$$$', 
      location: 'Chennai',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      featured: true,
      description: 'Transform your venue into a magical wonderland.'
    },
    { 
      id: 5, 
      name: 'Capture Moments Photography', 
      category: 'Photographer', 
      rating: 4.8, 
      reviews: 67, 
      price: '$$$', 
      location: 'Hyderabad',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      featured: false,
      description: 'Professional wedding photography capturing your precious moments.'
    },
    { 
      id: 6, 
      name: 'Gourmet Delights Catering', 
      category: 'Food & Catering', 
      rating: 4.9, 
      reviews: 89, 
      price: '$$$$', 
      location: 'Pune',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      featured: true,
      description: 'Exquisite culinary experiences tailored to your taste.'
    },
    { 
      id: 7, 
      name: 'Artistic Invitations', 
      category: 'Invitation', 
      rating: 4.6, 
      reviews: 24, 
      price: '$$', 
      location: 'Kolkata',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      featured: false,
      description: 'Beautiful custom invitations for your special occasion.'
    },
    { 
      id: 8, 
      name: 'Chic Nail Studio', 
      category: 'Nail Art', 
      rating: 4.7, 
      reviews: 31, 
      price: '$', 
      location: 'Ahmedabad',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      featured: false,
      description: 'Stunning nail art designs for brides and bridal party.'
    }
  ]);

  // Filter states
  const [filteredVendors, setFilteredVendors] = useState(vendors);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [locationFilter, setLocationFilter] = useState('');

  // Get unique categories
  const categories = [...new Set(vendors.map(vendor => vendor.category))];

  // Apply filters
  useEffect(() => {
    let result = vendors;

    // Apply search term filter
    if (searchTerm) {
      result = result.filter(vendor => 
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      result = result.filter(vendor => vendor.category === selectedCategory);
    }

    // Apply price filter
    if (priceFilter) {
      result = result.filter(vendor => vendor.price === priceFilter);
    }

    // Apply rating filter
    if (minRating > 0) {
      result = result.filter(vendor => vendor.rating >= minRating);
    }

    // Apply location filter
    if (locationFilter) {
      result = result.filter(vendor => vendor.location.toLowerCase().includes(locationFilter.toLowerCase()));
    }

    setFilteredVendors(result);
  }, [vendors, searchTerm, selectedCategory, priceFilter, minRating, locationFilter]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('');
    setPriceFilter('');
    setMinRating(0);
    setLocationFilter('');
  };

  // Handle vendor click
  const handleVendorClick = (vendorId) => {
    navigate(`/vendor/${vendorId}`);
  };

  return (
    <>
      <Navbar />
      <div className="service-listing-container">
        {/* Hero Section */}
        <section className="listing-hero-section">
          <div className="hero-overlay">
            <h1 className="hero-title">Find the Perfect Wedding Vendors</h1>
            <p className="hero-subtitle">Browse through our curated selection of top-rated professionals</p>
          </div>
        </section>

        <div className="content-wrapper">
          {/* Filters Sidebar */}
          <aside className="filters-sidebar">
            <div className="filters-header">
              <h2>Filters</h2>
              <button className="reset-button" onClick={resetFilters}>Reset All</button>
            </div>

            <div className="filter-group">
              <h3>City</h3>
              <input
                type="text"
                placeholder="Enter city"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="location-input"
              />
            </div>

            <div className="filter-group">
              <h3>Category</h3>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <h3>Price Range</h3>
              <div className="price-options">
                {['$', '$$', '$$$', '$$$$'].map(price => (
                  <label key={price} className="price-option">
                    <input
                      type="radio"
                      name="price"
                      checked={priceFilter === price}
                      onChange={() => setPriceFilter(price)}
                    />
                    <span className="price-label">{price}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="main-content">
            <div className="results-header">
              <h2>Available Vendors</h2>
              <p>{filteredVendors.length} vendors found</p>
            </div>

            <div className="vendors-grid">
              {filteredVendors.map((vendor, index) => (
                <div 
                  key={vendor.id} 
                  className={`vendor-card card-hover-animation ${vendor.featured ? 'featured' : ''}`}
                  onClick={() => handleVendorClick(vendor.id)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Filter symbol that shows on the left side when vendor is clicked */}
                  <div className="filter-symbol">☰</div>
                  {vendor.featured && (
                    <div className="featured-badge">
                      <span>Featured</span>
                    </div>
                  )}
                  <div className="vendor-image-container">
                    <img src={vendor.image} alt={vendor.name} className="vendor-image" />
                  </div>
                  <div className="vendor-info">
                    <h3 className="vendor-name">{vendor.name}</h3>
                    <p className="vendor-category">{vendor.category}</p>
                    <p className="vendor-description">{vendor.description}</p>
                    <div className="vendor-meta">
                      <div className="rating-container">
                        <span className="rating-stars">
                          {'★'.repeat(Math.floor(vendor.rating))}
                          {'☆'.repeat(5 - Math.floor(vendor.rating))}
                        </span>
                        <span className="rating-text">{vendor.rating} ({vendor.reviews} reviews)</span>
                      </div>
                      <div className="vendor-price">{vendor.price}</div>
                      <div className="vendor-location">📍 {vendor.location}</div>
                    </div>
                    <button className="view-details-button pulse-animation">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredVendors.length === 0 && (
              <div className="no-results">
                <h3>No vendors found</h3>
                <p>Try adjusting your filters or search term</p>
                <button className="reset-search-button" onClick={resetFilters}>
                  Reset Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServiceListing;