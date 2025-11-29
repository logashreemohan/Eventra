import React, { useState } from 'react';
import '../styles/WeddingTimeline.css';

const WeddingTimeline = () => {
  const [showTimeline, setShowTimeline] = useState(false);
  const [weddingDate, setWeddingDate] = useState('');
  const [timelineEvents, setTimelineEvents] = useState([
    { id: 1, title: 'Set Budget', date: '', completed: false, description: 'Determine your overall wedding budget and allocate funds to different categories' },
    { id: 2, title: 'Create Guest List', date: '', completed: false, description: 'Start compiling your list of invited guests' },
    { id: 3, title: 'Choose Venue', date: '', completed: false, description: 'Research and book your wedding venue' },
    { id: 4, title: 'Hire Key Vendors', date: '', completed: false, description: 'Book photographer, caterer, florist, and entertainment' },
    { id: 5, title: 'Send Save the Dates', date: '', completed: false, description: 'Mail save the date cards to out-of-town guests' },
    { id: 6, title: 'Choose Attire', date: '', completed: false, description: 'Select wedding dress, suits, and accessories' },
    { id: 7, title: 'Plan Honeymoon', date: '', completed: false, description: 'Research and book your dream honeymoon destination' },
    { id: 8, title: 'Send Invitations', date: '', completed: false, description: 'Mail wedding invitations 6-8 weeks before the wedding' },
    { id: 9, title: 'Finalize Details', date: '', completed: false, description: 'Confirm all arrangements with vendors and create wedding day timeline' },
    { id: 10, title: 'Wedding Day!', date: '', completed: false, description: 'Your special day arrives - time to celebrate!' }
  ]);

  const updateEventDate = (id, date) => {
    setTimelineEvents(timelineEvents.map(event => 
      event.id === id ? { ...event, date } : event
    ));
  };

  const toggleEventCompletion = (id) => {
    setTimelineEvents(timelineEvents.map(event => 
      event.id === id ? { ...event, completed: !event.completed } : event
    ));
  };

  const resetTimeline = () => {
    setTimelineEvents(timelineEvents.map(event => ({ ...event, date: '', completed: false })));
    setWeddingDate('');
  };

  const calculateSuggestedDates = () => {
    if (!weddingDate) return;
    
    const wedding = new Date(weddingDate);
    const updatedEvents = [...timelineEvents];
    
    // Calculate suggested dates based on wedding date
    updatedEvents[9].date = wedding.toISOString().split('T')[0]; // Wedding Day
    updatedEvents[8].date = new Date(wedding.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // Finalize Details (1 month before)
    updatedEvents[7].date = new Date(wedding.getTime() - 42 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // Send Invitations (6 weeks before)
    updatedEvents[6].date = new Date(wedding.getTime() - 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // Plan Honeymoon (4 months before)
    updatedEvents[5].date = new Date(wedding.getTime() - 150 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // Choose Attire (5 months before)
    updatedEvents[4].date = new Date(wedding.getTime() - 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // Send Save the Dates (6 months before)
    updatedEvents[3].date = new Date(wedding.getTime() - 210 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // Hire Key Vendors (7 months before)
    updatedEvents[2].date = new Date(wedding.getTime() - 240 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // Choose Venue (8 months before)
    updatedEvents[1].date = new Date(wedding.getTime() - 300 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // Create Guest List (10 months before)
    updatedEvents[0].date = new Date(wedding.getTime() - 330 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // Set Budget (11 months before)
    
    setTimelineEvents(updatedEvents);
  };

  return (
    <div className="wedding-timeline-section">
      <div className="wedding-timeline-container">
        <button 
          className="timeline-toggle-button pulse-animation"
          onClick={() => setShowTimeline(!showTimeline)}
        >
          {showTimeline ? 'Hide Wedding Timeline' : 'Show Wedding Timeline'} 📅
        </button>
        
        {showTimeline && (
          <div className="wedding-timeline-content animate-fade-in">
            <h2 className="timeline-title">Wedding Planning Timeline</h2>
            <p className="timeline-subtitle">Stay organized with our step-by-step wedding planning guide</p>
            
            <div className="timeline-controls">
              <div className="wedding-date-input">
                <label htmlFor="weddingDate">Wedding Date:</label>
                <input
                  type="date"
                  id="weddingDate"
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                  className="date-input"
                />
                <button 
                  className="calculate-button" 
                  onClick={calculateSuggestedDates}
                  disabled={!weddingDate}
                >
                  Calculate Timeline
                </button>
              </div>
              
              <button className="reset-timeline-button" onClick={resetTimeline}>
                Reset Timeline
              </button>
            </div>
            
            <div className="timeline-events">
              {timelineEvents.map((event, index) => (
                <div 
                  key={event.id} 
                  className={`timeline-event ${event.completed ? 'completed' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="event-header">
                    <div className="event-number">Step {event.id}</div>
                    <h3 className="event-title">{event.title}</h3>
                    <button 
                      className={`complete-button ${event.completed ? 'completed' : ''}`}
                      onClick={() => toggleEventCompletion(event.id)}
                    >
                      {event.completed ? '✓ Completed' : 'Mark Complete'}
                    </button>
                  </div>
                  
                  <div className="event-content">
                    <p className="event-description">{event.description}</p>
                    
                    <div className="event-date">
                      <label htmlFor={`date-${event.id}`}>Target Date:</label>
                      <input
                        type="date"
                        id={`date-${event.id}`}
                        value={event.date}
                        onChange={(e) => updateEventDate(event.id, e.target.value)}
                        className="event-date-input"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeddingTimeline;