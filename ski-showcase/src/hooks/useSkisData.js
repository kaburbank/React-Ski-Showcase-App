import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for fetching ski data from server or local JSON
 * Demonstrates: useState, useEffect, useCallback
 */
function useSkisData(newSkis = []) {
  const [skis, setSkis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSkis = useCallback(async () => {
    try {
      setLoading(true);
      // Try to fetch from server first
      try {
        const response = await fetch('http://localhost:3001/skis');
        if (response.ok) {
          const data = await response.json();
          setSkis([...data, ...newSkis]);
          setError(null);
          return;
        }
      } catch (serverErr) {
        console.log('Server not available, using local data');
      }
      
      // Fallback to local JSON
      const response = await fetch('/db.json');
      const data = await response.json();
      setSkis([...data.skis, ...newSkis]);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error loading skis:', err);
    } finally {
      setLoading(false);
    }
  }, [newSkis]);

  useEffect(() => {
    fetchSkis();
  }, [fetchSkis]);

  const updateSki = useCallback((updatedSki) => {
    setSkis(prevSkis => 
      prevSkis.map(ski => ski.id === updatedSki.id ? updatedSki : ski)
    );
  }, []);

  const addSki = useCallback((newSki) => {
    setSkis(prevSkis => [...prevSkis, newSki]);
  }, []);

  return { skis, loading, error, updateSki, addSki };
}

export default useSkisData;
