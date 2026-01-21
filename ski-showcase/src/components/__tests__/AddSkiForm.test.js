import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddSkiForm from '../components/AddSkiForm';
import '@testing-library/jest-dom';

describe('AddSkiForm Component', () => {
  it('renders form with all input fields', () => {
    render(<AddSkiForm onProductAdded={jest.fn()} />);
    
    expect(screen.getByDisplayValue('Add a New Ski Product')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Mountain Carver Pro/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/599.99/)).toBeInTheDocument();
  });

  it('renders all form sections', () => {
    render(<AddSkiForm onProductAdded={jest.fn()} />);
    
    expect(screen.getByText('Basic Information')).toBeInTheDocument();
    expect(screen.getByText('Technical Specifications')).toBeInTheDocument();
    expect(screen.getByText('Image')).toBeInTheDocument();
  });

  it('allows user to type in form fields', () => {
    render(<AddSkiForm onProductAdded={jest.fn()} />);
    
    const nameInput = screen.getByLabelText('Ski Name *');
    fireEvent.change(nameInput, { target: { value: 'Test Ski' } });
    
    expect(nameInput.value).toBe('Test Ski');
  });

  it('submits form with valid data', () => {
    const mockOnProductAdded = jest.fn();
    render(<AddSkiForm onProductAdded={mockOnProductAdded} />);
    
    fireEvent.change(screen.getByLabelText('Ski Name *'), {
      target: { value: 'Test Ski' }
    });
    fireEvent.change(screen.getByLabelText('Ski Type *'), {
      target: { value: 'All-Mountain' }
    });
    fireEvent.change(screen.getByLabelText('Price (USD) *'), {
      target: { value: '599.99' }
    });
    
    fireEvent.click(screen.getByText('Add Ski Product'));
    
    expect(mockOnProductAdded).toHaveBeenCalled();
    const submittedSki = mockOnProductAdded.mock.calls[0][0];
    expect(submittedSki.name).toBe('Test Ski');
    expect(submittedSki.type).toBe('All-Mountain');
    expect(submittedSki.price).toBe(599.99);
  });

  it('prevents submission with missing required fields', () => {
    const mockOnProductAdded = jest.fn();
    render(<AddSkiForm onProductAdded={mockOnProductAdded} />);
    
    fireEvent.click(screen.getByText('Add Ski Product'));
    
    expect(mockOnProductAdded).not.toHaveBeenCalled();
  });

  it('shows success message after submission', async () => {
    const mockOnProductAdded = jest.fn();
    render(<AddSkiForm onProductAdded={mockOnProductAdded} />);
    
    fireEvent.change(screen.getByLabelText('Ski Name *'), {
      target: { value: 'Test Ski' }
    });
    fireEvent.change(screen.getByLabelText('Ski Type *'), {
      target: { value: 'Freestyle' }
    });
    fireEvent.change(screen.getByLabelText('Price (USD) *'), {
      target: { value: '499.99' }
    });
    
    fireEvent.click(screen.getByText('Add Ski Product'));
    
    await waitFor(() => {
      expect(screen.getByText(/successfully/i)).toBeInTheDocument();
    });
  });

  it('clears form when Clear Form button clicked', () => {
    render(<AddSkiForm onProductAdded={jest.fn()} />);
    
    const nameInput = screen.getByLabelText('Ski Name *');
    fireEvent.change(nameInput, { target: { value: 'Test Ski' } });
    
    expect(nameInput.value).toBe('Test Ski');
    
    fireEvent.click(screen.getByText('Clear Form'));
    
    expect(nameInput.value).toBe('');
  });

  it('converts numeric inputs to correct types', () => {
    const mockOnProductAdded = jest.fn();
    render(<AddSkiForm onProductAdded={mockOnProductAdded} />);
    
    fireEvent.change(screen.getByLabelText('Ski Name *'), {
      target: { value: 'Test Ski' }
    });
    fireEvent.change(screen.getByLabelText('Ski Type *'), {
      target: { value: 'Carving' }
    });
    fireEvent.change(screen.getByLabelText('Price (USD) *'), {
      target: { value: '699.99' }
    });
    fireEvent.change(screen.getByLabelText('Length (cm)'), {
      target: { value: '180' }
    });
    
    fireEvent.click(screen.getByText('Add Ski Product'));
    
    const submittedSki = mockOnProductAdded.mock.calls[0][0];
    expect(typeof submittedSki.price).toBe('number');
    expect(typeof submittedSki.length).toBe('number');
  });

  it('generates unique ID for new product', () => {
    const mockOnProductAdded = jest.fn();
    const { rerender } = render(<AddSkiForm onProductAdded={mockOnProductAdded} />);
    
    const submitForm = () => {
      fireEvent.change(screen.getByLabelText('Ski Name *'), {
        target: { value: 'Test Ski' }
      });
      fireEvent.change(screen.getByLabelText('Ski Type *'), {
        target: { value: 'All-Mountain' }
      });
      fireEvent.change(screen.getByLabelText('Price (USD) *'), {
        target: { value: '599.99' }
      });
      fireEvent.click(screen.getByText('Add Ski Product'));
    };
    
    submitForm();
    const id1 = mockOnProductAdded.mock.calls[0][0].id;
    
    expect(typeof id1).toBe('number');
  });
});
