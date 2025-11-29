import React, { useState } from 'react';
import '../styles/VenueFinder.css';

const VenueFinder = () => {
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [venueType, setVenueType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [capacity, setCapacity] = useState('all');
  const [filteredVenues, setFilteredVenues] = useState([]);

  // Mock venue data
  const venues = [
    {
      id: 1,
      name: 'Grand Palace Banquet',
      city: 'Mumbai',
      type: 'banquet',
      price: '₹150000',
      capacity: '500',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      address: '123 Marine Drive, Mumbai',
      amenities: ['AC', 'Parking', 'Catering', 'DJ'],
      lat: 19.0760,
      lng: 72.8777
    },
    {
      id: 2,
      name: 'Seaside Resort',
      city: 'Mumbai',
      type: 'resort',
      price: '₹250000',
      capacity: '300',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      address: '456 Juhu Beach, Mumbai',
      amenities: ['AC', 'Pool', 'Spa', 'Catering'],
      lat: 19.0974,
      lng: 72.8296
    },
    {
      id: 3,
      name: 'Heritage Manor',
      city: 'Delhi',
      type: 'heritage',
      price: '₹180000',
      capacity: '400',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      address: '789 Connaught Place, Delhi',
      amenities: ['AC', 'Garden', 'Parking', 'Catering'],
      lat: 28.6139,
      lng: 77.2090
    },
    {
      id: 4,
      name: 'Garden Pavilion',
      city: 'Bangalore',
      type: 'garden',
      price: '₹120000',
      capacity: '250',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      address: '101 MG Road, Bangalore',
      amenities: ['Garden', 'Parking', 'Catering', 'Lighting'],
      lat: 12.9716,
      lng: 77.5946
    }
  ];

  // Filter venues based on selections
  const filterVenues = () => {
    let filtered = venues;

    if (selectedCity !== 'all') {
      filtered = filtered.filter(venue => venue.city === selectedCity);
    }

    if (venueType !== 'all') {
      filtered = filtered.filter(venue => venue.type === venueType);
    }

    if (priceRange !== 'all') {
      // In a real app, this would be more complex filtering
      filtered = filtered.filter(venue => {
        const price = parseInt(venue.price.replace(/[^\d]/g, ''));
        if (priceRange === 'low') return price < 100000;
        if (priceRange === 'medium') return price >= 100000 && price <= 200000;
        if (priceRange === 'high') return price > 200000;
        return true;
      });
    }

    if (capacity !== 'all') {
      filtered = filtered.filter(venue => {
        const venueCapacity = parseInt(venue.capacity);
        if (capacity === 'small') return venueCapacity < 200;
        if (capacity === 'medium') return venueCapacity >= 200 && venueCapacity <= 400;
        if (capacity === 'large') return venueCapacity > 400;
        return true;
      });
    }

    setFilteredVenues(filtered);
  };

  // Apply filters when selections change
  React.useEffect(() => {
    filterVenues();
  }, [selectedCity, venueType, priceRange, capacity]);

  // Initial load
  React.useEffect(() => {
    setFilteredVenues(venues);
  }, []);

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

  // Get unique cities
  const cities = ['all', ...new Set(venues.map(venue => venue.city))];

  return (
    <div className="venue-finder">
      <div className="finder-header">
        <h2 className="finder-title">Find Your Perfect Wedding Venue</h2>
        <p className="finder-subtitle">Discover and compare wedding venues in your preferred location</p>
      </div>

      {/* Filters */}
      <div className="venue-filters">
        <div className="filter-group">
          <label>City</label>
          <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
            <option value="all">All Cities</option>
            {cities.filter(city => city !== 'all').map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Venue Type</label>
          <select value={venueType} onChange={(e) => setVenueType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="banquet">Banquet Hall</option>
            <option value="resort">Resort</option>
            <option value="heritage">Heritage Venue</option>
            <option value="garden">Garden</option>
            <option value="hotel">Hotel</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Price Range</label>
          <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
            <option value="all">All Prices</option>
            <option value="low">Under ₹100,000</option>
            <option value="medium">₹100,000 - ₹200,000</option>
            <option value="high">Above ₹200,000</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Capacity</label>
          <select value={capacity} onChange={(e) => setCapacity(e.target.value)}>
            <option value="all">Any Capacity</option>
            <option value="small">Under 200 guests</option>
            <option value="medium">200-400 guests</option>
            <option value="large">Above 400 guests</option>
          </select>
        </div>
      </div>

      {/* Map and Venue List Container */}
      <div className="finder-content">
        {/* Map Section */}
        <div className="map-section">
          <div className="map-placeholder">
            <div className="map-overlay">
              <h3>Interactive Map</h3>
              <p>Map showing venue locations in {selectedCity === 'all' ? 'all cities' : selectedCity}</p>
              <div className="map-instructions">
                <p>• Click on markers to view venue details</p>
                <p>• Drag to pan around the map</p>
                <p>• Use +/- buttons to zoom in/out</p>
              </div>
            </div>
          </div>
        </div>

        {/* Venue List */}
        <div className="venue-list">
          <h3>Available Venues ({filteredVenues.length})</h3>
          {filteredVenues.length > 0 ? (
            <div className="venues-grid">
              {filteredVenues.map(venue => (
                <div key={venue.id} className="venue-card">
                  <div className="venue-image">
                    <img src={venue.image} alt={venue.name} />
                  </div>
                  <div className="venue-details">
                    <h4>{venue.name}</h4>
                    <p className="venue-address">{venue.address}</p>
                    {renderRating(venue.rating)}
                    <div className="venue-info">
                      <div className="info-item">
                        <span className="info-label">Price:</span>
                        <span className="info-value">{venue.price}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Capacity:</span>
                        <span className="info-value">{venue.capacity} guests</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Type:</span>
                        <span className="info-value">{venue.type}</span>
                      </div>
                    </div>
                    <div className="venue-amenities">
                      <h5>Amenities:</h5>
                      <div className="amenities-list">
                        {venue.amenities.map((amenity, index) => (
                          <span key={index} className="amenity-tag">{amenity}</span>
                        ))}
                      </div>
                    </div>
                    <div className="venue-actions">
                      <button className="view-details-btn">View Details</button>
                      <button className="book-venue-btn">Book Venue</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-venues">
              <p>No venues found matching your criteria. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VenueFinder;