import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthContextProps {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('medEquipUser');
    if (savedUser) {
      setState({
        user: JSON.parse(savedUser),
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    } else {
      setState(prevState => ({ ...prevState, loading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Simulate API call with mock data
      const user = mockUsers.find(user => user.email === email);
      
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      // In a real app, we'd validate the password here
      
      localStorage.setItem('medEquipUser', JSON.stringify(user));
      setState({
        user,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState(prevState => ({
        ...prevState,
        error: error instanceof Error ? error.message : 'Login failed',
        loading: false,
      }));
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // Simulate API call
      const existingUser = mockUsers.find(user => user.email === email);
      
      if (existingUser) {
        throw new Error('User already exists');
      }
      
      // Create new user (in a real app, this would be done on the server)
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
      };
      
      localStorage.setItem('medEquipUser', JSON.stringify(newUser));
      setState({
        user: newUser,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState(prevState => ({
        ...prevState,
        error: error instanceof Error ? error.message : 'Registration failed',
        loading: false,
      }));
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('medEquipUser');
    setState({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    });
  };

  const updateProfile = async (userData: Partial<User>) => {
    try {
      if (!state.user) {
        throw new Error('No user logged in');
      }
      
      // Update user data
      const updatedUser = { ...state.user, ...userData };
      
      localStorage.setItem('medEquipUser', JSON.stringify(updatedUser));
      setState(prevState => ({
        ...prevState,
        user: updatedUser,
      }));
    } catch (error) {
      setState(prevState => ({
        ...prevState,
        error: error instanceof Error ? error.message : 'Profile update failed',
      }));
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};