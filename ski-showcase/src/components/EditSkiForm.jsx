import React, { useCallback } from 'react';
import useForm from '../hooks/useForm';
import '../styles/EditSkiForm.css';

// function EditSkiForm Component
function EditSkiForm({ ski, onSave, onCancel }) {
  // Initial form state populated with existing ski data
  const initialState = {
    name: ski.name,
    type: ski.type,
    length: ski.length,
    price: ski.price,
    image: ski.image,
    description: ski.description,
    flex: ski.flex,
    weight: ski.weight,
    radius: ski.radius
  };

  // Handle form submission
  const handleSubmitForm = useCallback((data) => {
    const updatedSki = {
      ...ski,
      ...data,
      length: parseInt(data.length) || ski.length,
      price: parseFloat(data.price)
    };
    
    if (onSave) {
      onSave(updatedSki);
    }
  }, [ski, onSave]);

  // Use custom useForm hook
  const {
    formData,
    submitted,
    handleChange,
    handleSubmit
  } = useForm(initialState, handleSubmitForm);

  // Render form
  return (
    <div className="edit-form-overlay" onClick={onCancel}>
      <div className="edit-form-container" onClick={(e) => e.stopPropagation()}>
        <div className="edit-form-header">
          <h1>Edit Ski Product</h1>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>

        {submitted && (
          <div className="success-message">
            ✓ Product updated successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="edit-ski-form">
          <div className="form-section">
            <h2>Basic Information</h2>
            
            <div className="form-group">
              <label htmlFor="name">Ski Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Ski Type *</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="">Select a type</option>
                <option value="All-Mountain">All-Mountain</option>
                <option value="Freestyle">Freestyle</option>
                <option value="Backcountry">Backcountry</option>
                <option value="Carving">Carving</option>
                <option value="Beginner">Beginner</option>
                <option value="Racing">Racing</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="price">Price (USD) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Technical Specifications</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="length">Length (cm)</label>
                <input
                  type="number"
                  id="length"
                  name="length"
                  value={formData.length}
                  onChange={handleChange}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="flex">Flex</label>
                <select
                  id="flex"
                  name="flex"
                  value={formData.flex}
                  onChange={handleChange}
                >
                  <option value="">Select flex</option>
                  <option value="Soft">Soft</option>
                  <option value="Medium">Medium</option>
                  <option value="Medium-Stiff">Medium-Stiff</option>
                  <option value="Stiff">Stiff</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="weight">Weight (g)</label>
                <input
                  type="text"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="radius">Radius (m)</label>
                <input
                  type="text"
                  id="radius"
                  name="radius"
                  value={formData.radius}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Image</h2>
            
            <div className="form-group">
              <label htmlFor="image">Image URL</label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
              {formData.image && (
                <div className="image-preview">
                  <img src={formData.image} alt="Preview" onError={(e) => {e.target.style.display = 'none'}} />
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">Save Changes</button>
            <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditSkiForm;
