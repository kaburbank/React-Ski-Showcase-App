import React from 'react';
import '../styles/Navigation.css';

function Navigation({ currentPage, onPageChange }) {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo">⛷️ Ski Showcase</div>
        <ul className="nav-menu">
          <li>
            <button 
              className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => onPageChange('home')}
            >
              Home
            </button>
          </li>
          <li>
            <button 
              className={`nav-link ${currentPage === 'products' ? 'active' : ''}`}
              onClick={() => onPageChange('products')}
            >
              Products
            </button>
          </li>
          <li>
            <button 
              className={`nav-link ${currentPage === 'add-product' ? 'active' : ''}`}
              onClick={() => onPageChange('add-product')}
            >
              Add Product
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
