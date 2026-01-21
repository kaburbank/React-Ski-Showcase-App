import { renderHook, act } from '@testing-library/react';
import useLocalStorage from '../../hooks/useLocalStorage';
import '@testing-library/jest-dom';

describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('initializes with initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
    
    expect(result.current[0]).toBe('initialValue');
  });

  it('returns value from localStorage if it exists', () => {
    localStorage.setItem('testKey', JSON.stringify('storedValue'));
    
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
    
    expect(result.current[0]).toBe('storedValue');
  });

  it('persists value to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
    
    act(() => {
      result.current[1]('newValue');
    });
    
    expect(result.current[0]).toBe('newValue');
    expect(JSON.parse(localStorage.getItem('testKey'))).toBe('newValue');
  });

  it('handles complex objects', () => {
    const initialObject = { name: 'Test', age: 25 };
    const { result } = renderHook(() => useLocalStorage('userKey', initialObject));
    
    const newObject = { name: 'Updated', age: 26 };
    
    act(() => {
      result.current[1](newObject);
    });
    
    expect(result.current[0]).toEqual(newObject);
    expect(JSON.parse(localStorage.getItem('userKey'))).toEqual(newObject);
  });

  it('handles array values', () => {
    const initialArray = [1, 2, 3];
    const { result } = renderHook(() => useLocalStorage('arrayKey', initialArray));
    
    const newArray = [4, 5, 6];
    
    act(() => {
      result.current[1](newArray);
    });
    
    expect(result.current[0]).toEqual(newArray);
    expect(JSON.parse(localStorage.getItem('arrayKey'))).toEqual(newArray);
  });

  it('handles function-like updates', () => {
    const { result } = renderHook(() => useLocalStorage('counterKey', 0));
    
    act(() => {
      result.current[1](prev => prev + 1);
    });
    
    expect(result.current[0]).toBe(1);
  });

  it('handles localStorage errors gracefully', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
    
    act(() => {
      result.current[1]('newValue');
    });
    
    expect(consoleErrorSpy).toHaveBeenCalled();
    
    setItemSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  it('returns different keys independently', () => {
    const { result: result1 } = renderHook(() => useLocalStorage('key1', 'value1'));
    const { result: result2 } = renderHook(() => useLocalStorage('key2', 'value2'));
    
    expect(result1.current[0]).toBe('value1');
    expect(result2.current[0]).toBe('value2');
    
    act(() => {
      result1.current[1]('updated1');
    });
    
    expect(result1.current[0]).toBe('updated1');
    expect(result2.current[0]).toBe('value2');
  });

  it('persists across hook instances with same key', () => {
    const { result: result1 } = renderHook(() => useLocalStorage('sharedKey', 'initial'));
    
    act(() => {
      result1.current[1]('updated');
    });
    
    const { result: result2 } = renderHook(() => useLocalStorage('sharedKey', 'initial'));
    
    expect(result2.current[0]).toBe('updated');
  });
});
