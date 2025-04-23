import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const ROLES = {
  ADMIN: 'admin',
  PASTOR: 'pastor',
  STAFF: 'staff',
  MEMBER: 'member'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Will be replaced with Firebase auth
  const login = async (email, password) => {
    try {
      setError(null);
      // Temporary mock authentication
      if (email && password) {
        const role = email.includes('admin') ? ROLES.ADMIN : ROLES.MEMBER;
        setUser({
          id: '1',
          email,
          role,
          name: role === ROLES.ADMIN ? 'Admin User' : 'Regular User'
        });
        localStorage.setItem('user', JSON.stringify({ email, role }));
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      localStorage.removeItem('user');
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const signup = async (email, password, role) => {
    try {
      setError(null);
      // Temporary mock signup
      if (email && password) {
        setUser({
          id: '1',
          email,
          role,
          name: 'New User'
        });
        localStorage.setItem('user', JSON.stringify({ email, role }));
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const resetPassword = async (email) => {
    try {
      setError(null);
      // Will be implemented with Firebase
      console.log('Password reset email sent to:', email);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateProfile = async (data) => {
    try {
      setError(null);
      setUser(current => ({
        ...current,
        ...data
      }));
      localStorage.setItem('user', JSON.stringify({ ...user, ...data }));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    signup,
    resetPassword,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: user?.role === ROLES.ADMIN,
    isPastor: user?.role === ROLES.PASTOR,
    isStaff: user?.role === ROLES.STAFF,
    isMember: user?.role === ROLES.MEMBER
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 