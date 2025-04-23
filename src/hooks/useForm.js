import { useState, useCallback } from 'react';

const useForm = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate a single field
  const validateField = useCallback((name, value) => {
    const rules = validationRules[name];
    if (!rules) return '';

    // Required field validation
    if (rules.required && !value) {
      return rules.required === true ? 'This field is required' : rules.required;
    }

    // Email validation
    if (rules.email && value && !/\S+@\S+\.\S+/.test(value)) {
      return rules.email === true ? 'Invalid email address' : rules.email;
    }

    // Min length validation
    if (rules.minLength && value && value.length < rules.minLength.value) {
      return rules.minLength.message || `Minimum length is ${rules.minLength.value}`;
    }

    // Max length validation
    if (rules.maxLength && value && value.length > rules.maxLength.value) {
      return rules.maxLength.message || `Maximum length is ${rules.maxLength.value}`;
    }

    // Pattern validation
    if (rules.pattern && value && !rules.pattern.value.test(value)) {
      return rules.pattern.message || 'Invalid format';
    }

    // Custom validation
    if (rules.validate) {
      return rules.validate(value, values);
    }

    return '';
  }, [validationRules, values]);

  // Validate all fields
  const validateForm = useCallback(() => {
    const newErrors = {};
    Object.keys(values).forEach((name) => {
      const error = validateField(name, values[name]);
      if (error) {
        newErrors[name] = error;
      }
    });
    return newErrors;
  }, [validateField, values]);

  // Handle field change
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    
    // Validate field on change if it's been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  }, [touched, validateField]);

  // Handle field blur
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    const error = validateField(name, values[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, [validateField, values]);

  // Handle form submission
  const handleSubmit = useCallback(async (onSubmit) => {
    setIsSubmitting(true);
    
    // Validate all fields
    const formErrors = validateForm();
    setErrors(formErrors);
    
    // Mark all fields as touched
    const touchedFields = Object.keys(values).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(touchedFields);

    // If there are no errors, submit the form
    if (Object.keys(formErrors).length === 0) {
      try {
        await onSubmit(values);
        return true;
      } catch (error) {
        console.error('Form submission error:', error);
        return false;
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
      return false;
    }
  }, [validateForm, values]);

  // Reset form
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValues,
    setErrors
  };
};

export default useForm; 