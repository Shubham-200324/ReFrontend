import { FIELD_TYPES } from '../config/fields.js';

// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation (minimum 6 characters)
export const validatePassword = (password) => {
  return password.length >= 6;
};

// Name validation (minimum 2 characters, letters only)
export const validateName = (name) => {
  const nameRegex = /^[a-zA-Z\s]{2,}$/;
  return nameRegex.test(name);
};

// Phone validation (basic format)
export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// URL validation
export const validateURL = (url) => {
  if (!url) return true; // Optional field
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Required field validation
export const validateRequired = (value) => {
  return typeof value === 'string' ? value.trim().length > 0 : !!value;
};

export const validateField = (field, value) => {
  const { type, required, validation, minItems, maxSize, accept } = field;

  // Check if required field is empty
  if (required) {
    if (type === FIELD_TYPES.ARRAY) {
      if (!Array.isArray(value) || value.length === 0) {
        return `${field.label} is required`;
      }
      if (minItems && value.length < minItems) {
        return `${field.label} requires at least ${minItems} item${minItems > 1 ? 's' : ''}`;
      }
    } else {
      if (
        value === undefined ||
        value === null ||
        (typeof value === 'string' && value.trim() === '')
      ) {
        return `${field.label} is required`;
      }
    }
  }

  // Skip validation for empty optional fields
  if (!required && (value === undefined || value === null || (typeof value === 'string' && value.trim() === ''))) {
    return null;
  }

  // Type-specific validation
  switch (type) {
    case FIELD_TYPES.EMAIL:
      if (validation?.pattern && !validation.pattern.test(value)) {
        return 'Please enter a valid email address';
      }
      break;

    case FIELD_TYPES.TEL:
      if (validation?.minLength && value.length < validation.minLength) {
        return `Phone number must be at least ${validation.minLength} characters`;
      }
      break;

    case FIELD_TYPES.TEXT:
    case FIELD_TYPES.TEXTAREA:
      if (validation?.minLength && value.length < validation.minLength) {
        return `${field.label} must be at least ${validation.minLength} characters`;
      }
      if (validation?.maxLength && value.length > validation.maxLength) {
        return `${field.label} must be no more than ${validation.maxLength} characters`;
      }
      if (validation?.pattern && !validation.pattern.test(value)) {
        return `Please enter a valid ${field.label.toLowerCase()}`;
      }
      break;

    case FIELD_TYPES.ARRAY:
      if (Array.isArray(value)) {
        // Validate each array item
        for (let i = 0; i < value.length; i++) {
          const item = value[i];
          if (field.template) {
            for (const [key, templateField] of Object.entries(field.template)) {
              if (templateField.required && (!item[key] || item[key].trim() === '')) {
                return `${field.label} #${i + 1}: ${templateField.label} is required`;
              }
            }
          }
        }
      }
      break;

    case FIELD_TYPES.FILE:
      if (required && !value) {
        return `${field.label} is required`;
      }
      if (value && maxSize && value.size > maxSize) {
        return `${field.label} must be less than ${Math.round(maxSize / (1024 * 1024))}MB`;
      }
      if (value && accept && !value.name.toLowerCase().endsWith(accept.replace('.', ''))) {
        return `${field.label} must be a ${accept} file`;
      }
      break;
  }

  return null;
};

export const validateForm = (formData, fieldsConfig) => {
  const errors = {};

  fieldsConfig.forEach(field => {
    const value = formData[field.id];
    const error = validateField(field, value);
    
    if (error) {
      errors[field.id] = error;
    }
  });

  return errors;
};

export const isFormValid = (errors) => {
  return Object.keys(errors).length === 0;
};

// Common validation rules
export const authValidationRules = {
  name: { required: true, name: true, maxLength: 50 },
  email: { required: true, email: true },
  password: { required: true, password: true, minLength: 6 },
};

export const resumeValidationRules = {
  fullName: { required: true, name: true, maxLength: 100 },
  email: { required: true, email: true },
  phone: { phone: true },
  linkedin: { url: true },
  github: { url: true },
  portfolio: { url: true },
}; 