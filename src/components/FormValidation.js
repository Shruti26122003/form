// src/components/FormValidation.js
import React, { useState } from 'react';
import './FormValidation.css';

const FormValidation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    let errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsSubmitted(true);
      console.log('Form submitted successfully!', formData);
    } else {
      setIsSubmitted(false);
    }
  };

  return (
    <div>
      <h2>Form Validation</h2>
      {isSubmitted && <div className="success">Form submitted successfully!</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {formErrors.name && <span className="error">{formErrors.name}</span>}
        </div>

        <div>
          <label>Email: </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {formErrors.email && <span className="error">{formErrors.email}</span>}
        </div>

        <div>
          <label>Password: </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {formErrors.password && <span className="error">{formErrors.password}</span>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormValidation;
