import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const AIChat = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Hello! I'm your Eventra AI assistant. How can I help you plan your wedding?", isUser: false }
  ]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleChatInputChange = (e) => {
    setChatInput(e.target.value);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (chatInput.trim() === '') return;

    // Add user message
    const newUserMessage = {
      id: chatMessages.length + 1,
      text: chatInput,
      isUser: true
    };

    setChatMessages(prevMessages => [...prevMessages, newUserMessage]);
    setChatInput('');

    // Simulate AI response based on keywords in user input
    setTimeout(() => {
      let response = "I'm here to help you with your wedding planning!";
      
      if (chatInput.toLowerCase().includes('vendor') || chatInput.toLowerCase().includes('service')) {
        response = "We have various vendors available including photographers, DJs, makeup artists, decorators, and more. You can search for vendors by category and location.";
      } else if (chatInput.toLowerCase().includes('price') || chatInput.toLowerCase().includes('cost')) {
        response = "Vendor prices vary based on experience, location, and services offered. You can compare prices directly on our platform when you search for vendors.";
      } else if (chatInput.toLowerCase().includes('book') || chatInput.toLowerCase().includes('reserve')) {
        response = "To book a vendor, simply search for the type of service you need, select your preferred vendor, and follow the booking process on their profile page.";
      } else if (chatInput.toLowerCase().includes('location') || chatInput.toLowerCase().includes('city')) {
        response = "We have vendors in major cities across India including Mumbai, Delhi, Bangalore, Chennai, Kolkata, and Hyderabad.";
      } else if (chatInput.toLowerCase().includes('review') || chatInput.toLowerCase().includes('rating')) {
        response = "All our vendors are verified and have real reviews from couples who have used their services. You can read detailed reviews and see photos of their work before booking.";
      } else if (chatInput.toLowerCase().includes('help') || chatInput.toLowerCase().includes('support')) {
        response = "I'm here to assist you with any questions about our platform, vendors, or wedding planning in general. What specific information do you need?";
      } else if (chatInput.toLowerCase().includes('wedding') || chatInput.toLowerCase().includes('plan')) {
        response = "Planning a wedding can be overwhelming, but we're here to help! Start by searching for vendors in your area, setting a budget, and creating a timeline. Our platform makes it easy to find and book all the services you need.";
      } else if (chatInput.toLowerCase().includes('budget') || chatInput.toLowerCase().includes('money')) {
        response = "Setting a wedding budget is crucial. Consider allocating funds to the most important aspects of your wedding. Our vendors offer services at various price points to fit different budgets.";
      } else if (chatInput.toLowerCase().includes('decor') || chatInput.toLowerCase().includes('theme')) {
        response = "We have decorators who specialize in various wedding themes and styles. Whether you want a traditional, modern, rustic, or themed wedding, our vendors can help bring your vision to life.";
      } else if (chatInput.toLowerCase().includes('photography') || chatInput.toLowerCase().includes('photo')) {
        response = "Our photography vendors offer various packages including pre-wedding shoots, wedding day coverage, and post-wedding sessions. You can view their portfolios to find a style that matches your preferences.";
      } else if (chatInput.toLowerCase().includes('catering') || chatInput.toLowerCase().includes('food')) {
        response = "We have catering vendors who specialize in different cuisines and dietary requirements. You can discuss menu options, tasting sessions, and serving styles with them directly through our platform.";
      } else if (chatInput.toLowerCase().includes('invitation') || chatInput.toLowerCase().includes('card')) {
        response = "Our invitation vendors offer both digital and printed invitations in various designs and styles. You can customize them to match your wedding theme and send them to your guests easily.";
      } else if (chatInput.toLowerCase().includes('music') || chatInput.toLowerCase().includes('dj')) {
        response = "We have DJs and musicians who specialize in different genres and wedding ceremonies. You can discuss playlists, equipment, and special requests with them to ensure your wedding has the perfect soundtrack.";
      } else if (chatInput.toLowerCase().includes('makeup') || chatInput.toLowerCase().includes('hair')) {
        response = "Our makeup and hair artists offer bridal trials, wedding day services, and group packages. You can view their work portfolios and book consultations to ensure you look perfect on your special day.";
      }

      const newAiMessage = {
        id: chatMessages.length + 2,
        text: response,
        isUser: false
      };

      setChatMessages(prevMessages => [...prevMessages, newAiMessage]);
    }, 1000);
  };

  return (
    <div className="login-container" style={{ minHeight: '100vh', padding: '20px' }}>
      <div className="login-form-container" style={{ maxWidth: '800px', width: '100%', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Eventra AI Assistant</h2>
          <button 
            onClick={() => navigate(-1)} 
            className="back-button"
            style={{ position: 'relative', top: '0', left: '0' }}
          >
            ← Back
          </button>
        </div>
        
        <div style={{ 
          height: '400px', 
          overflowY: 'auto', 
          marginBottom: '20px', 
          padding: '15px', 
          backgroundColor: '#f9f9f9', 
          borderRadius: '8px',
          border: '1px solid #ddd'
        }}>
          {chatMessages.map(message => (
            <div key={message.id} style={{
              textAlign: message.isUser ? 'right' : 'left',
              marginBottom: '15px'
            }}>
              <div style={{
                display: 'inline-block',
                padding: '12px 16px',
                borderRadius: '18px',
                backgroundColor: message.isUser ? '#E50914' : '#e0e0e0',
                color: message.isUser ? 'white' : 'black',
                maxWidth: '80%',
                textAlign: 'left'
              }}>
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleChatSubmit} style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={chatInput}
            onChange={handleChatInputChange}
            placeholder="Ask me anything about wedding planning..."
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '8px',
              border: '2px solid #ddd',
              fontSize: '1rem'
            }}
          />
          <button type="submit" className="submit-button" style={{ padding: '12px 20px' }}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIChat;