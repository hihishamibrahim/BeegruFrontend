'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAccessToken } from '../utils/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  logout?: () => void;
}

// @ts-expect-error: Initial value is not provided, will be set dynamically
const AuthContext = createContext<AuthContextType>()

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!getAccessToken());
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
