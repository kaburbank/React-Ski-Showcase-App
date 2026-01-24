import React, { useState } from 'react';
import SkiCard from './SkiCard';
import EditSkiForm from './EditSkiForm';
import useSkisData from '../hooks/useSkisData';
import useSearchAndFilter from '../hooks/useSearchAndFilter';
import '../styles/ProductsPage.css';

// function ProductsPage Component
function ProductsPage({ newSkis, onSkisUpdate }) {
  const { skis, loading, error, updateSki, deleteSki } = useSkisData(newSkis);
  const [editingSkiId, setEditingSkiId] = useState(null);
  
  // Use custom search and filter hook with memoization
  const {
    searchQuery,
    filterType,
    filteredItems: filteredSkis,
    availableTypes: skiTypes,
    handleSearchChange,
    handleFilterChange,
    resetFilters
  } = useSearchAndFilter(skis, ['name', 'description', 'type']);

  // EDIT operation - updates ski details
  const handleEditSki = (updatedSki) => {
    updateSki(updatedSki);
    setEditingSkiId(null);
    if (onSkisUpdate) {
      onSkisUpdate([...skis]);
    }
  };

  // DELETE operation - removes ski from list
  const handleDeleteSki = (skiId) => {
    deleteSki(skiId);
    if (onSkisUpdate) {
      const updatedSkis = skis.filter(ski => ski.id !== skiId);
      onSkisUpdate(updatedSkis);
    }
  };

  // Find the ski being edited
  const editingSki = editingSkiId ? skis.find(ski => ski.id === editingSkiId) : null;

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  // Render products page
  return (
    <div className="products-page">
      <div className="products-header">
        <h1>All Ski Products</h1>
        <p>Browse our complete collection of skis</p>
      </div>

      <div className="products-container">
        <div className="search-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by name, type, or description..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        <div className="filter-section">
          <h3>Filter by Type</h3>
          <div className="filter-buttons">
            {skiTypes.map(type => (
              <button
                key={type}
                className={`filter-btn ${filterType === type ? 'active' : ''}`}
                onClick={() => handleFilterChange(type)}
              >
                {type}
              </button>
            ))}
          </div>
          <p className="product-count">
            Showing {filteredSkis.length} of {skis.length} products
          </p>
        </div>

        <div className="products-grid">
          {filteredSkis.length > 0 ? (
            filteredSkis.map((ski) => (
              <SkiCard 
                key={ski.id} 
                ski={ski}
                onEdit={() => setEditingSkiId(ski.id)}
                onDelete={handleDeleteSki}
              />
            ))
          ) : (
            <div className="no-products">
              <p>No products found matching your search</p>
              {(searchQuery || filterType !== 'All') && (
                <p className="reset-search">
                  Try adjusting your filters or <button onClick={resetFilters} className="reset-btn">reset filters</button>
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {editingSki && (
        <EditSkiForm 
          ski={editingSki}
          onSave={handleEditSki}
          onCancel={() => setEditingSkiId(null)}
        />
      )}
    </div>
  );
}

export default ProductsPage;
