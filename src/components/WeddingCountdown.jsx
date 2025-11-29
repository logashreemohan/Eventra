import React, { useState, useEffect } from 'react';
import '../styles/WeddingCountdown.css';

const WeddingCountdown = () => {
  const [weddingDate, setWeddingDate] = useState('2025-12-15');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isEditing, setIsEditing] = useState(false);

  // Calculate time left
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(weddingDate) - new Date();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        return { days, hours, minutes, seconds };
      } else {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [weddingDate]);

  // Handle date change
  const handleDateChange = (e) => {
    setWeddingDate(e.target.value);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="wedding-countdown">
      <div className="countdown-header">
        <h2 className="countdown-title">Wedding Countdown</h2>
        <p className="countdown-subtitle">The big day is approaching!</p>
      </div>

      <div className="countdown-display">
        {timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0 ? (
          <>
            <div className="countdown-timer">
              <div className="time-unit">
                <div className="time-value">{timeLeft.days}</div>
                <div className="time-label">Days</div>
              </div>
              <div className="time-unit">
                <div className="time-value">{timeLeft.hours}</div>
                <div className="time-label">Hours</div>
              </div>
              <div className="time-unit">
                <div className="time-value">{timeLeft.minutes}</div>
                <div className="time-label">Minutes</div>
              </div>
              <div className="time-unit">
                <div className="time-value">{timeLeft.seconds}</div>
                <div className="time-label">Seconds</div>
              </div>
            </div>
            
            <div className="wedding-date">
              <p>Your wedding is on:</p>
              <h3>{formatDate(weddingDate)}</h3>
              
              {isEditing ? (
                <div className="date-editor">
                  <input
                    type="date"
                    value={weddingDate}
                    onChange={handleDateChange}
                    className="date-input"
                  />
                  <button 
                    className="save-btn"
                    onClick={() => setIsEditing(false)}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <button 
                  className="edit-date-btn"
                  onClick={() => setIsEditing(true)}
                >
                  Change Date
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="countdown-complete">
            <h3>Happy Wedding Day!</h3>
            <p>Wishing you a lifetime of love and happiness!</p>
          </div>
        )}
      </div>

      <div className="countdown-message">
        <p>Every moment brings you closer to your special day. Cherish the journey!</p>
      </div>
    </div>
  );
};

export default WeddingCountdown;