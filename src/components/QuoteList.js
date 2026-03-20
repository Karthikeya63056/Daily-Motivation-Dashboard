import React from 'react';

const QuoteList = ({ quotes, onUnlike }) => {
  if (quotes.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon">💔</div>
        <p className="empty-state__message">You haven't liked any quotes yet.</p>
        <p className="empty-state__message">Start exploring and save your favorites!</p>
      </div>
    );
  }

  return (
    <div className="quote-list">
      {quotes.map((quote) => (
        <div key={quote.id} className="quote-list__item">
          <p>“{quote.content}”</p>
          <footer>
            — {quote.author}
            <button className="quote-list__unlike-button" onClick={() => onUnlike(quote.id)}>
              Remove
            </button>
          </footer>
        </div>
      ))}
    </div>
  );
};

export default QuoteList;
