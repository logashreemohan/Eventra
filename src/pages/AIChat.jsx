import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AIChat.css';

const AIChat = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { 
      id: 1, 
      text: "Hello! I'm your Eventra AI assistant. I can help you with wedding planning, finding vendors, booking services, and answering any questions about our platform. How can I assist you today?", 
      isUser: false,
      sender: "Eventra AI"
    }
  ]);

  // Suggestions for quick questions
  const suggestions = [
    "How do I find vendors?",
    "What services do you offer?",
    "How to book a vendor?",
    "Tell me about pricing"
  ];

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Generate AI response based on user input
  const generateAIResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Define response mappings for better accuracy
    const responseMap = [
      {
        keywords: ['hello', 'hi', 'hey', 'greetings'],
        response: "Hello! I'm your Eventra AI assistant. How can I help you with your wedding planning today?"
      },
      {
        keywords: ['vendor', 'vendors', 'find', 'search'],
        response: "To find vendors on Eventra, you can:\n\n1. Use our search feature on the homepage\n   • Enter your location\n   • Specify the type of service you need\n\n2. Browse vendors by category\n   • Photography & Videography\n   • Catering & Food Services\n   • Wedding Planning & Coordination\n   • Floral Arrangements & Decor\n   • Entertainment (DJ, Bands)\n   • Wedding Attire (Dresses, Suits)\n   • Venues & Locations\n   • Hair & Makeup Artists\n   • Transportation\n   • Wedding Cakes & Desserts\n\n3. Filter vendors by:\n   • Location\n   • Price range\n   • Ratings\n   • Availability"
      },
      {
        keywords: ['service', 'services', 'offer', 'provide'],
        response: "Eventra offers a comprehensive range of wedding services:\n\n• Photography & Videography\n• Catering & Food Services\n• Wedding Planning & Coordination\n• Floral Arrangements & Decor\n• Entertainment (DJ, Bands)\n• Wedding Attire (Dresses, Suits)\n• Venues & Locations\n• Hair & Makeup Artists\n• Transportation\n• Wedding Cakes & Desserts\n\nAll services can be filtered by location, price range, and ratings."
      },
      {
        keywords: ['book', 'booking', 'reserve', 'schedule'],
        response: "Booking a vendor through Eventra is simple:\n\n1. Search for vendors using our search bar or browse categories\n2. View vendor profiles to see photos, pricing, and reviews\n3. Click the 'Book Now' button on any vendor's profile\n4. Fill out the booking form with your event details\n5. Confirm your booking and receive a confirmation email\n\nYou can manage all your bookings in your profile dashboard."
      },
      {
        keywords: ['price', 'pricing', 'cost', 'expensive', 'cheap'],
        response: "Our vendors offer a wide range of pricing to fit different budgets:\n\nPrice Ranges:\n• Budget-friendly options ($)\n• Mid-range options ($$)\n• Premium services ($$$)\n\nPricing Details:\n• Each vendor sets their own pricing\n• View detailed pricing information on vendor profiles\n• We offer budget planning tools to help manage expenses\n• Compare prices across similar vendors\n• Transparent pricing with no hidden fees"
      },
      {
        keywords: ['review', 'rating', 'feedback', 'testimonial'],
        response: "All vendors on Eventra have customer reviews and ratings:\n\nReview Components:\n• Overall star rating (1-5 stars)\n• Detailed written feedback\n• Photos from actual events\n• Response from the vendor\n\nBenefits of Reviews:\n• Help you make informed decisions\n• Show actual work quality\n• Provide insight into vendor professionalism\n• Highlight strengths and weaknesses\n• Enable comparison between vendors"
      },
      {
        keywords: ['account', 'profile', 'login', 'signup', 'register'],
        response: "To create and manage your Eventra account:\n\nAccount Creation:\n1. Click the 'Sign Up' button in the top right corner\n2. Choose if you're signing up as a client or vendor\n3. Fill in your details (name, email, password)\n4. Verify your email address\n\nAccount Benefits:\n• Save favorite vendors\n• Manage bookings\n• Receive personalized recommendations\n• Access exclusive deals\n• Track spending with budget tools"
      },
      {
        keywords: ['payment', 'pay', 'money', 'refund'],
        response: "Eventra uses secure payment processing:\n\nPayment Options:\n• Credit/Debit cards\n• PayPal\n• Bank transfers\n\nSecurity Features:\n• Encrypted transactions\n• PCI compliant processing\n• Secure data storage\n\nPayment Protection:\n• Refund policies clearly stated by each vendor\n• Customer support for payment issues\n• View payment history and receipts in dashboard"
      },
      {
        keywords: ['cancel', 'cancellation', 'policy'],
        response: "Cancellation policies vary by vendor but typically include:\n\nStandard Policy:\n• Full refund if canceled 30+ days before event\n• Partial refund (50%) if canceled 15-30 days before\n• No refund for cancellations within 14 days\n\nPolicy Details:\n• Review each vendor's specific cancellation policy\n• Policies displayed on vendor profile pages\n• Contact support for assistance with cancellations\n• Exceptions may apply for extreme circumstances"
      },
      {
        keywords: ['support', 'help', 'contact', 'problem'],
        response: "Need help? Our support team is here for you:\n\nContact Methods:\n• Email: support@eventra.com\n• Phone: 1-800-EVENTRA\n• Live chat: Available on all pages\n• Help Center: Visit our FAQ section\n\nSupport Hours:\n• Monday-Friday: 9AM-8PM EST\n• Saturday-Sunday: 10AM-6PM EST\n\nCommon Support Topics:\n• Booking issues\n• Payment problems\n• Vendor complaints\n• Account assistance"
      },
      {
        keywords: ['wedding', 'plan', 'planning', 'checklist'],
        response: "Eventra offers comprehensive wedding planning tools:\n\nPlanning Tools:\n• Interactive wedding checklist\n• Timeline builder\n• Budget calculator\n• Guest management\n• Vendor comparison tool\n• Inspiration gallery\n\nPlanning Benefits:\n• Personalized recommendations\n• Milestone tracking\n• Budget monitoring\n• Vendor coordination\n• Timeline management\n• Resource library"
      },
      {
        keywords: ['feature', 'features', 'function', 'functions'],
        response: "Eventra offers these key features:\n\nFor Clients:\n• Vendor search and discovery\n• Booking and scheduling\n• Review and rating system\n• Budget planning tools\n• Wedding timeline management\n• Guest list management\n• Inspiration gallery\n\nFor Vendors:\n• Profile management\n• Booking dashboard\n• Payment processing\n• Review monitoring\n• Marketing tools\n• Analytics\n\nPlatform Features:\n• Mobile-responsive design\n• Secure payment processing\n• Real-time messaging\n• Social sharing\n• Customizable profiles"
      }
    ];

    // Check for keyword matches
    for (const item of responseMap) {
      if (item.keywords.some(keyword => lowerCaseMessage.includes(keyword))) {
        return item.response;
      }
    }

    // Default responses for unmatched queries
    const defaultResponses = [
      "I understand you're asking about \"" + userMessage + "\". While I don't have specific information on that topic, I can help you with wedding planning, vendor booking, and Eventra platform features. Could you rephrase your question or ask about something else?",
      "Thanks for your question about \"" + userMessage + "\". For the best assistance with this topic, I recommend contacting our support team directly at support@eventra.com or calling 1-800-EVENTRA.",
      "I'm still learning about \"" + userMessage + "\". For immediate help with this, please visit our Help Center or contact our customer support team who can provide specialized assistance."
    ];

    // Return a random default response
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = messageText.trim();
    
    // Add user message to chat
    const newUserMessage = {
      id: Date.now(),
      text: userMessage,
      isUser: true,
      sender: "You"
    };

    setChatMessages(prev => [...prev, newUserMessage]);
    setChatInput('');
    setIsLoading(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage);
      
      const newAiMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        isUser: false,
        sender: "Eventra AI"
      };

      setChatMessages(prev => [...prev, newAiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(chatInput);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="ai-chat-container">
      <div className="ai-chat-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h1 className="ai-chat-title">Eventra AI Assistant</h1>
        <p className="ai-chat-subtitle">Ask me anything about wedding planning, vendors, or our services</p>
      </div>

      <div className="chat-interface">
        <div className="chat-messages-container">
          {chatMessages.map((message) => (
            <div 
              key={message.id} 
              className={`message ${message.isUser ? 'user-message' : 'ai-message'}`}
            >
              <div className="message-sender">{message.sender}</div>
              <div className="message-text">{message.text}</div>
            </div>
          ))}
          
          {isLoading && (
            <div className="message ai-message">
              <div className="message-sender">Eventra AI</div>
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {!chatMessages.length && (
          <div className="suggestions-container">
            <h3>Quick Questions:</h3>
            <div className="suggestions">
              {suggestions.map((suggestion, index) => (
                <button 
                  key={index} 
                  className="suggestion-chip"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="chat-input-container">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your question about Eventra..."
            className="chat-input"
            disabled={isLoading}
          />
          <button 
            className="send-button"
            onClick={() => handleSendMessage(chatInput)}
            disabled={isLoading || !chatInput.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;