import { createContext, useState, useCallback, useContext } from 'react';

// Create SkisContext
const SkisContext = createContext();

// SkisProvider Component
export function SkisProvider({ children }) {
  const [allSkis, setAllSkis] = useState([]);

  // Update ski details
  const updateSki = useCallback((updatedSki) => {
    setAllSkis(prevSkis => 
      prevSkis.map(ski => ski.id === updatedSki.id ? updatedSki : ski)
    );
  }, []);

  // Add new ski to the list
  const addSki = useCallback((newSki) => {
    setAllSkis(prevSkis => [...prevSkis, newSki]);
  }, []);

  // Context value
  const value = {
    skis: allSkis,
    updateSki,
    addSki,
    setAllSkis
  };

  // Render provider
  return (
    <SkisContext.Provider value={value}>
      {children}
    </SkisContext.Provider>
  );
}

/**
 * Custom hook to use the SkisContext
 * Demonstrates: useContext pattern with error handling
 */
export function useSkis() {
  const context = useContext(SkisContext);
  if (!context) {
    throw new Error('useSkis must be used within a SkisProvider');
  }
  return context;
}
