import { useState, useEffect, useCallback } from 'react';
import { verifyToken, login as apiLogin, logout as apiLogout } from '../api/client';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    const valid = await verifyToken();
    setIsAuthenticated(valid);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email: string, password: string) => {
    const data = await apiLogin(email, password);
    setIsAuthenticated(true);
    return data;
  };

  const logout = () => {
    apiLogout();
    setIsAuthenticated(false);
  };

  return { isAuthenticated, isLoading, login, logout, checkAuth };
}
