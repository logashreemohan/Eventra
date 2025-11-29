import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { vendorAPI } from '../services/api';
import '../styles/Login.css';

const VendorSignup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Track the current step in the registration process
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    category: '',
    password: '',
    confirmPassword: '',
    serviceDescription: '',
    experience: '',
    priceRange: '',
    website: '',
    instagram: '',
    facebook: ''
  });
  const [workImages, setWorkImages] = useState([]);
  const [packages, setPackages] = useState([{ name: '', price: '' }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const locations = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Chennai',
    'Kolkata',
    'Hyderabad'
  ];

  const vendorCategories = [
    'Photography',
    'Catering',
    'Makeup Artist',
    'Venue',
    'Decorator',
    'DJ',
    'Mehendi'
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handlePackageChange = (index, field, value) => {
    const updatedPackages = [...packages];
    updatedPackages[index][field] = value;
    setPackages(updatedPackages);
  };

  const addPackage = () => {
    setPackages([...packages, { name: '', price: '' }]);
  };

  const removePackage = (index) => {
    if (packages.length > 1) {
      const updatedPackages = packages.filter((_, i) => i !== index);
      setPackages(updatedPackages);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setWorkImages(prevImages => [...prevImages, ...files]);
  };

  const removeImage = (index) => {
    setWorkImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // First, create the user account
      // Note: In a real implementation, this would be handled by the backend
      // For now, we'll simulate this and navigate to the vendor dashboard
      
      // Create vendor profile
      const vendorData = {
        user_id: 1, // This would come from the authenticated user in a real implementation
        business_name: formData.name,
        category: formData.category,
        description: formData.serviceDescription,
        experience: parseInt(formData.experience),
        price_range: formData.priceRange,
        website: formData.website,
        instagram: formData.instagram,
        facebook: formData.facebook
      };
      
      const { data, error } = await vendorAPI.createVendor(vendorData);
      
      if (error) {
        throw new Error(error);
      }
      
      console.log('Vendor profile created:', data);
      
      // Navigate to vendor dashboard after signup
      navigate('/vendor/dashboard');
    } catch (err) {
      console.error('Vendor signup error:', err);
      setError(err.message || 'Failed to create vendor profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="vendor-registration-container">
        <div className="vendor-registration-form-container animate-fade-in">
          <button onClick={() => navigate('/login')} className="back-button pulse-animation">
            ← Back
          </button>
          
          {error && <div className="error-message">{error}</div>}
          
          <h2 className="vendor-registration-title">Vendor Signup</h2>
          <p className="signup-subtitle">Showcase your services to potential clients</p>
          
          {/* Progress Bar */}
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(step / 9) * 100}%` }}
              ></div>
            </div>
            <div className="step-indicator">
              Step {step} of 9
            </div>
          </div>
          
          <form className="login-form" onSubmit={handleSubmit}>
            {/* Step 1: Vendor Name / Business Name */}
            {step === 1 && (
              <div className="form-step animate-fade-in">
                <h3 className="step-title">Step 1: Vendor Name / Business Name</h3>
                <p className="step-description">The official name of the wedding service provider.</p>
                <div className="form-group">
                  <label htmlFor="name">Business/Artist Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your business or artist name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                <button type="button" className="submit-button pulse-animation" onClick={nextStep} disabled={!formData.name}>
                  Next
                </button>
              </div>
            )}

            {/* Step 2: Service Category */}
            {step === 2 && (
              <div className="form-step animate-fade-in">
                <h3 className="step-title">Step 2: Service Category</h3>
                <p className="step-description">(Example: Photography, Catering, Makeup Artist, Venue, Decorator, DJ, Mehendi)</p>
                <div className="form-group">
                  <label htmlFor="category">Service Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="form-select"
                  >
                    <option value="">Select your category</option>
                    {vendorCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-navigation">
                  <button type="button" className="back-button-step pulse-animation" onClick={prevStep}>
                    Back
                  </button>
                  <button type="button" className="submit-button pulse-animation" onClick={nextStep} disabled={!formData.category}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Contact Details */}
            {step === 3 && (
              <div className="form-step animate-fade-in">
                <h3 className="step-title">Step 3: Contact Details</h3>
                <p className="step-description">Phone number + Email ID for booking communication.</p>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-navigation">
                  <button type="button" className="back-button-step pulse-animation" onClick={prevStep}>
                    Back
                  </button>
                  <button type="button" className="submit-button pulse-animation" onClick={nextStep}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Service Description */}
            {step === 4 && (
              <div className="form-step animate-fade-in">
                <h3 className="step-title">Step 4: Service Description</h3>
                <p className="step-description">Describe your services in detail to attract clients.</p>
                <div className="form-group">
                  <label htmlFor="serviceDescription">Service Description</label>
                  <textarea
                    id="serviceDescription"
                    name="serviceDescription"
                    placeholder="Describe your services, specialties, and what makes you unique..."
                    value={formData.serviceDescription}
                    onChange={handleInputChange}
                    required
                    className="form-textarea"
                    rows="5"
                  />
                </div>
                <div className="form-navigation">
                  <button type="button" className="back-button-step pulse-animation" onClick={prevStep}>
                    Back
                  </button>
                  <button type="button" className="submit-button pulse-animation" onClick={nextStep} disabled={!formData.serviceDescription}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Experience */}
            {step === 5 && (
              <div className="form-step animate-fade-in">
                <h3 className="step-title">Step 5: Experience</h3>
                <p className="step-description">Share your years of experience in the industry.</p>
                <div className="form-group">
                  <label htmlFor="experience">Years of Experience</label>
                  <input
                    type="number"
                    id="experience"
                    name="experience"
                    placeholder="Enter years of experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    min="0"
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-navigation">
                  <button type="button" className="back-button-step pulse-animation" onClick={prevStep}>
                    Back
                  </button>
                  <button type="button" className="submit-button pulse-animation" onClick={nextStep} disabled={!formData.experience}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 6: Price Range */}
            {step === 6 && (
              <div className="form-step animate-fade-in">
                <h3 className="step-title">Step 6: Price Range</h3>
                <p className="step-description">Select your price range to help clients find services within their budget.</p>
                <div className="form-group">
                  <label>Price Range</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="priceRange"
                        value="$"
                        checked={formData.priceRange === '$'}
                        onChange={handleInputChange}
                        className="radio-input"
                      />
                      <span className="radio-text">$ (Budget-friendly)</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="priceRange"
                        value="$$"
                        checked={formData.priceRange === '$$'}
                        onChange={handleInputChange}
                        className="radio-input"
                      />
                      <span className="radio-text">$$ (Mid-range)</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="priceRange"
                        value="$$$"
                        checked={formData.priceRange === '$$$'}
                        onChange={handleInputChange}
                        className="radio-input"
                      />
                      <span className="radio-text">$$$ (Premium)</span>
                    </label>
                  </div>
                </div>
                <div className="form-navigation">
                  <button type="button" className="back-button-step pulse-animation" onClick={prevStep}>
                    Back
                  </button>
                  <button type="button" className="submit-button pulse-animation" onClick={nextStep} disabled={!formData.priceRange}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 7: Social Media Links */}
            {step === 7 && (
              <div className="form-step animate-fade-in">
                <h3 className="step-title">Step 7: Social Media Links</h3>
                <p className="step-description">Share your social media profiles to showcase your work.</p>
                <div className="form-group">
                  <label htmlFor="website">Website (optional)</label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    placeholder="https://yourwebsite.com"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="instagram">Instagram (optional)</label>
                  <input
                    type="text"
                    id="instagram"
                    name="instagram"
                    placeholder="Instagram handle"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="facebook">Facebook (optional)</label>
                  <input
                    type="text"
                    id="facebook"
                    name="facebook"
                    placeholder="Facebook page URL"
                    value={formData.facebook}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                <div className="form-navigation">
                  <button type="button" className="back-button-step pulse-animation" onClick={prevStep}>
                    Back
                  </button>
                  <button type="button" className="submit-button pulse-animation" onClick={nextStep}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 8: Work Images */}
            {step === 8 && (
              <div className="form-step animate-fade-in">
                <h3 className="step-title">Step 8: Work Images</h3>
                <p className="step-description">Upload images of your previous work to showcase your skills.</p>
                <div className="form-group">
                  <label htmlFor="workImages">Upload Work Images</label>
                  <input
                    type="file"
                    id="workImages"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="form-file-input"
                  />
                  <div className="uploaded-images">
                    {workImages.map((image, index) => (
                      <div key={index} className="uploaded-image">
                        <span>{image.name}</span>
                        <button type="button" onClick={() => removeImage(index)} className="remove-image-btn">
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="form-navigation">
                  <button type="button" className="back-button-step pulse-animation" onClick={prevStep}>
                    Back
                  </button>
                  <button type="button" className="submit-button pulse-animation" onClick={nextStep}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 9: Review and Submit */}
            {step === 9 && (
              <div className="form-step animate-fade-in">
                <h3 className="step-title">Step 9: Review and Submit</h3>
                <p className="step-description">Review your information before submitting.</p>
                <div className="review-section">
                  <h4>Business Information</h4>
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Category:</strong> {formData.category}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                  
                  <h4>Service Details</h4>
                  <p><strong>Description:</strong> {formData.serviceDescription}</p>
                  <p><strong>Experience:</strong> {formData.experience} years</p>
                  <p><strong>Price Range:</strong> {formData.priceRange}</p>
                  
                  <h4>Social Media</h4>
                  <p><strong>Website:</strong> {formData.website || 'Not provided'}</p>
                  <p><strong>Instagram:</strong> {formData.instagram || 'Not provided'}</p>
                  <p><strong>Facebook:</strong> {formData.facebook || 'Not provided'}</p>
                </div>
                <div className="form-navigation">
                  <button type="button" className="back-button-step pulse-animation" onClick={prevStep}>
                    Back
                  </button>
                  <button type="submit" className="submit-button pulse-animation" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default VendorSignup;