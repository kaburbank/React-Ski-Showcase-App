import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditSkiForm from '../EditSkiForm';
import '@testing-library/jest-dom';

describe('EditSkiForm Component', () => {
  const mockSki = {
    id: 1,
    name: 'Alpine Pro 180',
    type: 'All-Mountain',
    length: 180,
    price: 599.99,
    image: 'https://via.placeholder.com/300x200',
    description: 'High-performance skis',
    flex: 'Medium',
    weight: '1850g',
    radius: '14m'
  };

  it('renders form with ski data pre-filled', () => {
    render(
      <EditSkiForm 
        ski={mockSki} 
        onSave={jest.fn()} 
        onCancel={jest.fn()} 
      />
    );
    
    expect(screen.getByDisplayValue('Alpine Pro 180')).toBeInTheDocument();
    expect(screen.getByDisplayValue('All-Mountain')).toBeInTheDocument();
    expect(screen.getByDisplayValue('599.99')).toBeInTheDocument();
  });

  it('renders edit form modal with overlay', () => {
    render(
      <EditSkiForm 
        ski={mockSki} 
        onSave={jest.fn()} 
        onCancel={jest.fn()} 
      />
    );
    
    expect(screen.getByText('Edit Ski Product')).toBeInTheDocument();
    expect(screen.getByText(/Edit Ski Product/)).toBeInTheDocument();
  });

  it('allows editing ski fields', () => {
    render(
      <EditSkiForm 
        ski={mockSki} 
        onSave={jest.fn()} 
        onCancel={jest.fn()} 
      />
    );
    
    const priceInput = screen.getByDisplayValue('599.99');
    fireEvent.change(priceInput, { target: { value: '699.99' } });
    
    expect(priceInput.value).toBe('699.99');
  });

  it('calls onSave with updated ski data on form submit', () => {
    const mockOnSave = jest.fn();
    render(
      <EditSkiForm 
        ski={mockSki} 
        onSave={mockOnSave} 
        onCancel={jest.fn()} 
      />
    );
    
    const priceInput = screen.getByDisplayValue('599.99');
    fireEvent.change(priceInput, { target: { value: '699.99' } });
    
    fireEvent.click(screen.getByText('Save Changes'));
    
    expect(mockOnSave).toHaveBeenCalled();
    const updatedSki = mockOnSave.mock.calls[0][0];
    expect(updatedSki.price).toBe(699.99);
    expect(updatedSki.id).toBe(mockSki.id);
  });

  it('calls onCancel when Cancel button clicked', () => {
    const mockOnCancel = jest.fn();
    render(
      <EditSkiForm 
        ski={mockSki} 
        onSave={jest.fn()} 
        onCancel={mockOnCancel} 
      />
    );
    
    fireEvent.click(screen.getByText('Cancel'));
    
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('calls onCancel when close button clicked', () => {
    const mockOnCancel = jest.fn();
    render(
      <EditSkiForm 
        ski={mockSki} 
        onSave={jest.fn()} 
        onCancel={mockOnCancel} 
      />
    );
    
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);
    
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('shows success message after save', async () => {
    render(
      <EditSkiForm 
        ski={mockSki} 
        onSave={jest.fn()} 
        onCancel={jest.fn()} 
      />
    );
    
    fireEvent.click(screen.getByText('Save Changes'));
    
    await waitFor(() => {
      expect(screen.getByText(/successfully/i)).toBeInTheDocument();
    });
  });

  it('prevents save with missing required fields', () => {
    const mockOnSave = jest.fn();
    render(
      <EditSkiForm 
        ski={mockSki} 
        onSave={mockOnSave} 
        onCancel={jest.fn()} 
      />
    );
    
    const nameInput = screen.getByDisplayValue('Alpine Pro 180');
    fireEvent.change(nameInput, { target: { value: '' } });
    
    fireEvent.click(screen.getByText('Save Changes'));
    
    expect(mockOnSave).not.toHaveBeenCalled();
  });

  it('preserves ski id when updating', () => {
    const mockOnSave = jest.fn();
    render(
      <EditSkiForm 
        ski={mockSki} 
        onSave={mockOnSave} 
        onCancel={jest.fn()} 
      />
    );
    
    const descInput = screen.getByDisplayValue('High-performance skis');
    fireEvent.change(descInput, { target: { value: 'Updated description' } });
    
    fireEvent.click(screen.getByText('Save Changes'));
    
    const updatedSki = mockOnSave.mock.calls[0][0];
    expect(updatedSki.id).toBe(1);
  });

  it('closes modal when overlay clicked', () => {
    const mockOnCancel = jest.fn();
    render(
      <EditSkiForm 
        ski={mockSki} 
        onSave={jest.fn()} 
        onCancel={mockOnCancel} 
      />
    );
    
    const overlay = screen.getByText('Edit Ski Product').closest('.edit-form-overlay');
    fireEvent.click(overlay);
    
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
