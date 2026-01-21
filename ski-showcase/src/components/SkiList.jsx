import React, { useState, useEffect } from 'react';
import SkiCard from './SkiCard';
import '../styles/SkiList.css';

// function SkiList Component
function SkiList() {
  const [skis, setSkis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch skis data from local JSON file or server
  useEffect(() => {
    const fetchSkis = async () => {
      try {
        setLoading(true);
        // Try to fetch from server first, fallback to public data
        try {
          const response = await fetch('http://localhost:3001/skis');
          if (response.ok) {
            const data = await response.json();
            setSkis(data);
            setError(null);
            setLoading(false);
            return;
          }
        } catch (serverErr) {
          console.log('Server not available, using local data');
        }
        
        // Fallback to data from public folder
        const response = await fetch('/db.json');
        const data = await response.json();
        setSkis(data.skis);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error loading skis:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkis();
  }, []);

  if (loading) {
    return <div className="loading">Loading skis...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  // Render ski list
  return (
    <div className="ski-list-container">
      <h2 className="ski-list-title">Our Ski Collection</h2>
      <div className="ski-grid">
        {skis.map((ski) => (
          <SkiCard key={ski.id} ski={ski} />
        ))}
      </div>
    </div>
  );
}

export default SkiList;
