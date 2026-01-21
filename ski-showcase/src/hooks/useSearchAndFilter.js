import { useState, useCallback, useMemo } from 'react';

/**
 * Custom hook for search and filter functionality
 * Demonstrates: useState, useCallback, useMemo
 */
function useSearchAndFilter(items, searchFields = []) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');

  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleFilterChange = useCallback((type) => {
    setFilterType(type);
  }, []);

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setFilterType('All');
  }, []);

  // Memoize the filtered results to avoid unnecessary recalculations
  const filteredItems = useMemo(() => {
    let result = items;

    // Filter by type if applicable
    if (filterType !== 'All' && items.length > 0 && 'type' in items[0]) {
      result = result.filter(item => item.type === filterType);
    }

    // Filter by search query if provided
    if (searchQuery.trim() && searchFields.length > 0) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item =>
        searchFields.some(field =>
          String(item[field]).toLowerCase().includes(query)
        )
      );
    }

    return result;
  }, [items, searchQuery, filterType, searchFields]);

  // Memoize available filter types
  const availableTypes = useMemo(() => {
    if (items.length === 0 || !('type' in items[0])) return ['All'];
    return ['All', ...new Set(items.map(item => item.type))];
  }, [items]);

  return {
    searchQuery,
    filterType,
    filteredItems,
    availableTypes,
    handleSearchChange,
    handleFilterChange,
    resetFilters
  };
}

export default useSearchAndFilter;
