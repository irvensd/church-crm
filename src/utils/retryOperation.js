const DEFAULT_OPTIONS = {
  maxAttempts: 3,
  initialDelay: 1000, // 1 second
  maxDelay: 10000, // 10 seconds
  exponentialBase: 2,
  onRetry: null,
  retryableErrors: [
    'NetworkError',
    'TimeoutError',
    'ConnectionError',
    'ECONNREFUSED',
    'ETIMEDOUT'
  ]
};

export const isRetryableError = (error, retryableErrors) => {
  if (!error) return false;

  // Check if error message contains any of the retryable error strings
  return retryableErrors.some(errorType =>
    error.message?.includes(errorType) || error.name?.includes(errorType)
  );
};

export const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const retryOperation = async (operation, options = {}) => {
  const config = { ...DEFAULT_OPTIONS, ...options };
  let attempt = 1;
  let lastError = null;

  while (attempt <= config.maxAttempts) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      // If error is not retryable, throw immediately
      if (!isRetryableError(error, config.retryableErrors)) {
        throw error;
      }

      // If this was our last attempt, throw the error
      if (attempt === config.maxAttempts) {
        throw new Error(`Failed after ${attempt} attempts. Last error: ${error.message}`);
      }

      // Calculate delay with exponential backoff
      const delay = Math.min(
        config.initialDelay * Math.pow(config.exponentialBase, attempt - 1),
        config.maxDelay
      );

      // Call onRetry callback if provided
      if (config.onRetry) {
        config.onRetry({
          attempt,
          error,
          delay,
          willRetry: attempt < config.maxAttempts
        });
      }

      // Wait before next attempt
      await wait(delay);
      attempt++;
    }
  }

  throw lastError;
};

// Helper function to create a retry-enabled fetch
export const fetchWithRetry = (url, options = {}) => {
  const fetchOperation = () => fetch(url, options);
  return retryOperation(fetchOperation, {
    maxAttempts: 3,
    onRetry: ({ attempt, error, delay }) => {
      console.warn(`Retrying fetch (attempt ${attempt}) after error: ${error.message}. Waiting ${delay}ms...`);
    }
  });
};

// Helper function to wrap any async function with retry logic
export const withRetry = (fn, options = {}) => {
  return (...args) => retryOperation(() => fn(...args), options);
}; 