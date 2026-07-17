import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('ashram_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('ashram_jwt_token'));
  const [loading, setLoading] = useState(true);

  // Validate session on boot or when token changes
  useEffect(() => {
    const verifySession = async () => {
      if (token) {
        try {
          const userData = await authService.getCurrentUser();
          setUser(userData);
          localStorage.setItem('ashram_user', JSON.stringify(userData));
        } catch (error) {
          // Token invalid or expired
          setUser(null);
          setToken(null);
          localStorage.removeItem('ashram_jwt_token');
          localStorage.removeItem('ashram_user');
        }
      }
      setLoading(false);
    };

    verifySession();
  }, [token]);

  // Listen to interceptor events when token expires mid-request
  useEffect(() => {
    const handleAuthExpired = () => {
      setUser(null);
      setToken(null);
    };
    window.addEventListener('ashram_auth_expired', handleAuthExpired);
    return () => window.removeEventListener('ashram_auth_expired', handleAuthExpired);
  }, []);

  const login = useCallback((authData) => {
    localStorage.setItem('ashram_jwt_token', authData.token);
    localStorage.setItem('ashram_user', JSON.stringify(authData.user));
    setToken(authData.token);
    setUser(authData.user);
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(() => ({
    user,
    token,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
    login,
    logout
  }), [user, token, loading, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
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
