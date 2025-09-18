import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

interface User {
  _id: string;
  email: string;
  name: string;
  preferences?: any;
  notifications?: any;
  privacy?: any;
  stats?: any;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token and get user data
    const token = localStorage.getItem('auth_token');
    if (token) {
      apiService.getCurrentUser()
        .then(data => {
          setUser(data.user);
        })
        .catch(error => {
          console.error('Failed to get current user:', error);
          localStorage.removeItem('auth_token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await apiService.login(email, password);
      setUser(data.user);
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error(error instanceof Error ? error.message : 'Login failed');
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const data = await apiService.register(name, email, password);
      setUser(data.user);
    } catch (error) {
      console.error('Signup failed:', error);
      throw new Error(error instanceof Error ? error.message : 'Signup failed');
    }
  };

  const logout = () => {
    apiService.logout();
    setUser(null);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};