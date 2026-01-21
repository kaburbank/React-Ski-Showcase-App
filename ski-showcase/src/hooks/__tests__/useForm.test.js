import { renderHook, act } from '@testing-library/react';
import useForm from '../../hooks/useForm';
import '@testing-library/jest-dom';

describe('useForm Hook', () => {
  const initialState = {
    name: '',
    type: '',
    price: ''
  };

  it('initializes with provided state', () => {
    const { result } = renderHook(() => useForm(initialState, jest.fn()));
    
    expect(result.current.formData).toEqual(initialState);
  });

  it('updates form data on change', () => {
    const { result } = renderHook(() => useForm(initialState, jest.fn()));
    
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'Test Ski' }
      });
    });
    
    expect(result.current.formData.name).toBe('Test Ski');
  });

  it('handles multiple field changes', () => {
    const { result } = renderHook(() => useForm(initialState, jest.fn()));
    
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'Test Ski' }
      });
      result.current.handleChange({
        target: { name: 'type', value: 'All-Mountain' }
      });
    });
    
    expect(result.current.formData.name).toBe('Test Ski');
    expect(result.current.formData.type).toBe('All-Mountain');
  });

  it('calls onSubmit callback with valid data', () => {
    const mockOnSubmit = jest.fn();
    const { result } = renderHook(() => useForm(initialState, mockOnSubmit));
    
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'Test Ski' }
      });
      result.current.handleChange({
        target: { name: 'type', value: 'Freestyle' }
      });
      result.current.handleChange({
        target: { name: 'price', value: '599.99' }
      });
    });
    
    act(() => {
      result.current.handleSubmit({
        preventDefault: jest.fn()
      });
    });
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'Test Ski',
      type: 'Freestyle',
      price: '599.99'
    });
  });

  it('prevents submission with missing required fields', () => {
    const mockOnSubmit = jest.fn();
    const { result } = renderHook(() => useForm(initialState, mockOnSubmit));
    
    act(() => {
      result.current.handleSubmit({
        preventDefault: jest.fn()
      });
    });
    
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('sets submitted state to true on valid submission', () => {
    const mockOnSubmit = jest.fn();
    const { result } = renderHook(() => useForm(initialState, mockOnSubmit));
    
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'Test' }
      });
      result.current.handleChange({
        target: { name: 'type', value: 'All-Mountain' }
      });
      result.current.handleChange({
        target: { name: 'price', value: '100' }
      });
    });
    
    expect(result.current.submitted).toBe(false);
    
    act(() => {
      result.current.handleSubmit({
        preventDefault: jest.fn()
      });
    });
    
    expect(result.current.submitted).toBe(true);
  });

  it('resets form to initial state', () => {
    const { result } = renderHook(() => useForm(initialState, jest.fn()));
    
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'Test Ski' }
      });
    });
    
    expect(result.current.formData.name).toBe('Test Ski');
    
    act(() => {
      result.current.resetForm();
    });
    
    expect(result.current.formData).toEqual(initialState);
    expect(result.current.errors).toEqual({});
    expect(result.current.submitted).toBe(false);
  });

  it('clears error for field when user starts typing', () => {
    const mockOnSubmit = jest.fn();
    const { result } = renderHook(() => useForm(initialState, mockOnSubmit));
    
    // Trigger validation error by submitting empty form
    act(() => {
      result.current.handleSubmit({
        preventDefault: jest.fn()
      });
    });
    
    expect(result.current.errors.name).toBe('Name is required');
    
    // Clear error by typing in the field
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'Test' }
      });
    });
    
    expect(result.current.errors.name).toBe('');
  });

  it('validates required fields', () => {
    const mockOnSubmit = jest.fn();
    const { result } = renderHook(() => useForm(initialState, mockOnSubmit));
    
    act(() => {
      result.current.handleSubmit({
        preventDefault: jest.fn()
      });
    });
    
    expect(result.current.errors.name).toBeDefined();
    expect(result.current.errors.type).toBeDefined();
    expect(result.current.errors.price).toBeDefined();
  });
});
