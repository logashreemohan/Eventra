import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchResults.css';

const Search = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    vendor: '',
    location: ''
  });
  
  const [suggestions, setSuggestions] = useState([]);

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
    'Return Gifts',
    'Wedding Planner',
    'Florist',
    'Transportation',
    'Lighting',
    'Cake',
    'Entertainment'
  ];

  const locations = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Chennai',
    'Kolkata',
    'Hyderabad',
    'Pune',
    'Ahmedabad',
    'Jaipur',
    'Surat',
    'Lucknow',
    'Kochi',
    'Goa',
    'Amritsar',
    'Bhopal',
    'Chandigarh',
    'Indore',
    'Nagpur',
    'Patna',
    'Vadodara'
  ];

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchData({
      ...searchData,
      [name]: value
    });
    
    // Generate suggestions based on input
    if (name === 'vendor' && value.length > 1) {
      const filteredSuggestions = vendorCategories.filter(category => 
        category.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions.slice(0, 5));
    } else if (name === 'location' && value.length > 1) {
      const filteredSuggestions = locations.filter(location => 
        location.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion, type) => {
    setSearchData({
      ...searchData,
      [type]: suggestion
    });
    setSuggestions([]);
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
              
              {/* Vendor Suggestions */}
              {suggestions.length > 0 && searchData.vendor && (
                <div className="suggestions-dropdown">
                  {suggestions.map((suggestion, index) => (
                    <div 
                      key={index}
                      className="suggestion-item"
                      onClick={() => handleSuggestionClick(suggestion, 'vendor')}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
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
              
              {/* Location Suggestions */}
              {suggestions.length > 0 && searchData.location && (
                <div className="suggestions-dropdown">
                  {suggestions.map((suggestion, index) => (
                    <div 
                      key={index}
                      className="suggestion-item"
                      onClick={() => handleSuggestionClick(suggestion, 'location')}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <button type="submit" className="search-button">Search</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;