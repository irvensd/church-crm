import DOMPurify from 'dompurify';

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^\+?[\d\s-()]{10,}$/;
  return re.test(phone);
};

export const validateAmount = (amount) => {
  const re = /^\d+(\.\d{1,2})?$/;
  return re.test(amount) && parseFloat(amount) > 0;
};

export const validateDate = (date) => {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d);
};

export const validateRequired = (value) => {
  return value !== undefined && value !== null && value !== '';
};

export const validateDonation = (donation) => {
  const errors = {};

  if (!validateRequired(donation.donor.name)) {
    errors.donorName = 'Donor name is required';
  }

  if (!validateRequired(donation.donor.email)) {
    errors.donorEmail = 'Donor email is required';
  } else if (!validateEmail(donation.donor.email)) {
    errors.donorEmail = 'Invalid email format';
  }

  if (!validateRequired(donation.amount)) {
    errors.amount = 'Amount is required';
  } else if (!validateAmount(donation.amount)) {
    errors.amount = 'Invalid amount format';
  }

  if (!validateRequired(donation.date)) {
    errors.date = 'Date is required';
  } else if (!validateDate(donation.date)) {
    errors.date = 'Invalid date format';
  }

  if (!validateRequired(donation.category)) {
    errors.category = 'Category is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateMember = (member) => {
  const errors = {};

  if (!validateRequired(member.name)) {
    errors.name = 'Name is required';
  }

  if (!validateRequired(member.email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(member.email)) {
    errors.email = 'Invalid email format';
  }

  if (member.phone && !validatePhone(member.phone)) {
    errors.phone = 'Invalid phone format';
  }

  if (member.birthday && !validateDate(member.birthday)) {
    errors.birthday = 'Invalid date format';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateEvent = (event) => {
  const errors = {};

  if (!validateRequired(event.title)) {
    errors.title = 'Event title is required';
  }

  if (!validateRequired(event.startDate)) {
    errors.startDate = 'Start date is required';
  } else if (!validateDate(event.startDate)) {
    errors.startDate = 'Invalid date format';
  }

  if (event.endDate && !validateDate(event.endDate)) {
    errors.endDate = 'Invalid date format';
  }

  if (event.endDate && new Date(event.endDate) < new Date(event.startDate)) {
    errors.endDate = 'End date must be after start date';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};

// Password validation
export const isValidPassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Name validation
export const isValidName = (name) => {
  const nameRegex = /^[a-zA-Z\s'-]{2,50}$/;
  return nameRegex.test(name);
};

// Input sanitization
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return DOMPurify.sanitize(input.trim());
};

// Password strength checker
export const getPasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.match(/[a-z]+/)) strength++;
  if (password.match(/[A-Z]+/)) strength++;
  if (password.match(/[0-9]+/)) strength++;
  if (password.match(/[@$!%*?&]+/)) strength++;
  return strength;
};

// Validation error messages
export const getValidationError = (field, value) => {
  switch (field) {
    case 'email':
      if (!value) return 'Email is required';
      if (!isValidEmail(value)) return 'Please enter a valid email address';
      return '';
    case 'password':
      if (!value) return 'Password is required';
      if (!isValidPassword(value)) {
        return 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character';
      }
      return '';
    case 'name':
      if (!value) return 'Name is required';
      if (!isValidName(value)) {
        return 'Name must be between 2 and 50 characters and contain only letters, spaces, hyphens, and apostrophes';
      }
      return '';
    default:
      return '';
  }
}; 