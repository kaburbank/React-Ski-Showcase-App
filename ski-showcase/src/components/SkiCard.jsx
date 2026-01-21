import React, { useState } from 'react';
import '../styles/SkiCard.css';

// function SkiCard Component
function SkiCard({ ski, onEdit, onDelete }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Handle delete button click
  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  // Confirm deletion
  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete(ski.id);
    }
    setShowDeleteConfirm(false);
  };

  // Cancel deletion
  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  // Render ski card
  return (
    <div className="ski-card">
      <div className="ski-image-container">
        <img src={ski.image} alt={ski.name} className="ski-image" />
        <span className="ski-badge">{ski.type}</span>
        <div className="card-actions">
          {onEdit && (
            <button className="edit-badge" onClick={() => onEdit(ski)} title="Edit product">
              ✎
            </button>
          )}
          {onDelete && (
            <button className="delete-badge" onClick={handleDeleteClick} title="Delete product">
              🗑️
            </button>
          )}
        </div>
      </div>
      <div className="ski-content">
        <h3 className="ski-name">{ski.name}</h3>
        <p className="ski-description">{ski.description}</p>
        <div className="ski-specs">
          <div className="spec">
            <span className="spec-label">Length:</span>
            <span className="spec-value">{ski.length}cm</span>
          </div>
          <div className="spec">
            <span className="spec-label">Flex:</span>
            <span className="spec-value">{ski.flex}</span>
          </div>
          <div className="spec">
            <span className="spec-label">Weight:</span>
            <span className="spec-value">{ski.weight}</span>
          </div>
          <div className="spec">
            <span className="spec-label">Radius:</span>
            <span className="spec-value">{ski.radius}</span>
          </div>
        </div>
        <div className="ski-footer">
          <span className="ski-price">${ski.price}</span>
          <button className="btn-add-cart">Add to Cart</button>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="delete-confirmation-overlay" onClick={handleCancelDelete}>
          <div className="delete-confirmation-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Product?</h3>
            <p>Are you sure you want to delete "{ski.name}"?</p>
            <p className="warning-text">This action cannot be undone.</p>
            <div className="confirmation-actions">
              <button className="btn-confirm-delete" onClick={handleConfirmDelete}>
                Delete
              </button>
              <button className="btn-cancel-delete" onClick={handleCancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SkiCard;
