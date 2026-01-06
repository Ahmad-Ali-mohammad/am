
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { MOCK_USERS } from '../constants';

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole) => {
    switch (role) {
      case UserRole.STUDENT:
        setUser(MOCK_USERS.student);
        break;
      case UserRole.INSTRUCTOR:
        setUser(MOCK_USERS.instructor);
        break;
      case UserRole.ADMIN:
        setUser(MOCK_USERS.admin);
        break;
      case UserRole.CONTENT_MANAGER:
         setUser(MOCK_USERS.manager);
        break;
      default:
        setUser(null);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
