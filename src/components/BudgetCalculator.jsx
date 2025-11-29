import React, { useState } from 'react';
import '../styles/BudgetCalculator.css';

const BudgetCalculator = () => {
  const [budget, setBudget] = useState({
    total: 500000,
    venue: 150000,
    catering: 100000,
    photography: 50000,
    decor: 75000,
    attire: 50000,
    entertainment: 25000,
    miscellaneous: 50000
  });

  const [showCalculator, setShowCalculator] = useState(false);

  const updateBudgetItem = (item, value) => {
    const updatedBudget = { ...budget, [item]: Number(value) };
    // Recalculate total
    const total = Object.values(updatedBudget)
      .filter((val, key) => key !== 'total')
      .reduce((sum, val) => sum + val, 0);
    updatedBudget.total = total;
    setBudget(updatedBudget);
  };

  const resetBudget = () => {
    setBudget({
      total: 500000,
      venue: 150000,
      catering: 100000,
      photography: 50000,
      decor: 75000,
      attire: 50000,
      entertainment: 25000,
      miscellaneous: 50000
    });
  };

  const budgetItems = [
    { id: 'venue', label: 'Venue & Rentals', icon: '🏛️' },
    { id: 'catering', label: 'Food & Catering', icon: '🍽️' },
    { id: 'photography', label: 'Photography', icon: '📸' },
    { id: 'decor', label: 'Decorations', icon: '🎨' },
    { id: 'attire', label: 'Attire', icon: '👗' },
    { id: 'entertainment', label: 'Entertainment', icon: '🎵' },
    { id: 'miscellaneous', label: 'Miscellaneous', icon: '📦' }
  ];

  return (
    <div className="budget-calculator-section">
      <div className="budget-calculator-container">
        <button 
          className="calculator-toggle-button pulse-animation"
          onClick={() => setShowCalculator(!showCalculator)}
        >
          {showCalculator ? 'Hide Budget Calculator' : 'Show Budget Calculator'} 💰
        </button>
        
        {showCalculator && (
          <div className="budget-calculator-content animate-fade-in">
            <h2 className="calculator-title">Wedding Budget Calculator</h2>
            <p className="calculator-subtitle">Plan your perfect wedding within budget</p>
            
            <div className="budget-summary">
              <div className="total-budget-card">
                <h3>Total Budget</h3>
                <div className="total-amount">₹{budget.total.toLocaleString()}</div>
              </div>
              
              <div className="budget-breakdown">
                {budgetItems.map(item => (
                  <div key={item.id} className="budget-item">
                    <div className="budget-item-header">
                      <span className="budget-icon">{item.icon}</span>
                      <label htmlFor={item.id}>{item.label}</label>
                    </div>
                    <input
                      type="number"
                      id={item.id}
                      value={budget[item.id]}
                      onChange={(e) => updateBudgetItem(item.id, e.target.value)}
                      className="budget-input"
                    />
                  </div>
                ))}
              </div>
              
              <div className="calculator-actions">
                <button className="reset-button" onClick={resetBudget}>
                  Reset to Default
                </button>
                <button className="save-button">
                  Save Budget
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetCalculator;