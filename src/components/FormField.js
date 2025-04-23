import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  placeholder,
  className = '',
  disabled = false,
  pattern,
  min,
  max,
  minLength,
  maxLength,
  autoComplete,
  helpText,
}) => {
  const inputClasses = `
    block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400
    focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
    ${error ? 'border-red-300' : 'border-gray-300'}
    ${disabled ? 'bg-gray-50 text-gray-500' : 'bg-white'}
    ${className}
  `;

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          pattern={pattern}
          min={min}
          max={max}
          minLength={minLength}
          maxLength={maxLength}
          autoComplete={autoComplete}
          className={inputClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${name}-error` : undefined}
        />
        
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <FiAlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
      </div>

      {helpText && !error && (
        <p className="mt-2 text-sm text-gray-500" id={`${name}-description`}>
          {helpText}
        </p>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField; 