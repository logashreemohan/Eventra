import React, { useState, useEffect } from 'react';
import '../styles/GuestManagement.css';

const GuestManagement = () => {
  const [guests, setGuests] = useState([
    { id: 1, name: 'Rajesh Kumar', email: 'rajesh.kumar@email.com', phone: '+91 98765 43210', status: 'confirmed', plusOnes: 1, dietary: 'Vegetarian', table: 'A1' },
    { id: 2, name: 'Priya Sharma', email: 'priya.sharma@email.com', phone: '+91 98765 43211', status: 'pending', plusOnes: 0, dietary: 'Non-Vegetarian', table: '-' },
    { id: 3, name: 'Ankit Mehta', email: 'ankit.mehta@email.com', phone: '+91 98765 43212', status: 'declined', plusOnes: 0, dietary: '-', table: '-' },
    { id: 4, name: 'Sneha Patel', email: 'sneha.patel@email.com', phone: '+91 98765 43213', status: 'confirmed', plusOnes: 2, dietary: 'Vegan', table: 'B3' },
    { id: 5, name: 'Vikram Singh', email: 'vikram.singh@email.com', phone: '+91 98765 43214', status: 'pending', plusOnes: 1, dietary: 'Vegetarian', table: '-' }
  ]);

  const [filteredGuests, setFilteredGuests] = useState(guests);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGuest, setNewGuest] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'pending',
    plusOnes: 0,
    dietary: 'Vegetarian'
  });

  // Filter guests based on status and search term
  useEffect(() => {
    let filtered = guests;

    if (activeFilter !== 'all') {
      filtered = filtered.filter(guest => guest.status === activeFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(guest => 
        guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.phone.includes(searchTerm)
      );
    }

    setFilteredGuests(filtered);
  }, [activeFilter, searchTerm, guests]);

  // Handle adding a new guest
  const handleAddGuest = (e) => {
    e.preventDefault();
    const guest = {
      id: guests.length + 1,
      ...newGuest,
      table: '-'
    };
    setGuests([...guests, guest]);
    setNewGuest({
      name: '',
      email: '',
      phone: '',
      status: 'pending',
      plusOnes: 0,
      dietary: 'Vegetarian'
    });
    setShowAddForm(false);
  };

  // Handle input changes for new guest form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGuest({
      ...newGuest,
      [name]: name === 'plusOnes' ? parseInt(value) || 0 : value
    });
  };

  // Update guest status
  const updateGuestStatus = (id, status) => {
    setGuests(guests.map(guest => 
      guest.id === id ? { ...guest, status } : guest
    ));
  };

  // Assign table to guest
  const assignTable = (id, table) => {
    setGuests(guests.map(guest => 
      guest.id === id ? { ...guest, table } : guest
    ));
  };

  // Delete a guest
  const deleteGuest = (id) => {
    setGuests(guests.filter(guest => guest.id !== id));
  };

  // Calculate statistics
  const confirmedCount = guests.filter(guest => guest.status === 'confirmed').length;
  const pendingCount = guests.filter(guest => guest.status === 'pending').length;
  const declinedCount = guests.filter(guest => guest.status === 'declined').length;
  const totalCount = guests.length;
  const plusOnesCount = guests.reduce((sum, guest) => sum + guest.plusOnes, 0);
  const totalAttendees = totalCount + plusOnesCount;

  return (
    <div className="guest-management">
      <div className="management-header">
        <h2 className="management-title">Guest Management</h2>
        <p className="management-subtitle">Track RSVPs and manage your wedding guests</p>
      </div>

      {/* Statistics */}
      <div className="guest-statistics">
        <div className="stat-card">
          <div className="stat-value">{totalCount}</div>
          <div className="stat-label">Total Guests</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{confirmedCount}</div>
          <div className="stat-label">Confirmed</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{pendingCount}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{declinedCount}</div>
          <div className="stat-label">Declined</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalAttendees}</div>
          <div className="stat-label">Total Attendees</div>
        </div>
      </div>

      {/* Controls */}
      <div className="management-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search guests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="status-filters">
          <button
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Guests
          </button>
          <button
            className={`filter-btn ${activeFilter === 'confirmed' ? 'active' : ''}`}
            onClick={() => setActiveFilter('confirmed')}
          >
            Confirmed
          </button>
          <button
            className={`filter-btn ${activeFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveFilter('pending')}
          >
            Pending
          </button>
          <button
            className={`filter-btn ${activeFilter === 'declined' ? 'active' : ''}`}
            onClick={() => setActiveFilter('declined')}
          >
            Declined
          </button>
        </div>
        
        <button 
          className="add-guest-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : '+ Add Guest'}
        </button>
      </div>

      {/* Add Guest Form */}
      {showAddForm && (
        <div className="add-guest-form">
          <h3>Add New Guest</h3>
          <form onSubmit={handleAddGuest}>
            <div className="form-row">
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  name="name"
                  value={newGuest.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={newGuest.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={newGuest.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={newGuest.status}
                  onChange={handleInputChange}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="declined">Declined</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>+1s</label>
                <input
                  type="number"
                  name="plusOnes"
                  value={newGuest.plusOnes}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Dietary Preference</label>
                <select
                  name="dietary"
                  value={newGuest.dietary}
                  onChange={handleInputChange}
                >
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Gluten-Free">Gluten-Free</option>
                </select>
              </div>
            </div>
            
            <button type="submit" className="submit-btn">Add Guest</button>
          </form>
        </div>
      )}

      {/* Guest List */}
      <div className="guest-list">
        <h3>Guest List ({filteredGuests.length} guests)</h3>
        {filteredGuests.length > 0 ? (
          <div className="guest-table">
            <div className="table-header">
              <div className="table-cell">Guest</div>
              <div className="table-cell">Contact</div>
              <div className="table-cell">Status</div>
              <div className="table-cell">+1s</div>
              <div className="table-cell">Dietary</div>
              <div className="table-cell">Table</div>
              <div className="table-cell">Actions</div>
            </div>
            
            {filteredGuests.map(guest => (
              <div key={guest.id} className="table-row">
                <div className="table-cell">
                  <div className="guest-name">{guest.name}</div>
                </div>
                <div className="table-cell">
                  <div className="guest-contact">
                    <div>{guest.email}</div>
                    <div>{guest.phone}</div>
                  </div>
                </div>
                <div className="table-cell">
                  <span className={`status-badge status-${guest.status}`}>
                    {guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
                  </span>
                </div>
                <div className="table-cell">{guest.plusOnes}</div>
                <div className="table-cell">{guest.dietary}</div>
                <div className="table-cell">
                  {guest.status === 'confirmed' ? (
                    <input
                      type="text"
                      value={guest.table}
                      onChange={(e) => assignTable(guest.id, e.target.value)}
                      className="table-input"
                      placeholder="Assign table"
                    />
                  ) : (
                    '-'
                  )}
                </div>
                <div className="table-cell">
                  <div className="guest-actions">
                    {guest.status !== 'confirmed' && (
                      <button 
                        className="action-btn confirm-btn"
                        onClick={() => updateGuestStatus(guest.id, 'confirmed')}
                      >
                        Confirm
                      </button>
                    )}
                    {guest.status !== 'declined' && (
                      <button 
                        className="action-btn decline-btn"
                        onClick={() => updateGuestStatus(guest.id, 'declined')}
                      >
                        Decline
                      </button>
                    )}
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => deleteGuest(guest.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-guests">
            No guests found. Try changing your filters or search term.
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestManagement;