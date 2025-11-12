import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [vendorCategories, setVendorCategories] = useState([
    { id: 1, name: 'DJ', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkRSAad2_IVjI4UKxTTYPAt8SDLz1TuXtjTA&s', count: 25 },
    { id: 2, name: 'Makeup Artist', image: 'https://ciceroni.in/cdn/shop/articles/top-12-bridal-makeup-artists-to-look-out-for-in-ahmedabad-480982.png?v=1683890124', count: 32 },
    { id: 3, name: 'Dancer', image: 'https://blog.g3fashion.com/wp-content/uploads/2021/04/choreographers-for-wedding-dance-1024x652.jpg', count: 18 },
    { id: 4, name: 'Decor', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80', count: 42 },
    { id: 5, name: 'Photographer', image: 'https://cdn-blog.superprof.com/blog_in/wp-content/uploads/2020/01/in-photo-photo-1.jpg', count: 38 },
    { id: 6, name: 'Food & Catering', image: 'https://nilacaterers.com/wp-content/uploads/2024/09/nila-august.jpg', count: 29 },
    { id: 7, name: 'Invitation', image: 'https://cdn0.weddingwire.in/article/0978/original/1280/jpg/108790-the-murphy-studio.jpeg', count: 15 },
    { id: 8, name: 'Nail Art', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm2grGrhIRd58QmGHWnpKbjIzTUcwrGNCl1g&s', count: 12 },
    { id: 9, name: 'Mehandi', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAbZSdqM9Sm3XCGpbs6HvV5lr14fI_cOybQw&s', count: 20 },
    { id: 10, name: 'Dress', image: 'https://cdn0.weddingwire.in/article-gallery-o/00000/3_2/1280/jpg/articulos-india/2019/non-troncales/wedding-couple-dresses/coolbluez-coupleweddingdress-16coupleweddingdress.webp', count: 27 },
    { id: 11, name: 'Jewelry', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-v7v7bb6la-5nAeDWjDiSU2dJPDHNpxtYog&s', count: 14 },
    { id: 12, name: 'Return Gifts', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUayD2ismoGSy3B-pbGt-WlnHOPNue3WXTew&s', count: 9 }
  ]);

  // Check for newly registered vendors and update counts
  useEffect(() => {
    const checkNewVendorRegistration = () => {
      const newVendorData = localStorage.getItem('newVendorRegistered');
      if (newVendorData) {
        const newVendor = JSON.parse(newVendorData);
        // Check if the registration is recent (within the last 5 seconds)
        const currentTime = new Date().getTime();
        if (currentTime - newVendor.timestamp < 5000) {
          // Update the vendor count for the corresponding category
          setVendorCategories(prevCategories => 
            prevCategories.map(category => 
              category.name === newVendor.category 
                ? { ...category, count: category.count + 1 } 
                : category
            )
          );
          
          // Remove the item from localStorage
          localStorage.removeItem('newVendorRegistered');
        }
      }
    };

    // Check for new vendor registration when component mounts
    checkNewVendorRegistration();

    // Set up an interval to check periodically
    const interval = setInterval(checkNewVendorRegistration, 1000);

    // Clean up the interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  // Features data
  const features = [
    { 
      id: 1, 
      title: 'Easy Booking', 
      description: 'Book vendors with just a few clicks. Our streamlined process allows you to browse, compare, and book vendors in minutes. No more endless phone calls or emails - everything you need is right here.', 
      icon: '📅',
      details: '24/7 availability, instant confirmations, real-time calendar sync'
    },
    { 
      id: 2, 
      title: 'Verified Vendors', 
      description: 'Work with trusted professionals. Every vendor on our platform is thoroughly vetted and verified to ensure quality service. We check credentials, reviews, and past work to guarantee your satisfaction.', 
      icon: '✅',
      details: 'Background checks, portfolio verification, insurance validation'
    },
    { 
      id: 3, 
      title: 'Price Comparison', 
      description: 'Compare prices from multiple vendors. See transparent pricing from all vendors in one place. No hidden fees or surprise costs - just clear, upfront pricing so you can make informed decisions.', 
      icon: '💰',
      details: 'Side-by-side comparison, budget tracking, price alerts'
    },
    { 
      id: 4, 
      title: 'Real Reviews', 
      description: 'See authentic reviews from real couples. Make decisions based on genuine experiences from couples who have used our vendors. Filter reviews by wedding type, budget, and location.', 
      icon: '⭐',
      details: 'Photo verification, video testimonials, detailed feedback'
    }
  ];

  // Handle category click
  const handleCategoryClick = (categoryName) => {
    // Navigate to search results with the selected category
    navigate('/search-results', { state: { vendor: categoryName } });
  };

  // Handle vendor registration
  const handleVendorRegistration = () => {
    // Navigate to login page with full-screen parameter
    navigate('/login?fullscreen=true');
  };

  // Handle client hire
  const handleClientHire = () => {
    navigate('/client-hire');
  };

  return (
    <>
      <div className="home-container">
        {/* Navigation Bar */}
        <Navbar />

        {/* Hero Section with Bride and Groom Image */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-image-container">
              <img 
                src="https://media.istockphoto.com/id/1186214696/photo/hindu-wedding-ritual-wherein-bride-and-groom-hand.jpg?s=612x612&w=0&k=20&c=fTlNejRdY7dkvk742auNgI3j6Ve9UqqWSnb3QJ-D2gw=" 
                alt="Happy Couple at Wedding" 
                className="hero-image"
              />
              <div className="hero-quote">
                <h2>"Your Marriage, Our Responsibility"</h2>
              </div>
            </div>
          </div>
        </section>

        {/* Vendor Categories Section */}
        <section className="vendor-categories-section" id="vendors">
          <div className="section-header">
            <h2>Vendor Categories</h2>
            <p>Find the perfect vendors for your special day</p>
          </div>
          <div className="vendor-categories-grid">
            {vendorCategories.map(category => (
              <div 
                key={category.id} 
                className="vendor-category-card"
                onClick={() => handleCategoryClick(category.name)}
                style={{ cursor: 'pointer' }}
              >
                <div className="category-image-container">
                  <img src={category.image} alt={category.name} className="category-image" />
                </div>
                <div className="category-name">{category.name}</div>
                <div className="category-count">{category.count} vendors</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="section-header">
            <h2>Why Choose Eventra?</h2>
            <p>We make wedding planning effortless and enjoyable with our comprehensive platform designed for your special day</p>
          </div>
          <div className="features-grid">
            {features.map(feature => (
              <div key={feature.id} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                 <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-details">{feature.details}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Vendor and Client Slides */}
        <section className="slides-section">
          <div className="slides-container">
            <div className="slide vendor-slide">
              <div className="slide-content">
                <h3>Register as a Vendor</h3>
                <p>Join our platform to showcase your services to couples planning their special day. Reach more customers and grow your business.</p>
                <button className="slide-button vendor-button" onClick={handleVendorRegistration}>Register Now</button>
              </div>
            </div>
            <div className="slide client-slide">
              <div className="slide-content">
                <h3>Hire a Vendor</h3>
                <p>Find the perfect vendors for your wedding. Browse through our curated selection of professionals and book with confidence.</p>
                <button className="slide-button client-button" onClick={handleClientHire}>Hire Now</button>
              </div>
            </div>
          </div>
        </section>

        {/* Floating Action Button for Mobile */}
        <div className="floating-action-button">
          <button className="book-now-button">Book Now</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;