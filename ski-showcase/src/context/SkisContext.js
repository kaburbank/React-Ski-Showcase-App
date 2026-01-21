import { createContext, useState, useCallback, useContext } from 'react';

/**
 * Context for global ski data management
 * Demonstrates: useContext, useCallback, custom hooks pattern
 */
const SkisContext = createContext();

export function SkisProvider({ children }) {
  const [allSkis, setAllSkis] = useState([]);

  const updateSki = useCallback((updatedSki) => {
    setAllSkis(prevSkis => 
      prevSkis.map(ski => ski.id === updatedSki.id ? updatedSki : ski)
    );
  }, []);

  const addSki = useCallback((newSki) => {
    setAllSkis(prevSkis => [...prevSkis, newSki]);
  }, []);

  const value = {
    skis: allSkis,
    updateSki,
    addSki,
    setAllSkis
  };

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
