import { renderHook, act } from '@testing-library/react';
import useForm from '../useForm';

describe('useForm', () => {
  const initialValues = {
    email: '',
    password: ''
  };

  const validationRules = {
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
  };

  it('should initialize with initial values', () => {
    const { result } = renderHook(() => useForm(initialValues, validationRules));
    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
  });

  it('should update values on handleChange', () => {
    const { result } = renderHook(() => useForm(initialValues, validationRules));
    
    act(() => {
      result.current.handleChange({
        target: { name: 'email', value: 'test@example.com' }
      });
    });

    expect(result.current.values.email).toBe('test@example.com');
  });

  it('should validate email format', () => {
    const { result } = renderHook(() => useForm(initialValues, validationRules));
    
    act(() => {
      result.current.handleChange({
        target: { name: 'email', value: 'invalid-email' }
      });
      result.current.handleBlur({
        target: { name: 'email' }
      });
    });

    expect(result.current.errors.email).toBe('Invalid email format');
  });

  it('should validate required fields on submit', async () => {
    const { result } = renderHook(() => useForm(initialValues, validationRules));
    const onSubmit = jest.fn();
    
    await act(async () => {
      await result.current.handleSubmit(onSubmit);
    });

    expect(result.current.errors.email).toBe('Email is required');
    expect(result.current.errors.password).toBe('Password is required');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('should validate password length', () => {
    const { result } = renderHook(() => useForm(initialValues, validationRules));
    
    act(() => {
      result.current.handleChange({
        target: { name: 'password', value: 'short' }
      });
      result.current.handleBlur({
        target: { name: 'password' }
      });
    });

    expect(result.current.errors.password).toBe('Password must be at least 8 characters');
  });

  it('should call onSubmit when form is valid', async () => {
    const { result } = renderHook(() => useForm(initialValues, validationRules));
    const onSubmit = jest.fn();
    
    act(() => {
      result.current.handleChange({
        target: { name: 'email', value: 'test@example.com' }
      });
      result.current.handleChange({
        target: { name: 'password', value: 'password123' }
      });
    });

    await act(async () => {
      await result.current.handleSubmit(onSubmit);
    });

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
  });

  it('should reset form state', () => {
    const { result } = renderHook(() => useForm(initialValues, validationRules));
    
    act(() => {
      result.current.handleChange({
        target: { name: 'email', value: 'test@example.com' }
      });
      result.current.handleBlur({
        target: { name: 'email' }
      });
      result.current.reset();
    });

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
  });
}); 