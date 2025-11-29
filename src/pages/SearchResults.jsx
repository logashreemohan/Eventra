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
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showContactMessage, setShowContactMessage] = useState(false);
  // Booking form state
  const [bookingData, setBookingData] = useState({
    eventDate: '',
    eventTime: '',
    eventType: '',
    venueName: '',
    venueLocation: '',
    clientEmail: '',
    numberOfGuests: '',
    clientName: '',
    clientPhone: '',
    budget: ''
  });

  useEffect(() => {
    // Get search data from location state
    const { vendor, location: city, budget } = location.state || {};
    
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
        'Nail Art': ['Nail Glam Studio', 'Artistic Nails', 'Polished Perfection', 'Beautiful Beautification', 'Chic Claws', 'Delightful Designs', 'Elegant Extensions', 'Festive Fingers', 'Glamour Grips', 'Handsome Hands', 'Intricate Impressions', 'Jewel Junction', 'Kaleidoscope Kolors', 'Lustrous Layers', 'Manicure Magic', 'Noble Nails', 'Ornate Ornaments', 'Polished Perfection', 'Quality Quotient', 'Radiant Results', 'Sparkling Surfaces', 'Tasteful Tips', 'Unique Unions', 'Vibrant Varnish', 'Wonderful Wraps', 'Xquisite Xpressions', 'Yearning Yards', 'Zestful Zones', 'Artistic Appeal', 'Beautiful Backdrops', 'Celebration Corners', 'Delightful Details', 'Elegant Extensions', 'Festive Features', 'Grand Gatherings', 'Happy Havens', 'Inspiring Installations', 'Joyful Junctions', 'Keen Korners', 'Lively Locations', 'Marvelous Makeovers', 'Noble Nook', 'Ornate Oasis', 'Prestige Places', 'Quintessential Quarters', 'Radiant Rooms', 'Splendid Spaces', 'Tasteful Touch', 'Urban Uplift', 'Vibrant Venues', 'Wonderful Workspaces', 'Xquisite Xteriors', 'Yearning Yards', 'Zestful Zones'],
        'Mehandi': ['Mehndi Magic Artists', 'Henna Heaven', 'Traditional Designs', 'Ancient Art', 'Beautiful Bridal', 'Chic Circles', 'Delightful Details', 'Elegant Expressions', 'Festive Flair', 'Glamour Garden', 'Handsome Henna', 'Intricate Impressions', 'Jewel Junction', 'Kaleidoscope Kolors', 'Lustrous Layers', 'Mehndi Masters', 'Noble Notes', 'Ornate Ornaments', 'Polished Perfection', 'Quality Quotient', 'Radiant Results', 'Sparkling Surfaces', 'Tasteful Tips', 'Unique Unions', 'Vibrant Varnish', 'Wonderful Wraps', 'Xquisite Xpressions', 'Yearning Yards', 'Zestful Zones', 'Artistic Appeal', 'Beautiful Backdrops', 'Celebration Corners', 'Delightful Details', 'Elegant Extensions', 'Festive Features', 'Grand Gatherings', 'Happy Havens', 'Inspiring Installations', 'Joyful Junctions', 'Keen Korners', 'Lively Locations', 'Marvelous Makeovers', 'Noble Nook', 'Ornate Oasis', 'Prestige Places', 'Quintessential Quarters', 'Radiant Rooms', 'Splendid Spaces', 'Tasteful Touch', 'Urban Uplift', 'Vibrant Venues', 'Wonderful Workspaces', 'Xquisite Xteriors', 'Yearning Yards', 'Zestful Zones'],
        'Dress': ['Bridal Couture House', 'Wedding Wear Wonders', 'Dress to Impress', 'Artistic Appeal', 'Beautiful Bridal', 'Chic Collections', 'Delightful Designs', 'Elegant Ensembles', 'Festive Fashion', 'Glamour Gallery', 'Haute House', 'Inspiring Ideas', 'Jewel Junction', 'Kaleidoscope Kolors', 'Lustrous Layers', 'Majestic Moments', 'Noble Notes', 'Ornate Ornaments', 'Polished Perfection', 'Quality Quotient', 'Radiant Results', 'Sparkling Surfaces', 'Tasteful Tips', 'Unique Unions', 'Vibrant Varnish', 'Wonderful Wraps', 'Xquisite Xpressions', 'Yearning Yards', 'Zestful Zones', 'Artistic Appeal', 'Beautiful Backdrops', 'Celebration Corners', 'Delightful Details', 'Elegant Extensions', 'Festive Features', 'Grand Gatherings', 'Happy Havens', 'Inspiring Installations', 'Joyful Junctions', 'Keen Korners', 'Lively Locations', 'Marvelous Makeovers', 'Noble Nook', 'Ornate Oasis', 'Prestige Places', 'Quintessential Quarters', 'Radiant Rooms', 'Splendid Spaces', 'Tasteful Touch', 'Urban Uplift', 'Vibrant Venues', 'Wonderful Workspaces', 'Xquisite Xteriors', 'Yearning Yards', 'Zestful Zones'],
        'Jewelry': ['Sparkle & Shine Jewelry', 'Precious Gems Collection', 'Traditional Treasures', 'Artistic Appeal', 'Beautiful Bridal', 'Chic Collections', 'Delightful Designs', 'Elegant Ensembles', 'Festive Fashion', 'Glamour Gallery', 'Haute House', 'Inspiring Ideas', 'Jewel Junction', 'Kaleidoscope Kolors', 'Lustrous Layers', 'Majestic Moments', 'Noble Notes', 'Ornate Ornaments', 'Polished Perfection', 'Quality Quotient', 'Radiant Results', 'Sparkling Surfaces', 'Tasteful Tips', 'Unique Unions', 'Vibrant Varnish', 'Wonderful Wraps', 'Xquisite Xpressions', 'Yearning Yards', 'Zestful Zones', 'Artistic Appeal', 'Beautiful Backdrops', 'Celebration Corners', 'Delightful Details', 'Elegant Extensions', 'Festive Features', 'Grand Gatherings', 'Happy Havens', 'Inspiring Installations', 'Joyful Junctions', 'Keen Korners', 'Lively Locations', 'Marvelous Makeovers', 'Noble Nook', 'Ornate Oasis', 'Prestige Places', 'Quintessential Quarters', 'Radiant Rooms', 'Splendid Spaces', 'Tasteful Touch', 'Urban Uplift', 'Vibrant Venues', 'Wonderful Workspaces', 'Xquisite Xteriors', 'Yearning Yards', 'Zestful Zones'],
        'Return Gifts': ['Gift Gallery', 'Memorable Keepsakes', 'Special Souvenirs', 'Artistic Appeal', 'Beautiful Bridal', 'Chic Collections', 'Delightful Designs', 'Elegant Ensembles', 'Festive Fashion', 'Glamour Gallery', 'Haute House', 'Inspiring Ideas', 'Jewel Junction', 'Kaleidoscope Kolors', 'Lustrous Layers', 'Majestic Moments', 'Noble Notes', 'Ornate Ornaments', 'Polished Perfection', 'Quality Quotient', 'Radiant Results', 'Sparkling Surfaces', 'Tasteful Tips', 'Unique Unions', 'Vibrant Varnish', 'Wonderful Wraps', 'Xquisite Xpressions', 'Yearning Yards', 'Zestful Zones', 'Artistic Appeal', 'Beautiful Backdrops', 'Celebration Corners', 'Delightful Details', 'Elegant Extensions', 'Festive Features', 'Grand Gatherings', 'Happy Havens', 'Inspiring Installations', 'Joyful Junctions', 'Keen Korners', 'Lively Locations', 'Marvelous Makeovers', 'Noble Nook', 'Ornate Oasis', 'Prestige Places', 'Quintessential Quarters', 'Radiant Rooms', 'Splendid Spaces', 'Tasteful Touch', 'Urban Uplift', 'Vibrant Venues', 'Wonderful Workspaces', 'Xquisite Xteriors', 'Yearning Yards', 'Zestful Zones']
      };
      
      // Get the vendor count from the category name
      const vendorCounts = {
        'DJ': 125,
        'Makeup Artist': 132,
        'Dancer': 118,
        'Decor': 142,
        'Photographer': 138,
        'Food & Catering': 129,
        'Invitation': 115,
        'Nail Art': 112,
        'Mehandi': 120,
        'Dress': 127,
        'Jewelry': 114,
        'Return Gifts': 109
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

  // Handle booking for a vendor
  const handleBookNow = (vendor) => {
    setSelectedVendor(vendor);
    setShowBookingModal(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
    // Reset form data when closing
    setBookingData({
      eventDate: '',
      eventTime: '',
      eventType: '',
      venueName: '',
      venueLocation: '',
      clientEmail: '',
      numberOfGuests: '',
      clientName: '',
      clientPhone: '',
      budget: ''
    });
  };

  const handleBookingInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const confirmBooking = () => {
    // Validate required fields
    if (!bookingData.eventDate || !bookingData.eventTime || !bookingData.eventType || 
        !bookingData.venueName || !bookingData.venueLocation || !bookingData.clientEmail || 
        !bookingData.numberOfGuests || !bookingData.clientName || !bookingData.clientPhone) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Navigate to booking confirmation page with booking data
    navigate('/booking-confirmation', { 
      state: { 
        bookingData: bookingData,
        vendor: selectedVendor
      } 
    });
  };

  return (
    <>
      <Navbar />
      <div className="search-results-container">
        <div className="search-results-header">
          <h1 className="results-title animate-fade-in">Search Results</h1>
          <button className="back-button pulse-animation" onClick={handleBackToSearch}>
            Back to Search
          </button>
        </div>
        
        <div className="results-summary animate-fade-in-delay">
          <p>Showing {searchResults.length} results</p>
        </div>
        
        <div className="search-results-grid">
          {searchResults.map((result, index) => (
            <div 
              key={result.id} 
              className="search-result-card card-hover-animation"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="search-result-image">
                <img src={result.image} alt={result.name} />
              </div>
              <div className="search-result-details">
                <h2 className="vendor-name">{result.name}</h2>
                <div className="vendor-meta">
                  <p className="vendor-type"><strong>Type:</strong> {result.vendor}</p>
                  <p className="vendor-location"><strong>Location:</strong> {result.city}</p>
                  <p className="vendor-rating"><strong>Rating:</strong> 
                    <span className="rating-stars">
                      {'★'.repeat(Math.floor(result.rating))}
                      {'☆'.repeat(5 - Math.floor(result.rating))}
                    </span>
                    {result.rating}
                  </p>
                  <p className="vendor-price"><strong>Price Range:</strong> {result.price}</p>
                </div>
                <div className="search-result-actions">
                  <button className="book-now-button pulse-animation" onClick={() => handleBookNow(result)}>Book Now</button>
                  <button className="enquire-button pulse-animation" onClick={() => handleEnquire(result)}>Enquire</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Enquiry Modal */}
      {showEnquiryModal && (
        <div className="enquiry-modal">
          <div className="enquiry-modal-content animate-modal">
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
                  className="form-input"
                />
              </div>
              <button type="submit" className="submit-enquiry-button pulse-animation">Submit Enquiry</button>
            </form>
          </div>
        </div>
      )}
      
      {/* Booking Modal */}
      {showBookingModal && (
        <div className="modal-overlay">
          <div className="booking-modal">
            <div className="modal-header">
              <h2>Book {selectedVendor?.name}</h2>
              <button className="close-button" onClick={closeBookingModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="booking-form">
                <div className="form-group">
                  <label>Event Date *</label>
                  <input 
                    type="date" 
                    name="eventDate"
                    value={bookingData.eventDate}
                    onChange={handleBookingInputChange}
                    className="form-input"
                    placeholder="dd-mm-yyyy"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Event Time *</label>
                  <input 
                    type="time" 
                    name="eventTime"
                    value={bookingData.eventTime}
                    onChange={handleBookingInputChange}
                    className="form-input"
                    placeholder="--:--"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Event Type (Wedding, Birthday, Meeting, etc.) *</label>
                  <select
                    name="eventType"
                    value={bookingData.eventType}
                    onChange={handleBookingInputChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select Event Type</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Venue Name *</label>
                  <input 
                    type="text" 
                    name="venueName"
                    placeholder="Enter venue name"
                    value={bookingData.venueName}
                    onChange={handleBookingInputChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Venue Location *</label>
                  <input 
                    type="text" 
                    name="venueLocation"
                    placeholder="Enter venue location"
                    value={bookingData.venueLocation}
                    onChange={handleBookingInputChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Client Email *</label>
                  <input 
                    type="email" 
                    name="clientEmail"
                    placeholder="Enter your email"
                    value={bookingData.clientEmail}
                    onChange={handleBookingInputChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Number of Guests *</label>
                  <input 
                    type="number" 
                    name="numberOfGuests"
                    placeholder="Enter number of guests"
                    value={bookingData.numberOfGuests}
                    onChange={handleBookingInputChange}
                    className="form-input"
                    min="1"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Client Name *</label>
                  <input 
                    type="text" 
                    name="clientName"
                    placeholder="Enter your full name"
                    value={bookingData.clientName}
                    onChange={handleBookingInputChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Client Phone Number *</label>
                  <input 
                    type="tel" 
                    name="clientPhone"
                    placeholder="Enter your phone number"
                    value={bookingData.clientPhone}
                    onChange={handleBookingInputChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Budget (optional)</label>
                  <input 
                    type="text" 
                    name="budget"
                    placeholder="Enter your budget (optional)"
                    value={bookingData.budget}
                    onChange={handleBookingInputChange}
                    className="form-input"
                  />
                </div>
                
                <div className="service-summary">
                  <h3>Service Details</h3>
                  <div className="service-item">
                    <span>{selectedVendor?.vendor} Services</span>
                    <span>{selectedVendor?.price}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-button" onClick={closeBookingModal}>Cancel</button>
              <button className="confirm-button pulse-animation" onClick={confirmBooking}>Confirm Booking</button>
            </div>
          </div>
        </div>
      )}
      
      {/* Contact Message Popup */}
      {showContactMessage && (
        <div className="contact-message-popup">
          <div className="contact-message-content animate-fade-in">
            <p>{selectedVendor?.name} will contact you soon! Please wait...</p>
          </div>
        </div>
      )}
      
      <Footer />
    </>
  );
};

export default SearchResults;