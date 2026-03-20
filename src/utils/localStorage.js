/**
 * Retrieves an item from localStorage and parses it as JSON.
 * @param {string} key The key of the item to retrieve.
 * @returns {any} The parsed JSON value, or null if the key is not found or an error occurs.
 */
export const getItem = (key) => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return null;
    }
  };
  
  /**
   * Saves an item to localStorage after converting it to a JSON string.
   * @param {string} key The key to save the item under.
   * @param {any} value The value to save.
   */
  export const setItem = (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };
  
  /**
   * Removes an item from localStorage.
   * @param {string} key The key of the item to remove.
   */
  export const removeItem = (key) => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  };
  