import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for local storage persistence
 * Demonstrates: useState, useEffect, useCallback
 */
function useLocalStorage(key, initialValue) {
  // State to store our value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists to localStorage
  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}

export default useLocalStorage;
