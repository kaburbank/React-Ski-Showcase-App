import { renderHook, act } from '@testing-library/react';
import useSearchAndFilter from '../../hooks/useSearchAndFilter';
import '@testing-library/jest-dom';

describe('useSearchAndFilter Hook', () => {
  const mockItems = [
    {
      id: 1,
      name: 'Alpine Pro 180',
      type: 'All-Mountain',
      description: 'High-performance skis'
    },
    {
      id: 2,
      name: 'Freestyle Fury',
      type: 'Freestyle',
      description: 'Perfect for tricks'
    },
    {
      id: 3,
      name: 'Carving Crown',
      type: 'Carving',
      description: 'Precision edge control'
    }
  ];

  it('initializes with all items and default filters', () => {
    const { result } = renderHook(() =>
      useSearchAndFilter(mockItems, ['name', 'description', 'type'])
    );
    
    expect(result.current.searchQuery).toBe('');
    expect(result.current.filterType).toBe('All');
    expect(result.current.filteredItems).toEqual(mockItems);
  });

  it('filters by search query across multiple fields', () => {
    const { result } = renderHook(() =>
      useSearchAndFilter(mockItems, ['name', 'description', 'type'])
    );
    
    act(() => {
      result.current.handleSearchChange('Alpine');
    });
    
    expect(result.current.searchQuery).toBe('Alpine');
    expect(result.current.filteredItems).toHaveLength(1);
    expect(result.current.filteredItems[0].name).toBe('Alpine Pro 180');
  });

  it('performs case-insensitive search', () => {
    const { result } = renderHook(() =>
      useSearchAndFilter(mockItems, ['name', 'description', 'type'])
    );
    
    act(() => {
      result.current.handleSearchChange('freestyle');
    });
    
    expect(result.current.filteredItems).toHaveLength(1);
    expect(result.current.filteredItems[0].type).toBe('Freestyle');
  });

  it('filters by type', () => {
    const { result } = renderHook(() =>
      useSearchAndFilter(mockItems, ['name', 'description', 'type'])
    );
    
    act(() => {
      result.current.handleFilterChange('All-Mountain');
    });
    
    expect(result.current.filterType).toBe('All-Mountain');
    expect(result.current.filteredItems).toHaveLength(1);
    expect(result.current.filteredItems[0].type).toBe('All-Mountain');
  });

  it('combines search and filter', () => {
    const { result } = renderHook(() =>
      useSearchAndFilter(mockItems, ['name', 'description', 'type'])
    );
    
    act(() => {
      result.current.handleFilterChange('All-Mountain');
      result.current.handleSearchChange('alpine');
    });
    
    expect(result.current.filteredItems).toHaveLength(1);
    expect(result.current.filteredItems[0].name).toBe('Alpine Pro 180');
  });

  it('returns all items when filter is All', () => {
    const { result } = renderHook(() =>
      useSearchAndFilter(mockItems, ['name', 'description', 'type'])
    );
    
    act(() => {
      result.current.handleFilterChange('All');
    });
    
    expect(result.current.filteredItems).toHaveLength(3);
  });

  it('generates available types memoized', () => {
    const { result } = renderHook(() =>
      useSearchAndFilter(mockItems, ['name', 'description', 'type'])
    );
    
    expect(result.current.availableTypes).toContain('All');
    expect(result.current.availableTypes).toContain('All-Mountain');
    expect(result.current.availableTypes).toContain('Freestyle');
    expect(result.current.availableTypes).toContain('Carving');
  });

  it('resets filters correctly', () => {
    const { result } = renderHook(() =>
      useSearchAndFilter(mockItems, ['name', 'description', 'type'])
    );
    
    act(() => {
      result.current.handleFilterChange('Freestyle');
      result.current.handleSearchChange('trick');
    });
    
    expect(result.current.filteredItems.length).toBeLessThan(3);
    
    act(() => {
      result.current.resetFilters();
    });
    
    expect(result.current.searchQuery).toBe('');
    expect(result.current.filterType).toBe('All');
    expect(result.current.filteredItems).toEqual(mockItems);
  });

  it('handles empty search results', () => {
    const { result } = renderHook(() =>
      useSearchAndFilter(mockItems, ['name', 'description', 'type'])
    );
    
    act(() => {
      result.current.handleSearchChange('NonexistentSki');
    });
    
    expect(result.current.filteredItems).toHaveLength(0);
  });

  it('searches in description field', () => {
    const { result } = renderHook(() =>
      useSearchAndFilter(mockItems, ['name', 'description', 'type'])
    );
    
    act(() => {
      result.current.handleSearchChange('tricks');
    });
    
    expect(result.current.filteredItems).toHaveLength(1);
    expect(result.current.filteredItems[0].id).toBe(2);
  });

  it('handles multiple field search', () => {
    const { result } = renderHook(() =>
      useSearchAndFilter(mockItems, ['name', 'description', 'type'])
    );
    
    act(() => {
      result.current.handleSearchChange('control');
    });
    
    expect(result.current.filteredItems).toHaveLength(1);
    expect(result.current.filteredItems[0].name).toBe('Carving Crown');
  });
});
