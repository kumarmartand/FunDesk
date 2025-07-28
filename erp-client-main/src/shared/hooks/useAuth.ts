// src/shared/hooks/useAuth.ts
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const refresh = localStorage.getItem('refreshToken');
    setAccessToken(token);
    setRefreshToken(refresh);
  }, []);

  const login = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAccessToken(null);
    setRefreshToken(null);
  };

  const isAuthenticated = !!accessToken;

  return {
    accessToken,
    refreshToken,
    login,
    logout,
    isAuthenticated,
  };
};
