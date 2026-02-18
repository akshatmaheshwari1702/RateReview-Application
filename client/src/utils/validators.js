

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


export const isRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== '';
};


export const minLength = (value, min) => {
  return value && value.toString().length >= min;
};


export const maxLength = (value, max) => {
  return value && value.toString().length <= max;
};


export const isValidRating = (rating) => {
  const numRating = Number(rating);
  return !isNaN(numRating) && numRating >= 1 && numRating <= 5;
};


export const validateForm = (data, rules) => {
  const errors = {};

  for (const field in rules) {
    const value = data[field];
    const fieldRules = rules[field];

    if (fieldRules.required && !isRequired(value)) {
      errors[field] = `${field} is required`;
      continue;
    }

    if (fieldRules.minLength && !minLength(value, fieldRules.minLength)) {
      errors[field] = `${field} must be at least ${fieldRules.minLength} characters`;
    }

    if (fieldRules.maxLength && !maxLength(value, fieldRules.maxLength)) {
      errors[field] = `${field} must not exceed ${fieldRules.maxLength} characters`;
    }

    if (fieldRules.email && !isValidEmail(value)) {
      errors[field] = 'Invalid email format';
    }

    if (fieldRules.rating && !isValidRating(value)) {
      errors[field] = 'Rating must be between 1 and 5';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
