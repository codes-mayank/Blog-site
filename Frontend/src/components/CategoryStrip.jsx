import React, { useState } from 'react';
import './CategoryStrip.css';

const categories = [
  'All',
  'Engineering',
  'Productivity',
  'Modern',
  'Dreaming',
  'Guide',
  'Design',
  'More'
];

const CategoryStrip = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="category-strip">
      <div className="category-container">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-item ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryStrip;
