const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  CRITICAL: 4
};

class LoggingService {
  constructor() {
    this.minLevel = process.env.NODE_ENV === 'production' ? LOG_LEVELS.INFO : LOG_LEVELS.DEBUG;
    this.logs = [];
    this.maxLogs = 1000; // Maximum number of logs to keep in memory
  }

  setMinLevel(level) {
    this.minLevel = level;
  }

  formatMessage(level, message, meta = {}) {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      meta: {
        ...meta,
        url: window.location.href,
        userAgent: navigator.userAgent
      }
    };
  }

  async persistLog(logEntry) {
    // In production, you would send this to your logging service
    if (process.env.NODE_ENV === 'production') {
      try {
        // Example: Send to logging service
        // await fetch('your-logging-endpoint', {
        //   method: 'POST',
        //   body: JSON.stringify(logEntry)
        // });
      } catch (error) {
        console.error('Failed to persist log:', error);
      }
    }

    // Store in memory (with rotation)
    this.logs.push(logEntry);
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Store in localStorage for debugging
    try {
      const storedLogs = JSON.parse(localStorage.getItem('app_logs') || '[]');
      storedLogs.push(logEntry);
      if (storedLogs.length > 100) { // Keep last 100 logs in localStorage
        storedLogs.shift();
      }
      localStorage.setItem('app_logs', JSON.stringify(storedLogs));
    } catch (error) {
      console.error('Failed to store log in localStorage:', error);
    }
  }

  debug(message, meta = {}) {
    if (this.minLevel <= LOG_LEVELS.DEBUG) {
      const logEntry = this.formatMessage('DEBUG', message, meta);
      console.debug(message, meta);
      this.persistLog(logEntry);
    }
  }

  info(message, meta = {}) {
    if (this.minLevel <= LOG_LEVELS.INFO) {
      const logEntry = this.formatMessage('INFO', message, meta);
      console.info(message, meta);
      this.persistLog(logEntry);
    }
  }

  warn(message, meta = {}) {
    if (this.minLevel <= LOG_LEVELS.WARN) {
      const logEntry = this.formatMessage('WARN', message, meta);
      console.warn(message, meta);
      this.persistLog(logEntry);
    }
  }

  error(message, error = null, meta = {}) {
    if (this.minLevel <= LOG_LEVELS.ERROR) {
      const logEntry = this.formatMessage('ERROR', message, {
        ...meta,
        error: error ? {
          message: error.message,
          stack: error.stack,
          name: error.name
        } : null
      });
      console.error(message, error, meta);
      this.persistLog(logEntry);
    }
  }

  critical(message, error = null, meta = {}) {
    if (this.minLevel <= LOG_LEVELS.CRITICAL) {
      const logEntry = this.formatMessage('CRITICAL', message, {
        ...meta,
        error: error ? {
          message: error.message,
          stack: error.stack,
          name: error.name
        } : null
      });
      console.error('CRITICAL:', message, error, meta);
      this.persistLog(logEntry);
    }
  }

  // Get all logs (useful for debugging)
  getLogs() {
    return this.logs;
  }

  // Get logs from localStorage
  getStoredLogs() {
    try {
      return JSON.parse(localStorage.getItem('app_logs') || '[]');
    } catch (error) {
      console.error('Failed to retrieve logs from localStorage:', error);
      return [];
    }
  }

  // Clear all logs
  clearLogs() {
    this.logs = [];
    try {
      localStorage.removeItem('app_logs');
    } catch (error) {
      console.error('Failed to clear logs from localStorage:', error);
    }
  }
}

export default new LoggingService(); 