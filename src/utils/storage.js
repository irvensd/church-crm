const STORAGE_KEYS = {
  USER: 'church_crm_user',
  SETTINGS: 'church_crm_settings',
  RECENT_ACTIVITIES: 'church_crm_recent_activities',
  PREFERENCES: 'church_crm_preferences'
};

export const storage = {
  // Local Storage Methods
  setLocal: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  },

  getLocal: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  removeLocal: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },

  // Session Storage Methods
  setSession: (key, value) => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error saving to sessionStorage:', error);
      return false;
    }
  },

  getSession: (key) => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from sessionStorage:', error);
      return null;
    }
  },

  removeSession: (key) => {
    try {
      sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from sessionStorage:', error);
      return false;
    }
  },

  // User Management
  setUser: (userData) => {
    return storage.setLocal(STORAGE_KEYS.USER, userData);
  },

  getUser: () => {
    return storage.getLocal(STORAGE_KEYS.USER);
  },

  clearUser: () => {
    return storage.removeLocal(STORAGE_KEYS.USER);
  },

  // Settings Management
  setSettings: (settings) => {
    return storage.setLocal(STORAGE_KEYS.SETTINGS, settings);
  },

  getSettings: () => {
    return storage.getLocal(STORAGE_KEYS.SETTINGS);
  },

  // Recent Activities
  addRecentActivity: (activity) => {
    const activities = storage.getLocal(STORAGE_KEYS.RECENT_ACTIVITIES) || [];
    activities.unshift({
      ...activity,
      timestamp: new Date().toISOString()
    });
    // Keep only the last 10 activities
    const recentActivities = activities.slice(0, 10);
    return storage.setLocal(STORAGE_KEYS.RECENT_ACTIVITIES, recentActivities);
  },

  getRecentActivities: () => {
    return storage.getLocal(STORAGE_KEYS.RECENT_ACTIVITIES) || [];
  },

  // User Preferences
  setPreferences: (preferences) => {
    return storage.setLocal(STORAGE_KEYS.PREFERENCES, preferences);
  },

  getPreferences: () => {
    return storage.getLocal(STORAGE_KEYS.PREFERENCES) || {};
  },

  // Clear all data
  clearAll: () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  }
};

export default storage; 