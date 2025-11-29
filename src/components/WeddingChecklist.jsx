import React, { useState, useEffect } from 'react';
import '../styles/WeddingChecklist.css';

const WeddingChecklist = () => {
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, category: 'Pre-Planning', task: 'Set a budget', completed: false, priority: 'high' },
    { id: 2, category: 'Pre-Planning', task: 'Create a guest list', completed: false, priority: 'high' },
    { id: 3, category: 'Pre-Planning', task: 'Choose a date', completed: false, priority: 'high' },
    { id: 4, category: 'Pre-Planning', task: 'Select a venue', completed: false, priority: 'high' },
    { id: 5, category: 'Vendors', task: 'Book a photographer', completed: false, priority: 'medium' },
    { id: 6, category: 'Vendors', task: 'Hire a caterer', completed: false, priority: 'medium' },
    { id: 7, category: 'Vendors', task: 'Find a florist', completed: false, priority: 'medium' },
    { id: 8, category: 'Vendors', task: 'Book a DJ/band', completed: false, priority: 'medium' },
    { id: 9, category: 'Attire', task: 'Choose wedding dress', completed: false, priority: 'medium' },
    { id: 10, category: 'Attire', task: 'Select groom\'s attire', completed: false, priority: 'medium' },
    { id: 11, category: 'Attire', task: 'Buy wedding rings', completed: false, priority: 'medium' },
    { id: 12, category: 'Legal', task: 'Obtain marriage license', completed: false, priority: 'high' },
    { id: 13, category: 'Legal', task: 'Finalize guest accommodations', completed: false, priority: 'low' },
    { id: 14, category: 'Final Details', task: 'Send invitations', completed: false, priority: 'high' },
    { id: 15, category: 'Final Details', task: 'Plan honeymoon', completed: false, priority: 'low' },
    { id: 16, category: 'Final Details', task: 'Create day-of timeline', completed: false, priority: 'high' }
  ]);

  const [filteredItems, setFilteredItems] = useState(checklistItems);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate progress
  const completedCount = checklistItems.filter(item => item.completed).length;
  const totalCount = checklistItems.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  // Get unique categories
  const categories = ['All', ...new Set(checklistItems.map(item => item.category))];

  // Filter items based on category and search term
  useEffect(() => {
    let filtered = checklistItems;

    if (activeCategory !== 'All') {
      filtered = filtered.filter(item => item.category === activeCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [activeCategory, searchTerm, checklistItems]);

  // Toggle item completion
  const toggleCompletion = (id) => {
    setChecklistItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Add new item
  const addItem = (task, category, priority) => {
    const newItem = {
      id: checklistItems.length + 1,
      category,
      task,
      completed: false,
      priority
    };
    setChecklistItems([...checklistItems, newItem]);
  };

  return (
    <div className="wedding-checklist">
      <div className="checklist-header">
        <h2 className="checklist-title">Wedding Planning Checklist</h2>
        <p className="checklist-subtitle">Track your wedding planning progress</p>
        
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {completedCount}/{totalCount} tasks completed ({progressPercentage}%)
          </div>
        </div>
      </div>

      <div className="checklist-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="checklist-items">
        {filteredItems.map(item => (
          <div 
            key={item.id} 
            className={`checklist-item ${item.completed ? 'completed' : ''} priority-${item.priority}`}
          >
            <div className="item-content">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleCompletion(item.id)}
                className="item-checkbox"
              />
              <div className="item-details">
                <span className="item-task">{item.task}</span>
                <span className="item-category">{item.category}</span>
              </div>
            </div>
            <div className="item-priority">
              <span className={`priority-badge priority-${item.priority}`}>
                {item.priority}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="no-items">
          No tasks found. Try changing your filters or search term.
        </div>
      )}
    </div>
  );
};

export default WeddingChecklist;