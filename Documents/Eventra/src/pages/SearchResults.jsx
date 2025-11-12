import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/SearchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showContactMessage, setShowContactMessage] = useState(false);

  useEffect(() => {
    // Get search data from location state
    const { vendor, city, budget } = location.state || {};
    
    // In a real app, this would call an API
    // For now, we'll show mock results based on the search
    let mockVendors = [];
    
    if (vendor) {
      // Generate mock vendors based on the selected category
      const vendorImages = {
        'DJ': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkRSAad2_IVjI4UKxTTYPAt8SDLz1TuXtjTA&s',
        'Photographer': 'https://images.unsplash.com/photo-1516026672322-bc52d60868c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'Makeup Artist': 'https://ciceroni.in/cdn/shop/articles/top-12-bridal-makeup-artists-to-look-out-for-in-ahmedabad-480982.png?v=1683890124',
        'Dancer': 'https://blog.g3fashion.com/wp-content/uploads/2021/04/choreographers-for-wedding-dance-1024x652.jpg',
        'Decor': 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'Food & Catering': 'https://nilacaterers.com/wp-content/uploads/2024/09/nila-august.jpg',
        'Invitation': 'https://cdn0.weddingwire.in/article/0978/original/1280/jpg/108790-the-murphy-studio.jpeg',
        'Nail Art': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm2grGrhIRd58QmGHWnpKbjIzTUcwrGNCl1g&s',
        'Mehandi': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAbZSdqM9Sm3XCGpbs6HvV5lr14fI_cOybQw&s',
        'Dress': 'https://cdn0.weddingwire.in/article-gallery-o/00000/3_2/1280/jpg/articulos-india/2019/non-troncales/wedding-couple-dresses/coolbluez-coupleweddingdress-16coupleweddingdress.webp',
        'Jewelry': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-v7v7bb6la-5nAeDWjDiSU2dJPDHNpxtYog&s',
        'Return Gifts': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUayD2ismoGSy3B-pbGt-WlnHOPNue3WXTew&s'
      };
      
      const vendorNames = {
        'DJ': ['Beat Masters DJ', 'Sound Wave Entertainment', 'Groove Nation', 'DJ Pulse', 'Vinyl Vibe', 'Bass Boost DJs', 'Rhythm Masters', 'Sound FX', 'Audio Wave', 'Music Makers', 'Party People DJs', 'Sonic Sounds', 'Volume Control', 'Echo Entertainment', 'Frequency Fun', 'Harmony House', 'Melody Makers', 'Noise Control', 'Octave One', 'Pitch Perfect', 'Quality Quake', 'Resonance Rhythm', 'Sonic Boom', 'Sound Spectrum', 'Vibe Tribe'],
        'Photographer': ['Premium Wedding Services', 'Elite Wedding Photography', 'Capture Moments Studio', 'Picture Perfect', 'Lens & Light', 'Shutterbugs', 'Frame & Focus', 'Aperture Art', 'Blissful Shots', 'Cherished Memories', 'Dreamscapes Photography', 'Elegant Eye', 'Fine Focus', 'Glamour Shots', 'Golden Hour', 'Happy Snaps', 'Image Innovators', 'Joyful Journeys', 'Keepsake Kings', 'Luminous Lens', 'Memorable Moments', 'Natural Light', 'Optical Obsession', 'Picture Palace', 'Quality Quotient', 'Radiant Results', 'Shutter Speed', 'Timeless Treasures', 'Vision Vanguards', 'Wonderful Weddings', 'Xposure Xperts', 'Youthful Years'],
        'Makeup Artist': ['Glamour Makeup Studio', 'Bridal Beauty Experts', 'Makeup Magic', 'Beauty Barn', 'Chic Cheeks', 'Dazzling Divas', 'Elegant Eyes', 'Face Fantasy', 'Glow Getter', 'Hue Hub', 'Illumination Inc', 'Jewel Jamboree', 'Kiss & Tell', 'Luscious Lips', 'Majestic Makeover', 'Natural Nuance', 'Opulent Ornaments', 'Polished Perfection', 'Queenly Quotient', 'Radiant Reflection', 'Sparkling Skin', 'Tinted Treasures', 'Urban Uplift', 'Vibrant Vision', 'Wondrous Wardrobe', 'Xquisite Xpressions', 'Youthful Yesteryears', 'Zestful Zones', 'Artistic Appeal', 'Beauty Boutique', 'Cosmetic Corner', 'Delightful Details'],
        'Dancer': ['Elegant Moves Dance Crew', 'Wedding Groove Troupe', 'Celebration Dancers', 'Dance Dynasty', 'Euphoria Ensemble', 'Festive Feet', 'Groove Galaxy', 'Happy Hips', 'Joyful Jive', 'Kinetic Kings', 'Lively Legs', 'Movement Masters', 'Nimble Navigators', 'Orchestral Ovation', 'Pulse Pioneers', 'Rhythm Riders', 'Synchronized Steps', 'Tango Titans', 'Urban Uproar', 'Vivacious Vortex', 'Whirling Wonders', 'Xtreme Xpressions', 'Youthful Yields', 'Zestful Zones', 'Artistic Appeal', 'Balletic Beauty', 'Choreography Champions', 'Dance Delight'],
        'Decor': ['Dream Decorators', 'Elegant Event Decor', 'Festive Floral Designs', 'Ambiance Artists', 'Blossom & Beyond', 'Chic Charm', 'Decor Dynasty', 'Elegant Environments', 'Floral Fantasy', 'Glamour Gardens', 'Harmony Halls', 'Inspired Interiors', 'Jubilant Junction', 'Luxury Landscapes', 'Majestic Moments', 'Noble Nook', 'Ornate Oasis', 'Prestige Places', 'Quintessential Quarters', 'Radiant Rooms', 'Splendid Spaces', 'Tasteful Touch', 'Urban Uplift', 'Vibrant Venues', 'Wonderful Workspaces', 'Xquisite Xteriors', 'Yearning Yards', 'Zestful Zones', 'Artistic Appeal', 'Beautiful Backdrops', 'Celebration Corners', 'Delightful Designs', 'Enchanted Environments', 'Festive Features', 'Grand Gatherings', 'Happy Havens', 'Inspiring Installations', 'Joyful Junctions', 'Keen Korners', 'Lively Locations'],
        'Food & Catering': ['Royal Feast Catering', 'Delicious Delights', 'Taste Sensations', 'Appetite Appeal', 'Bite & Beyond', 'Culinary Creations', 'Delightful Dishes', 'Epicurean Excellence', 'Feast & Flavor', 'Gourmet Galaxy', 'Heavenly Helpings', 'Incredible Ingredients', 'Jubilant Jamboree', 'Kitchen Kings', 'Luscious Lunches', 'Mouthwatering Meals', 'Nourishing Nibbles', 'Ornate Offerings', 'Palatable Plates', 'Quality Quotient', 'Ravishing Recipes', 'Savory Selections', 'Tantalizing Treats', 'Ultimate Umami', 'Vibrant Victuals', 'Wonderful Wraps', 'Xquisite Xperience', 'Yearning Yards', 'Zestful Zones', 'Artistic Appeal', 'Bountiful Banquets', 'Celebration Catering', 'Delightful Dining', 'Elegant Eatables', 'Festive Fare', 'Grand Gourmet', 'Happy Hospitality', 'Inspiring Ingredients', 'Joyful Journeys', 'Keen Kitchen', 'Lively Lunches', 'Marvelous Meals', 'Nutritious Nourishment', 'Opulent Offerings', 'Pleasant Plates', 'Quality Cuisine', 'Radiant Recipes', 'Satisfying Suppers', 'Tasty Treasures', 'Ultimate Unwind', 'Vivacious Victuals', 'Wholesome Wonders', 'Xtreme Xperience', 'Yummy Yields', 'Zesty Zones'],
        'Invitation': ['Elegant Invites Studio', 'Custom Card Creations', 'Paper Perfection', 'Artistic Appeal', 'Beautiful Beginnings', 'Chic Cards', 'Delightful Designs', 'Elegant Engravings', 'Festive Flyers', 'Glamour Graphics', 'Handmade Haven', 'Intricate Invitations', 'Jubilant Journey', 'Keepsake Cards', 'Luxury Letters', 'Memorable Mailers', 'Noble Notes', 'Ornate Orders', 'Personalized Papers', 'Quality Quills', 'Radiant Requests', 'Sleek Stationery', 'Tasteful Texts', 'Unique Updates', 'Vibrant Vellum', 'Wonderful Words', 'Xquisite Xpressions', 'Yearning Yards', 'Zestful Zones', 'Artful Arrangements', 'Bridal Brochures', 'Celebration Cards', 'Delightful Details', 'Elegant Envelopes', 'Festive Flyers', 'Grand Graphics', 'Happy Handouts', 'Inspiring Invitations', 'Joyful Journey', 'Keen Keepsakes', 'Lively Letters', 'Marvelous Messages', 'Noble Notes', 'Opulent Orders', 'Pleasant Papers', 'Quality Quills', 'Radiant Requests', 'Sleek Stationery', 'Tasteful Texts', 'Ultimate Updates', 'Vibrant Vellum', 'Wonderful Words', 'Xtreme Xpressions', 'Yummy Yields', 'Zesty Zones'],
        'Nail Art': ['Nail Glam Studio', 'Artistic Nails', 'Polished Perfection', 'Beautiful Beautification', 'Chic Claws', 'Delightful Designs', 'Elegant Extensions', 'Festive Fingers', 'Glamour Grips', 'Handsome Hands', 'Intricate Impressions', 'Jewel Junction', 'Kaleidoscope Kolors', 'Lustrous Layers', 'Manicure Magic', 'Noble Nails', 'Opulent Ornaments', 'Polished Perfection', 'Quality Quotient', 'Radiant Results', 'Sparkling Surfaces', 'Tasteful Tips', 'Unique Unions', 'Vibrant Varnish', 'Wonderful Wraps', 'Xquisite Xpressions', 'Yearning Yards', 'Zestful Zones', 'Artistic Appeal', 'Beautiful Backdrops', 'Celebration Corners', 'Delightful Details', 'Elegant Extensions', 'Festive Features', 'Grand Gatherings', 'Happy Havens', 'Inspiring Installations', 'Joyful Junctions', 'Keen Korners', 'Lively Locations', 'Marvelous Makeovers', 'Noble Nook', 'Ornate Oasis', 'Prestige Places', 'Quintessential Quarters', 'Radiant Rooms', 'Splendid Spaces', 'Tasteful Touch', 'Urban Uplift', 'Vibrant Venues', 'Wonderful Workspaces', 'Xquisite Xteriors', 'Yearning Yards', 'Zestful Zones'],
        'Mehandi': ['Mehndi Magic Artists', 'Henna Heaven', 'Traditional Designs', 'Ancient Art', 'Beautiful Bridal', 'Chic Circles', 'Delightful Details', 'Elegant Expressions', 'Festive Flair', 'Glamour Garden', 'Handsome Henna', 'Intricate Impressions', 'Jewel Junction', 'Kaleidoscope Kolors', 'Lustrous Layers', 'Mehndi Masters', 'Noble Notes', 'Ornate Ornaments', 'Polished Perfection', 'Quality Quotient', 'Radiant Results', 'Sparkling Surfaces', 'Tasteful Tips', 'Unique Unions', 'Vibrant Varnish', 'Wonderful Wraps', 'Xquisite Xpressions', 'Yearning Yards', 'Zestful Zones', 'Artistic Appeal', 'Beautiful Backdrops', 'Celebration Corners', 'Delightful Details', 'Elegant Extensions', 'Festive Features', 'Grand Gatherings', 'Happy Havens', 'Inspiring Installations', 'Joyful Junctions', 'Keen Korners', 'Lively Locations', 'Marvelous Makeovers', 'Noble Nook', 'Ornate Oasis', 'Prestige Places', 'Quintessential Quarters', 'Radiant Rooms', 'Splendid Spaces', 'Tasteful Touch', 'Urban Uplift', 'Vibrant Venues', 'Wonderful Workspaces', 'Xquisite Xteriors', 'Yearning Yards', 'Zestful Zones'],
        'Dress': ['Bridal Couture House', 'Wedding Wear Wonders', 'Dress to Impress', 'Artistic Appeal', 'Beautiful Bridal', 'Chic Collections', 'Delightful Designs', 'Elegant Ensembles', 'Festive Fashion', 'Glamour Gallery', 'Haute House', 'Inspiring Ideas', 'Jewel Junction', 'Kaleidoscope Kolors', 'Lustrous Layers', 'Majestic Moments', 'Noble Notes', 'Ornate Ornaments', 'Polished Perfection', 'Quality Quotient', 'Radiant Results', 'Sparkling Surfaces', 'Tasteful Tips', 'Unique Unions', 'Vibrant Varnish', 'Wonderful Wraps', 'Xquisite Xpressions', 'Yearning Yards', 'Zestful Zones', 'Artistic Appeal', 'Beautiful Backdrops', 'Celebration Corners', 'Delightful Details', 'Elegant Extensions', 'Festive Features', 'Grand Gatherings', 'Happy Havens', 'Inspiring Installations', 'Joyful Junctions', 'Keen Korners', 'Lively Locations', 'Marvelous Makeovers', 'Noble Nook', 'Ornate Oasis', 'Prestige Places', 'Quintessential Quarters', 'Radiant Rooms', 'Splendid Spaces', 'Tasteful Touch', 'Urban Uplift', 'Vibrant Venues', 'Wonderful Workspaces', 'Xquisite Xteriors', 'Yearning Yards', 'Zestful Zones'],
        'Jewelry': ['Sparkle & Shine Jewelry', 'Precious Gems Collection', 'Traditional Treasures', 'Artistic Appeal', 'Beautiful Bridal', 'Chic Collections', 'Delightful Designs', 'Elegant Ensembles', 'Festive Fashion', 'Glamour Gallery', 'Haute House', 'Inspiring Ideas', 'Jewel Junction', 'Kaleidoscope Kolors', 'Lustrous Layers', 'Majestic Moments', 'Noble Notes', 'Ornate Ornaments', 'Polished Perfection', 'Quality Quotient', 'Radiant Results', 'Sparkling Surfaces', 'Tasteful Tips', 'Unique Unions', 'Vibrant Varnish', 'Wonderful Wraps', 'Xquisite Xpressions', 'Yearning Yards', 'Zestful Zones', 'Artistic Appeal', 'Beautiful Backdrops', 'Celebration Corners', 'Delightful Details', 'Elegant Extensions', 'Festive Features', 'Grand Gatherings', 'Happy Havens', 'Inspiring Installations', 'Joyful Junctions', 'Keen Korners', 'Lively Locations', 'Marvelous Makeovers', 'Noble Nook', 'Ornate Oasis', 'Prestige Places', 'Quintessential Quarters', 'Radiant Rooms', 'Splendid Spaces', 'Tasteful Touch', 'Urban Uplift', 'Vibrant Venues', 'Wonderful Workspaces', 'Xquisite Xteriors', 'Yearning Yards', 'Zestful Zones'],
        'Return Gifts': ['Gift Gallery', 'Memorable Keepsakes', 'Special Souvenirs', 'Artistic Appeal', 'Beautiful Bridal', 'Chic Collections', 'Delightful Designs', 'Elegant Ensembles', 'Festive Fashion', 'Glamour Gallery', 'Haute House', 'Inspiring Ideas', 'Jewel Junction', 'Kaleidoscope Kolors', 'Lustrous Layers', 'Majestic Moments', 'Noble Notes', 'Ornate Ornaments', 'Polished Perfection', 'Quality Quotient', 'Radiant Results', 'Sparkling Surfaces', 'Tasteful Tips', 'Unique Unions', 'Vibrant Varnish', 'Wonderful Wraps', 'Xquisite Xpressions', 'Yearning Yards', 'Zestful Zones', 'Artistic Appeal', 'Beautiful Backdrops', 'Celebration Corners', 'Delightful Details', 'Elegant Extensions', 'Festive Features', 'Grand Gatherings', 'Happy Havens', 'Inspiring Installations', 'Joyful Junctions', 'Keen Korners', 'Lively Locations', 'Marvelous Makeovers', 'Noble Nook', 'Ornate Oasis', 'Prestige Places', 'Quintessential Quarters', 'Radiant Rooms', 'Splendid Spaces', 'Tasteful Touch', 'Urban Uplift', 'Vibrant Venues', 'Wonderful Workspaces', 'Xquisite Xteriors', 'Yearning Yards', 'Zestful Zones']
      };
      
      // Get the vendor count from the category name
      const vendorCounts = {
        'DJ': 25,
        'Makeup Artist': 32,
        'Dancer': 18,
        'Decor': 42,
        'Photographer': 38,
        'Food & Catering': 29,
        'Invitation': 15,
        'Nail Art': 12,
        'Mehandi': 20,
        'Dress': 27,
        'Jewelry': 14,
        'Return Gifts': 9
      };
      
      const selectedVendorNames = vendorNames[vendor] || vendorNames['DJ'];
      const vendorImage = vendorImages[vendor] || vendorImages['DJ'];
      const vendorCount = vendorCounts[vendor] || selectedVendorNames.length;
      
      // Generate the exact number of vendors as shown in the count
      for (let i = 0; i < vendorCount; i++) {
        const name = selectedVendorNames[i % selectedVendorNames.length] + (i >= selectedVendorNames.length ? ` ${i + 1}` : '');
        let imageUrl = vendorImage;
        
        // Use specific image for Beat Masters DJ
        if (name.includes('Beat Masters DJ')) {
          imageUrl = 'https://cdn0.weddingwire.in/vendor/1348/3_2/960/jpeg/wedding-dj-vishwa-pro-sound-dj-setup-1_15_421348-166209872112186.jpeg';
        }
        
        // Generate a random price within a range
        let priceRange = `₹${(15000 + Math.random() * 35000).toFixed(0)} - ₹${(30000 + Math.random() * 50000).toFixed(0)}`;
        
        // If budget is specified, adjust the price range to match
        if (budget) {
          switch (budget) {
            case '₹10,000 - ₹25,000':
              priceRange = `₹${(10000 + Math.random() * 15000).toFixed(0)} - ₹${(15000 + Math.random() * 10000).toFixed(0)}`;
              break;
            case '₹25,000 - ₹50,000':
              priceRange = `₹${(25000 + Math.random() * 15000).toFixed(0)} - ₹${(40000 + Math.random() * 10000).toFixed(0)}`;
              break;
            case '₹50,000 - ₹1,00,000':
              priceRange = `₹${(50000 + Math.random() * 30000).toFixed(0)} - ₹${(80000 + Math.random() * 20000).toFixed(0)}`;
              break;
            case '₹1,00,000 - ₹2,00,000':
              priceRange = `₹${(100000 + Math.random() * 50000).toFixed(0)} - ₹${(150000 + Math.random() * 50000).toFixed(0)}`;
              break;
            case '₹2,00,000+':
              priceRange = `₹${(200000 + Math.random() * 100000).toFixed(0)}+`;
              break;
          }
        }
        
        mockVendors.push({
          id: i + 1,
          vendor: vendor,
          city: city || 'Mumbai',
          name: name,
          rating: (4.0 + Math.random() * 1.0).toFixed(1),
          price: priceRange,
          image: imageUrl
        });
      }
    } else {
      // Default mock vendors if no vendor category specified
      mockVendors = [
        {
          id: 1,
          vendor: 'Photographer',
          city: city || 'Mumbai',
          name: 'Premium Wedding Services',
          rating: 4.8,
          price: '₹25,000 - ₹50,000',
          image: 'https://images.unsplash.com/photo-1516026672322-bc52d60868c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
        },
        {
          id: 2,
          vendor: 'Photographer',
          city: city || 'Mumbai',
          name: 'Elite Wedding Photography',
          rating: 4.9,
          price: '₹30,000 - ₹60,000',
          image: 'https://images.unsplash.com/photo-1516026672322-bc52d60868c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
        },
        {
          id: 3,
          vendor: 'Photographer',
          city: city || 'Mumbai',
          name: 'Capture Moments Studio',
          rating: 4.7,
          price: '₹20,000 - ₹40,000',
          image: 'https://images.unsplash.com/photo-1516026672322-bc52d60868c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
        }
      ];
    }
    
    setSearchResults(mockVendors);
  }, [location.state]);

  const handleBackToSearch = () => {
    navigate('/');
  };

  // Handle enquiry for a vendor
  const handleEnquire = (vendor) => {
    setSelectedVendor(vendor);
    setShowEnquiryModal(true);
  };

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the enquiry with the phone number
    setShowContactMessage(true);
    setShowEnquiryModal(false);
    setPhoneNumber('');
    
    // Hide the message after 3 seconds
    setTimeout(() => {
      setShowContactMessage(false);
    }, 3000);
  };

  const closeEnquiryModal = () => {
    setShowEnquiryModal(false);
    setPhoneNumber('');
  };

  return (
    <>
      <Navbar />
      <div className="search-results-container">
        <div className="search-results-header">
          <h1>Search Results</h1>
          <button className="back-button" onClick={handleBackToSearch}>
            Back to Search
          </button>
        </div>
        
        <div className="search-results-grid">
          {searchResults.map(result => (
            <div key={result.id} className="search-result-card">
              <div className="search-result-image">
                <img src={result.image} alt={result.name} />
              </div>
              <div className="search-result-details">
                <h2>{result.name}</h2>
                <p><strong>Vendor Type:</strong> {result.vendor}</p>
                <p><strong>Location:</strong> {result.city}</p>
                <p><strong>Rating:</strong> {result.rating} ★</p>
                <p><strong>Price Range:</strong> {result.price}</p>
                <div className="search-result-actions">
                  <button className="book-now-button">Book Now</button>
                  <button className="enquire-button" onClick={() => handleEnquire(result)}>Enquire</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Enquiry Modal */}
      {showEnquiryModal && (
        <div className="enquiry-modal">
          <div className="enquiry-modal-content">
            <span className="enquiry-close" onClick={closeEnquiryModal}>&times;</span>
            <h2>Enquire with {selectedVendor?.name}</h2>
            <p>Please provide your phone number and we'll connect you with the vendor.</p>
            <form onSubmit={handleEnquirySubmit}>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <button type="submit" className="submit-enquiry-button">Submit Enquiry</button>
            </form>
          </div>
        </div>
      )}
      
      {/* Contact Message Popup */}
      {showContactMessage && (
        <div className="contact-message-popup">
          <div className="contact-message-content">
            <p>{selectedVendor?.name} will contact you soon! Please wait...</p>
          </div>
        </div>
      )}
      
      <Footer />
    </>
  );
};

export default SearchResults;