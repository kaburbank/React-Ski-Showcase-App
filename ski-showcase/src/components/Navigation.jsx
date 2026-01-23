import React from 'react';
import '../styles/Navigation.css';

// function Navigation Component
function Navigation({ currentPage, onPageChange }) {
  // Render navigation bar
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo"> Light and Fast Ski Shop</div>
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
              Admin Portal
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
