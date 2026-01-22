import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import SkiList from './components/SkiList';
import ProductsPage from './components/ProductsPage';
import AddSkiForm from './components/AddSkiForm';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [newSkis, setNewSkis] = useState([]);

  const handleAddProduct = (newSki) => {
    setNewSkis([...newSkis, newSki]);
  };

  const handleSkisUpdate = (updatedSkis) => {
    // Update the new skis if any of them were edited
    const newSkisOnly = updatedSkis.filter(ski => newSkis.some(ns => ns.id === ski.id));
    if (newSkisOnly.length > 0) {
      setNewSkis(newSkisOnly);
    }
  };

  return (
    <div className="App">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      
      {currentPage === 'home' && (
        <>
          <header className="App-header">
            <h1>⛷️ Light and Fast Ski Shop</h1>
            <p>Discover the finest selection of skis for every skill level</p>
          </header>
          <section className="description-section">
            <div className="description-content">
              <h2>Welcome to the Light and Fast Ski Shop</h2>
              <p>
                At our Ski Shop, we believe that finding the perfect pair of skis should be an exciting journey, not a frustrating one. 
                Whether you're a beginner taking your first steps on the slopes or an advanced skier pushing your limits in the backcountry, 
                we have the perfect skis for you.
              </p>
              <p>
                Our carefully curated collection features top-quality skis from trusted brands, each designed for specific skiing styles and experience levels. 
                From all-mountain versatility to freestyle tricks, carving precision to backcountry adventures—explore our collection and find your ideal match.
              </p>
              <div className="description-features">
                <div className="feature">
                  <h3>Premium Quality</h3>
                  <p>Hand-picked skis from industry leaders</p>
                </div>
                <div className="feature">
                  <h3>All Skill Levels</h3>
                  <p>Skis for beginners, intermediates, and experts</p>
                </div>
                <div className="feature">
                  <h3>Every Style</h3>
                  <p>All-mountain, freestyle, carving, and backcountry options</p>
                </div>
              </div>
            </div>
          </section>
          <main className="App-main">
            <SkiList />
          </main>
        </>
      )}

      {currentPage === 'products' && (
        <ProductsPage newSkis={newSkis} onSkisUpdate={handleSkisUpdate} />
      )}

      {currentPage === 'add-product' && (
        <AddSkiForm onProductAdded={handleAddProduct} />
      )}
    </div>
  );
}

export default App;
