import React, { useState } from 'react';
import '../styles/InspirationGallery.css';

const InspirationGallery = () => {
  // Mock inspiration data
  const [inspirations] = useState([
    {
      id: 1,
      title: 'Beach Wedding',
      category: 'Venue',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      likes: 245,
      tags: ['beach', 'ocean', 'casual']
    },
    {
      id: 2,
      title: 'Vintage Ceremony',
      category: 'Style',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      likes: 189,
      tags: ['vintage', 'classic', 'elegant']
    },
    {
      id: 3,
      title: 'Floral Arrangements',
      category: 'Decor',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      likes: 321,
      tags: ['flowers', 'centerpieces', 'bouquets']
    },
    {
      id: 4,
      title: 'Modern Reception',
      category: 'Venue',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      likes: 156,
      tags: ['modern', 'urban', 'contemporary']
    },
    {
      id: 5,
      title: 'Traditional Attire',
      category: 'Attire',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      likes: 298,
      tags: ['traditional', 'cultural', 'ethnic']
    },
    {
      id: 6,
      title: 'Cake Designs',
      category: 'Food',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      likes: 421,
      tags: ['cakes', 'desserts', 'sweet']
    },
    {
      id: 7,
      title: 'Lighting Setup',
      category: 'Decor',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      likes: 178,
      tags: ['lighting', 'ambiance', 'mood']
    },
    {
      id: 8,
      title: 'Bridal Makeup',
      category: 'Beauty',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      likes: 267,
      tags: ['makeup', 'beauty', 'glamorous']
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [likedItems, setLikedItems] = useState([]);

  // Get unique categories
  const categories = ['All', ...new Set(inspirations.map(item => item.category))];

  // Filter inspirations based on category and search term
  const filteredInspirations = inspirations.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Toggle like for an inspiration
  const toggleLike = (id) => {
    if (likedItems.includes(id)) {
      setLikedItems(likedItems.filter(itemId => itemId !== id));
    } else {
      setLikedItems([...likedItems, id]);
    }
  };

  return (
    <div className="inspiration-gallery">
      <div className="gallery-header">
        <h2 className="gallery-title">Wedding Inspiration Gallery</h2>
        <p className="gallery-subtitle">Discover ideas and inspiration for your perfect wedding</p>
      </div>

      <div className="gallery-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search inspiration..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="gallery-grid">
        {filteredInspirations.map(item => (
          <div key={item.id} className="gallery-item">
            <div className="item-image-container">
              <img src={item.image} alt={item.title} className="item-image" />
              <button 
                className={`like-btn ${likedItems.includes(item.id) ? 'liked' : ''}`}
                onClick={() => toggleLike(item.id)}
              >
                ❤
              </button>
            </div>
            <div className="item-content">
              <h3 className="item-title">{item.title}</h3>
              <div className="item-meta">
                <span className="item-category">{item.category}</span>
                <span className="item-likes">❤ {item.likes + (likedItems.includes(item.id) ? 1 : 0)}</span>
              </div>
              <div className="item-tags">
                {item.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredInspirations.length === 0 && (
        <div className="no-inspirations">
          No inspirations found. Try changing your filters or search term.
        </div>
      )}
    </div>
  );
};

export default InspirationGallery;