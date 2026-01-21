import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from '../components/Navigation';
import '@testing-library/jest-dom';

describe('Navigation Component', () => {
  it('renders navigation with logo', () => {
    render(
      <Navigation currentPage="home" onPageChange={jest.fn()} />
    );
    
    expect(screen.getByText(/Ski Showcase/)).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(
      <Navigation currentPage="home" onPageChange={jest.fn()} />
    );
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Add Product')).toBeInTheDocument();
  });

  it('marks current page as active', () => {
    const { rerender } = render(
      <Navigation currentPage="home" onPageChange={jest.fn()} />
    );
    
    let homeButton = screen.getByText('Home').closest('button');
    expect(homeButton).toHaveClass('active');
    
    rerender(
      <Navigation currentPage="products" onPageChange={jest.fn()} />
    );
    
    homeButton = screen.getByText('Home').closest('button');
    const productsButton = screen.getByText('Products').closest('button');
    expect(homeButton).not.toHaveClass('active');
    expect(productsButton).toHaveClass('active');
  });

  it('calls onPageChange when navigation link clicked', () => {
    const mockOnPageChange = jest.fn();
    render(
      <Navigation currentPage="home" onPageChange={mockOnPageChange} />
    );
    
    fireEvent.click(screen.getByText('Products'));
    
    expect(mockOnPageChange).toHaveBeenCalledWith('products');
  });

  it('calls onPageChange with correct page for each link', () => {
    const mockOnPageChange = jest.fn();
    render(
      <Navigation currentPage="home" onPageChange={mockOnPageChange} />
    );
    
    fireEvent.click(screen.getByText('Add Product'));
    expect(mockOnPageChange).toHaveBeenCalledWith('add-product');
    
    fireEvent.click(screen.getByText('Home'));
    expect(mockOnPageChange).toHaveBeenCalledWith('home');
  });

  it('renders sticky navigation bar', () => {
    const { container } = render(
      <Navigation currentPage="home" onPageChange={jest.fn()} />
    );
    
    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('navigation');
  });
});
