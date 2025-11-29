import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    idProof: '',
    bankAccount: '',
    ifscCode: '',
    website: '',
    instagram: '',
    facebook: ''
  });
  const [workImages, setWorkImages] = useState([]);
  const [packages, setPackages] = useState([{ name: '', price: '' }]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would call an API to register the vendor
    console.log('Vendor signup form submitted:', formData);
    console.log('Work images:', workImages);
    console.log('Packages:', packages);
    
    // Simulate adding the vendor to the corresponding category
    // In a real app, this would be handled by the backend
    localStorage.setItem('newVendorRegistered', JSON.stringify({
      category: formData.category,
      timestamp: new Date().getTime()
    }));
    
    // Navigate to home page after signup
    navigate('/');
  };

  return (
    <>
      <div className="vendor-registration-container">
        <div className="vendor-registration-form-container">
          <button onClick={() => navigate('/login')} className="back-button">
            ← Back
          </button>
          <h2 className="vendor-registration-title">Vendor Signup</h2>
          <p className="signup-subtitle">Showcase your services to potential clients</p>
          
          <form className="login-form" onSubmit={handleSubmit}>
            {/* Step 1: Vendor Name / Business Name */}
            {step === 1 && (
              <div className="form-step">
                <h3>Step 1: Vendor Name / Business Name</h3>
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
                  />
                </div>
                <button type="button" className="submit-button" onClick={nextStep} disabled={!formData.name}>
                  Next
                </button>
              </div>
            )}

            {/* Step 2: Service Category */}
            {step === 2 && (
              <div className="form-step">
                <h3>Step 2: Service Category</h3>
                <p className="step-description">(Example: Photography, Catering, Makeup Artist, Venue, Decorator, DJ, Mehendi)</p>
                <div className="form-group">
                  <label htmlFor="category">Service Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
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
                  <button type="button" className="back-button-step" onClick={prevStep}>
                    Back
                  </button>
                  <button type="button" className="submit-button" onClick={nextStep} disabled={!formData.category}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Contact Details */}
            {step === 3 && (
              <div className="form-step">
                <h3>Step 3: Contact Details</h3>
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
                  <button type="button" className="back-button-step" onClick={prevStep}>
                    Back
                  </button>
                  <button type="button" className="submit-button" onClick={nextStep}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Business Address / Service Location */}
            {step === 4 && (
              <div className="form-step">
                <h3>Step 4: Business Address / Service Location</h3>
                <p className="step-description">Where the vendor operates or provides service.</p>
                <div className="form-group">
                  <label htmlFor="location">Service Location</label>
                  <select
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select your city</option>
                    {locations.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-navigation">
                  <button type="button" className="back-button-step" onClick={prevStep}>
                    Back
                  </button>
                  <button type="button" className="submit-button" onClick={nextStep} disabled={!formData.location}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Portfolio / Sample Work */}
            {step === 5 && (
              <div className="form-step">
                <h3>Step 5: Portfolio / Sample Work</h3>
                <p className="step-description">Images, videos, or past work samples (very important for weddings).</p>
                <div className="form-group">
                  <label htmlFor="workImages">Images of Your Work</label>
                  <input
                    type="file"
                    id="workImages"
                    name="workImages"
                    accept="image/*"
                    onChange={handleImageUpload}
                    multiple
                  />
                  <div className="image-preview-container">
                    {workImages.map((image, index) => (
                      <div key={index} className="image-preview">
                        <span className="remove-image" onClick={() => removeImage(index)}>×</span>
                        <img src={URL.createObjectURL(image)} alt={`Work ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="form-navigation">
                  <button type="button" className="back-button-step" onClick={prevStep}>
                    Back
                  </button>
                  <button type="button" className="submit-button" onClick={nextStep}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 6: Pricing / Packages */}
            {step === 6 && (
              <div className="form-step">
                <h3>Step 6: Pricing / Packages</h3>
                <p className="step-description">Basic price range or available wedding packages.</p>
                <div className="form-group">
                  <label>Service Packages / Price Range</label>
                  {packages.map((pkg, index) => (
                    <div key={index} className="package-row">
                      <input
                        type="text"
                        placeholder="Package name"
                        value={pkg.name}
                        onChange={(e) => handlePackageChange(index, 'name', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Price range"
                        value={pkg.price}
                        onChange={(e) => handlePackageChange(index, 'price', e.target.value)}
                      />
                      {packages.length > 1 && (
                        <button type="button" className="remove-package-btn" onClick={() => removePackage(index)}>
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" className="add-package-btn" onClick={addPackage}>
                    + Add Package
                  </button>
                </div>
                
                <div className="form-navigation">
                  <button type="button" className="back-button-step" onClick={prevStep}>
                    Back
                  </button>
                  <button type="button" className="submit-button" onClick={nextStep}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 7: Experience / Business Description */}
            {step === 7 && (
              <div className="form-step">
                <h3>Step 7: Experience / Business Description</h3>
                <p className="step-description">Years of experience + short description of services.</p>
                <div className="form-group">
                  <label htmlFor="experience">Experience (in years)</label>
                  <input
                    type="number"
                    id="experience"
                    name="experience"
                    placeholder="Enter years of experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="serviceDescription">Description of Services</label>
                  <textarea
                    id="serviceDescription"
                    name="serviceDescription"
                    placeholder="Describe your services in detail"
                    value={formData.serviceDescription}
                    onChange={handleInputChange}
                    required
                    rows="4"
                  />
                </div>
                
                <div className="form-navigation">
                  <button type="button" className="back-button-step" onClick={prevStep}>
                    Back
                  </button>
                  <button type="button" className="submit-button" onClick={nextStep}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 8: Verification Documents */}
            {step === 8 && (
              <div className="form-step">
                <h3>Step 8: Verification Documents</h3>
                <p className="step-description">ID proof / Business proof (optional but trusted apps use it). Examples: GST, Aadhar card, Business license.</p>
                <div className="form-group">
                  <label htmlFor="idProof">ID Proof (Aadhaar / PAN / GST / Business License)</label>
                  <input
                    type="text"
                    id="idProof"
                    name="idProof"
                    placeholder="Enter ID proof details"
                    value={formData.idProof}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-navigation">
                  <button type="button" className="back-button-step" onClick={prevStep}>
                    Back
                  </button>
                  <button type="button" className="submit-button" onClick={nextStep}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 9: Password */}
            {step === 9 && (
              <div className="form-step">
                <h3>Step 9: Create Password</h3>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-navigation">
                  <button type="button" className="back-button-step" onClick={prevStep}>
                    Back
                  </button>
                  <button type="submit" className="submit-button">
                    Sign Up as Vendor
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