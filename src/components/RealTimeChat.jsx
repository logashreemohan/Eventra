import React, { useState, useEffect, useRef } from 'react';
import '../styles/RealTimeChat.css';

const RealTimeChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'vendor',
      name: 'Royal Wedding Planners',
      text: 'Hello! Thank you for your interest in our services. How can we help you with your wedding planning?',
      timestamp: new Date(Date.now() - 3600000),
      avatar: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
    },
    {
      id: 2,
      sender: 'customer',
      name: 'You',
      text: 'Hi! I\'m planning my wedding for December 2025 and I\'d like to know more about your full planning package.',
      timestamp: new Date(Date.now() - 1800000),
      avatar: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Simulate vendor typing
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === 'customer') {
      setIsTyping(true);
      const typingTimer = setTimeout(() => {
        setIsTyping(false);
        // Add vendor response
        const vendorResponse = {
          id: messages.length + 1,
          sender: 'vendor',
          name: 'Royal Wedding Planners',
          text: 'Thank you for your message! Our full planning package includes venue selection, vendor coordination, timeline management, and day-of coordination. The price starts at ₹85,000. Would you like me to send you our detailed brochure?',
          timestamp: new Date(),
          avatar: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
        };
        setMessages(prevMessages => [...prevMessages, vendorResponse]);
      }, 2000);
      
      return () => clearTimeout(typingTimer);
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const message = {
      id: messages.length + 1,
      sender: 'customer',
      name: 'You',
      text: newMessage,
      timestamp: new Date(),
      avatar: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
    };

    setMessages(prevMessages => [...prevMessages, message]);
    setNewMessage('');
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="real-time-chat">
      <div className="chat-header">
        <div className="vendor-info">
          <img 
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
            alt="Vendor" 
            className="vendor-avatar"
          />
          <div className="vendor-details">
            <h3>Royal Wedding Planners</h3>
            <div className="status">
              <span className={`status-indicator ${isOnline ? 'online' : 'offline'}`}></span>
              <span>{isOnline ? 'Online' : 'Offline'}</span>
            </div>
          </div>
        </div>
        <div className="chat-actions">
          <button className="action-btn">📞</button>
          <button className="action-btn">⋮</button>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`message ${message.sender === 'customer' ? 'sent' : 'received'}`}
          >
            <img src={message.avatar} alt={message.name} className="message-avatar" />
            <div className="message-content">
              <div className="message-text">{message.text}</div>
              <div className="message-time">{formatTime(message.timestamp)}</div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message received">
            <img 
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
              alt="Vendor" 
              className="message-avatar"
            />
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="message-input"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
};

export default RealTimeChat;