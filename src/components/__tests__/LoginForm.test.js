import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useForm from '../../hooks/useForm';
import FormField from '../FormField';

// Test component that uses both useForm and FormField
const LoginForm = ({ onSubmit }) => {
  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm(
    { email: '', password: '' },
    {
      email: {
        required: 'Email is required',
        email: 'Invalid email format'
      },
      password: {
        required: 'Password is required',
        minLength: {
          value: 8,
          message: 'Password must be at least 8 characters'
        }
      }
    }
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit);
      }}
      data-testid="login-form"
    >
      <FormField
        label="Email"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email}
        required
      />
      <FormField
        label="Password"
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.password}
        required
      />
      <button type="submit">Log in</button>
    </form>
  );
};

describe('LoginForm Integration', () => {
  it('validates and submits form correctly', async () => {
    const handleSubmit = jest.fn();
    render(<LoginForm onSubmit={handleSubmit} />);

    // Try submitting empty form
    fireEvent.submit(screen.getByTestId('login-form'));
    
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
    expect(handleSubmit).not.toHaveBeenCalled();

    // Enter invalid email
    await userEvent.type(screen.getByLabelText('Email'), 'invalid-email');
    fireEvent.blur(screen.getByLabelText('Email'));
    
    await waitFor(() => {
      expect(screen.getByText('Invalid email format')).toBeInTheDocument();
    });

    // Enter short password
    await userEvent.type(screen.getByLabelText('Password'), 'short');
    fireEvent.blur(screen.getByLabelText('Password'));
    
    await waitFor(() => {
      expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
    });

    // Enter valid credentials
    await userEvent.clear(screen.getByLabelText('Email'));
    await userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
    await userEvent.clear(screen.getByLabelText('Password'));
    await userEvent.type(screen.getByLabelText('Password'), 'password123');

    // Submit form
    fireEvent.submit(screen.getByTestId('login-form'));
    
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });

  it('shows and hides error messages appropriately', async () => {
    render(<LoginForm onSubmit={() => {}} />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    // Initially no error messages
    expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
    expect(screen.queryByText('Password is required')).not.toBeInTheDocument();

    // Show errors on blur when empty
    fireEvent.blur(emailInput);
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });

    // Clear errors when valid input is provided
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    await waitFor(() => {
      expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByText('Password is required')).not.toBeInTheDocument();
    });
  });
}); 