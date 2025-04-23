import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormField from '../FormField';

describe('FormField', () => {
  const defaultProps = {
    label: 'Email',
    name: 'email',
    value: '',
    onChange: jest.fn(),
  };

  it('renders with label and input', () => {
    render(<FormField {...defaultProps} />);
    
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('shows required asterisk when required prop is true', () => {
    render(<FormField {...defaultProps} required />);
    
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays error message and icon when error prop is provided', () => {
    const error = 'Invalid email format';
    render(<FormField {...defaultProps} error={error} />);
    
    expect(screen.getByText(error)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('displays help text when provided', () => {
    const helpText = 'Enter your work email';
    render(<FormField {...defaultProps} helpText={helpText} />);
    
    expect(screen.getByText(helpText)).toBeInTheDocument();
  });

  it('calls onChange handler when input value changes', () => {
    const onChange = jest.fn();
    render(<FormField {...defaultProps} onChange={onChange} />);
    
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'test@example.com' }
    });
    
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('applies disabled styles when disabled prop is true', () => {
    render(<FormField {...defaultProps} disabled />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('bg-gray-50');
  });

  it('renders with custom className', () => {
    const customClass = 'custom-input';
    render(<FormField {...defaultProps} className={customClass} />);
    
    expect(screen.getByRole('textbox')).toHaveClass(customClass);
  });

  it('sets correct input type', () => {
    render(<FormField {...defaultProps} type="password" />);
    
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'password');
  });

  it('sets aria-describedby when error is present', () => {
    const error = 'Invalid email';
    render(<FormField {...defaultProps} error={error} />);
    
    const input = screen.getByRole('textbox');
    const errorId = `${defaultProps.name}-error`;
    expect(input).toHaveAttribute('aria-describedby', errorId);
    expect(screen.getByText(error)).toHaveAttribute('id', errorId);
  });

  it('handles pattern validation attribute', () => {
    const pattern = '[a-z]+';
    render(<FormField {...defaultProps} pattern={pattern} />);
    
    expect(screen.getByRole('textbox')).toHaveAttribute('pattern', pattern);
  });
}); 