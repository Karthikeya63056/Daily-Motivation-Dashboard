const BASE_URL = 'https://api.quotable.io';

// Local fallback quotes to use when API fails
const LOCAL_QUOTES = [
  { id: '1', content: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { id: '2', content: 'Believe you can and you\'re halfway there.', author: 'Theodore Roosevelt' },
  { id: '3', content: 'Your time is limited, so don\'t waste it living someone else\'s life.', author: 'Steve Jobs' },
  { id: '4', content: 'The future belongs to those who believe in the beauty of their dreams.', author: 'Eleanor Roosevelt' },
  { id: '5', content: 'It does not matter how slowly you go as long as you do not stop.', author: 'Confucius' },
  { id: '6', content: 'The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate.', author: 'Ralph Waldo Emerson' },
  { id: '7', content: 'Success is not final, failure is not fatal: it is the courage to continue that counts.', author: 'Winston Churchill' },
  { id: '8', content: 'The only impossible journey is the one you never begin.', author: 'Tony Robbins' },
  { id: '9', content: 'Don\'t watch the clock; do what it does. Keep going.', author: 'Sam Levenson' },
  { id: '10', content: 'The best way to predict the future is to create it.', author: 'Peter Drucker' },
];

/**
 * Fetches a single random quote.
 * Falls back to local quotes if API fails.
 * @returns {Promise<object>} A promise that resolves to the quote object.
 */
export const fetchRandomQuote = async () => {
  try {
    const response = await fetch(`${BASE_URL}/random`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return {
      id: data._id,
      content: data.content,
      author: data.author,
    };
  } catch (error) {
    console.warn('API failed, using local fallback:', error.message);
    // Return a random quote from local fallback
    const randomIndex = Math.floor(Math.random() * LOCAL_QUOTES.length);
    return LOCAL_QUOTES[randomIndex];
  }
};

/**
 * Fetches multiple random quotes.
 * Falls back to local quotes if API fails.
 * @param {number} limit The number of quotes to fetch.
 * @returns {Promise<Array<object>>} A promise that resolves to an array of quote objects.
 */
export const fetchMultipleQuotes = async (limit = 5) => {
    try {
      const response = await fetch(`${BASE_URL}/quotes/random?limit=${limit}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.map(quote => ({
        id: quote._id,
        content: quote.content,
        author: quote.author,
      }));
    } catch (error) {
      console.warn('API failed, using local fallback:', error.message);
      // Return random local quotes (shuffled and limited)
      const shuffled = [...LOCAL_QUOTES].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, limit);
    }
  };
