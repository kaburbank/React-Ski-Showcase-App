import { useState, useCallback } from 'react';

// Custom hook for form management
function useForm(initialState, onSubmit) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  }, [errors]);

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setFormData(initialState);
    setErrors({});
    setSubmitted(false);
  }, [initialState]);

  // Handle form submission
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.name?.trim()) newErrors.name = 'Name is required';
    if (!formData.type) newErrors.type = 'Type is required';
    if (!formData.price) newErrors.price = 'Price is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Call submit handler
    if (onSubmit) {
      onSubmit(formData);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  }, [formData, onSubmit]);

  return {
    formData,
    errors,
    submitted,
    handleChange,
    handleSubmit,
    resetForm,
    setFormData
  };
}

export default useForm;
