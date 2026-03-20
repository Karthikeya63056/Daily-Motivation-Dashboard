import React from 'react';

const Tabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="tabs">
      <button
        className={`tabs__button ${activeTab === 'explore' ? 'tabs__button--active' : ''}`}
        onClick={() => onTabChange('explore')}
      >
        Explore
      </button>
      <button
        className={`tabs__button ${activeTab === 'liked' ? 'tabs__button--active' : ''}`}
        onClick={() => onTabChange('liked')}
      >
        Liked Quotes
      </button>
    </div>
  );
};

export default Tabs;
