import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SkiCard from '../SkiCard';
import '@testing-library/jest-dom';

describe('SkiCard Component', () => {
  const mockSki = {
    id: 1,
    name: 'Alpine Pro 180',
    type: 'All-Mountain',
    length: 180,
    price: 599.99,
    image: 'https://via.placeholder.com/300x200',
    description: 'High-performance all-mountain skis',
    flex: 'Medium',
    weight: '1850g',
    radius: '14m'
  };

  it('renders ski product information correctly', () => {
    render(<SkiCard ski={mockSki} />);
    
    expect(screen.getByText('Alpine Pro 180')).toBeInTheDocument();
    expect(screen.getByText('High-performance all-mountain skis')).toBeInTheDocument();
    expect(screen.getByText('All-Mountain')).toBeInTheDocument();
    expect(screen.getByText('$599.99')).toBeInTheDocument();
  });

  it('displays all ski specifications', () => {
    render(<SkiCard ski={mockSki} />);
    
    expect(screen.getByText('180cm')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('1850g')).toBeInTheDocument();
    expect(screen.getByText('14m')).toBeInTheDocument();
  });

  it('renders edit button when onEdit callback provided', () => {
    const mockOnEdit = jest.fn();
    render(<SkiCard ski={mockSki} onEdit={mockOnEdit} />);
    
    const editButton = screen.getByTitle('Edit product');
    expect(editButton).toBeInTheDocument();
  });

  it('calls onEdit with ski object when edit button clicked', () => {
    const mockOnEdit = jest.fn();
    render(<SkiCard ski={mockSki} onEdit={mockOnEdit} />);
    
    const editButton = screen.getByTitle('Edit product');
    fireEvent.click(editButton);
    
    expect(mockOnEdit).toHaveBeenCalledWith(mockSki);
  });

  it('renders delete button when onDelete callback provided', () => {
    const mockOnDelete = jest.fn();
    render(<SkiCard ski={mockSki} onDelete={mockOnDelete} />);
    
    const deleteButton = screen.getByTitle('Delete product');
    expect(deleteButton).toBeInTheDocument();
  });

  it('shows delete confirmation modal when delete button clicked', () => {
    const mockOnDelete = jest.fn();
    render(<SkiCard ski={mockSki} onDelete={mockOnDelete} />);
    
    const deleteButton = screen.getByTitle('Delete product');
    fireEvent.click(deleteButton);
    
    expect(screen.getByText(/Delete Product/)).toBeInTheDocument();
    expect(screen.getByText(/Are you sure/)).toBeInTheDocument();
  });

  it('calls onDelete with ski id when deletion confirmed', () => {
    const mockOnDelete = jest.fn();
    render(<SkiCard ski={mockSki} onDelete={mockOnDelete} />);
    
    const deleteButton = screen.getByTitle('Delete product');
    fireEvent.click(deleteButton);
    
    const confirmButton = screen.getByText('Delete');
    fireEvent.click(confirmButton);
    
    expect(mockOnDelete).toHaveBeenCalledWith(mockSki.id);
  });

  it('closes confirmation modal when cancel clicked', () => {
    const mockOnDelete = jest.fn();
    render(<SkiCard ski={mockSki} onDelete={mockOnDelete} />);
    
    const deleteButton = screen.getByTitle('Delete product');
    fireEvent.click(deleteButton);
    
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    
    expect(mockOnDelete).not.toHaveBeenCalled();
  });

  it('renders Add to Cart button', () => {
    render(<SkiCard ski={mockSki} />);
    
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });

  it('renders ski image with correct alt text', () => {
    render(<SkiCard ski={mockSki} />);
    
    const image = screen.getByAltText('Alpine Pro 180');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockSki.image);
  });
});
