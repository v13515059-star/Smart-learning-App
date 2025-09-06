import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
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
    // Check for existing session
    const savedUser = localStorage.getItem('courseforge_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, use a default name or extract from email
    let displayName = 'User';
    
    // If email contains common patterns, use appropriate names
    if (email.toLowerCase().includes('uday')) {
      displayName = 'Uday Gupta';
    } else if (email.toLowerCase().includes('john')) {
      displayName = 'John Smith';
    } else if (email.toLowerCase().includes('jane')) {
      displayName = 'Jane Doe';
    } else {
      // Extract name from email and capitalize
      const nameFromEmail = email.split('@')[0];
      displayName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
    }
    
    const mockUser = {
      id: '1',
      email,
      name: displayName
    };
    
    setUser(mockUser);
    localStorage.setItem('courseforge_user', JSON.stringify(mockUser));
  };

  const signup = async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = {
      id: '1',
      email,
      name
    };
    
    setUser(mockUser);
    localStorage.setItem('courseforge_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('courseforge_user');
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