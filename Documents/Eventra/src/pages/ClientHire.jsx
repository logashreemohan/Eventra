import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginNavbar from '../components/LoginNavbar';
import Footer from '../components/Footer';
import '../styles/Login.css';

const ClientHire = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    eventType: '',
    eventDate: '',
    venue: '',
    vendorType: '',
    budget: '',
    specialRequests: ''
  });

  const vendorTypes = [
    'Photographer',
    'Makeup Artist',
    'Mehndi Artist',
    'Decorator',
    'Caterer',
    'Wedding Planner',
    'DJ',
    'Dancer',
    'Invitation Designer',
    'Nail Artist',
    'Dress Designer',
    'Jewelry Designer',
    'Return Gifts Provider'
  ];

  const locations = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Chennai',
    'Kolkata',
    'Hyderabad'
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would call an API
    console.log('Client hire form submitted:', formData);
    
    // Navigate to search results with the selected criteria
    navigate('/search-results', { 
      state: { 
        vendor: formData.vendorType,
        city: formData.venue,
        budget: formData.budget
      } 
    });
  };

  return (
    <>
      <LoginNavbar />
      <div className="login-container">
        <div className="login-form-container">
          <button onClick={() => navigate('/')} className="back-button">
            ← Back to Home
          </button>
          <h2>Hire a Vendor</h2>
          <p className="signup-subtitle">Find the perfect vendors for your special event</p>
          
          <form className="login-form" onSubmit={handleSubmit}>
            {/* Step 1: Name */}
            {step === 1 && (
              <div className="form-step">
                <h3>Step 1 of 8</h3>
                <div className="form-group">
                  <label htmlFor="name">What is your name?</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="button" className="submit-button" onClick={nextStep} disabled={!formData.name}>
                  Next
                </button>
              </div>
            )}

            {/* Step 2: Contact */}
            {step === 2 && (
              <div className="form-step">
                <h3>Step 2 of 8</h3>
                <div className="form-group">
                  <label htmlFor="contact">What is your contact number or email?</label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    placeholder="Enter your contact number or email"
                    value={formData.contact}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-navigation">
                  <button type="button" className="back-button-step" onClick={prevStep}>
                    Back
                  </button>
                  <button type="button" className="submit-button" onClick={nextStep} disabled={!formData.contact}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Event Type */}
            {step === 3 && (
              <div className="form-step">
                <h3>Step 3 of 8</h3>
                <div className="form-group">
                  <label htmlFor="eventType">What type of event is this?</label>
                  <input
                    type="text"
                    id="eventType"
                    name="eventType"
                    placeholder="Enter event type (e.g., Wedding, Birthday, Corporate)"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-navigation">
                  <button type="button" className="back-button-step" onClick={prevStep}>
                    Back
                  </button>
                  <button type="button" className="submit-button" onClick={nextStep} disabled={!formData.eventType}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Event Date */}
            {step === 4 && (
              <div className="form-step">
                <h3>Step 4 of 8</h3>
                <div className="form-group">
                  <label htmlFor="eventDate">When is your event?</label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-navigation">
                  <button type="button" className="back-button-step" onClick={prevStep}>
                    Back
                  </button>
                  <button type="button" className="submit-button" onClick={nextStep} disabled={!formData.eventDate}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Venue */}
            {step === 5 && (
              <div className="form-step">
                <h3>Step 5 of 8</h3>
                <div className="form-group">
                  <label htmlFor="venue">Where is your event taking place?</label>
                  <select
                    id="venue"
                    name="venue"
                    value={formData.venue}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select venue/location</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-navigation">
                  <button type="button" className="back-button-step" onClick={prevStep}>
                    Back
                  </button>
                  <button type="button" className="submit-button" onClick={nextStep} disabled={!formData.venue}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 6: Vendor Type */}
            {step === 6 && (
              <div className="form-step">
                <h3>Step 6 of 8</h3>
                <div className="form-group">
                  <label htmlFor="vendorType">What type of vendor are you looking for?</label>
                  <select
                    id="vendorType"
                    name="vendorType"
                    value={formData.vendorType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select vendor type</option>
                    {vendorTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-navigation">
                  <button type="button" className="back-button-step" onClick={prevStep}>
                    Back
                  </button>
                  <button type="button" className="submit-button" onClick={nextStep} disabled={!formData.vendorType}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 7: Budget */}
            {step === 7 && (
              <div className="form-step">
                <h3>Step 7 of 8</h3>
                <div className="form-group">
                  <label htmlFor="budget">What is your budget range?</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select budget range</option>
                    <option value="₹10,000 - ₹25,000">₹10,000 - ₹25,000</option>
                    <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                    <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                    <option value="₹1,00,000 - ₹2,00,000">₹1,00,000 - ₹2,00,000</option>
                    <option value="₹2,00,000+">₹2,00,000+</option>
                  </select>
                </div>
                <div className="form-navigation">
                  <button type="button" className="back-button-step" onClick={prevStep}>
                    Back
                  </button>
                  <button type="button" className="submit-button" onClick={nextStep} disabled={!formData.budget}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 8: Special Requests */}
            {step === 8 && (
              <div className="form-step">
                <h3>Step 8 of 8</h3>
                <div className="form-group">
                  <label htmlFor="specialRequests">Do you have any special requests or requirements?</label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    placeholder="Any special requests or requirements (optional)"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows="4"
                  />
                </div>
                <div className="form-navigation">
                  <button type="button" className="back-button-step" onClick={prevStep}>
                    Back
                  </button>
                  <button type="submit" className="submit-button">
                    Submit Request
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ClientHire;