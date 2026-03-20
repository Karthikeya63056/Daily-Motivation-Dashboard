import React from 'react';
import Loader from './Loader';

const QuoteCard = ({ quote, onNewQuote, onLike, onCopy, onShare, isLiked, loading }) => {
  if (loading || !quote) {
    return (
      <div className="quote-card" style={{ minHeight: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader />
      </div>
    );
  }

  return (
    <div className="quote-card">
      <p className="quote-card__text">“{quote.content}”</p>
      <p className="quote-card__author">— {quote.author}</p>
      <div className="quote-card__actions">
        <button className="quote-card__button quote-card__button--primary" onClick={onNewQuote}>
          New Quote
        </button>
        <button className={`quote-card__button quote-card__button--secondary ${isLiked ? 'liked' : ''}`} onClick={onLike}>
          {isLiked ? '❤️ Liked' : '♡ Like'}
        </button>
        <button className="quote-card__button quote-card__button--secondary" onClick={onCopy}>
          📋 Copy
        </button>
        <button className="quote-card__button quote-card__button--secondary" onClick={onShare}>
          🔗 Share
        </button>
      </div>
    </div>
  );
};

export default QuoteCard;
