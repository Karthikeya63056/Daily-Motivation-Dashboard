import React from 'react';

const Header = ({ likedCount, theme, onToggleTheme }) => {
  return (
    <header className="header">
      <h1 className="header__title">Daily Motivation</h1>
      <p className="header__subtitle">Stay inspired every day</p>
      {likedCount > 0 && (
        <div className="header__badge">
          ❤️ {likedCount} Liked
        </div>
      )}
      <button className="dark-mode-toggle" onClick={onToggleTheme} aria-label="Toggle dark mode">
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </header>
  );
};

export default Header;
