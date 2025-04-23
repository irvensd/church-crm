import React from 'react';
import { FiLoader } from 'react-icons/fi';

const variants = {
  fullscreen: 'min-h-screen',
  contained: 'min-h-[200px]',
  inline: 'min-h-[40px]'
};

const sizes = {
  small: 'w-4 h-4',
  medium: 'w-8 h-8',
  large: 'w-12 h-12'
};

const LoadingState = ({
  variant = 'contained',
  size = 'medium',
  text = 'Loading...',
  showText = true,
  delay = 500, // Delay in milliseconds before showing loading state
  fallback = null,
  className = ''
}) => {
  const [shouldShow, setShouldShow] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShouldShow(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!shouldShow) {
    return fallback;
  }

  return (
    <div
      className={`flex flex-col items-center justify-center ${variants[variant]} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <FiLoader className={`animate-spin text-indigo-600 ${sizes[size]}`} />
      {showText && (
        <p className="mt-4 text-sm font-medium text-gray-500">{text}</p>
      )}
    </div>
  );
};

// Higher-order component for adding loading states to any component
export const withLoading = (WrappedComponent, loadingProps = {}) => {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <LoadingState {...loadingProps} />;
    }
    return <WrappedComponent {...props} />;
  };
};

// Skeleton loading component for content
export const SkeletonLoader = ({ lines = 3, className = '' }) => {
  return (
    <div className={`animate-pulse space-y-4 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="h-4 bg-gray-200 rounded"
          style={{ width: `${Math.random() * 50 + 50}%` }}
        />
      ))}
    </div>
  );
};

// Button with loading state
export const LoadingButton = ({
  isLoading,
  children,
  disabled,
  className = '',
  loadingText = 'Loading...',
  ...props
}) => {
  return (
    <button
      disabled={isLoading || disabled}
      className={`relative inline-flex items-center justify-center ${className}`}
      {...props}
    >
      {isLoading && (
        <FiLoader className="absolute left-4 animate-spin w-4 h-4" />
      )}
      <span className={isLoading ? 'opacity-0' : ''}>
        {children}
      </span>
      {isLoading && (
        <span className="absolute">{loadingText}</span>
      )}
    </button>
  );
};

export default LoadingState; 