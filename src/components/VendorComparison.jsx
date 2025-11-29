import React, { useState } from 'react';
import '../styles/VendorComparison.css';

const VendorComparison = () => {
  // State for showing vendor details modal
  const [showVendorDetails, setShowVendorDetails] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  
  // Mock vendor data for comparison
  const [vendors] = useState([
    {
      id: 1,
      name: 'Royal Wedding Planners',
      category: 'Wedding Planner',
      rating: 4.8,
      reviews: 124,
      price: '₹85,000',
      location: 'Mumbai',
      experience: '8 years',
      services: ['Full Planning', 'Coordination', 'Vendor Management'],
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      featured: true
    },
    {
      id: 2,
      name: 'Elegant Events',
      category: 'Wedding Planner',
      rating: 4.6,
      reviews: 98,
      price: '₹75,000',
      location: 'Delhi',
      experience: '6 years',
      services: ['Partial Planning', 'Coordination'],
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      featured: false
    },
    {
      id: 3,
      name: 'Blissful Beginnings',
      category: 'Wedding Planner',
      rating: 4.9,
      reviews: 156,
      price: '₹95,000',
      location: 'Bangalore',
      experience: '10 years',
      services: ['Full Planning', 'Coordination', 'Vendor Management', 'Design Consultation'],
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      featured: true
    }
  ]);

  const [selectedVendors, setSelectedVendors] = useState([vendors[0], vendors[1]]);
  const [comparisonCriteria] = useState([
    'Price',
    'Rating',
    'Reviews',
    'Experience',
    'Services',
    'Location'
  ]);

  // Function to add a vendor to comparison
  const addVendorToComparison = (vendor) => {
    if (selectedVendors.length < 4 && !selectedVendors.find(v => v.id === vendor.id)) {
      setSelectedVendors([...selectedVendors, vendor]);
    }
  };

  // Function to remove a vendor from comparison
  const removeVendorFromComparison = (vendorId) => {
    if (selectedVendors.length > 2) {
      setSelectedVendors(selectedVendors.filter(vendor => vendor.id !== vendorId));
    }
  };

  // Render star ratings
  const renderRating = (rating) => {
    return (
      <div className="rating">
        {'★'.repeat(Math.floor(rating))}
        {'☆'.repeat(5 - Math.floor(rating))}
        <span className="rating-value">({rating})</span>
      </div>
    );
  };

  return (
    <div className="vendor-comparison">
      <div className="comparison-header">
        <h2 className="comparison-title">Vendor Comparison</h2>
        <p className="comparison-subtitle">Compare wedding vendors side-by-side to make the best choice</p>
      </div>

      {/* Vendor Selection */}
      <div className="vendor-selection">
        <h3>Select Vendors to Compare</h3>
        <div className="vendor-list">
          {vendors.map(vendor => (
            <div 
              key={vendor.id} 
              className={`vendor-card ${selectedVendors.find(v => v.id === vendor.id) ? 'selected' : ''}`}
              onClick={() => {
                if (selectedVendors.find(v => v.id === vendor.id)) {
                  removeVendorFromComparison(vendor.id);
                } else {
                  addVendorToComparison(vendor);
                }
              }}
            >
              <div className="vendor-card-image">
                <img src={vendor.image} alt={vendor.name} />
              </div>
              <div className="vendor-card-content">
                <h4>{vendor.name}</h4>
                <p className="vendor-category">{vendor.category}</p>
                {renderRating(vendor.rating)}
                <p className="vendor-price">{vendor.price}</p>
              </div>
              <div className="vendor-card-actions">
                {selectedVendors.find(v => v.id === vendor.id) ? (
                  <span className="selected-badge">Selected</span>
                ) : (
                  <button className="select-btn">Select</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation */}
      <div className="recommendation-section">
        <h3>Our Recommendation</h3>
        <div className="recommendation-card">
          <div className="recommendation-content">
            <h4>Best Overall Choice</h4>
            <p>
              Based on our analysis, <strong>Blissful Beginnings</strong> offers the best combination 
              of experience, rating, and comprehensive services for your wedding planning needs.
            </p>
            <button className="book-now-btn" onClick={() => {
              // Find the recommended vendor (Blissful Beginnings)
              const recommendedVendor = vendors.find(v => v.name === 'Blissful Beginnings');
              setSelectedVendor(recommendedVendor);
              setShowVendorDetails(true);
            }}>Book This Vendor</button>
          </div>
        </div>
      </div>

      {/* Vendor Details Modal */}
      {showVendorDetails && selectedVendor && (
        <div className="vendor-details-modal">
          <div className="vendor-details-content">
            <div className="modal-header">
              <h2>{selectedVendor.name}</h2>
              <button className="close-btn" onClick={() => setShowVendorDetails(false)}>×</button>
            </div>
            <div className="vendor-details-body">
              <div className="vendor-image-container">
                <img src={selectedVendor.image} alt={selectedVendor.name} />
              </div>
              <div className="vendor-info">
                <div className="vendor-detail">
                  <strong>Category:</strong> {selectedVendor.category}
                </div>
                <div className="vendor-detail">
                  <strong>Rating:</strong> {renderRating(selectedVendor.rating)}
                </div>
                <div className="vendor-detail">
                  <strong>Reviews:</strong> {selectedVendor.reviews}
                </div>
                <div className="vendor-detail">
                  <strong>Price:</strong> {selectedVendor.price}
                </div>
                <div className="vendor-detail">
                  <strong>Location:</strong> {selectedVendor.location}
                </div>
                <div className="vendor-detail">
                  <strong>Experience:</strong> {selectedVendor.experience}
                </div>
                <div className="vendor-detail">
                  <strong>Services:</strong>
                  <ul>
                    {selectedVendor.services.map((service, index) => (
                      <li key={index}>{service}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button className="book-vendor-btn">Book Now</button>
              <button className="close-modal-btn" onClick={() => setShowVendorDetails(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorComparison;