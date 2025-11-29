import React, { useState } from 'react';
import '../styles/MoodBoard.css';

const MoodBoard = () => {
  const [showMoodBoard, setShowMoodBoard] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const moodBoardItems = [
    { id: 1, category: 'colors', title: 'Elegant Neutrals', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80', description: 'Soft beige, ivory, and champagne tones' },
    { id: 2, category: 'flowers', title: 'Romantic Roses', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80', description: 'Classic red and white roses for timeless elegance' },
    { id: 3, category: 'decor', title: 'Fairy Lights', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80', description: 'Warm ambient lighting for romantic atmosphere' },
    { id: 4, category: 'attire', title: 'Classic White Dress', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80', description: 'Timeless A-line wedding gown with lace details' },
    { id: 5, category: 'colors', title: 'Bold Jewel Tones', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80', description: 'Rich emerald, sapphire, and amethyst palette' },
    { id: 6, category: 'flowers', title: 'Wildflower Bouquet', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80', description: 'Rustic mix of seasonal blooms for bohemian style' },
    { id: 7, category: 'decor', title: 'Vintage Furniture', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80', description: 'Antique pieces for elegant vintage theme' },
    { id: 8, category: 'attire', title: 'Modern Suit', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80', description: 'Slim-fit suit with modern details' }
  ];

  const categories = [
    { id: 'all', name: 'All Inspiration' },
    { id: 'colors', name: 'Color Palettes' },
    { id: 'flowers', name: 'Floral Arrangements' },
    { id: 'decor', name: 'Decor Ideas' },
    { id: 'attire', name: 'Attire Inspiration' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? moodBoardItems 
    : moodBoardItems.filter(item => item.category === selectedCategory);

  return (
    <div className="mood-board-section">
      <div className="mood-board-container">
        <button 
          className="mood-board-toggle-button pulse-animation"
          onClick={() => setShowMoodBoard(!showMoodBoard)}
        >
          {showMoodBoard ? 'Hide Wedding Inspiration' : 'Show Wedding Inspiration'} 💝
        </button>
        
        {showMoodBoard && (
          <div className="mood-board-content animate-fade-in">
            <h2 className="mood-board-title">Wedding Inspiration Gallery</h2>
            <p className="mood-board-subtitle">Discover ideas for your perfect wedding</p>
            
            <div className="mood-board-controls">
              <div className="category-filters">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mood-board-grid">
              {filteredItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="mood-board-item card-hover-animation"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mood-board-image-container">
                    <img src={item.image} alt={item.title} className="mood-board-image" />
                  </div>
                  <div className="mood-board-info">
                    <h3 className="mood-board-item-title">{item.title}</h3>
                    <p className="mood-board-description">{item.description}</p>
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

export default MoodBoard;