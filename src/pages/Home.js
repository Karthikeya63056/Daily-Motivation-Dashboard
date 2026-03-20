import React, { useState, useEffect, useCallback } from 'react';
import { fetchRandomQuote } from '../services/quoteService';
import * as storage from '../utils/localStorage';
import Header from '../components/Header';
import QuoteCard from '../components/QuoteCard';
import Tabs from '../components/Tabs';
import QuoteList from '../components/QuoteList';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';

const Home = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedQuotes, setLikedQuotes] = useState(() => storage.getItem('likedQuotes') || []);
  const [activeTab, setActiveTab] = useState('explore');
  const [searchText, setSearchText] = useState('');
  const [theme, setTheme] = useState(() => storage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.className = theme;
    storage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    storage.setItem('likedQuotes', likedQuotes);
  }, [likedQuotes]);

  const getNewQuote = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const newQuote = await fetchRandomQuote();
      setQuote(newQuote);
    } catch (err) {
      setError('Failed to fetch a new quote. Please try again later.');
      console.error(err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getNewQuote();
  }, [getNewQuote]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'n') {
        getNewQuote();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [getNewQuote]);

  const handleToggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleLike = () => {
    setLikedQuotes(prev => {
      const isLiked = prev.some(q => q.id === quote.id);
      if (isLiked) {
        return prev.filter(q => q.id !== quote.id);
      } else {
        return [quote, ...prev];
      }
    });
  };

  const handleUnlike = (quoteId) => {
    setLikedQuotes(prev => prev.filter(q => q.id !== quoteId));
  };

  const handleCopy = () => {
    if (quote) {
      navigator.clipboard.writeText(`“${quote.content}” — ${quote.author}`);
      alert('Quote copied to clipboard!');
    }
  };

  const handleShare = () => {
    if (navigator.share && quote) {
      navigator.share({
        title: 'Daily Motivation',
        text: `“${quote.content}” — ${quote.author}`,
        url: window.location.href,
      }).catch(err => console.error('Share failed:', err));
    } else {
      alert('Share functionality is not supported on your browser, or there is no quote to share.');
    }
  };
  
  const filteredLikedQuotes = likedQuotes.filter(q =>
    q.content.toLowerCase().includes(searchText.toLowerCase()) ||
    q.author.toLowerCase().includes(searchText.toLowerCase())
  );

  const isCurrentQuoteLiked = quote ? likedQuotes.some(q => q.id === quote.id) : false;

  return (
    <div className="app-container">
      <Header likedCount={likedQuotes.length} theme={theme} onToggleTheme={handleToggleTheme} />
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      {activeTab === 'explore' && (
        <>
          {error && <p className="error-message">{error}</p>}
          <QuoteCard
            key={quote ? quote.id : 'loader'}
            quote={quote}
            loading={loading}
            onNewQuote={getNewQuote}
            onLike={handleLike}
            onCopy={handleCopy}
            onShare={handleShare}
            isLiked={isCurrentQuoteLiked}
          />
        </>
      )}

      {activeTab === 'liked' && (
        <>
          <SearchBar searchText={searchText} onSearchChange={setSearchText} />
          <QuoteList quotes={filteredLikedQuotes} onUnlike={handleUnlike} />
        </>
      )}
    </div>
  );
};

export default Home;
