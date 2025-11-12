import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/VendorProfile.css';

const VendorProfile = () => {
  const navigate = useNavigate();
  
  // Mock data for vendor profile
  const [vendorData] = useState({
    name: 'John Doe Photography',
    category: 'Photographer',
    location: 'Mumbai',
    profileViews: 124,
    contacts: 12
  });

  // Mock data for recent contacts
  const [contacts] = useState([
    { id: 1, name: 'Alice Johnson', date: '2023-05-15', message: 'Interested in wedding photography' },
    { id: 2, name: 'Bob Smith', date: '2023-05-12', message: 'Need pre-wedding shoot' },
    { id: 3, name: 'Carol Williams', date: '2023-05-10', message: 'Looking for portfolio session' }
  ]);

  return (
    <>
      <Navbar />
      <div className="vendor-profile-container">
        {/* Removed duplicate vendor profile corner since it's now in the navbar */}

        <div className="profile-header">
          <h1>{vendorData.name}</h1>
          <p className="vendor-category">{vendorData.category}</p>
          <p className="vendor-location">{vendorData.location}</p>
        </div>

        <div className="profile-stats">
          <div className="stat-card">
            <h3>{vendorData.profileViews}</h3>
            <p>Profile Views</p>
          </div>
          <div className="stat-card">
            <h3>{vendorData.contacts}</h3>
            <p>Contacts</p>
          </div>
        </div>

        <div className="recent-contacts">
          <h2>Recent Contacts</h2>
          <div className="contacts-list">
            {contacts.map(contact => (
              <div key={contact.id} className="contact-item">
                <div className="contact-info">
                  <h4>{contact.name}</h4>
                  <p className="contact-date">{contact.date}</p>
                  <p className="contact-message">{contact.message}</p>
                </div>
                <button className="view-contact-button">View Details</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VendorProfile;