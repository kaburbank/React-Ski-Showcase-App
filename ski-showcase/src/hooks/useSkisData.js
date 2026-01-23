import { useState, useEffect, useCallback } from 'react';

// Custom hook for skis data management
function useSkisData(newSkis = []) {
  // State for skis data, loading status, and error handling
  const [skis, setSkis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch skis data from server or local JSON
  const fetchSkis = useCallback(async () => {
    try {
      setLoading(true);
      let data = [];
      
      // Try to fetch from server first
      try {
        const response = await fetch('http://localhost:3001/skis');
        if (response.ok) {
          data = await response.json();
          setSkis([...data, ...newSkis]);
          setError(null);
          return;
        }
      } catch (serverErr) {
        console.log('Server not available, using local data');
      }
      
      // Fallback to local JSON
      const response = await fetch('/db.json');
      const jsonData = await response.json();
      const localSkis = jsonData.skis || [];
      setSkis([...localSkis, ...newSkis]);
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

  // Update ski details and persist to server
  const updateSki = useCallback((updatedSki) => {
    // Update local state first for immediate UI feedback
    setSkis(prevSkis => 
      prevSkis.map(ski => ski.id === updatedSki.id ? updatedSki : ski)
    );
    
    // Try to persist to server
    try {
      fetch(`http://localhost:3001/skis/${updatedSki.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedSki)
      }).catch(err => {
        console.log('Could not persist update to server:', err);
      });
    } catch (err) {
      console.log('Error persisting update:', err);
    }
  }, []);

  // Add new ski to the list and persist to server
  const addSki = useCallback((newSki) => {
    // Update local state first for immediate UI feedback
    setSkis(prevSkis => [...prevSkis, newSki]);
    
    // Try to persist to server
    try {
      fetch('http://localhost:3001/skis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSki)
      }).catch(err => {
        console.log('Could not persist new ski to server:', err);
        // Local addition is already done, so this is acceptable
      });
    } catch (err) {
      console.log('Error persisting ski:', err);
    }
  }, []);

  // Delete ski from the list and persist to server
  const deleteSki = useCallback(async (skiId) => {
    // Update local state first for immediate UI feedback
    setSkis(prevSkis => prevSkis.filter(ski => ski.id !== skiId));
    
    // Try to persist deletion to server
    try {
      const response = await fetch(`http://localhost:3001/skis/${skiId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        console.error('Failed to delete ski from server');
      }
    } catch (err) {
      console.log('Could not persist deletion to server:', err);
      // Local deletion is already done, so this is acceptable
    }
  }, []);

  return { skis, loading, error, updateSki, addSki, deleteSki };
}

export default useSkisData;
