import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi, userApi, type UserProfile, ApiError } from '@/lib/api';

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<UserProfile>) => Promise<void>;
  refreshUser: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}

export interface SignupData {
  email: string;
  password: string;
  fullName: string;
  age?: string;
  role: string;
  department?: string;
  interests?: string;
  bio?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'unilink_token';
const USER_KEY = 'unilink_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(TOKEN_KEY);
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  // Verify token and fetch user on mount
  useEffect(() => {
    const verifyAuth = async () => {
      if (!token) return;
      
      try {
        setIsLoading(true);
        const { user: userData } = await authApi.getMe();
        setUser(userData);
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
      } catch {
        // Token invalid or expired — clear auth state
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []); // Only run once on mount

  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const { token: newToken, user: userData } = await authApi.login({ email, password });
      
      localStorage.setItem(TOKEN_KEY, newToken);
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
      setToken(newToken);
      setUser(userData);
    } catch (err) {
      const message = err instanceof ApiError 
        ? err.message 
        : 'Login failed. Please try again.';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (data: SignupData) => {
    try {
      setIsLoading(true);
      setError(null);
      const { token: newToken, user: userData } = await authApi.register(data);
      
      localStorage.setItem(TOKEN_KEY, newToken);
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
      setToken(newToken);
      setUser(userData);
    } catch (err) {
      const message = err instanceof ApiError
        ? err.message
        : 'Signup failed. Please try again.';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const updateUser = useCallback(async (data: Partial<UserProfile>) => {
    try {
      setIsLoading(true);
      setError(null);
      const { user: updatedUser } = await userApi.updateProfile(data);
      setUser(updatedUser);
      localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
    } catch (err) {
      const message = err instanceof ApiError
        ? err.message
        : 'Update failed. Please try again.';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    if (!token) return;
    try {
      const { user: userData } = await authApi.getMe();
      setUser(userData);
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
    } catch {
      // Silently fail refresh
    }
  }, [token]);

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    login,
    signup,
    logout,
    updateUser,
    refreshUser,
    error,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// ProtectedRoute component — redirects to login if not authenticated
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect if we have no token at all (not just loading)
    if (!token && !isLoading) {
      navigate('/login', { replace: true });
    }
  }, [token, isLoading, navigate]);

  // Show nothing while checking auth
  if (isLoading && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-premium-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-cyan via-purple to-pink p-0.5 animate-spin">
            <div className="h-full w-full rounded-[14px] bg-premium-900 flex items-center justify-center font-bold text-xl text-white">U</div>
          </div>
          <p className="text-white/40 text-sm font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!token) {
    return null;
  }

  return <>{children}</>;
}
