import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchResults.css';

const Search = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    vendor: '',
    location: ''
  });

  const vendorCategories = [
    'DJ',
    'Makeup Artist',
    'Dancer',
    'Decor',
    'Photographer',
    'Food & Catering',
    'Invitation',
    'Nail Art',
    'Mehandi',
    'Dress',
    'Jewelry',
    'Return Gifts'
  ];

  const locations = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Chennai',
    'Kolkata',
    'Hyderabad'
  ];

  const handleSearchChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Navigate to search results page with search data
    navigate('/search-results', { state: { vendor: searchData.vendor, location: searchData.location } });
  };

  return (
    <div className="full-screen-search">
      <div className="search-overlay">
        <div className="search-container">
          <h1 className="search-title">Find Your Perfect Wedding Vendors</h1>
          <p className="search-subtitle">Discover trusted wedding vendors near you</p>
          
          <form className="search-form" onSubmit={handleSearchSubmit}>
            <div className="search-input-container">
              <select
                className="search-input"
                name="vendor"
                value={searchData.vendor}
                onChange={handleSearchChange}
                required
              >
                <option value="">What type of vendor do you need?</option>
                {vendorCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="search-input-container">
              <select
                className="search-input"
                name="location"
                value={searchData.location}
                onChange={handleSearchChange}
                required
              >
                <option value="">What location?</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="search-button">Search</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;